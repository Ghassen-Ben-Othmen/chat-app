const express = require("express");
const cors = require("cors");

const verifyToken = require("./util/verifyToken");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { signup, signin, getUserData } = require("./controllers/user");
const {
  otherChatRooms,
  getChatRoom,
  addChatRoom,
  joinChatRoom,
  leaveChatRoom,
  deleteChatRoom,
  addMessageToChtRoom
} = require("./controllers/data");

// set Cors
app.use(cors());

// setup port
const PORT = 5000 || process.env.PORT;

// parse body
app.use(express.json());

// hello route
app.post("/hello", (req, res) => {
  res.status(200).json({
    msg: "Hello world!" + req.body.name
  });
});

// user staff
app.post("/signin", signin);
app.post("/signup", signup);
app.get("/user", verifyToken, getUserData);

// chat data staff
app.get("/other-chatrooms", verifyToken, otherChatRooms);
app.get("/chatroom/:chatroom", verifyToken, getChatRoom);
app.post("/add-chatroom", verifyToken, addChatRoom);
app.post("/join-chatroom", verifyToken, joinChatRoom);
app.delete("/leave-chatroom", verifyToken, leaveChatRoom);
app.delete("/delete-chatroom/:chatRoom", verifyToken, deleteChatRoom);
app.post(
  "/add-message-to-chatroom/:chatRoom",
  verifyToken,
  addMessageToChtRoom
);

// socket connection
io.on("connection", socket => {
  socket.on("addChatRoom", chatRoom => {
    socket.broadcast.emit("addChatRoom", JSON.stringify(chatRoom));
  });

  socket.on("deleteChatRoom", chatRoom => {
    socket.broadcast.emit("deleteChatRoom", JSON.stringify(chatRoom));
  });

  socket.on("addMessage", data => {
    socket.broadcast.emit("addMessage", JSON.stringify(data));
  });

  socket.on("leaveChatRoom", data => {
    socket.broadcast.emit("leaveChatRoom", JSON.stringify(data));
  });

  socket.on("joinChatRoom", data => {
    socket.broadcast.emit("joinChatRoom", JSON.stringify(data));
  });
});

// listen server
http.listen(PORT, () => {
  console.log(`server listen :${PORT}`);
});
