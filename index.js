require('dotenv').config();
const express = require("express")

const app = express()

const cors = require("cors")


app.use(cors())

const mongoose = require("mongoose")



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

app.listen("3000",()=>{
    console.log("listen for Tasks");
})

