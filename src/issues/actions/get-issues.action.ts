import { GithubIssue } from "../interfaces";
import { fetchGithubData } from "./";

export const getIssues = async (): Promise<GithubIssue[]> => {
    return await fetchGithubData<GithubIssue>("/issues");
};
