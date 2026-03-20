import React, { useState } from 'react';
import PdfGenerator from './pdf-generator/pdf-generator';
import PdfForm from './pdf-form/pdf-form';

const LS_KEY = 'gls_muthiyamala_form_data';

const defaultFormData = {
  fromName: '',
  orderNumber: '',
  issueDate: '',
  toName: '',
  subject: '',
  ref: '',
  body: '',
  footer: '',
  yoursFaithfully: '',
  language: 'English'
};

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      return { ...defaultFormData, ...JSON.parse(saved) };
    }
  } catch {
    // Ignore parse errors
  }
  return defaultFormData;
}

function App() {
  const [formData, setFormData] = useState(loadFromStorage);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <PdfForm onSubmit={handleFormSubmit} />
      <PdfGenerator {...formData} />
    </div>
  );
}

export default App;
