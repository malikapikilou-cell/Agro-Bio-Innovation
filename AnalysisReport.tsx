
import React from 'react';

interface AnalysisReportProps {
  report: string;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ report }) => {
    const renderReport = () => {
        const lines = report.split('\n').filter(line => line.trim() !== '');
        
        return lines.map((line, index) => {
            if (line.startsWith('###')) {
                return <h2 key={index} className="text-2xl font-bold text-green-700 mt-6 mb-4">{line.replace('###', '').trim()}</h2>;
            }
            if (line.startsWith('**')) {
                const parts = line.split('**');
                return <p key={index} className="text-lg my-2"><strong className="font-semibold text-gray-800">{parts[1]}</strong>{parts[2]}</p>;
            }
            if (line.match(/^\d\./)) {
                return <p key={index} className="ml-5 my-2 text-gray-700">{line}</p>;
            }
            if (line.startsWith('-')) {
                return <li key={index} className="ml-5 list-disc text-gray-700">{line.substring(1).trim()}</li>;
            }
            return <p key={index} className="my-2 text-gray-700">{line}</p>;
        });
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
            {renderReport()}
        </div>
    );
};

export default AnalysisReport;
