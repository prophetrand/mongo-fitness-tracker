# mongo-fitness-tracker

```javascript
router.get("/api/workouts/range", (req, res) => {
    // this is called in stats.js, and the corresponding function is defined in api.js
    // sort by day, ascending, then return the data as JSON
    Workout.aggregate([{
        $set: {
            totalDuration: { $sum: "$exercises.duration" }
        }
    }]).sort({ day: 1 }).limit(7)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});
```