import { FiRefreshCcw } from "react-icons/fi";

export const LoadingSpiner = () => {
    return (
        <div className="loading">
            <div className="flex w-full h-52 justify-center items-center">
                <FiRefreshCcw size={32} className="animate-spin" />
            </div>
        </div>
    );
};
