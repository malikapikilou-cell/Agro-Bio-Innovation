
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface FeedbackInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const FeedbackInput: React.FC<FeedbackInputProps> = ({ value, onChange, onAnalyze, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <label htmlFor="feedback" className="block text-lg font-semibold text-gray-700 mb-2">
        Enter Customer Feedback
      </label>
      <textarea
        id="feedback"
        rows={10}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
        placeholder="Paste customer emails, reviews, survey responses, etc. here..."
        value={value}
        onChange={onChange}
        disabled={isLoading}
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={isLoading || !value.trim()}
          className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {isLoading ? (
            'Analyzing...'
          ) : (
            <>
              <SparklesIcon className="h-5 w-5 mr-2" />
              Analyze Feedback
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FeedbackInput;
