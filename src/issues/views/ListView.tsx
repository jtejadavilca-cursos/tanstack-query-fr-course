import { useState } from "react";
import { useIssues } from "../../hooks";
import { LoadingSpiner } from "../../shared/components";
import { IssueList, LabelPicker } from "../components";
import { State } from "../interfaces";

export const ListView = () => {
    const [state, setState] = useState<State>(State.All);
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    const { issuesQuery } = useIssues({ state, selectedLabels });

    const issues = issuesQuery.data ?? [];

    const onLabelSelected = (label: string) => {
        if (selectedLabels.includes(label)) {
            setSelectedLabels(selectedLabels.filter((l) => l !== label));
        } else {
            setSelectedLabels([...selectedLabels, label]);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
            <div className="col-span-1 sm:col-span-2">
                {issuesQuery.isLoading ? (
                    <LoadingSpiner />
                ) : (
                    <IssueList issues={issues} onStateChange={setState} selectedState={state} />
                )}
            </div>

            <div className="col-span-1 px-2">
                <LabelPicker onLabelSelected={onLabelSelected} selectedLabels={selectedLabels} />
            </div>
        </div>
    );
};
