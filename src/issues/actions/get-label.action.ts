import { GithubLabel } from "../interfaces";
import { fetchGithubData } from "./";

export const getLabels = async (): Promise<GithubLabel[]> => {
    return await fetchGithubData<GithubLabel>("/labels");
};
