const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Database credentials
const user = "infotech6369";
const pass = "KDTJqaDsnEM4Ku3D";

// CORS configuration
app.use(cors({
    origin: `https://main--classy-meerkat-896191.netlify.app/`  // Ensure this matches where your React app is running
}));

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${user}:${pass}@super.mzso1.mongodb.net/Testing`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // Added for parsing JSON

// Serve static files
app.use(express.static('public'));


// Handle form submission
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    newUser.save()
        .then(() => {
            res.send('User registered successfully');
        })
        .catch((err) => {
            console.error('Error saving user:', err);
            res.status(500).send('Error registering user');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
