const simpleGit = require("simple-git");

module.exports = async function gatherMetrics(repoPath) {
  const git = simpleGit(repoPath);

  const packages = (
    await git.raw(["ls-tree", "--name-only", "HEAD:packages"])
  ).split("\n");
  const contributors = new Map();

  for (const pkg of packages) {
    const output = await git.raw([
      "shortlog",
      "-s",
      "HEAD",
      `packages/${pkg}`,
    ]);
    const packageContributors = output.split("\n");

    for (const contributor of packageContributors) {
      if (!contributors.has(contributor)) {
        contributors.set(contributor, new Set());
      }
      contributors.get(contributor).add(pkg);
    }
  }

  let count = 0;
  for (const [contributor, projects] of contributors) {
    if (projects.size > 1) {
      count++;
    }
  }

  return count;
};
