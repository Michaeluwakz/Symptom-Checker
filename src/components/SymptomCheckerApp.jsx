// SymptomCheckerApp.jsx
import { useState } from 'react';
import '../styles/App.css';

const symptomsData = [
  {
    name: 'Headache',
    severity: 'Easily Curable',
    color: 'green',
    medication: 'Paracetamol, Ibuprofen',
  },
  {
    name: 'Flu',
    severity: 'Easily Curable',
    color: 'green',
    medication: 'Rest, Fluids, Antiviral Medication',
  },
  {
    name: 'Diabetes',
    severity: 'Hard to Cure',
    color: 'red',
    medication: 'Insulin, Lifestyle Changes',
  },
  {
    name: 'Hypertension',
    severity: 'Hard to Cure',
    color: 'red',
    medication: 'ACE Inhibitors, Beta Blockers',
  },
];

function SymptomCheckerApp() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Symptom Checker</h1>
        <p>Select a symptom to view details.</p>
      </header>

      <main>
        <ul className="symptom-list">
          {symptomsData.map((symptom, index) => (
            <li
              key={index}
              className={`symptom-item ${symptom.color}`}
              onClick={() => setSelectedSymptom(symptom)}
            >
              {symptom.name}
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

export default SymptomCheckerApp;
