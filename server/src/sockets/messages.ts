import User from "../models/User";
// import { ICustomSocket } from "../api";
// import { io } from "../api";

let sockets: { socketId: string; userId: string }[] = [];

const messagesSocket = async (socket: ICustomSocket) => {
  // if there is an authenticarted user id we load the messages
  if (socket.userId) {
    const user = await User.findById(socket.userId);
    socket.emit("load-messages", user.messages.reverse());

    sockets.push({ socketId: socket.id, userId: socket.userId });
  }

  socket.on("send-message", async (message: string, userPath: string) => {
    if (!message || !userPath) return;

    // add the message to the user's messages and save the user
    const user = await User.findOne({ path: userPath });
    user.messages.push(message);
    await user.save();

    // we fing the socket id of the recieving user if exists
    const recievingUser = sockets.find((s) => s.userId === user._id.toString());

    if (recievingUser) {
      io.to(recievingUser.socketId).emit("new-message", message);
    }
  });

  socket.on("disconnect", () => {
    sockets = sockets.filter(
      (s) => s.socketId !== socket.id && s.userId !== socket.userId
    );
  });
};

export default messagesSocket;
