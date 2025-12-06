import React from 'react';

function WebsiteStep({ businessData, updateBusinessData, nextStep, prevStep, downloadReport }) {
  const pages = [
    'Home',
    'About Us',
    'Products/Services',
    'Contact',
    'Privacy Policy',
    'Terms of Service',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-glow">
        Website & Online Presence
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Domain Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-900 text-slate-200 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 transition"
            placeholder="yourbusiness.com"
            value={businessData.domain || ''}
            onChange={(e) => updateBusinessData({ domain: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Website Platform
          </label>
          <select
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-900 text-slate-200 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 transition"
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
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Hosting Provider
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-900 text-slate-200 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 transition"
            placeholder="e.g., Cloudflare Pages, Vercel, Netlify, Bluehost"
            value={businessData.hosting || ''}
            onChange={(e) => updateBusinessData({ hosting: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Essential Website Pages
          </label>
          <div className="grid grid-cols-2 gap-3">
            {pages.map((page, idx) => (
              <label key={idx} className="flex items-center space-x-2 text-slate-200">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-purple-600 hover:accent-cyan-400 transition"
                  checked={businessData[`page${idx}`] || false}
                  onChange={(e) =>
                    updateBusinessData({ [`page${idx}`]: e.target.checked })
                  }
                />
                <span className="text-sm">{page}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Brand Colors
          </label>
          <div className="flex space-x-2">
            <input
              type="color"
              className="w-20 h-10 rounded border border-slate-600 bg-slate-900"
              value={businessData.color1 || '#7C3AED'} // default purple
              onChange={(e) => updateBusinessData({ color1: e.target.value })}
            />
            <input
              type="color"
              className="w-20 h-10 rounded border border-slate-600 bg-slate-900"
              value={businessData.color2 || '#06B6D4'} // default cyan
              onChange={(e) => updateBusinessData({ color2: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
        >
          Back
        </button>
        <button
          onClick={downloadReport}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg shadow-[0_0_12px_rgba(124,58,237,0.6)] hover:scale-105 transition"
        >
          Download Plan
        </button>
      </div>
    </div>
  );
}

export default WebsiteStep;
