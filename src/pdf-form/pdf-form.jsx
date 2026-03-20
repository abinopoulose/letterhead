import React, { useState } from 'react';
import './pdf-form.css';

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
    // Ignore parse errors and fall back to defaults
  }
  return defaultFormData;
}

const PdfForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(loadFromStorage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    setFormData(updatedData);

    // Persist to localStorage on every change
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(updatedData));
    } catch {
      // Ignore storage errors (e.g. private browsing quota)
    }

    // Auto-resize textarea if it's the body field
    if (name === 'body') {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, 250)}px`; // 250px is roughly 10 rows
    }

    // Call onSubmit with updated form data
    onSubmit(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove this since we're updating on every change
    // onSubmit(formData);
  };

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <form onSubmit={handleSubmit}>
          
          <div className="formbold-input-flex">
            <div>
              <label htmlFor="language" className="formbold-form-label">Language</label>
              <select
                name="language"
                id="language"
                value={formData.language}
                onChange={handleChange}
                className="formbold-form-input"
              >
                <option value="English">English</option>
                <option value="Malayalam">Malayalam</option>
              </select>
            </div>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="orderNumber" className="formbold-form-label">Letter Number</label>
              <input
                type="text"
                name="orderNumber"
                id="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                className="formbold-form-input"
                placeholder="Enter order number"
              />
            </div>
            <div>
              <label htmlFor="issueDate" className="formbold-form-label">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                id="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="formbold-textarea">
            <label htmlFor="fromName" className="formbold-form-label">From Name</label>
            <textarea
              name="fromName"
              id="fromName"
              value={formData.fromName}
              onChange={handleChange}
              className="formbold-form-input"
              placeholder="Enter recipient name"
              rows={4}
            />
          </div>

          <div className="formbold-textarea">
            <label htmlFor="toName" className="formbold-form-label">To Name</label>
            <textarea
              name="toName"
              id="toName"
              value={formData.toName}
              onChange={handleChange}
              className="formbold-form-input"
              placeholder="Enter recipient name"
              rows={4}
            />
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="subject" className="formbold-form-label">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="formbold-form-input"
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label htmlFor="ref" className="formbold-form-label">Reference</label>
              <input
                type="text"
                name="ref"
                id="ref"
                value={formData.ref}
                onChange={handleChange}
                className="formbold-form-input"
                placeholder="Enter reference"
              />
            </div>
          </div>

          <div className="formbold-textarea">
            <label htmlFor="body" className="formbold-form-label">Body</label>
            <textarea
              name="body"
              id="body"
              value={formData.body}
              onChange={handleChange}
              className="formbold-form-input"
              rows="10"
              placeholder="Enter message body"
              style={{ minHeight: '250px', resize: 'vertical' }}
            />
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="yoursFaithfully" className="formbold-form-label">Yours Faithfully Text</label>
              <input
                type="text"
                name="yoursFaithfully"
                id="yoursFaithfully"
                value={formData.yoursFaithfully}
                onChange={handleChange}
                className="formbold-form-input"
                placeholder="Enter yours faithfully text"
              />
            </div>
        
          </div>

          <div className="formbold-textarea">
            <label htmlFor="footer" className="formbold-form-label">Footer</label>
            <textarea
              name="footer"
              id="footer"
              value={formData.footer}
              onChange={handleChange}
              className="formbold-form-input"
              placeholder="Enter footer text"
              rows={2}
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default PdfForm; 