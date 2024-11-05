import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../issues/actions/get-label.actions";
import { GithubLabel } from "../issues/interfaces/github-label.interface";

export const useLabels = () => {
    const labelsQuery = useQuery({
        queryKey: ["labels"],
        queryFn: getLabels,
        staleTime: 1000 * 60 * 60, // 1 hour
        placeholderData: [
            {
                id: 69105358,
                node_id: "MDU6TGFiZWw2OTEwNTM1OA==",
                url: "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
                name: "Browser: Safari",
                color: "c7def8",
                default: false,
                description: "",
            } satisfies GithubLabel,
            {
                id: 588833528,
                node_id: "MDU6TGFiZWw1ODg4MzM1Mjg=",
                url: "https://api.github.com/repos/facebook/react/labels/Difficulty:%20medium",
                name: "Difficulty: medium",
                color: "fbca04",
                default: false,
                description: "",
            } satisfies GithubLabel,
            {
                id: 6344006318,
                node_id: "LA_kwDOAJy2Ks8AAAABeiHarg",
                url: "https://api.github.com/repos/facebook/react/labels/fb-exported",
                name: "fb-exported",
                color: "ededed",
                default: false,
                description: "",
            } satisfies GithubLabel,
        ],
        // initialData: [
        //     {
        //         id: 69105358,
        //         node_id: "MDU6TGFiZWw2OTEwNTM1OA==",
        //         url: "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
        //         name: "Browser: Safari",
        //         color: "c7def8",
        //         default: false,
        //         description: "",
        //     } satisfies GithubLabel,
        //     {
        //         id: 588833528,
        //         node_id: "MDU6TGFiZWw1ODg4MzM1Mjg=",
        //         url: "https://api.github.com/repos/facebook/react/labels/Difficulty:%20medium",
        //         name: "Difficulty: medium",
        //         color: "fbca04",
        //         default: false,
        //         description: "",
        //     } satisfies GithubLabel,
        //     {
        //         id: 6344006318,
        //         node_id: "LA_kwDOAJy2Ks8AAAABeiHarg",
        //         url: "https://api.github.com/repos/facebook/react/labels/fb-exported",
        //         name: "fb-exported",
        //         color: "ededed",
        //         default: false,
        //         description: "",
        //     } satisfies GithubLabel,
        // ],
    });

    return {
        labelsQuery,
    };
};
