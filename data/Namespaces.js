const Namespace = require("../classes/Namespace");
const Room = require("../classes/Room");

let namespaces = [];

let wiki = new Namespace(
  0,
  "wiki",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrBsXH0f5wksO8l09SCvRYqD_p9DbWllNgjdaekYjgkA&s",
  "/wiki"
);

let mozila = new Namespace(
  1,
  "mozila",
  "https://i.insider.com/5fbd515550e71a001155724f?width=700",
  "/mozila"
);

let linux = new Namespace(
  2,
  "linux",
  "https://bloximages.newyork1.vip.townnews.com/redandblack.com/content/tncms/assets/v3/editorial/4/59/45940eb2-5403-11e9-a843-db0e4491cc90/5ca13d8453042.image.jpg?resize=400%2C267",
  "/linux"
);

wiki.addRoom(new Room(0, "New Article", "Wiki"));
wiki.addRoom(new Room(1, "Editors", "wiki"));
wiki.addRoom(new Room(2, "Other", "wiki"));

mozila.addRoom(new Room(0, "FireFox", "mozila"));
mozila.addRoom(new Room(1, "seaMoney", "mozila"));
mozila.addRoom(new Room(2, "spiderMonkey", "mozila"));
mozila.addRoom(new Room(3, "Rust", "mozila"));

linux.addRoom(new Room(0, "Debian", "linux"));
linux.addRoom(new Room(1, "Red Hat", "linux"));
linux.addRoom(new Room(2, "Macos", "linux"));
namespaces.push(wiki, mozila, linux);

module.exports = namespaces;
