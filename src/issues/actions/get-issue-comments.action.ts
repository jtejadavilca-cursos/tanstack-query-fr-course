import { GithubIssueComment } from "../interfaces";
import { fetchGithubData } from "./";

export const getIssueComments = async (issueNumber: number): Promise<GithubIssueComment[]> => {
    return await fetchGithubData<GithubIssueComment>(`/issues/${issueNumber}/comments`);
};
