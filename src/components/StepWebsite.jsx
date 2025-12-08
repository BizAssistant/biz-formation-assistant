import React from 'react';
import '../styles/StepWebsite.scss';

function StepWebsit({ businessData, updateBusinessData, nextStep, prevStep, downloadReport }) {
  const pages = [
    'Home',
    'About Us',
    'Products/Services',
    'Contact',
    'Privacy Policy',
    'Terms of Service',
  ];

  return (
    <div className="website-step">
      <h2 className="website-title">Website & Online Presence</h2>
      <div className="website-form">
        <div className="form-group">
          <label className="form-label">Domain Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="yourbusiness.com"
            value={businessData.domain || ''}
            onChange={(e) => updateBusinessData({ domain: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Website Platform</label>
          <select
            className="form-select"
            value={businessData.platform || ''}
            onChange={(e) => updateBusinessData({ platform: e.target.value })}
          >
            <option value="">Select platform</option>
            <option value="wordpress">WordPress (flexible, popular)</option>
            <option value="shopify">Shopify (e-commerce)</option>
            <option value="wix">Wix (easy, drag-and-drop)</option>
            <option value="squarespace">Squarespace (beautiful templates)</option>
            <option value="webflow">Webflow (designer-friendly)</option>
            <option value="custom">Custom Development</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Hosting Provider</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., Cloudflare Pages, Vercel, Netlify, Bluehost"
            value={businessData.hosting || ''}
            onChange={(e) => updateBusinessData({ hosting: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Essential Website Pages</label>
          <div className="pages-grid">
            {pages.map((page, idx) => (
              <label key={idx} className="page-option">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={businessData[`page${idx}`] || false}
                  onChange={(e) =>
                    updateBusinessData({ [`page${idx}`]: e.target.checked })
                  }
                />
                <span>{page}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Brand Colors</label>
          <div className="brand-colors">
            <input
              type="color"
              className="color-picker"
              value={businessData.color1 || '#7C3AED'} // default purple
              onChange={(e) => updateBusinessData({ color1: e.target.value })}
            />
            <input
              type="color"
              className="color-picker"
              value={businessData.color2 || '#06B6D4'} // default cyan
              onChange={(e) => updateBusinessData({ color2: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="website-actions">
        <button onClick={prevStep} className="btn-back">
          Back
        </button>
        <button onClick={downloadReport} className="btn-next">
          Download Plan
        </button>
      </div>
    </div>
  );
}

export default StepWebsite;
