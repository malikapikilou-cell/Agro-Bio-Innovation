
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FeedbackInput from './components/FeedbackInput';
import AnalysisReport from './components/AnalysisReport';
import Loader from './components/Loader';
import { analyzeFeedback } from './services/geminiService';

const App: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [analysisReport, setAnalysisReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!feedbackText.trim()) {
      setError('Please enter some feedback to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisReport(null);

    try {
      const report = await analyzeFeedback(feedbackText);
      setAnalysisReport(report);
    } catch (err) {
      setError('An error occurred while analyzing the feedback. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [feedbackText]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <FeedbackInput
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          
          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          {isLoading && <Loader />}
          
          {analysisReport && (
            <div className="mt-8">
              <AnalysisReport report={analysisReport} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
