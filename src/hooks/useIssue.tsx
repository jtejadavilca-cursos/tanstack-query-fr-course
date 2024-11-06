import { useQuery } from "@tanstack/react-query";
import { getIssue } from "../issues/actions";
import { getIssueComments } from "../issues/actions";

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery({
        queryKey: ["issues", issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    // const commentsQuery = useQuery({
    //     queryKey: ["issues", issueNumber, "comments"],
    //     queryFn: () => getIssueComments(issueNumber),
    //     staleTime: 1000 * 60 * 60, // 1 hour
    // });

    const commentsQuery = useQuery({
        queryKey: ["issues", issueQuery.data?.number, "comments"],
        queryFn: () => getIssueComments(issueQuery.data!.number),
        staleTime: 1000 * 60 * 60, // 1 hour
        enabled: !!issueQuery.data,
    });

    return {
        issueQuery,
        commentsQuery,
    };
};
