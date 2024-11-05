import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers/sleep";
import { GithubLabel } from "../interfaces/github-label.interface";

export const getLabels = async (): Promise<GithubLabel[]> => {
    await sleep(1500);
    //const response = await fetch(`${API_URL}/labels`).then((r) => r.json());
    const { data } = await githubApi.get<GithubLabel[]>(`/labels`);
    console.log(data);
    return data;
};
