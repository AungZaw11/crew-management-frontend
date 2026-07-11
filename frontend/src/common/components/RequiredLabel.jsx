// src/components/ui/RequiredLabel.jsx
import React from 'react';

export default function RequiredLabel({ label, required = false, className = '' }) {
  return (
    <label className={`text-sm text-black ${className}`}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}