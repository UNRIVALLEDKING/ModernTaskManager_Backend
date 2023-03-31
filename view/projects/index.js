const allprojectsModels = require("../../model/projectModels");
const userModels = require("../../model/userModels");

// Add a new Project
const addProject = async (req, res) => {
  const getUser = await userModels.findById(req.body.token);
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
    res.json(saveData);
  } catch (err) {
    if (err) throw err;
  }
};

// get all projects of a particular users
const getProjects = async (req, res) => {
  //   const getUser = await userModels.findById(req.params.id);
  //   res.json(getUser);
  const allProjects = await allprojectsModels.find({ user: req.params.id });
  res.json(allProjects);
};

module.exports = { addProject, getProjects };
