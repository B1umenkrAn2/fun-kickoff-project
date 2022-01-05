const User = require("../models/User");
const Profile = require("../models/Profile")
const asyncHandler = require("express-async-handler");

// @route GET /sitters
// @desc get all sitters
// @access public
const sitterList = asyncHandler(async (req, res, next) => {

    // unfinished
    const sitters = await Profile.find({isSitter: true}).sort({ "dogSitter.rating": -1 }).limit(10)
    res.json({success: {sitters: sitters}})

});

// @route GET /:id
// @desc get profile by id
// @access private protect
const getProfileById = asyncHandler(async (req,res)=>{
    const {id} = req.params.id

    const profile = await Profile.findById(id)

    if (profile){

        res.status(200).json({success:{profile}})
    }else {
        res.status(404)
        throw new Error('profile not found.')
    }
})

// @route POST /
// @desc create profile for user
// @access private protect
const createProfile = asyncHandler(async (req, res) => {
    // get info from body
    const {firstName, lastName, gender, street, city, postCode} = req.body
    // get user from token
    const user = req.user

    const profile = await Profile.create({
        firstName,
        lastName,
        address: {street, city, postCode},
        user
    })

    if (profile) {
        res.status(201).json({
            success: {
                user,
                profile
            }
        })
    } else {
        res.status(400)
        throw new Error('Invalid profile data')
    }

})

// @route PUT /:id
// @desc update profile for user
// @access private protect
const updateProfile = asyncHandler(async (req, res) => {

    const profile = await Profile.findOne(req.body._id)

    if (profile) {
        const {firstName, lastName, gender, street, city, postCode, description, phoneNumber, photo} = req.body

        const user = req.user

        profile.firstName = firstName || profile.firstName
        profile.lastName = lastName || profile.lastName
        profile.gender = gender || profile.gender
        profile.address = {street, city, postCode} || profile.address
        profile.description = description || profile.description
        profile.phoneNumber = phoneNumber || profile.phoneNumber
        profile.photo = photo || profile.photo

        const updateProfile = profile.save()

        res.status(200).json({
            success: {
                profile
            }
        })


    } else {
        res.status(404)
        throw new Error('profile not found')
    }

})


// @route DELETE /:id
// @desc DELETE profile for user
// @access private protect
const deleteProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne(req.body._id)

    if (profile) {
        await profile.remove()
        res.json({success: {msg: 'profile removed'}})
    } else {
        res.status(404)
        throw new Error('profile not found')
    }
})


// @route PUT /:id
// @desc make user become a sitter
// @access private protect
// This method is can be separate into two method.
// currently, just keep in this way. availability should have individual methods
const becomeSitter = asyncHandler(async (req, res) => {

    const profile = await Profile.findOne(req.body._id)
    const {cost, date} = req.body
    const user = req.user

    if (profile) {

        profile.isSitter = true
        profile.dogSitter.cost = cost
        profile.dogSitter.availability = date.forEach(e => {
            e.user = user
        })

        const updateProfile = profile.save()

        res.status(200).json({
            success: {
                profile
            }
        })


    } else {
        res.status(404)
        throw new Error('profile not found')
    }

})
export {sitterList, createProfile, updateProfile,deleteProfile, becomeSitter,getProfileById}
