#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const { execSync } = require("child_process");
const cliProgress = require('cli-progress');

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("ARIG :: CAD Projects")
    )
  );
}

const askQuestions = () => {
  const questions = [
    {
      name: "COMMAND",
      type: "list",
      message: "What is the command to apply ?",
      choices: ["show", "lock", "unlock"]
    },
    {
      name: "DIRNAME",
      type: "list",
      message: "What is the name of the directory ?",
      choices: ["nerell_2021", "elfa_2021", "eurobot_2019", "eurobot_2020", "eurobot_2021", "vision_balise", "vision_central"],
      when: (answers) => {
        if (answers.COMMAND == "show") {
          return false;
        }
        return true;
      }
    }
  ];
  return inquirer.prompt(questions);
};

const success = () => {
  console.log(
    chalk.white.bgGreen.bold(`Done!`)
  );
};

const error = () => {
  console.log(
    chalk.white.bgRed.bold(`ERROR!`)
  );
};

const run = async () => {
  // show script introduction
  init();

  // ask questions
  const answers = await askQuestions();
  const { COMMAND, DIRNAME } = answers;

  // Show locks
  if (COMMAND === "show") {
    console.log(execSync("git lfs locks").toString());
    success();
    return;
  }

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  let files = gitfiles(DIRNAME);
  bar.start(files.length - 1, 0, { speed: "N/A" });
  files.forEach((file, idx) => {
    try {
        execSync(`git lfs ${COMMAND} "${file}"`);
    } catch (error) {
      // NOP
    }
    bar.update(idx);
  });
  bar.stop();
  success();

};

const gitfiles = (dirName) => {
  const cmd = `git lfs ls-files | grep ${dirName}/ | cut -d '*' -f2`;
  const out = execSync(cmd).toString();
  return out.split("\n").map(f => f.trim());
}

run();
