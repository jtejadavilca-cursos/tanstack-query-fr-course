import { GithubIssue } from "../interfaces";
import { fetchGithubDataSingle } from ".";

export const getIssue = async (issueNumber: number): Promise<GithubIssue> => {
    console.log("issueNumber", issueNumber);
    const data = await fetchGithubDataSingle<GithubIssue>(`/issues/${issueNumber}`);

    console.log("data", data);

    return data;
};
