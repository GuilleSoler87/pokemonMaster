import React from 'react';
import clsx from 'clsx';

const ProgressBar = ({ value, max, variant = 'primary', height = '6px', className }) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="progress flex-grow-1" style={{ height }}>
            <div
                className={clsx("progress-bar", `bg-${variant}`, className)}
                role="progressbar"
                style={{ width: `${percentage}%` }}
                aria-valuenow={value}
                aria-valuemin="0"
                aria-valuemax={max}
            />
        </div>
    );
};

export default ProgressBar;
