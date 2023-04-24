const User = require('../model/User')

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exist!' })
        }
        user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role: "user"
        })
        res.status(201).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' })
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect Password.' })
        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}