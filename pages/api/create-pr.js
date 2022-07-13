const { Octokit } = require('@octokit/core');
const { createAppAuth } = require('@octokit/auth-app');
const { createPullRequest } = require('octokit-plugin-create-pull-request');

const MyOctokit = Octokit.plugin(createPullRequest);

// create token at https://github.com/settings/tokens/new?scopes=repo
// TODO - Get this token via signing in and passing the auth token to the api
const TOKEN = process.env.GITHUB_AUTO_PR_TOKEN;

const initGithubClient = (token) => {
  const octokit = new MyOctokit({
    auth: TOKEN
  });

  return octokit;
};

const octokit = initGithubClient(TOKEN);

const createPR = (octokit, { title, files }) => {
  // Returns a normal Octokit PR response
  // See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
  return octokit.createPullRequest({
    owner: 'markdoc',
    repo: 'docs',
    title,
    body: 'Automatically created this PR!',
    head: 'matv/autopr',
    base: 'main' /* optional: defaults to default branch */,
    update: false /* optional: set to `true` to enable updating existing pull requests */,
    forceFork: false /* optional: force creating fork even when user has write rights */,
    changes: [
      {
        files,
        commit: 'generated via markdoc docs API'
      }
    ]
  });
};

export default async function handler(req, res) {
  const rawFiles = req.body.files;

  const files = {};

  const title = '[created from editor] Update ' + Object.keys(rawFiles);

  Object.entries(rawFiles).forEach(([file, content]) => {
    if (file.startsWith('/docs') && file.endsWith('.md')) {
      files[`pages${file}`] = content;
    }
  });

  try {
    const result = await createPR(octokit, { title, files });

    return res.status(200).json(result.data.number);
  } catch (err) {
    return res.status(500).json({ err });
  }
}
