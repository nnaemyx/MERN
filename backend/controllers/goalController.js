const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.find({user: req.user.id })

   res.sendStatus(200).json(goal)
})

// @desc set goals
// @route SET /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.sendStatus(400)
        throw new Error('Please add a text field')
    }
    
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    }) 

    res.sendStatus(200).json(goal)
})
// @desc update goals
// @route PUT /api/goals:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.sendStatus(400)
        throw new ERROR('Goal not found')
    }

    const user = await User.findById(req.user.id)



    if(!user) {
        res.sendStatus(401)
        throw new Error('User not found')
    }
    // make sure the user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.sendStatus(401)
        throw new Error('User dont match')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.sendStatus(200).json(updatedGoal)
})
// @desc delete goals
// @route DELETE /api/goals:id
// @access Private
const deleteGoals =  asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.sendStatus(400)
        throw new ERROR('Goal not found')
    }

    await goal.remove()
    res.sendStatus(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}