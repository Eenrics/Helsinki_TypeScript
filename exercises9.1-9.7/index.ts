import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const [height, weight] = [req.query.height, req.query.weight].map(param => Number(param));
    
    if (!height || !weight || isNaN(Number(height + weight))) {
        res.status(400).json({
            error: "malformatted parameters",
            statusCode: 400
        });
    } else {
        const result = calculateBmi({height, weight});
        res.json({
            weight,
            height,
            bmi: result
        });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (daily_exercises && daily_exercises instanceof Array && target) {
        const dailyExercise: number[] = daily_exercises.map(inp => Number(inp));

        console.log(NaN in dailyExercise);
        console.log(dailyExercise);
        if (dailyExercise.includes(NaN) || isNaN(Number(target))) {
            res.status(400).json({
                error: "malformatted parameters",
                statusCode: 400
            });
        } else {
            const result = calculateExercises({target: Number(target), dailyExercise});
            res.json(result);
        }

    } else {
        res.status(400).json({
            error: "parameters missing",
            statusCode: 400
        });
    }
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`);
});