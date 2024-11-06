import { githubApi } from "../../api";
import { sleep } from "../../helpers";

export const fetchGithubDataSingle = async <T>(endpoint: string): Promise<T> => {
    await sleep(1500);
    const { data } = await githubApi.get<T>(endpoint);

    return data;
};

export const fetchGithubData = async <T>(endpoint: string): Promise<T[]> => {
    await sleep(1500);
    const { data } = await githubApi.get<T[]>(endpoint);

    return data;
};
