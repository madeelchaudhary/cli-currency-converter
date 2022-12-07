import chalk from "chalk";
import chalkAnimation from "chalk-animation";

import { getAString, sleep } from "./utils.js";

async function welcome(userName: string) {
  const beautifyStr = getAString(60, "*");
  const rainbowTitle = chalkAnimation.rainbow(
    `\n${beautifyStr}
                  Hello, ${userName.toUpperCase()}!
       Get the latest exchange rates on your CLI!\n${beautifyStr}\n`
  );

  rainbowTitle.start();
  await sleep();
  rainbowTitle.stop();
}

async function closingMessage() {
  const karaokeTitle = chalkAnimation.karaoke("See you again!");
  karaokeTitle.start();
  await sleep();
  karaokeTitle.stop();
}

const logError = (error: unknown | any) => {
  console.log(`${chalk.bold.red(chalk.bgWhite(error))}\n`);
};

const logNote = (note: string) => {
  console.log(`\n${chalk.bold.cyan(chalk.bgWhite(note))}\n`);
};

const logHelp = () => {
  const standardConversion = `Choose your base currency and get the conversion rates from your base currency to all the others currencies.`;
  const pairConversion = `Choose your base currency and the target currency you'd like to get the exchange rate for. And amount you want to exhange.`;

  logNote(
    `Standard Convert:\n\t${standardConversion}\nPair Convert:\n\t${pairConversion}`
  );
};
export { welcome, closingMessage, logError, logNote, logHelp };
