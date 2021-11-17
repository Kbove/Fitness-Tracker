const router = require("express").Router();
const Workout = require("../models/Workout")

router.get("/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                }
            }
        }
    ])
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err)
    })
})

router.post("/workouts", (req, res) => {
    Workout.create({
        day:new Date()
    })
    .then((data) => res.json(data))
    .catch((err) => {
        console.log('api/workouts err:', err)
    })
})

router.put("/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        {$push: {exercises: req.body} },
        {new: true, runValidators: true} 
    )
    .then((dbWorkout) => {
        res.json(dbWorkout)
    })
    .catch((err) => {
        res.json(err)
    })
});

router.get("/workouts/range", (req,res) => {
    Workout.aggregate([
        {
        $addFields: {
            totalDuration: {
                $sum: `$exercises.duration`,
            },
        },
    },
    ])
    .sort({ _id: -1})
    .limit(7)
    .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout)
    })
    .catch((err) =>{
        console.log(err)
    })
})

module.exports = router