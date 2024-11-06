import { FC } from "react";
import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GithubIssue } from "../interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../actions";

interface IssueItemProps {
    issue: GithubIssue;
}

export const IssueItem: FC<IssueItemProps> = ({ issue }) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const prefetchData = () => {
        queryClient.prefetchQuery({
            queryKey: ["issues", issue.number],
            queryFn: () => getIssue(issue.number),
            staleTime: 1000 * 60, // 1 minute
        });

        queryClient.prefetchQuery({
            queryKey: ["issues", issue.number, "comments"],
            queryFn: () => getIssueComments(issue.number),
            staleTime: 1000 * 60, // 1 minute
        });
    };

    return (
        <div
            onMouseOver={prefetchData}
            className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
        >
            {issue.state === "open" ? (
                <FiInfo size={30} color="red" className="min-w-10" />
            ) : (
                <FiCheckCircle size={30} color="green" />
            )}

            <div className="flex flex-col flex-grow px-2">
                <a onClick={() => navigate(`/issues/issue/${issue.number}`)} className="hover:underline">
                    {issue.title}
                </a>
                <span className="text-gray-500">
                    #{issue.number} opened 2 days ago by <span className="font-bold">{issue?.user?.login}</span>
                </span>
            </div>

            <img src={issue?.user?.avatar_url} alt="User Avatar" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col mx-2 items-center">
                <FiMessageSquare size={30} className="min-w-5" color="gray" />
                <span className="px-4 text-gray-400">{issue.comments}</span>
            </div>
        </div>
    );
};
