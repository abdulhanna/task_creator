import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
       
    },
    due_date:Date,
    priority:{
        type: String,
        enum : ['High', 'Medium','Low'] , // Enum is a special
        message: '{VALUE} is not supported',
        
        required: true,
    },
    status:{
        type: String,
        enum : ['Pending', 'Progress','Completed'] , // Enum is a special
        message: '{VALUE} is not supported',
    },
    asignedto:{
    //    type: Schema.Types.ObjectId, 
    type:String,
       ref:"UserInfo"
    },
   completion_date:Date



}, { timestamps: true })


export default mongoose.model('Task', activitySchema)
