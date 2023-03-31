const express = require("express");
const { addProject, getProjects } = require("../view/projects");
const { loginApi, NewUserApi } = require("../view/user");

const router = express.Router();
module.exports = router;

// API for New User Registration
router.post("/newUser", NewUserApi);

// Login APi
router.get("/login", loginApi);

// Add Project API
router.post("/addProject", addProject);

// Get all Projects of a particular User
router.get("/getProjects/:id", getProjects);
