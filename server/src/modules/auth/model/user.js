import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    role:{
        type: String,
        values: ['admin', 'user'],
        message: '{VALUE} is not supported',
        required: true,
    },
    sessions: [],
}, { timestamps: true })

export default mongoose.model('UserInfo', userSchema);

