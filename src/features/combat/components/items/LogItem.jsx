import React, { useEffect, useRef } from 'react';

const LogItem = ({ rounds, currentRoundIndex }) => {
    const scrollRef = useRef(null);

    // Auto-scroll to bottom of logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentRoundIndex]);

    return (
        <div className="log-item col-md-4">
            <div className="card bg-dark border-secondary bg-opacity-50 h-100" style={{ maxHeight: '600px' }}>
                <div className="card-header bg-transparent border-secondary py-3">
                    <h3 className="text-body-2 m-0 fw-bold text-light">Battle Log</h3>
                </div>
                <div className="card-body overflow-auto custom-scrollbar" ref={scrollRef}>
                    {rounds.slice(0, currentRoundIndex + 1).map((round, idx) => (
                        <div key={idx} className="mb-3 p-2 rounded bg-black bg-opacity-25 border border-secondary border-opacity-10 section-fade-in">
                            <div className="d-flex justify-content-between text-caption text-secondary mb-1">
                                <span>Round {idx + 1}</span>
                            </div>
                            <p className="m-0 text-caption text-light">{round.reason}</p>
                            <div className="mt-1 text-caption text-capitalize text-success fw-bold text-end">
                                Winner: {round.winner.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogItem;
