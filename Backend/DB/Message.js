const mongoose = require('mongoose');
 const messageSchema = new mongoose.Schema(
    {
        senderId : { type: mongoose.Schema.Types.ObjectId, ref:"Subscriber"},
        senderName: {type :String  },
        senderEmail:{ type:String },
        receiverEmail:{type:String},
        message: { type:String},
      
    },
    {timestamps:true}
 );
const Message = mongoose.model("Messages", messageSchema);
module.exports = Message;



