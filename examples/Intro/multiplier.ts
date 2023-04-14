type Operation = 'multiply' | 'add' | 'divide';

type Item = number | string;

const multiplicator = (a: number, b: number, printText: Operation): void => {
    console.log(printText,  a * b);
};


interface MultiplyValues {
    value1: number;
    value2: number;
  }
  
  const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
  try {
    const { value1, value2 } = parseArguments(process.argv);
    multiplicator(value1, value2, `multiply`);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

const arr: Item[] = [1, 's', 'test', 6];

console.log(arr);

const calculator = (a: number, b: number, op: Operation) : number => {
    switch(op) {
      case 'multiply':
        return a * b;
      case 'divide':
        if (b === 0) throw new Error('Can\'t divide by 0!');
        return a / b;
      case 'add':
        return a + b;
      default:
        throw new Error('Operation is not multiply, add or divide!');
    }
  };
  
  try {
    const a = parseInt(process.argv[2]);
    const b = parseInt(process.argv[3]);

    console.log(calculator(a, b, 'divide'));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }