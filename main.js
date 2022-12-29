const inquirer = require("inquirer");
const path = require('path')
const gatherMetrics = require("./metrics");
const updateReadme = require("./writer");

async function main() {
  // Prompt the user for the path to the repository
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "repoPath",
      message: "Enter the path to the repository:",
    },
  ]);

  const repoPath = path.join(__dirname, answers.repoPath)
  // Call the gatherMetrics function with the user-specified repository path
  const metric = await gatherMetrics(repoPath);

  // Update the README.md file with the metrics
  await updateReadme(metric, repoPath);

  console.log(
    `Number of contributors that have made commits to multiple projects: ${metric}`
  );
}

main();
