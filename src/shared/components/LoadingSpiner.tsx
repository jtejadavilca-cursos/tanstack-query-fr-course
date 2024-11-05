import { FiRefreshCcw } from "react-icons/fi";

export const LoadingSpiner = () => {
    return (
        <div className="loading">
            <div className="animate-spin">
                <FiRefreshCcw size={32} />
            </div>
        </div>
    );
};
