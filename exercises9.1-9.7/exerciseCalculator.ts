interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyExercise: number[], target: number): Result => {

    interface Rating {
        rating: number,
        ratingDescription: string,
        success: boolean
    }

    const rateExercies = (avr: number, trg: number): Rating => {
        let rating, ratingDescription, success

        if (avr < trg) {
            ratingDescription = "not too bad but could be better"
            rating = 1
            success = false
        } else if (avr === trg) {
            ratingDescription = "you rocked it and keep it up"
            rating = 2
            success = true
        } else {
            ratingDescription = "you are a star"
            rating = 3
            success = true
        }

        return {rating, ratingDescription, success}
    }

    const periodLength = dailyExercise.length
    const trainingDays = dailyExercise.filter(ex => ex > 0).length
    const average = dailyExercise.reduce((ac, ex) => (ac + ex)) / 7
    const {rating, ratingDescription, success} = rateExercies(average, target)

    return {
        periodLength,
        trainingDays,
        success,
        average,
        rating,
        ratingDescription,
        target,
    }

}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))