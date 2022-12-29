const fs = require('fs')
const path = require('path')
const { createImportSpecifier } = require('typescript')

module.exports = async function updateReadme(metric, repopath) {
  // Read the contents of the README.md file
  const readmePath = `${repopath}/README.md`
  console.log(readmePath)
  if (!fs.existsSync(readmePath)) await fs.openSync(readmePath, 'w')
  
  const readme = await fs.readFileSync(readmePath, "utf8");

  // Define the regex pattern to match the metrics section in the file
  const pattern = /## Metrics\n\n.*/g;

  // Check if the pattern matches the file contents
  if (pattern.test(readme)) {
    const updatedReadme = readme.replace(
      pattern,
      `## Metrics\n\nNumber of contributors that have made commits to multiple projects: ${metric}`
    );
    // Write the updated contents to the README.md file
    await fs.writeFileSync ("README.md", updatedReadme);
  } else {
    await fs.appendFileSync(
      "README.md",
      `\n\n## Metrics\n\nNumber of contributors that have made commits to multiple projects: ${metric}`
    );
  }
}
