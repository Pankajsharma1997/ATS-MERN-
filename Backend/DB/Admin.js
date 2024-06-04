const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema
    ({
        name :{
            type: String,
            required:true
        },
    
        email:{
            type: String,
            required: true
        },
    
        password:{
        type: String,
        required:true
        }
    },
        { capped: { size: 5242880, max: 2, autoIndexId: true }  });
    

module.exports = mongoose.model("admin", adminSchema);
