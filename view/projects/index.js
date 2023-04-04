const allprojectsModels = require("../../model/projectModels");
const userModels = require("../../model/userModels");

// Add a new Project
const addProject = async (req, res) => {
  const getUser = await userModels.findById(req.body.token);
  if (getUser) {
    console.log("user", getUser);
    const projectData = new allprojectsModels({
      user: getUser.id,
      title: req.body.title,
      desc: req.body.desc,
      deadline: req.body.deadline,
      start: new Date(),
      progress: req.body.progress,
      status: req.body.status,
    });
    try {
      const saveData = await projectData.save();
      res.status(201).json({
        title: saveData.title,
        desc: saveData.desc,
        deadline: saveData.deadline,
        start: saveData.start,
        progress: saveData.progress,
        status: saveData.status,
        id: saveData.id,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(404).json({ message: "User Not Found Kindly Login again!" });
  }
};

// get all projects of a particular users
const getProjects = async (req, res) => {
  //   const getUser = await userModels.findById(req.params.id);
  //   res.json(getUser);
  try {
    const allProjects = await allprojectsModels
      .find({ user: req.params.id })
      .sort({ _id: -1 });
    console.log("allProjects", allProjects);
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Project Data
const updateproject = async (req, res) => {
  const updateData = req.body;
  try {
    await allprojectsModels.findByIdAndUpdate(req.params.id, updateData);
    allprojectsModels.findById(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { addProject, getProjects, updateproject };
