const VidyarthiVillaModels = require("../../model/VidyarthiVillaModels");

const addSubsriberApi = async (req, res) => {
  const { email, name } = await req.body;

  const checkUser = await VidyarthiVillaModels.findOne({ email: email });
  if (!checkUser) {
    const userData = new VidyarthiVillaModels({
      email: email,
      name: name,
    });
    try {
      const addUser = await userData.save();
      res.status(201).json({
        message: "You've subsribed to our newsletter!",
        email: addUser.email,
        name: addUser.name,
      });
      return;
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(201).json({
      message: "You've already subsribed to our newsletter",
    });
  }
};

module.exports = addSubsriberApi;
