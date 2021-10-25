const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    channelId:{
        type: Number,
       required:true,
    },
    userId: {
       type: Number,
       required:true,
    },
    willWatch: {
        type:Array,
        required:true,
    },
    myList: {
        type:Array,
        required:true,
    },
})

module.exports = mongoose.model('User', UserSchema);