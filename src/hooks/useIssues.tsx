import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../issues/actions";
import { State } from "../issues/interfaces";

interface Props {
    state: State;
    selectedLabels: string[];
}

export const useIssues = ({ state, selectedLabels }: Props) => {
    const issuesQuery = useQuery({
        queryKey: ["issues", { state, selectedLabels }],
        queryFn: () => getIssues(state, selectedLabels),
        staleTime: 1000 * 60 * 60, // 1 hour
    });
    return {
        issuesQuery,
    };
};
