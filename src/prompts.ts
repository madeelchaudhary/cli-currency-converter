import inquirer from "inquirer";
import supportedCurrencies from "./currencies.js";

async function askName() {
  const answers = await inquirer.prompt({
    name: "user_name",
    type: "input",
    message: "What is your name?",
    validate(input) {
      if (!input) {
        return "Name is invalid. Type it again!";
      }
      return true;
    },
  });
  return answers.user_name;
}

async function askOperation() {
  const answers = await inquirer.prompt({
    name: "userChoice",
    type: "list",
    message: "Select operation you want to perform.",
    choices: ["Standard Convert", "Pair Convert", "Help"],
  });
  return answers.userChoice;
}

async function askCurrency(
  currencies: typeof supportedCurrencies,
  customMessage: string
) {
  const answers = await inquirer.prompt({
    name: "currency",
    type: "rawlist",
    message: customMessage,
    choices: currencies.map((item) => ({
      name: item.name,
      value: item.code,
    })),
  });

  return answers.currency;
}

async function askAmount() {
  const answers = await inquirer.prompt({
    name: "amount",
    type: "number",
    message: "Enter the amount:",
    validate(input) {
      if (isNaN(input)) {
        return "Inavlid amount. Enter the amount again!";
      }
      return true;
    },
  });

  return answers.amount;
}

async function askToContinue() {
  const answers = await inquirer.prompt({
    name: "userChoice",
    type: "confirm",
    message: "\nDo you want to continue?",
  });
  if (answers.userChoice) {
    console.clear();
  }
  return answers.userChoice;
}

export { askName, askOperation, askCurrency, askAmount, askToContinue };
