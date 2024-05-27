function joinNs(endpoint) {
  if (nsSocket) {
    nsSocket.close();

    document
      .querySelector("#user-message")
      .removeEventListener("submit", formSubmission);
  }
  nsSocket = io(`http://localhost:8000${endpoint}`);
  nsSocket.on("roomData", (rooms) => {
    const listRoom = document.querySelector(".room-list");
    listRoom.innerHTML = "";
    rooms.forEach((room) => {
      listRoom.innerHTML += `    <li class="listRooms"><span class="glyphicon glyphicon-globe"></span>${room.roomTitle}</li>`;
    });

    Array.from(document.getElementsByClassName("listRooms")).forEach(
      (arrayEl) => {
        arrayEl.addEventListener("click", (e) => {
          const room = e.target.innerText;
          console.log(room, "Room to join");
          joinRoom(room);
        });
      }
    );
    //default room to open automatically
    const topRoom = document.querySelector(".listRooms");
    const topRoomName = topRoom.innerText;
    joinRoom(topRoomName);
    // nsSocket.emit("joinedRoom", topRoomName);
  });

  nsSocket.on("messageToClients", (msg) => {
    console.log(msg);
    document.querySelector("#messages").innerHTML += buildHtml(msg);
  });

  document
    .querySelector(".message-form")
    .addEventListener("submit", formSubmission);
}
const formSubmission = (event) => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  console.log(newMessage);
  nsSocket.emit("newMessageToserver", { text: newMessage });
};
const buildHtml = (msg) => {
  return `<li>
    <div class="user-image">
        <img src=${msg.avatar} alt="profile" width="75" height="75"  />
    </div>
    <div class="user-message">
        <div class="user-name-time">${msg.userName} <span>${msg.date}</span></div>
        <div class="message-text">${msg.fullmsg.text}</div>
    </div>
  </li>`;
};
