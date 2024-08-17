const  mongoose  = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: {
        type:String
    },
    sender:{
        type:String
    },
    imgProfile:{
        type:String
    },
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message