const express = require("express");
const app = express();
const socket = require("socket.io");

let namespaces = require("./data/Namespaces");
const Namespace = require("./classes/Namespace");

app.use(express.static("public"));
const expressServer = app.listen(8000, () => {
  console.log("server is listening on 8000");
});

const io = socket(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    Credential: true,
  },
});

io.on("connection", (socket) => {
  const nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  socket.emit("nslist", nsData);
});

namespaces.forEach((namespace) => {
  let currentRoomName;
  io.of(namespace.endpoint).on("connection", (nsSocket, req) => {
    console.log(`${nsSocket.id}: is Connected to ${namespace.endpoint}`);
    nsSocket.emit("roomData", namespace.rooms);
    nsSocket.on("joinedRoom", (roomName) => {
      nsSocket.join(roomName);
      currentRoomName = roomName;
      io.of(namespace.endpoint)
        .in(roomName)
        .fetchSockets()
        .then((clients) => clients.map((client) => client.id))
        .then((clientsId) => {
          io.of(namespace.endpoint)
            .in(roomName)
            .emit("ClientsIdArray", clientsId.length);
        });

      let nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === currentRoomName;
      });

      nsSocket.emit("historyMessage", nsRoom.history);
      nsSocket.on("disconnect", () => {
        console.log(`Client disconnected: ${nsSocket.id}`);

        io.of(namespace.endpoint)
          .in(roomName)
          .fetchSockets()
          .then((clients) => clients.map((client) => client.id))
          .then((clientsId) => {
            io.of("/wiki")
              .in(roomName)
              .emit("ClientsIdArray", clientsId.length);
          });
      });

      //send back number of user to all sockets connected to this room
    });
    nsSocket.on("newMessageToserver", (msg) => {
      console.log("MESSAGE", msg);
      const convertedDate = new Date().toLocaleString();
      const fullmsg = {
        fullmsg: msg,
        date: convertedDate,
        userName: "onkar",
        avatar:
          "https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png",
      };

      let nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === currentRoomName;
      });

      console.log(nsRoom, "nsroom");
      nsRoom.addMessage(fullmsg);

      io.of(namespace.endpoint)
        .to(currentRoomName)
        .emit("messageToClients", fullmsg);
    });
  });
});

// io.on("connection", (socket, req) => {
//   socket.emit("messageFromServer", { data: "Hello, it's from the server" });
//   console.log("a Client is Connected");

//   socket.on("chatmessage", (data) => {
//     console.log(socket.id);
//     io.emit("chatmessageFromServer", { data });
//   });

//   socket.on("disconnect", () => {
//     console.log("A client disconnected");
//   });
// });

// io.of("/privateRoom").on("connection", (socket2) => {
//   socket2.emit("Prvatemessage", { data: "hello my friend from socket2" });
// });
