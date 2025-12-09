import React from 'react';
import './styles/Branding.scss';

interface BrandingProps {
  isStandard: boolean;
}

function Branding({ isStandard }: BrandingProps) {
  return (
    <div className="card--glass step-marketing__card">
      <div className="step-marketing__section-header">
        <h3>Branding</h3>
        <span className={`badge ${isStandard ? 'badge--cyan' : 'badge--locked'}`}>
          {isStandard ? 'Standard & Premium' : 'Upgrade to unlock'}
        </span>
      </div>

      {!isStandard && (
        <p className="step-marketing__locked-text">
          Develop your brand identity with a guided tool when you upgrade to Standard or Premium.
        </p>
      )}

      {isStandard && (
        <div className="form-group">
          <label htmlFor="brandName">Brand name:</label>
          <input id="brandName" type="text" placeholder="e.g. BizForm" />
          <label htmlFor="brandColors">Brand colors:</label>
          <input id="brandColors" type="text" placeholder="e.g. Purple, Cyan" />
          <button type="button" className="btn-metallic btn-metallic--shimmer">
            Generate brand
          </button>
        </div>
      )}
    </div>
  );
}

export default Branding;
