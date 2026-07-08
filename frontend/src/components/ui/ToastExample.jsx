// src/components/ui/ToastExample.jsx
import React from 'react';
import toastHelper from '../../utils/toastHelper';

export default function ToastExample() {
  const handleSuccess = () => {
    toastHelper.success(' Crew created successfully!');
  };

  const handleError = () => {
    toastHelper.error(' Failed to create crew');
  };

  const handleWarning = () => {
    toastHelper.warning(' Certificate expiring in 5 days');
  };

  const handleInfo = () => {
    toastHelper.info('ℹ 5 crews are on board');
  };

  const handleValidation = () => {
    const errors = {
      crew_code: 'Crew Code is required',
      position: 'Position is required',
      hire_date: 'Hire Date is required',
    };
    toastHelper.validation(errors);
  };

  const handleLoading = async () => {
    const toastId = toastHelper.loading('Saving crew...');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toastHelper.updateLoadingToSuccess(toastId, 'Crew saved successfully!');
  };

  const handlePromise = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success
        resolve('Success!');
        // Or reject('Failed!');
      }, 2000);
    });
    
    toastHelper.promise(promise, {
      pending: ' Saving crew...',
      success: ' Crew saved!',
      error: 'Failed to save crew!',
    });
  };

  const handleCustom = () => {
    toastHelper.custom(
      <div className="flex items-center gap-2">
        
        <div>
          <div className="font-semibold">Crew Created!</div>
          <div className="text-sm opacity-80">Crew code: P009999</div>
        </div>
      </div>,
      'success',
      { autoClose: 5000 }
    );
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">Toast Examples</h2>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSuccess}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Success Toast
        </button>
        
        <button
          onClick={handleError}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Error Toast
        </button>
        
        <button
          onClick={handleWarning}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Warning Toast
        </button>
        
        <button
          onClick={handleInfo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Info Toast
        </button>
        
        <button
          onClick={handleValidation}
          className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
        >
          Validation Errors
        </button>
        
        <button
          onClick={handleLoading}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Loading Toast
        </button>
        
        <button
          onClick={handlePromise}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Promise Toast
        </button>
        
        <button
          onClick={handleCustom}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          Custom Toast
        </button>
      </div>
    </div>
  );
}