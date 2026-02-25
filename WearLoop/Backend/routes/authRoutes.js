router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    age: req.body.age,
    mobile: req.body.mobile,
    email: req.body.email,
    password: hashed
  });

  await user.save();
  res.json({ message: "User Registered Successfully" });
});
