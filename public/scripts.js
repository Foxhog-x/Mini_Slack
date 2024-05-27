const socket = io("http://localhost:8000");
// const socket2 = io("http://localhost:8000/wiki");
// const socket3 = io("http://localhost:8000/mozila");
// const socket4 = io("http://localhost:8000/linux");
let nsSocket = "";

socket.on("nslist", (nsData) => {
  const elementDiv = document.querySelector(".namespaces");
  elementDiv.innerHTML = "";
  nsData.forEach((element) => {
    elementDiv.innerHTML += `<div class="namespace" ns=${element.endpoint}><img src=${element.img}</div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (arrayEle) => {
      arrayEle.addEventListener("click", (e) => {
        const ns = arrayEle.getAttribute("ns");
        joinNs(ns);
      });
    }
  );
});
