// @desc register users
// @route GET /api/users
// @access Public

const registerUser = (req, res) => {
    res.json({message: 'register user'})
}
// @desc login users
// @route GET /api/users/login
// @access Public

const loginUser = (req, res) => {
    res.json({message: 'Login user'})
}
// @desc get user users
// @route GET /api/users/me
// @access Public

const getMe = (req, res) => {
    res.json({message: 'User Display Data'})
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}