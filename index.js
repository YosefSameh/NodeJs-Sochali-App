require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const path = require('path');
const mongoose = require("mongoose")

mongoose.connect(process.env.URL)
.then(()=>{
    console.log("Data Bace Is Conecting");
})
.catch((error)=>{
    console.log("error",error);
})

//===================

const {Server} = require("socket.io")
const { createServer } = require('http');
const server = createServer(app);
const Message = require("./Modules/chat.modules")
const io = new Server(server, {
    cors: {
    //   origin: "http://localhost:3000"
      origin: "https://react-js-sochali-app.vercel.app"
    }
  });

io.on('connection', (socket) => {
    Message.find()
    .then(messages => {
        socket.emit('initial messages', messages);
    });

    socket.on('chat message', (msg) => {

        const message = new Message({sender:msg.sender,imgProfile:msg.imgProfile, content: msg.content });
        message.save()
        .then(() => {
            io.emit("chat message", msg);
        });
    });

    socket.on("typing", () => {
        socket.broadcast.emit("ShowTyping");
    });

    socket.on("stop-typing", () => {
        socket.broadcast.emit("StopTyping");
    });
});

//===================








const PostsRoute = require("./Routes/social.route")
app.use("/api/posts",PostsRoute)


const ProfileRoute = require("./Routes/profile.route")
app.use("/api/profile",ProfileRoute)


const FollowRoute = require("./Routes/following.route")
app.use("/api/follow",FollowRoute)


const UsersRoute = require("./Routes/users.route")
app.use("/api/users",UsersRoute)

server.listen(process.env.PORT,()=>{
    console.log("listen for Tasks");
})


