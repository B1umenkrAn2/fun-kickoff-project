const mongoose = require("mongoose");

const availabilitySchema = mongoose.Schema(
    {
        date: { type: Date, required: true },
        start: { type: Number, required: true,default:10 },
        end: { type: Number, required: true,default:22 },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    description: {
        type: String,
    },
    photo:{
      type:String,
    },
    gallery:[],
    address: {
        type: String,
        required: true
    },
    isOwner:{
      type:Boolean,
      required:true
    },
    isSitter:{
        type:Boolean,
        required:true,
        default:false
    },
    dogSitter:{
        availability:[availabilitySchema],
        review:[reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        cost:{
            type:Number,
            default:0
        },

    }
});



module.exports = Profile = mongoose.model("profile", profileSchema);
