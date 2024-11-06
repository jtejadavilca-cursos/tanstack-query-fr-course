import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FiSkipBack } from "react-icons/fi";
import { IssueComment } from "../components";
import { useIssue } from "../../hooks/useIssue";

export const IssueView = () => {
    const navigate = useNavigate();

    // get issue id from url
    const { issueNumber } = useParams();

    const { issueQuery, commentsQuery } = useIssue(Number(issueNumber) || 0);

    if (issueQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (!issueQuery.data) {
        return <Navigate to="/404" />;
    }

    return (
        <div className="mb-5">
            <div className="mb-4">
                <button onClick={() => navigate(-1)} className="hover:underline text-blue-400 flex items-center">
                    <FiSkipBack />
                    Regresar
                </button>
            </div>
            <IssueComment key={issueQuery.data.id} issueComment={issueQuery.data} />

            {/* Primer comentario */}
            {commentsQuery?.data?.map((comment) => (
                <IssueComment key={comment.id} issueComment={comment} />
            ))}
            {/* <IssueComment body={comment1} /> */}

            {/* Comentario de otros */}
            {/* <IssueComment body={comment2} />
            <IssueComment body={comment3} /> */}
        </div>
    );
};
