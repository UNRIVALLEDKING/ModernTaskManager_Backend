const express = require("express");
const path = require("path");
const {
  addProject,
  getProjects,
  updateproject,
  deleteProject,
  deleteAll,
} = require("../view/projects");
const {
  loginApi,
  NewUserApi,
  updateUser,
  //   getUserData
} = require("../view/user");
const addSubsriberApi = require("../view/VidyarthiVilla");

const router = express.Router();
module.exports = router;

router.get("/", async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/HomePage.html"));
});

// API for New User Registration
router.post("/newUser", NewUserApi);

// Login APi
router.post("/login", loginApi);

// Update Username API
router.patch("/updateUser", updateUser);

// GetUserData APi
// router.get("/getUser/:token", getUserData);

// Add Project API
router.post("/addProject", addProject);

// Get all Projects of a particular User API
router.get("/getProjects/:id", getProjects);

// Update Project Data API
router.patch("/updateProject/:id", updateproject);

// Delete Project API
router.delete("/deleteProject/:id", deleteProject);

// Delete All Projects API
router.delete("/deleteAll/:id", deleteAll);

// VidyarthiVilla subscription API
router.post("/vidyarthivilla", addSubsriberApi);
