import { FC } from "react";
import { useLabels } from "../../hooks/useLabels";
import { LoadingSpiner } from "../../shared/components/LoadingSpiner";

interface Props {
    selectedLabels: string[];
    onLabelSelected: (label: string) => void;
}

const checkIfSelected = (label: string, selectedLabels: string[]) => {
    return selectedLabels.includes(label) ? "selected-label" : "";
};

export const LabelPicker: FC<Props> = ({ selectedLabels, onLabelSelected }) => {
    const { labelsQuery } = useLabels();

    if (labelsQuery.isLoading) {
        return (
            <div className="flex justify-center items-center h-52">
                <LoadingSpiner />
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {labelsQuery.data?.map((label) => (
                <span
                    key={label.id}
                    onClick={() => onLabelSelected(label.name)}
                    className={`animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-green-400 cursor-pointer text-white ${checkIfSelected(
                        label.name,
                        selectedLabels
                    )}`}
                    style={{ border: `1px solid #${label.color}` }}
                >
                    {label.name}
                </span>
            ))}
        </div>
    );
};
