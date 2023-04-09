
const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 74))