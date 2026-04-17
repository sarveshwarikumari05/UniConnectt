const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

/* This is a MIDDLEWARE */

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

/* MONGODB CONNECTION */

mongoose.connect("mongodb://127.0.0.1:27017/uniconnect", {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* USER SCHEMA */

const userSchema = new mongoose.Schema({
name: String,
email: String,
password: String
});

const User = mongoose.model("User", userSchema);

/* REGISTER USER */

app.post("/register", async (req, res) => {

try {

const { name, email, password } = req.body;

const existingUser = await User.findOne({ email });

if (existingUser) {
return res.json({ status: "exists" });
}

const newUser = new User({
name,
email,
password
});

await newUser.save();

res.json({ status: "registered" });

} catch (error) {

res.status(500).json({ status: "error" });

}

});

/* LOGIN USER */

app.post("/login", async (req, res) => {

try {

const { email, password } = req.body;

const user = await User.findOne({ email, password });

if (user) {

res.json({ status: "success" });

} else {

res.json({ status: "fail" });

}

} catch (error) {

res.status(500).json({ status: "error" });

}

});

/* SERVER */

const PORT = 3000;

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
