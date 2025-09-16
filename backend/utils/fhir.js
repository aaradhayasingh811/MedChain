function extractField(text, label) {
  const regex = new RegExp(`${label}:?\\s*(.*)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : undefined;
}

function convertToFHIR(text) {
  const name = extractField(text, "Patient Name|Name");
  const dob = extractField(text, "DOB|Date of Birth");
  const gender = extractField(text, "Gender|Sex");

  const observations = [];
  const tests = [
    { label: "Hemoglobin", unit: "g/dL" },
    { label: "Glucose", unit: "mg/dL" },
    { label: "WBC", unit: "10^9/L" },
    { label: "RBC", unit: "10^6/uL" },
    { label: "Platelets", unit: "10^9/L" },
  ];

  tests.forEach(({ label, unit }) => {
    const value = extractField(text, label);
    if (value && !isNaN(parseFloat(value))) {
      observations.push({
        resourceType: "Observation",
        id: `${label.toLowerCase()}-obs`,
        status: "final",
        code: { text: label },
        valueQuantity: {
          value: parseFloat(value),
          unit: unit,
        },
        interpretation: [],
      });
    }
  });

  const patientId = name ? name.toLowerCase().replace(/\s+/g, "-") : "patient-001";

  return {
    resourceType: "Bundle",
    type: "collection",
    entry: [
      {
        resource: {
          resourceType: "Patient",
          id: patientId,
          name: [{ use: "official", text: name }],
          gender: gender ? gender.toLowerCase() : "unknown",
          birthDate: dob || "2000-01-01",
        },
      },
      ...observations.map((obs) => ({ resource: obs })),
    ],
  };
}

module.exports = { convertToFHIR };
