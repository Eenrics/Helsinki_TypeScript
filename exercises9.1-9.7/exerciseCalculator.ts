interface ExercisesValues {
    dailyExercise: number[],
    target: number
}

const argumentParse = (args: string[]): ExercisesValues => {

    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) throw new Error('Provided values were not numbers!');
    }

    const target = Number(args[2])
    const dailyExercise = args.slice(3).map(exe => Number(exe))

    return { target, dailyExercise }
    
    }

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (): Result => {

    const {target, dailyExercise} = argumentParse(process.argv)

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

try {
    console.log(calculateExercises())
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }