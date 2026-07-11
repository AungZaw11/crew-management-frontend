// src/components/ui/ErrorMessage.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message, className = '' }) {
  if (!message) return null;

  return (
    <div className={`flex items-center gap-1.5 text-red-500 text-xs mt-1 ${className}`}>
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}