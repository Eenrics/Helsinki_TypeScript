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
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

const calculateBmi = (): string => {

    const { height, weight } = argumentParser(process.argv)

    const bmi = weight / (height / 100) ** 2;
    if (bmi < 18.5) {
        return `Underweight (unhealthy weight: ${bmi})`;
    } else if (bmi < 25) {
        return `Normal (healthy weight: ${bmi})`;
    } else if (bmi < 30) {
        return `Overweight (unhealthy weight: ${bmi})`;
    } else {
        return `Obese (unhealthy weight: ${bmi})`;
    }
};

console.log(calculateBmi())