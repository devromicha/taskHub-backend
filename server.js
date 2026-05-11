const app = require('./src/app');
const connectDB = require('./src/config/db');

require("dotenv").config();

const PORT = process.env.PORT || 4000

connectDB();

app.listen(PORT, () => {
    console.log(`server running on the port ${PORT}`)
})