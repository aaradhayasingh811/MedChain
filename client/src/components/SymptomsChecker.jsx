import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SymptomsChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [severity, setSeverity] = useState('moderate');
  const [duration, setDuration] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea',
    'Dizziness', 'Chest Pain', 'Shortness of Breath',
    'Abdominal Pain', 'Muscle Aches', 'Sore Throat',
    'Runny Nose', 'Rash', 'Joint Pain', 'Back Pain'
  ];

  const addSymptom = () => {
    if (selectedSymptom && !symptoms.includes(selectedSymptom)) {
      setSymptoms([...symptoms, {
        name: selectedSymptom,
        severity: severity,
        duration: duration
      }]);
      setSelectedSymptom('');
      setDuration('');
    }
  };

  const removeSymptom = (index) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const analyzeSymptoms = () => {
    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const emergencySymptoms = ['Chest Pain', 'Shortness of Breath', 'Severe Headache'];
      const hasEmergency = symptoms.some(s => emergencySymptoms.includes(s.name) && s.severity === 'severe');
      
      setResults({
        isEmergency: hasEmergency,
        recommendations: hasEmergency ? [
          'Seek emergency medical attention immediately',
          'Call your local emergency number',
          'Do not delay treatment for these symptoms'
        ] : [
          'Schedule an appointment with your healthcare provider',
          'Rest and stay hydrated',
          'Monitor symptoms for any changes',
          'Consider over-the-counter remedies for symptom relief'
        ],
        possibleConditions: getPossibleConditions(symptoms),
        severity: hasEmergency ? 'high' : 'moderate'
      });
      setIsLoading(false);
    }, 2000);
  };

  const getPossibleConditions = (symptomsList) => {
    const symptomNames = symptomsList.map(s => s.name.toLowerCase());
    
    if (symptomNames.includes('fever') && symptomNames.includes('cough')) {
      return ['Common Cold', 'Influenza (Flu)', 'COVID-19', 'Respiratory Infection'];
    }
    
    if (symptomNames.includes('headache') && symptomNames.includes('nausea')) {
      return ['Migraine', 'Tension Headache', 'Viral Infection'];
    }
    
    return ['Viral Infection', 'General Illness', 'Need Professional Evaluation'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-white mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Symptoms Checker</h1>
          <p className="text-indigo-200 text-lg">
            Describe your symptoms for AI-powered preliminary guidance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Describe Your Symptoms</h2>
            
            {/* Symptom Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Select Symptom</label>
                <select
                  value={selectedSymptom}
                  onChange={(e) => setSelectedSymptom(e.target.value)}
                  className="w-full bg-gray-700 border border-indigo-700/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Choose a symptom...</option>
                  {commonSymptoms.map(symptom => (
                    <option key={symptom} value={symptom}>{symptom}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full bg-gray-700 border border-indigo-700/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 2 days"
                    className="w-full bg-gray-700 border border-indigo-700/30 rounded-xl px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={addSymptom}
                disabled={!selectedSymptom}
                className="w-full bg-indigo-600 text-white rounded-xl py-3 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed transition-colors"
              >
                Add Symptom
              </button>
            </div>

            {/* Selected Symptoms */}
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-3">Selected Symptoms</h3>
              {symptoms.length === 0 ? (
                <p className="text-indigo-300 text-sm">No symptoms added yet</p>
              ) : (
                <div className="space-y-2">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700/50 rounded-xl p-3 border border-indigo-700/30">
                      <div>
                        <span className="text-white font-medium">{symptom.name}</span>
                        <span className="text-indigo-300 text-sm ml-2">
                          ({symptom.severity}, {symptom.duration})
                        </span>
                      </div>
                      <button
                        onClick={() => removeSymptom(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Analyze Button */}
            {symptoms.length > 0 && (
              <button
                onClick={analyzeSymptoms}
                disabled={isLoading}
                className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-4 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 font-semibold"
              >
                {isLoading ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
              </button>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Analysis Results</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-indigo-300">Analyzing your symptoms...</p>
                </div>
              </div>
            ) : results ? (
              <div className="space-y-6">
                {/* Emergency Alert */}
                {results.isEmergency && (
                  <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      <h3 className="text-red-100 font-bold text-lg">Medical Emergency Detected</h3>
                    </div>
                    <p className="text-red-200 mt-2">
                      Based on your symptoms, you should seek immediate medical attention.
                    </p>
                  </div>
                )}

                {/* Possible Conditions */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Possible Conditions</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.possibleConditions.map((condition, index) => (
                      <span key={index} className="bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-700/30">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {results.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start space-x-3 text-indigo-200">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div className="bg-indigo-900/20 rounded-xl p-4 border border-indigo-700/30">
                  <h4 className="text-white font-semibold mb-2">Next Steps</h4>
                  <p className="text-indigo-200 text-sm">
                    This analysis is for informational purposes only. Please consult with a healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to="/emergency-chat"
                    className="flex-1 bg-red-600 text-white text-center rounded-xl py-3 hover:bg-red-700 transition-colors"
                  >
                    Emergency Help
                  </Link>
                  <button
                    onClick={() => setResults(null)}
                    className="flex-1 bg-gray-700 text-white rounded-xl py-3 hover:bg-gray-600 transition-colors"
                  >
                    New Analysis
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-white font-semibold mb-2">No Analysis Yet</h3>
                <p className="text-indigo-300">
                  Add your symptoms and click "Analyze Symptoms" to get AI-powered guidance.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomsChecker;