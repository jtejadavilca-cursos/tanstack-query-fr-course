import { useState } from "react";
import { useIssues } from "../../hooks";
import { LoadingSpiner } from "../../shared/components";
import { IssueList, LabelPicker } from "../components";
import { State } from "../interfaces";

export const ListView = () => {
    const [state, setState] = useState<State>(State.All);
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    const { issuesQuery, currentPage, nextPage, previousPage, prefetchData, resetPage } = useIssues({
        state,
        selectedLabels,
    });

    const issues = issuesQuery.data ?? [];

    const onLabelSelected = (label: string) => {
        if (selectedLabels.includes(label)) {
            setSelectedLabels(selectedLabels.filter((l) => l !== label));
        } else {
            setSelectedLabels([...selectedLabels, label]);
        }
        resetPage();
    };

    const handleStageChange = (state: State) => {
        setState(state);
        resetPage();
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
            <div className="col-span-1 sm:col-span-2">
                {issuesQuery.isLoading ? (
                    <LoadingSpiner />
                ) : (
                    <>
                        <IssueList issues={issues} onStateChange={handleStageChange} selectedState={state} />
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
                )}
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
