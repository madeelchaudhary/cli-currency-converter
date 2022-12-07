#! /usr/bin/env node
import currencies from "./src/currencies.js";
import { createSpinner } from "nanospinner";
import { pairConvert, standardConvert } from "./src/exchange.js";
import { logError, welcome, closingMessage, logHelp, logNote, } from "./src/logs.js";
import { askAmount, askCurrency, askName, askOperation, askToContinue, } from "./src/prompts.js";
let userName;
async function startGame() {
    do {
        const userChosenOperation = await askOperation();
        if (userChosenOperation === "Help") {
            logHelp();
        }
        else if (userChosenOperation === "Standard Convert") {
            const userChosenCurrency = await askCurrency(currencies, "Select the base currency.");
            const spinner = createSpinner();
            spinner.start({ text: "Hold On! We are getting exchange rates." });
            const exchangeRates = await standardConvert(userChosenCurrency);
            if (exchangeRates) {
                spinner.success({ text: "Succeed" });
                console.log(exchangeRates);
            }
            else {
                spinner.error({ text: "something went wrong!" });
            }
        }
        else if (userChosenOperation === "Pair Convert") {
            const userChosenBaseCurrency = await askCurrency(currencies, "Select the base currency.");
            const userChosenTargetCurrency = await askCurrency(currencies, "Select the target currency.");
            const amountToExchange = await askAmount();
            const spinner = createSpinner();
            spinner.start({ text: "Hold On! We are converting." });
            const exchangedAmount = await pairConvert(userChosenBaseCurrency, userChosenTargetCurrency, amountToExchange);
            if (exchangedAmount) {
                spinner.success({ text: "Succeed" });
                logNote(`${amountToExchange} ${userChosenBaseCurrency} = ${exchangedAmount} ${userChosenTargetCurrency}`);
            }
            else {
                spinner.error({ text: "something went wrong!" });
            }
        }
        else {
            logError("Inavlid Selection!");
        }
    } while (await askToContinue());
    closingMessage();
}
userName = await askName();
await welcome(userName);
startGame();
// 3a655eb75292bb16b2cf4329 exhange api
// site https://www.exchangerate-api.com/
// jemiyir865@cnogs.com mail
