import { FC } from "react";
import { IssueItem } from "./";
import { GithubIssue, State } from "../interfaces";

interface IssueListProps {
    issues: GithubIssue[];
    selectedState: State;
    onStateChange: (state: State) => void;
}

const getActiveState = (selectedState: State, state: State) => {
    return selectedState === state ? "active" : "";
};

export const IssueList: FC<IssueListProps> = ({ issues, selectedState, onStateChange }) => {
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
        </>
    );
};
