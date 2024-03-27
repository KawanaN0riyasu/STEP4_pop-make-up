import React from 'react';

type ErrorMessageProps = {
    error: Error | null;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return (
        <div className="text-red-500">
            {error && error.message}
        </div>
    );
};

export default ErrorMessage;