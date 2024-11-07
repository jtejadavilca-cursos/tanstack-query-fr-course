import { useState } from "react";
import { IssueListInfinite, LabelPicker } from "../components";
import { State } from "../interfaces";

export const ListViewInfinite = () => {
    const [state, setState] = useState<State>(State.All);
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

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
                <IssueListInfinite selectedLabels={selectedLabels} onStateChange={setState} selectedState={state} />
            </div>

            <div className="col-span-1 px-2">
                <span style={{ visibility: selectedLabels.length > 0 ? "visible" : "hidden" }}>
                    Selected labels ({selectedLabels.length})
                </span>
                <LabelPicker onLabelSelected={onLabelSelected} selectedLabels={selectedLabels} />
            </div>
        </div>
    );
};
