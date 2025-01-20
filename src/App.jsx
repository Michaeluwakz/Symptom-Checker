// App.jsx
import { useState } from 'react';
import './App.css'; // Ensure that your styles are imported here.

const symptomsData = [
  {
    name: 'Headache',
    severity: 'Easily Curable',
    color: 'green',
    medication: 'Paracetamol, Ibuprofen',
    count: 0, // Track count of selections
  },
  {
    name: 'Flu',
    severity: 'Easily Curable',
    color: 'green',
    medication: 'Rest, Fluids, Antiviral Medication',
    count: 0,
  },
  {
    name: 'Diabetes',
    severity: 'Hard to Cure',
    color: 'red',
    medication: 'Insulin, Lifestyle Changes',
    count: 0,
  },
  {
    name: 'Hypertension',
    severity: 'Hard to Cure',
    color: 'red',
    medication: 'ACE Inhibitors, Beta Blockers',
    count: 0,
  },
];

function App() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [symptoms, setSymptoms] = useState(symptomsData);

  // Handle symptom click and tally count
  const handleSymptomClick = (symptom) => {
    setSelectedSymptom(symptom);

    const updatedSymptoms = symptoms.map((s) =>
      s.name === symptom.name ? { ...s, count: s.count + 1 } : s
    );

    setSymptoms(updatedSymptoms); // Update state with new counts
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Symptom Checker</h1>
        <p>Select a symptom to view details.</p>
      </header>

      <main>
        <ul className="symptom-list">
          {symptoms.map((symptom, index) => (
            <li
              key={index}
              className={`symptom-item ${symptom.color}`}
              onClick={() => handleSymptomClick(symptom)}
            >
              {symptom.name} <span>({symptom.count})</span>{' '}
              {/* Display tally count */}
            </li>
          ))}
        </ul>

        {selectedSymptom && (
          <div className="symptom-details">
            <h2>{selectedSymptom.name}</h2>
            <p>
              <strong>Severity:</strong> {selectedSymptom.severity}
            </p>
            <p>
              <strong>Suggested Medication:</strong>{' '}
              {selectedSymptom.medication}
            </p>
            <button onClick={() => setSelectedSymptom(null)}>Close</button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by NHS Colors and Guidance</p>
      </footer>
    </div>
  );
}

export default App;
