const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
require('dotenv').config();
app.use(cors())



//===================

// const server = createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: 'https://react-js-sochali-app.vercel.app', 
//         methods: ["GET", "POST"],
//     credentials: true
//     },
//     transports: ['websocket', 'polling']
// });



// io.on('connection', (socket) => {
//     console.log("contntion", socket.id);
//     socket.on('error', (err) => {
//         console.error("Socket error:", err);
//     });

//     socket.on('disconnect', (reason) => {
//         console.log(`Client disconnected due to ${reason}`);
//     });
//     Message.find()
//     .then(messages => {
//         socket.emit('initial messages', messages);
//     });

//     socket.on('chat message', (msg) => {
        
//         const message = new Message({sender:msg.sender,imgProfile:msg.imgProfile, content: msg.content });
//         message.save()
//         .then(() => {
//             io.emit("chat message", msg);
//         });
//     });

//     socket.on("typing", () => {
//         socket.broadcast.emit("ShowTyping");
//     });
    
//     socket.on("stop-typing", () => {
//         socket.broadcast.emit("StopTyping");
//     });
// });

//===================


mongoose.connect(process.env.URL)
.then(()=>{
    console.log("Data Bace Is Conecting");
})
.catch((error)=>{
    console.log("error",error);
})



const PostsRoute = require("./Routes/social.route")
app.use("/api/posts",PostsRoute)


const ProfileRoute = require("./Routes/profile.route")
app.use("/api/profile",ProfileRoute)


const FollowRoute = require("./Routes/following.route")
app.use("/api/follow",FollowRoute)


const UsersRoute = require("./Routes/users.route")
app.use("/api/users",UsersRoute)

app.listen(process.env.PORT,()=>{
    console.log("listen for Tasks");
})

