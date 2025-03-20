import { Octokit } from "@octokit/core";

const octokit = new Octokit();

export const getEssencesDataLastUpdatedDate = async () => {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: "mwskwong",
    repo: "shape-of-dreams-tool",
    path: "public/data/essences.json",
    page: 1,
    per_page: 1,
  });

  return (
    data[0].commit.committer?.date && new Date(data[0].commit.committer.date)
  );
};

export const getMemoriesDataLastUpdatedDate = async () => {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: "mwskwong",
    repo: "shape-of-dreams-tool",
    path: "public/data/memories.json",
    page: 1,
    per_page: 1,
  });

  return (
    data[0].commit.committer?.date && new Date(data[0].commit.committer.date)
  );
};
