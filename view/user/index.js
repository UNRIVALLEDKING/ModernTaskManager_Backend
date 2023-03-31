const crypto = require("node:crypto");
const userModels = require("../../model/userModels");

const iterations = 1000;
const keyLength = 64;
const digest = "sha512";
// New User API
const NewUserApi = async (req, res) => {
  const { email, username, password } = await req.body;
  const checkUser = await userModels.findOne({ email: email });
  if (!checkUser) {
    // Code to Hash Password and save the data to our database
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keyLength,
      digest,
      async (err, key) => {
        if (err) throw err;
        const hash = key.toString("hex");
        console.log(email, username, password, salt, hash);
        const newUser = new userModels({
          email: email,
          username: username,
          salt: salt,
          hash: hash,
        });
        // Save user Data to database
        try {
          const addUser = await newUser.save();
          res.status(200).json(addUser);
          return;
        } catch (err) {
          res.json({ message: err.message });
        }
      }
    );
  } else {
    console.log("User already exist");
    res.send("Email is already in use!");
  }
};

// Login API
const loginApi = async (req, res) => {
  const { email, password } = await req.body;
  try {
    const userData = await userModels.findOne({ email: email });
    console.log(userData);
    if (userData) {
      const { salt, hash } = await userData;
      crypto.pbkdf2(
        password,
        salt,
        iterations,
        keyLength,
        digest,
        async (err, key) => {
          if (err) throw err;
          const hashGenerated = key.toString("hex");
          if (hash === hashGenerated) {
            res.send("Login Successfully");
            return;
          } else {
            res.send("Wrong Password!");
          }
        }
      );
    } else {
      res.send("User isn't Registered");
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { NewUserApi, loginApi };
