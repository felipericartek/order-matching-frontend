import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
