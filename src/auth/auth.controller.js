
const { default: bcrypt } = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerUser = async (req,res) => {
    try {
        const {  firstName, lastName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserActivation.create({firstName, lastName, email, password:hashedPassword});

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

    const user = await user.findOne({email});
     
    if(!user){
        return res.json({
            message: "user not found",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch){
        return res.json({
            message: "Invalid password",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
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