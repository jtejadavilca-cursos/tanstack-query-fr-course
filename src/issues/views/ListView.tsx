import { useIssues } from "../../hooks";
import { LoadingSpiner } from "../../shared/components";
import { IssueList, LabelPicker } from "../components";

export const ListView = () => {
    const { issuesQuery } = useIssues();

    const issues = issuesQuery.data ?? [];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
            <div className="col-span-1 sm:col-span-2">
                {issuesQuery.isLoading ? <LoadingSpiner /> : <IssueList issues={issues} />}
            </div>

            <div className="col-span-1 px-2">
                <LabelPicker />
            </div>
        </div>
    );
};
