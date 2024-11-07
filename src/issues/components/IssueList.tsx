import { FC } from "react";
import { IssueItem } from "./";
import { GithubIssue, State } from "../interfaces";
import { useIssues } from "../../hooks";
import { LoadingSpiner } from "../../shared/components";

interface IssueListProps {
    selectedState: State;
    selectedLabels: string[];
    onStateChange: (state: State) => void;
}

const getActiveState = (selectedState: State, state: State) => {
    return selectedState === state ? "active" : "";
};

export const IssueList: FC<IssueListProps> = ({ selectedState, selectedLabels, onStateChange }) => {
    const { issuesQuery, currentPage, nextPage, previousPage, prefetchData, resetPage } = useIssues({
        state: selectedState,
        selectedLabels,
    });
    const issues: GithubIssue[] = issuesQuery.data ?? [];

    if (issuesQuery.isLoading) {
        return <LoadingSpiner />;
    }

    const handleChageState = (state: State) => {
        resetPage();
        onStateChange(state);
    };

    return (
        <>
            {/* Botones de All, Open, Closed */}
            <div className="flex gap-4">
                <button
                    onClick={() => handleChageState(State.All)}
                    className={"btn " + getActiveState(selectedState, State.All)}
                >
                    All
                </button>
                <button
                    onClick={() => handleChageState(State.Open)}
                    className={"btn " + getActiveState(selectedState, State.Open)}
                >
                    Open
                </button>
                <button
                    onClick={() => handleChageState(State.Close)}
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

            <div className="flex justify-between items-center">
                <button
                    className="bg-blue-500 rounded-md hover:bg-blue-700 transition-all text-white font-bold py-2 px-4"
                    disabled={currentPage === 1}
                    onClick={previousPage}
                    onMouseMove={() => prefetchData(-1)}
                >
                    Anteriores
                </button>
                <span>{currentPage}</span>
                <button
                    className="bg-blue-500 rounded-md hover:bg-blue-700 transition-all text-white font-bold py-2 px-4"
                    onClick={nextPage}
                    onMouseMove={() => prefetchData(1)}
                >
                    Siguientes
                </button>
            </div>
        </>
    );
};
