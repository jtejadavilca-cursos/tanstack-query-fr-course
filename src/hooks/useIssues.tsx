import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "../issues/actions";
import { State } from "../issues/interfaces";
import { useState } from "react";

interface Props {
    state: State;
    selectedLabels: string[];
}

export const useIssues = ({ state, selectedLabels }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const issuesQuery = useQuery({
        queryKey: ["issues", { state, selectedLabels, page: currentPage }],
        queryFn: () => getIssues(state, selectedLabels, currentPage),
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    const queryClient = useQueryClient();
    const prefetchData = (page: number) => {
        console.log("currentPage", currentPage, "page", page);
        if ((currentPage === 1 && page === -1) || issuesQuery.isFetching) return;

        queryClient.prefetchQuery({
            queryKey: ["issues", { state, selectedLabels, page: currentPage + page }],
            queryFn: () => getIssues(state, selectedLabels, currentPage + page),
            staleTime: 1000 * 60 * 60, // 1 hour
        });
    };

    const nextPage = () => {
        if (issuesQuery.data?.length === 0) return;
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const resetPage = () => {
        setCurrentPage(1);
    };

    return {
        issuesQuery,
        currentPage,

        resetPage,
        prefetchData,
        nextPage,
        previousPage,
    };
};
