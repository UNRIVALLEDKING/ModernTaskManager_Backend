const crypto = require("node:crypto");
const userModels = require("../../model/userModels");

const iterations = 1000;
const keyLength = 64;
const digest = "sha512";
// New User API
const NewUserApi = async (req, res) => {
  console.log(req.body);

  try {
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
            res.status(201).json({
              token: addUser.id,
              message: "Account Created Successfully!",
              username: addUser.username,
            });
            return;
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
        }
      );
    } else {
      // console.log("User already exist");
      res.status(400).json({ message: "Email is already in use!" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Login API
const loginApi = async (req, res) => {
  const { email, password } = await req.body;
  try {
    const userData = await userModels.findOne({ email: email });
    // console.log(userData);
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
            res.status(200).json({
              token: userData.id,
              username: userData.username,
              message: "Login Successfull!",
            });
            return;
          } else {
            res.status(401).json({ message: "Wrong Password!" });
          }
        }
      );
    } else {
      res.status(404).json({ message: "User isn't Registered" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

// GetUser Data API
// const getUserData = async (req, res) => {
//   const token = req.params.token;
//   try {
//     const userData = await userModels.findById(token);
//     res.json({
//       username: userData.username,
//     });
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// };

// Update UserData
const updateUser = async (req, res) => {
  const { id, username, password } = req.body;
  try {
    const user = await userModels.findByIdAndUpdate(id, { username: username });
    const newUser = await userModels.findById(id);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  NewUserApi,

  loginApi,
  //  getUserData,
  updateUser,
};
