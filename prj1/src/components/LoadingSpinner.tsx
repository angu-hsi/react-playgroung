import React from "react";
import { useSelector } from "react-redux";
import "./LoadingSpinner.css";
import { selectIsLoading } from "../store/loadingSlice";

const LoadingSpinner: React.FC = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
