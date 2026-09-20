use ocotkit to interact with github api


import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: accessToken,
});

const { data } = await octokit.rest.repos.listForAuthenticatedUser();

console.log(data);


get commits-
const { data } = await octokit.rest.repos.listCommits({
  owner: "torvalds",
  repo: "linux",
});

console.log(data);


get specific commits-
const { data } = await octokit.rest.repos.getCommit({
  owner: "torvalds",
  repo: "linux",
  ref: "COMMIT_SHA",
});

console.log(data);

You can also retrieve the files changed by that commit:
data.files.forEach(file => {
  console.log(file.filename);
  console.log(file.status);
  console.log(file.additions);
  console.log(file.deletions);
  console.log(file.patch);
});




exammple github user achema-
github User schema:  {
  login: 'Dev-Saurabh-K',
  id: 225661539,
  node_id: 'U_kgDODXNSYw',
  avatar_url: 'https://avatars.githubusercontent.com/u/225661539?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/Dev-Saurabh-K',
  html_url: 'https://github.com/Dev-Saurabh-K',
  followers_url: 'https://api.github.com/users/Dev-Saurabh-K/followers',
  following_url: 'https://api.github.com/users/Dev-Saurabh-K/following{/other_user}',
  gists_url: 'https://api.github.com/users/Dev-Saurabh-K/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/Dev-Saurabh-K/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/Dev-Saurabh-K/subscriptions',
  organizations_url: 'https://api.github.com/users/Dev-Saurabh-K/orgs',
  repos_url: 'https://api.github.com/users/Dev-Saurabh-K/repos',
  events_url: 'https://api.github.com/users/Dev-Saurabh-K/events{/privacy}',
  received_events_url: 'https://api.github.com/users/Dev-Saurabh-K/received_events',
  type: 'User',
  user_view_type: 'private',
  site_admin: false,
  name: 'Dev-Saurabh-K',
  company: null,
  blog: '',
  location: 'India',
  email: 'saurabhkumar.sakr@gmail.com',
  hireable: true,
  bio: 'MERN Stack Developer | Exploring Docker, CI/CD & GitHub Actions',
  twitter_username: null,
  notification_email: 'saurabhkumar.sakr@gmail.com',
  public_repos: 59,
  public_gists: 0,
  followers: 10,
  following: 8,
  created_at: '2025-08-10T07:29:15Z',
  updated_at: '2026-06-21T17:53:01Z',
  private_gists: 0,
  total_private_repos: 5,
  owned_private_repos: 5,
  disk_usage: 278959,
  collaborators: 3,
  two_factor_authentication: false,
  plan: {
    name: 'free',
    space: 976562499,
    collaborators: 0,
    private_repos: 10000
  }
}


id: id
name: name
email: email
github_access_token: 
avatar: avatar_url

