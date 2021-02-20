const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
        $set: {
            totalDuration: { $sum: "$exercises.duration" }
        }
    }])
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/api/workouts", ({ body }, res) => {
    console.log("POST route: api/workouts");
    Workout.create(body)
        .then(data => {
            res.json({ _id: data._id });
            console.log("Success!");
        })
        .catch(err => {
            res.status(400).json(err);
            console.log("ERROR", err);
        })
});

// predicting input values from req.body based on PUT request defined in api.js, and made in exercise.js
router.put("/api/workouts/:id", (req, res) => {
    console.log("PUT /api/workouts/:id");
    console.log(req.body);
    Workout.updateOne(
        {
            _id: req.params.id
        },
        { $push: { exercises: req.body } },
        (err, data) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log("Success!");
                res.json(data);
            }
        }
    );
});

router.get("/api/workouts/range", (req, res) => {
    // this is called in stats.js, and the corresponding function is defined in api.js
    // sort by day, ascending, then return the data as JSON
    Workout.find({}).sort({ day: 1 }).limit(7)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/stats.html"));
});

router.get("/exercise", (req, res) => {
    // route for New Workout
    res.sendFile(path.join(__dirname, "/../public/exercise.html"));
});

module.exports = router;