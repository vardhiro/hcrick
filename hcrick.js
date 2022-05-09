#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let playerName,
   runs = {
      comp: 0,
      user: 0,
   },
   userStat = {
      batting: {
         current: false,
         done: false,
      },
      bowling: {
         current: false,
         done: false,
      },
   };

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const nextLine = () => console.log("\n");

async function welcome() {
   const rainbowTitle = chalkAnimation.neon("Welcome to Hand Cricket!");
   await sleep();
   rainbowTitle.stop();

   nextLine();
   console.log(`  ${chalk.bgBlue("HOW TO PLAY")}\n`);
   console.log(`  > At first, enter your ${chalk.bgBlueBright("NAME")}.`);
   console.log(
      `  > Then you have to chose ${chalk.bgYellowBright.black(
         "HEAD"
      )} or ${chalk.bgYellowBright.bgRed("TAIL")}.`
   );
   console.log(
      `  > If you win the toss, you get to choose either ${chalk.bgGreen(
         "BAT"
      )} or ${chalk.bgMagentaBright("BALL")} else the computer chooses to bat.`
   );
   console.log(
      `  > As you get ${chalk.bgRed(
         "OUT"
      )}, you get to bat if you haven't and vice-versa`
   );
   console.log(
      `  > At last, the one who has the more runs ${chalk.bgGreenBright(
         "WINS"
      )}.`
   );
   nextLine();
}

await welcome();

async function askName() {
   const answers = await inquirer.prompt({
      name: "player_name",
      type: "input",
      message: "What is your name?",
      default() {
         return "Player";
      },
   });

   playerName = answers.player_name;
}

await askName();

async function handleToss(tossChoice) {
   const spinner = createSpinner("Flipping the coin...").start();
   const tossAnswer = ["HEAD", "TAIL"].at(Math.round(Math.random()));
   await sleep();

   const tossWon = tossChoice === tossAnswer;

   if (tossWon) {
      console.clear();
      spinner.success({
         text: chalk.green(
            `Congratulations ${playerName}! You have won the toss.`
         ),
      });
   } else {
      nextLine();
      spinner.error({
         text: chalk.redBright(`Sorry, you have lost the toss, ${playerName}.`),
      });
      await sleep();
      console.clear();
      spinner.success({ text: chalk.green(`The match has started!`) });
      console.log(chalk.magentaBright("The computer has chosen to bat."));
      nextLine();
   }

   await chooseMode(tossWon);
}

async function handleChoosingMode(mode) {
   const spinner = createSpinner(`Choosing ${mode}...`).start();
   await sleep(1000);
   userStat.batting.current = mode === "BAT";

   await sleep();
   console.clear();
   spinner.success({ text: chalk.green(`The match has started!`) });

   if (userStat.batting.current) {
      await handleBatting();
   } else {
      userStat.bowling.current = true;
      await handleBowling();
   }
}

async function handleAnswer(isMatched) {
   const spinner = createSpinner("Analyzing...").start();
   await sleep();

   if (isMatched) {
      nextLine();
      spinner.error({
         text: chalk.redBright(`Sorry ${playerName}, you're out.`),
      });
   } else {
      nextLine();
      spinner.success({
         text: chalk.green(`You've scored ${runs} runs, ${playerName}!`),
      });
   }
}

async function toss() {
   const answers = await inquirer.prompt({
      name: "toss",
      type: "list",
      message: "HEAD or TELL?",
      choices: ["HEAD", "TAIL"],
   });

   return handleToss(answers.toss);
}

await toss();

async function chooseMode(tossWon) {
   if (!tossWon) {
      userStat.bowling.current = true;
      await handleBowling();
   }
   const answers = await inquirer.prompt({
      name: "mode",
      type: "list",
      message: "BAT or BALL?",
      choices: ["BAT", "BALL"],
   });
   return handleChoosingMode(answers.mode);
}

async function handleBatting() {
   console.log(chalk.greenBright(`You're batting now, ${playerName}!`));
   while (userStat.batting.current) {
      const answers = await inquirer.prompt({
         name: "runs",
         type: "list",
         message: "Enter your runs",
         choices: [1, 2, 3, 4, 5, 6],
      });

      await sleep(300);
      const spinner = createSpinner("Batting...").start();
      await sleep();

      const compRuns = Math.floor(Math.random() * (6 - 1) + 1);
      if (answers.runs !== compRuns) {
         spinner.success({
            text: chalk.green(
               `You've scored ${answers.runs} runs, ${playerName}!`
            ),
         });
         runs.user += answers.runs;
      } else {
         spinner.error({ text: chalk.redBright(`You're Out, ${playerName}!`) });
         userStat.batting.current = false;
         userStat.batting.done = true;
      }
      console.log(
         chalk.bgYellowBright.black(
            `${playerName}'s total runs =  ${runs.user}.\n\nComputer's total runs = ${runs.comp}.`
         )
      );
      await sleep(5000);
      console.clear();
   }
   if (!userStat.bowling.done) {
      userStat.bowling.current = true;
      await handleBowling();
   } else {
      await gameOver();
   }
}

async function handleBowling() {
   console.log(chalk.greenBright(`You're bowling now, ${playerName}!`));
   while (userStat.bowling.current) {
      const answers = await inquirer.prompt({
         name: "runs",
         type: "list",
         message: "Enter your runs",
         choices: [1, 2, 3, 4, 5, 6],
      });

      await sleep(300);
      const spinner = createSpinner("Bowling...").start();
      await sleep();

      const compRuns = Math.floor(Math.random() * (6 - 1) + 1);
      if (answers.runs === compRuns) {
         spinner.success({
            text: chalk.green(`Howzat!`),
         });
         userStat.bowling.current = false;
         userStat.bowling.done = true;
      } else {
         runs.comp += compRuns;
         spinner.error({
            text: chalk.redBright(`The computer has scored ${compRuns}`),
         });
      }
      console.log(
         chalk.bgYellowBright.black(
            `${playerName}'s total runs =  ${runs.user}.\n\nComputer's total runs = ${runs.comp}`
         )
      );
      await sleep(5000);
      console.clear();
   }
   if (!userStat.batting.done) {
      userStat.batting.current = true;
      await handleBatting();
   } else {
      await gameOver();
   }
}

async function gameOver() {
   const spinner = createSpinner("Analyzing the result...").start();
   await sleep();

   if (runs.user > runs.comp) {
      spinner.success({
         text: chalk.green(
            `Congratulations ${playerName}, you've won by a difference of ${
               runs.user - runs.comp
            } runs!`
         ),
      });
      await sleep(3000);
      process.exit(1);
   } else if (runs.user < runs.comp) {
      spinner.error({
         text: chalk.redBright(
            `Sorry ${playerName}, you've lost by a difference of ${
               runs.comp - runs.user
            } runs. Better luck next time!`
         ),
      });
      await sleep(3000);
      process.exit(1);
   } else if (runs.user === runs.comp) {
      spinner.warn("It's a Draw!");
   }
}
