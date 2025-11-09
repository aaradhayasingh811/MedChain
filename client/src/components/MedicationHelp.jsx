import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MedicationHelp = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [interactionResults, setInteractionResults] = useState(null);
  const [medications, setMedications] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    time: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock medication database
  const medicationDatabase = [
    {
      id: 1,
      name: 'Aspirin',
      genericName: 'Acetylsalicylic Acid',
      type: 'NSAID',
      uses: ['Pain relief', 'Fever reduction', 'Anti-inflammatory'],
      sideEffects: ['Stomach irritation', 'Bleeding risk', 'Tinnitus'],
      interactions: ['Warfarin', 'Ibuprofen', 'Alcohol'],
      warnings: ['Avoid before surgery', 'Not for children with viral infections'],
      dosage: '81-325mg as needed'
    },
    {
      id: 2,
      name: 'Lisinopril',
      genericName: 'Lisinopril',
      type: 'ACE Inhibitor',
      uses: ['High blood pressure', 'Heart failure'],
      sideEffects: ['Cough', 'Dizziness', 'High potassium'],
      interactions: ['Diuretics', 'NSAIDs', 'Lithium'],
      warnings: ['Pregnancy risk', 'Kidney monitoring required'],
      dosage: '10-40mg daily'
    },
    {
      id: 3,
      name: 'Metformin',
      genericName: 'Metformin',
      type: 'Biguanide',
      uses: ['Type 2 diabetes'],
      sideEffects: ['Nausea', 'Diarrhea', 'Vitamin B12 deficiency'],
      interactions: ['Alcohol', 'Contrast dyes', 'Certain antibiotics'],
      warnings: ['Risk of lactic acidosis', 'Kidney function monitoring'],
      dosage: '500-1000mg twice daily'
    },
    {
      id: 4,
      name: 'Atorvastatin',
      genericName: 'Atorvastatin',
      type: 'Statin',
      uses: ['High cholesterol'],
      sideEffects: ['Muscle pain', 'Liver enzyme changes', 'Headache'],
      interactions: ['Grapefruit juice', 'Certain antibiotics', 'Other statins'],
      warnings: ['Liver monitoring required', 'Muscle symptoms monitoring'],
      dosage: '10-80mg daily'
    },
    {
      id: 5,
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      type: 'Antibiotic',
      uses: ['Bacterial infections'],
      sideEffects: ['Diarrhea', 'Nausea', 'Rash'],
      interactions: ['Birth control pills', 'Methotrexate', 'Probenecid'],
      warnings: ['Complete full course', 'Allergy risk'],
      dosage: '250-500mg three times daily'
    },
    {
      id: 6,
      name: 'Ibuprofen',
      genericName: 'Ibuprofen',
      type: 'NSAID',
      uses: ['Pain relief', 'Inflammation', 'Fever'],
      sideEffects: ['Stomach upset', 'Kidney issues', 'High blood pressure'],
      interactions: ['Aspirin', 'Blood thinners', 'Lithium'],
      warnings: ['Take with food', 'Avoid long-term use'],
      dosage: '200-800mg every 4-6 hours'
    }
  ];

  // Search medications
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const results = medicationDatabase.filter(med =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };

  // Check interactions
  const checkInteractions = () => {
    if (medications.length < 2) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const interactions = [];
      
      medications.forEach((med1, index) => {
        medications.forEach((med2, subIndex) => {
          if (index !== subIndex && med1.interactions.includes(med2.name)) {
            interactions.push({
              medication1: med1.name,
              medication2: med2.name,
              severity: 'Major',
              description: `${med1.name} and ${med2.name} may interact and increase risk of side effects.`
            });
          }
        });
      });

      setInteractionResults({
        hasInteractions: interactions.length > 0,
        interactions: interactions,
        severity: interactions.length > 0 ? 'High' : 'Low'
      });
      setIsLoading(false);
    }, 1500);
  };

  // Add medication to list
  const addMedication = (medication) => {
    if (!medications.find(med => med.id === medication.id)) {
      setMedications([...medications, medication]);
    }
  };

  // Remove medication from list
  const removeMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  // Add reminder
  const addReminder = () => {
    if (!newReminder.medication || !newReminder.time) return;
    
    const reminder = {
      id: Date.now(),
      ...newReminder,
      active: true
    };
    
    setReminders([...reminders, reminder]);
    setNewReminder({
      medication: '',
      dosage: '',
      frequency: '',
      time: '',
      notes: ''
    });
  };

  // Remove reminder
  const removeReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  // Toggle reminder active status
  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-white mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Medication Help</h1>
          <p className="text-indigo-200 text-lg">
            Search medications, check interactions, and manage your reminders
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800/50 rounded-2xl p-2 mb-8 border border-indigo-700/30 backdrop-blur-sm">
          {[
            { id: 'search', label: '💊 Medication Search', icon: '🔍' },
            { id: 'interactions', label: '⚠️ Check Interactions', icon: '⚡' },
            { id: 'reminders', label: '⏰ Medication Reminders', icon: '🔔' },
            { id: 'info', label: '📚 Medication Info', icon: '📖' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-indigo-300 hover:text-white hover:bg-indigo-900/30'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>{tab.icon}</span>
                <span className="hidden sm:block">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Medication Search Tab */}
            {activeTab === 'search' && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Search Medications</h2>
                
                <div className="flex space-x-4 mb-6">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter medication name (e.g., Aspirin, Lisinopril)..."
                    className="flex-1 bg-gray-700 border border-indigo-700/30 rounded-xl px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() || isLoading}
                    className="px-6 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </button>
                </div>

                {isLoading && (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {searchResults.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Search Results</h3>
                    {searchResults.map(medication => (
                      <div key={medication.id} className="bg-gray-700/50 rounded-xl p-4 border border-indigo-700/30 hover:border-indigo-500/50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-bold text-lg">{medication.name}</h4>
                            <p className="text-indigo-300">Generic: {medication.genericName}</p>
                            <p className="text-indigo-400 text-sm mt-2">Type: {medication.type}</p>
                            <p className="text-indigo-400 text-sm">Uses: {medication.uses.join(', ')}</p>
                          </div>
                          <button
                            onClick={() => addMedication(medication)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Add to List
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {searchQuery && !isLoading && searchResults.length === 0 && (
                  <div className="text-center py-8 text-indigo-300">
                    No medications found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}

            {/* Interactions Checker Tab */}
            {activeTab === 'interactions' && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Check Medication Interactions</h2>
                
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-4">Your Medications</h3>
                  {medications.length === 0 ? (
                    <div className="text-center py-8 text-indigo-300 border-2 border-dashed border-indigo-700/30 rounded-xl">
                      No medications added. Search and add medications to check interactions.
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {medications.map(medication => (
                        <div key={medication.id} className="flex justify-between items-center bg-gray-700/50 rounded-xl p-4 border border-indigo-700/30">
                          <div>
                            <span className="text-white font-medium">{medication.name}</span>
                            <span className="text-indigo-300 text-sm ml-2">({medication.genericName})</span>
                          </div>
                          <button
                            onClick={() => removeMedication(medication.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {medications.length >= 2 && (
                  <button
                    onClick={checkInteractions}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl py-4 hover:from-orange-700 hover:to-red-700 disabled:opacity-50 transition-all duration-300 font-semibold"
                  >
                    {isLoading ? 'Checking Interactions...' : 'Check for Interactions'}
                  </button>
                )}

                {interactionResults && (
                  <div className="mt-6">
                    <h3 className="text-white font-semibold mb-4">Interaction Results</h3>
                    <div className={`rounded-xl p-4 border ${
                      interactionResults.hasInteractions 
                        ? 'bg-red-900/30 border-red-700/50' 
                        : 'bg-green-900/30 border-green-700/50'
                    }`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-3 h-3 rounded-full ${
                          interactionResults.hasInteractions ? 'bg-red-400' : 'bg-green-400'
                        } animate-pulse`}></div>
                        <h4 className="text-white font-bold">
                          {interactionResults.hasInteractions ? 'Potential Interactions Found' : 'No Significant Interactions Found'}
                        </h4>
                      </div>
                      
                      {interactionResults.hasInteractions ? (
                        <div className="space-y-3">
                          {interactionResults.interactions.map((interaction, index) => (
                            <div key={index} className="bg-red-800/20 rounded-lg p-3 border border-red-700/30">
                              <div className="text-red-200 font-medium">
                                {interaction.medication1} + {interaction.medication2}
                              </div>
                              <div className="text-red-300 text-sm mt-1">{interaction.description}</div>
                              <div className="text-red-400 text-xs mt-2">Severity: {interaction.severity}</div>
                            </div>
                          ))}
                          <p className="text-red-200 text-sm mt-4">
                            ⚠️ Please consult your healthcare provider before making any changes to your medications.
                          </p>
                        </div>
                      ) : (
                        <p className="text-green-200">
                          No significant interactions detected between your current medications.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Medication Reminders Tab */}
            {activeTab === 'reminders' && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Medication Reminders</h2>
                
                {/* Add Reminder Form */}
                <div className="bg-gray-700/30 rounded-xl p-4 border border-indigo-700/30 mb-6">
                  <h3 className="text-white font-semibold mb-4">Add New Reminder</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Medication name"
                      value={newReminder.medication}
                      onChange={(e) => setNewReminder({...newReminder, medication: e.target.value})}
                      className="bg-gray-600 border border-indigo-700/30 rounded-lg px-3 py-2 text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g., 500mg)"
                      value={newReminder.dosage}
                      onChange={(e) => setNewReminder({...newReminder, dosage: e.target.value})}
                      className="bg-gray-600 border border-indigo-700/30 rounded-lg px-3 py-2 text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-500"
                    />
                    <select
                      value={newReminder.frequency}
                      onChange={(e) => setNewReminder({...newReminder, frequency: e.target.value})}
                      className="bg-gray-600 border border-indigo-700/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">Select frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="Four times daily">Four times daily</option>
                      <option value="As needed">As needed</option>
                    </select>
                    <input
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                      className="bg-gray-600 border border-indigo-700/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <textarea
                    placeholder="Additional notes (optional)"
                    value={newReminder.notes}
                    onChange={(e) => setNewReminder({...newReminder, notes: e.target.value})}
                    rows="2"
                    className="w-full mt-4 bg-gray-600 border border-indigo-700/30 rounded-lg px-3 py-2 text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={addReminder}
                    disabled={!newReminder.medication || !newReminder.time}
                    className="w-full mt-4 bg-indigo-600 text-white rounded-lg py-3 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Reminder
                  </button>
                </div>

                {/* Reminders List */}
                <div>
                  <h3 className="text-white font-semibold mb-4">Your Reminders</h3>
                  {reminders.length === 0 ? (
                    <div className="text-center py-8 text-indigo-300 border-2 border-dashed border-indigo-700/30 rounded-xl">
                      No reminders set. Add your first medication reminder above.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reminders.map(reminder => (
                        <div key={reminder.id} className="bg-gray-700/50 rounded-xl p-4 border border-indigo-700/30">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => toggleReminder(reminder.id)}
                                  className={`w-4 h-4 rounded border-2 ${
                                    reminder.active 
                                      ? 'bg-green-500 border-green-500' 
                                      : 'bg-transparent border-indigo-400'
                                  }`}
                                />
                                <div>
                                  <h4 className="text-white font-bold">{reminder.medication}</h4>
                                  <p className="text-indigo-300 text-sm">
                                    {reminder.dosage} • {reminder.frequency} • {reminder.time}
                                  </p>
                                  {reminder.notes && (
                                    <p className="text-indigo-400 text-sm mt-1">{reminder.notes}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeReminder(reminder.id)}
                              className="text-red-400 hover:text-red-300 ml-4"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Medication Info Tab */}
            {activeTab === 'info' && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Medication Information</h2>
                
                <div className="grid gap-6">
                  {medicationDatabase.map(medication => (
                    <div key={medication.id} className="bg-gray-700/30 rounded-xl p-6 border border-indigo-700/30">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-white font-bold text-xl">{medication.name}</h3>
                          <p className="text-indigo-300">Generic: {medication.genericName}</p>
                        </div>
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                          {medication.type}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Uses</h4>
                          <ul className="text-indigo-200 text-sm space-y-1">
                            {medication.uses.map((use, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>{use}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-semibold mb-2">Common Side Effects</h4>
                          <ul className="text-indigo-200 text-sm space-y-1">
                            {medication.sideEffects.map((effect, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>{effect}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Important Interactions</h4>
                          <div className="flex flex-wrap gap-2">
                            {medication.interactions.map((interaction, index) => (
                              <span key={index} className="bg-red-900/30 text-red-300 px-2 py-1 rounded text-xs border border-red-700/30">
                                {interaction}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-semibold mb-2">Warnings</h4>
                          <ul className="text-orange-200 text-sm space-y-1">
                            {medication.warnings.map((warning, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>{warning}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-white font-semibold mb-2">Typical Dosage</h4>
                        <p className="text-green-300 bg-green-900/20 px-3 py-2 rounded-lg border border-green-700/30">
                          {medication.dosage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Medications */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
              <h3 className="text-white font-bold text-lg mb-4">💊 Your Medications</h3>
              {medications.length === 0 ? (
                <p className="text-indigo-300 text-sm">No medications added yet</p>
              ) : (
                <div className="space-y-3">
                  {medications.map(medication => (
                    <div key={medication.id} className="flex justify-between items-center bg-gray-700/30 rounded-lg p-3 border border-indigo-700/20">
                      <div>
                        <div className="text-white text-sm font-medium">{medication.name}</div>
                        <div className="text-indigo-300 text-xs">{medication.type}</div>
                      </div>
                      <button
                        onClick={() => removeMedication(medication.id)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-indigo-700/30 backdrop-blur-sm">
              <h3 className="text-white font-bold text-lg mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab('search')}
                  className="w-full bg-indigo-600 text-white rounded-lg py-3 hover:bg-indigo-700 transition-colors text-sm"
                >
                  Search New Medication
                </button>
                <button
                  onClick={() => setActiveTab('interactions')}
                  disabled={medications.length < 2}
                  className="w-full bg-orange-600 text-white rounded-lg py-3 hover:bg-orange-700 disabled:bg-orange-900 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Check Interactions
                </button>
                <button
                  onClick={() => setActiveTab('reminders')}
                  className="w-full bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 transition-colors text-sm"
                >
                  Manage Reminders
                </button>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-900/30 rounded-2xl p-6 border border-yellow-700/30 backdrop-blur-sm">
              <h3 className="text-yellow-200 font-bold text-lg mb-3">⚠️ Important Notice</h3>
              <p className="text-yellow-100 text-sm">
                This information is for educational purposes only. Always consult with your healthcare provider before starting, stopping, or changing any medications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationHelp;