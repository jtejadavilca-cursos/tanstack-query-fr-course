import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../issues/actions";
import { State } from "../issues/interfaces";

interface Props {
    state: State;
    selectedLabels: string[];
}

export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {
    const issuesQuery = useInfiniteQuery({
        queryKey: ["issues", "infinite", { state, selectedLabels }],
        queryFn: ({ pageParam, queryKey }) => {
            const [, , args] = queryKey;
            const { state, selectedLabels } = args as Props;

            return getIssues(state, selectedLabels, pageParam);
        },
        staleTime: 1000 * 60, // 1 hour
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => (lastPage.length > 0 ? pages.length + 1 : undefined),
    });

    // const queryClient = useQueryClient();
    // const prefetchData = (page: number) => {
    //     console.log("currentPage", currentPage, "page", page);
    //     if ((currentPage === 1 && page === -1) || issuesQuery.isFetching) return;

    //     queryClient.prefetchQuery({
    //         queryKey: ["issues", { state, selectedLabels, page: currentPage + page }],
    //         queryFn: () => getIssues(state, selectedLabels, currentPage + page),
    //         staleTime: 1000 * 60 * 60, // 1 hour
    //     });
    // };

    return {
        issuesQuery,
    };
};
