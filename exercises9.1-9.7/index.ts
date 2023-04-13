import express from "express";
import calculateBmi from "./bmiCalculator"

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const [height, weight] = [req.query.height, req.query.weight].map(param => Number(param))
    
    if (!height || !weight || isNaN(Number(height + weight))) {
        res.status(400).json({
            error: "malformatted parameters",
            statusCode: 400
        })
    } else {
        const result = calculateBmi({height, weight})
        res.json({
            weight,
            height,
            bmi: result
        })
    }
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`)
})