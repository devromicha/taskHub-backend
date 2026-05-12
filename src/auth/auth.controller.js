const User = require('./auth.model')
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


exports.registerUser = async (req,res) => {
    try {
        const {  firstName, lastName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({firstName, lastName, email, password:hashedPassword});

        res.json({
            message: "User registered successfully",
            user,
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
};


exports.loginUser = async (req,res) => {
    
    try{
    const {email,password} = req.body;

    const foundUser = await User.findOne({email});
     
    if(!foundUser){
        return res.json({
            message: "user not found",
        });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    
    if(!isMatch){
        return res.json({
            message: "Invalid password",
        });
    }

    const token = jwt.sign(
        {
            id: foundUser._id,
            email: foundUser.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );

    res.json({
        message: "Login Sucessfull"
    })

    } catch(error) {
      res.json({
        message: error.message
      })
    }
}