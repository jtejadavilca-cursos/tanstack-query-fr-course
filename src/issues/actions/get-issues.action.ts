import { GithubIssue, State } from "../interfaces";
import { fetchGithubData } from "./";

export const getIssues = async (state: State, selectedLabels: string[]): Promise<GithubIssue[]> => {
    const params = new URLSearchParams();
    if (state !== State.All) {
        params.append("state", state);
    }

    if (selectedLabels.length > 0) {
        params.append("labels", selectedLabels.join(","));
    }

    return await fetchGithubData<GithubIssue>("/issues", params);
};
