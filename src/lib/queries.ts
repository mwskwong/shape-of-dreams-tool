import { Octokit } from "@octokit/core";
import { unstable_cacheLife as cacheLife } from "next/cache";

const octokit = new Octokit();

export const getEssencesDataLastUpdatedDate = async () => {
  "use cache";
  cacheLife("days");

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
  "use cache";
  cacheLife("days");

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
