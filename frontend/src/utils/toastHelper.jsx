// src/utils/toastHelper.jsx
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ==================== SUCCESS TOASTS ====================
export const showSuccess = (message, options = {}) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

export const showSuccessWithAction = (message, actionLabel, actionCallback) => {
  toast.success(
    <div>
      <span>{message}</span>
      <button
        onClick={actionCallback}
        className="ml-4 text-white underline hover:no-underline"
      >
        {actionLabel}
      </button>
    </div>,
    { autoClose: 3000 }
  );
};

// ==================== ERROR TOASTS ====================
export const showError = (message, options = {}) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

export const showValidationErrors = (errors, options = {}) => {
  const errorMessages = Object.values(errors).filter(Boolean);
  
  if (errorMessages.length === 0) return;
  
  if (errorMessages.length === 1) {
    toast.error(` ${errorMessages[0]}`, {
      position: "bottom-right",
      autoClose: 3000,
      ...options
    });
  } else {
    toast.error(
      <div>
        <div className="font-semibold mb-1 text-red-700">
          Please fix {errorMessages.length} errors:
        </div>
        <ul className="list-disc list-inside text-sm text-red-600">
          {errorMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        ...options
      }
    );
  }
};

// ==================== WARNING TOASTS ====================
export const showWarning = (message, options = {}) => {
  toast.warning(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

// ==================== INFO TOASTS ====================
export const showInfo = (message, options = {}) => {
  toast.info(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

// ==================== LOADING TOAST ====================
export const showLoading = (message = 'Loading...', options = {}) => {
  return toast.loading(message, {
    position: "bottom-right",
    ...options
  });
};

export const updateLoadingToSuccess = (toastId, message = 'Success!', options = {}) => {
  toast.update(toastId, {
    render: ` ${message}`,
    type: 'success',
    isLoading: false,
    autoClose: 3000,
    ...options
  });
};

export const updateLoadingToError = (toastId, message = 'Failed!', options = {}) => {
  toast.update(toastId, {
    render: ` ${message}`,
    type: 'error',
    isLoading: false,
    autoClose: 3000,
    ...options
  });
};

// ==================== CUSTOM TOAST ====================
export const showCustomToast = (message, type = 'default', options = {}) => {
  const toastTypes = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
    default: toast,
  };
  
  const toastFn = toastTypes[type] || toast;
  toastFn(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

// ==================== API RESPONSE TOAST ====================
export const showApiResponse = (response, successMessage, errorMessage) => {
  if (response?.status) {
    showSuccess(successMessage || response.message || 'Success!');
  } else {
    showError(errorMessage || response?.message || 'Something went wrong!');
  }
};

// ==================== TOAST WITH COMPONENT ====================
export const showToastWithComponent = (Component, type = 'info', options = {}) => {
  const toastFn = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
  }[type] || toast.info;
  
  toastFn(<Component />, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

// ==================== PROMISE TOAST ====================
export const showPromiseToast = (promise, messages = {}) => {
  const {
    pending = 'Loading...',
    success = 'Success!',
    error = 'Something went wrong!'
  } = messages;
  
  return toast.promise(promise, {
    pending: pending,
    success: success,
    error: error,
  }, {
    position: "bottom-right",
    autoClose: 3000,
  });
};

// ==================== CLEAR TOASTS ====================
export const clearToasts = () => {
  toast.dismiss();
};

// ==================== DEFAULT EXPORT ====================
const toastHelper = {
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  loading: showLoading,
  updateLoadingToSuccess,
  updateLoadingToError,
  validation: showValidationErrors,
  custom: showCustomToast,
  api: showApiResponse,
  promise: showPromiseToast,
  clear: clearToasts,
  withComponent: showToastWithComponent,
  successWithAction: showSuccessWithAction,
};

export default toastHelper;