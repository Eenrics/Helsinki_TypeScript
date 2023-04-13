interface BMIValues {
    height: number,
    weight: number
}

const argumentParser = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

const calculateBmi = (params?: BMIValues): string => {

    const { height, weight } = !params ? argumentParser(process.argv) : params;

    const bmi = weight / (height / 100) ** 2;
    if (bmi < 18.5) {
        return `Underweight (unhealthy weight: ${bmi.toFixed(2)})`;
    } else if (bmi < 25) {
        return `Normal (healthy weight: ${bmi.toFixed(2)})`;
    } else if (bmi < 30) {
        return `Overweight (unhealthy weight: ${bmi.toFixed(2)})`;
    } else {
        return `Obese (unhealthy weight: ${bmi.toFixed(2)})`;
    }
};

try {
    console.log(calculateBmi());
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }

export default calculateBmi;