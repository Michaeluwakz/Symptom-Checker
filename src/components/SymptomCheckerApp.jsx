import React, { useState } from 'react';
import axios from 'axios';

const SYMPTOMS_DATABASE = {
  'diabetes': {
    name: 'Diabetes',
    severity: 'Chronic Condition',
    color: 'red',
    symptoms: [
      'Increased thirst',
      'Frequent urination',
      'Extreme hunger',
      'Unexplained weight loss',
      'Fatigue',
      'Blurred vision'
    ],
    medication: 'Insulin, Metformin, Regular blood sugar monitoring, Lifestyle changes',
    advice: 'Consult an endocrinologist for proper treatment plan'
  },
  'headache': {
    name: 'Headache',
    severity: 'Usually Mild',
    color: 'green',
    symptoms: [
      'Pain in head or face',
      'Sensitivity to light',
      'Nausea',
      'Dizziness'
    ],
    medication: 'Paracetamol, Ibuprofen, Rest in a quiet dark room',
    advice: 'If persistent, consult a healthcare provider'
  },
  'flu': {
    name: 'Influenza',
    severity: 'Moderate',
    color: 'green',
    symptoms: [
      'Fever',
      'Cough',
      'Sore throat',
      'Body aches',
      'Fatigue'
    ],
    medication: 'Rest, Fluids, Antiviral medications if prescribed',
    advice: 'Stay home and rest. Seek medical attention if symptoms worsen.'
  }
};

function SymptomCheckerApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [condition, setCondition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiAdvice, setAiAdvice] = useState('');

  const getAIAdvice = async (condition) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/get-advice`, {
        condition: condition.name,
        symptoms: condition.symptoms.join(', '),
        severity: condition.severity
      });
      
      setAiAdvice(response.data.advice);
    } catch (error) {
      console.error('Error getting AI advice:', error);
      setAiAdvice('Unable to get AI-powered advice at this moment. Please rely on the general advice provided above.');
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a condition');
      return;
    }

    setLoading(true);
    setError('');
    setAiAdvice('');

    try {
      const searchTermLower = searchTerm.toLowerCase();
      const localResult = SYMPTOMS_DATABASE[searchTermLower];

      if (localResult) {
        setCondition(localResult);
        setError('');
        await getAIAdvice(localResult);
      } else {
        setCondition(null);
        setError('Condition not found in our database. Please try another condition like "diabetes", "headache", or "flu".');
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      setCondition(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Symptom Checker</h1>
        <p>Enter a medical condition to get information and recommendations</p>
      </header>

      <main className="app-main">
        <div className="search-section">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a condition (e.g., diabetes)"
            className="search-input"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Check Condition'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {condition && (
          <div className={`condition-details ${condition.color}`}>
            <h2>{condition.name}</h2>
            <div className="condition-info">
              <h3>Severity</h3>
              <p>{condition.severity}</p>
              
              <h3>Common Symptoms</h3>
              <ul>
                {condition.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>

              <h3>Recommended Treatment</h3>
              <p>{condition.medication}</p>

              <h3>Medical Advice</h3>
              <p>{condition.advice}</p>

              {aiAdvice && (
                <>
                  <h3>AI-Powered Advice</h3>
                  <p className="ai-advice">{aiAdvice}</p>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Disclaimer: This is a demonstration app. Always consult healthcare professionals for medical advice.
        </p>
      </footer>
    </div>
  );
}

export default SymptomCheckerApp;
