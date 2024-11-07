import { GithubIssue, State } from "../interfaces";
import { fetchGithubData } from "./";

export const getIssues = async (state: State, selectedLabels: string[], page: number): Promise<GithubIssue[]> => {
    const params = new URLSearchParams();
    if (state !== State.All) {
        params.append("state", state);
    }

    if (selectedLabels.length > 0) {
        params.append("labels", selectedLabels.join(","));
    }

    params.append("page", page.toString());
    params.append("per_page", "5");

    return await fetchGithubData<GithubIssue>("/issues", params);
};
