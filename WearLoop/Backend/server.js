const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/wearloopDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// ================= USER SCHEMA =================
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String
});

const User = mongoose.model("User", userSchema);


// ================= DONATION SCHEMA =================
const donationSchema = new mongoose.Schema({
  user: String,
  gender: String,
  category: String,
  size: String,
  status: { type: String, default: "Pending" },
  frontImage: String,
  backImage: String
});

const Donation = mongoose.model("Donation", donationSchema);


// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });


// ================= REGISTER =================
app.post("/register", async (req, res) => {

  const email = req.body.email.trim().toLowerCase();

  const existingUser = await User.findOne({ email });

  if(existingUser){
    return res.json({ message: "Email already registered" });
  }

  const newUser = new User({
    name: req.body.name,
    email: email,
    mobile: req.body.mobile,
    password: req.body.password
  });

  await newUser.save();

  res.json({ message: "User Registered Successfully" });
});


// ================= LOGIN =================
app.post("/login", async (req, res) => {

  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  const user = await User.findOne({ email });

  if(!user){
    return res.json({ message: "User not found" });
  }

  if(user.password !== password){
    return res.json({ message: "Wrong Password" });
  }

  res.json({ user });
});

// ================= POST DONATION =================
app.post("/donate", upload.fields([
  { name: "frontImage" },
  { name: "backImage" }
]), async (req, res) => {

  const newDonation = new Donation({
    user: req.body.user,
    gender: req.body.gender,
    category: req.body.category,
    size: req.body.size,
    frontImage: req.files.frontImage[0].filename,
    backImage: req.files.backImage[0].filename
  });

  await newDonation.save();

  res.json({ message: "Donation Saved" });
});


// ================= GET DONATIONS =================
app.get("/donations", async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
});


// ================= DELETE DONATION =================
app.delete("/donation/:id", async (req, res) => {
  await Donation.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


// ================= UPDATE STATUS =================
app.put("/donation/:id", async (req, res) => {
  await Donation.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ message: "Updated" });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// ===== GET USER DONATIONS =====
app.get("/user-donations/:email", async (req, res) => {

  const donations = await Donation.find({
    user: req.params.email
  });

  res.json(donations);
});