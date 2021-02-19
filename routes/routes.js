const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", ({ body }, res) => {
    
});

router.post("api/workouts", (req, res) => {

});

router.put("/api/workouts/:id", (req, res) => {

});

router.get("/api/workouts/range", (req, res) => {

});

router.get("/stats", (req, res) => {
    
});

router.get("/exercise", (req, res) => {
    // route for New Workout
});

router.get("/exercise?", (req, res) => {
    // route for Continue Workout
});

module.exports = router;