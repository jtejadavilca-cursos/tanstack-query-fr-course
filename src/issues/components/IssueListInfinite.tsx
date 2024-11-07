import { FC } from "react";
import { IssueItem } from ".";
import { GithubIssue, State } from "../interfaces";
import { useIssuesInfinite } from "../../hooks";
import { LoadingSpiner } from "../../shared/components";

interface IssueListProps {
    selectedState: State;
    selectedLabels: string[];
    onStateChange: (state: State) => void;
}

const getActiveState = (selectedState: State, state: State) => {
    return selectedState === state ? "active" : "";
};

export const IssueListInfinite: FC<IssueListProps> = ({ selectedState, selectedLabels, onStateChange }) => {
    const { issuesQuery /*, prefetchData*/ } = useIssuesInfinite({
        state: selectedState,
        selectedLabels,
    });
    const issues: GithubIssue[] = issuesQuery.data?.pages.flat() ?? [];

    if (issuesQuery.isLoading) {
        return <LoadingSpiner />;
    }

    return (
        <>
            {/* Botones de All, Open, Closed */}
            <div className="flex gap-4">
                <button
                    onClick={() => onStateChange(State.All)}
                    className={"btn " + getActiveState(selectedState, State.All)}
                >
                    All
                </button>
                <button
                    onClick={() => onStateChange(State.Open)}
                    className={"btn " + getActiveState(selectedState, State.Open)}
                >
                    Open
                </button>
                <button
                    onClick={() => onStateChange(State.Close)}
                    className={"btn " + getActiveState(selectedState, State.Close)}
                >
                    Closed
                </button>
            </div>

            {/* Lista de issues */}
            <div className="mt-4">
                {issues.map((issue) => (
                    <IssueItem key={issue.id} issue={issue} />
                ))}
            </div>

            <button
                onClick={() => issuesQuery.fetchNextPage()}
                disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
                className="bg-blue-500 rounded-md hover:bg-blue-700 transition-all text-white font-bold py-2 w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {issuesQuery.isFetchingNextPage ? "Cargando..." : "Cargar más..."}
            </button>
        </>
    );
};
