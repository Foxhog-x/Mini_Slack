function joinRoom(roomName) {
  nsSocket.emit("joinedRoom", roomName);
  nsSocket.on("ClientsIdArray", (numberOfClients) => {
    console.log(numberOfClients);
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${numberOfClients}  <i class="fa-solid fa-user"></i> `;
    const currentRoomName = document.querySelector(".curr-room-text");
    currentRoomName.innerText = roomName;
  });

  nsSocket.on("historyMessage", (history) => {
    console.log("does this working everytime when something happens");
    messageUl = document.querySelector("#messages");
    messageUl.innerHTML = "";
    history.forEach((element) => {
      const newMessge = buildHtml(element);
      const currentMessage = messageUl.innerHTML;
      messageUl.innerHTML = currentMessage + newMessge;
    });

    messageUl.scrollTo(0, messageUl.scrollHeight);
  });
}
