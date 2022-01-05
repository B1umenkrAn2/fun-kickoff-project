const mongoose = require("mongoose");




const availabilitySchema = mongoose.Schema(
    {
        data: { type: Date, required: true },
        startTime: { type: Number, required: true,default:10 },
        endTime: { type: Number, required: true,default:22 },
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
    address: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postCode: { type: String, required: true },
        country: { type: String, required: true },
        required: true
    },
    description: {
        type: String,
    },
    availability:[availabilitySchema]
});



module.exports = Profile = mongoose.model("profile", profileSchema);
