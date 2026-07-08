// src/components/ui/FormField.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import RequiredLabel from './RequiredLabel';
import ErrorMessage from './ErrorMessage';

export default function FormField({
  label,
  value,
  placeholder,
  type = "text",
  suffix,
  className,
  isEditing = true,
  options = [],
  onChange,
  name,
  required = false,
  error = "",
}) {
  
  const handleChange = (e) => {
    if (onChange) {
      onChange(e); 
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className || ""}`}>
      <RequiredLabel label={label} required={required} />

      <div className="relative">
        {isEditing ? (
          type === "select" ? (
            <select
              name={name} 
              value={value || ""}
              onChange={handleChange}
              className={`h-10 w-full rounded border ${
                error ? 'border-red-500' : 'border-gray-200'
              } bg-[#FBFDFF] px-4 pr-9 text-sm text-[#3C5065] placeholder:text-gray-400 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67] appearance-none`}
              required={required}
            >
              <option value="">
                {placeholder || `Select ${label}...`}
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : type === "date" ? (
            <input
              type="date"
              name={name} 
              value={value || ""}
              onChange={handleChange}
              className={`h-10 w-full rounded border ${
                error ? 'border-red-500' : 'border-gray-200'
              } bg-[#FBFDFF] px-4 pr-9 text-sm text-[#3C5065] placeholder:text-gray-400 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
              required={required}
            />
          ) : type === "textarea" ? (
            <textarea
              name={name} // ← name ကိုထည့်ပါ
              value={value || ""}
              onChange={handleChange}
              rows={3}
              className={`h-auto w-full rounded border ${
                error ? 'border-red-500' : 'border-gray-200'
              } bg-[#FBFDFF] px-4 pr-9 text-sm text-[#3C5065] placeholder:text-gray-400 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
              required={required}
            />
          ) : (
            <input
              type="text"
              name={name} // ← name ကိုထည့်ပါ
              value={value || ""}
              onChange={handleChange}
              placeholder={placeholder}
              className={`h-10 w-full rounded border ${
                error ? 'border-red-500' : 'border-gray-200'
              } bg-[#FBFDFF] px-4 pr-9 text-sm text-[#3C5065] placeholder:text-gray-400 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]`}
              required={required}
            />
          )
        ) : (
          <div className="h-10 w-full rounded border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-[#3C5065] flex items-center">
            {value || <span className="text-gray-400">—</span>}
          </div>
        )}

        {type === "select" && isEditing && (
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
        )}
        {suffix && (
          <span className="absolute right-0 top-1/2 flex h-full -translate-y-1/2 items-center border-l border-[#E3E8ED] px-4 text-sm text-black">
            {suffix}
          </span>
        )}
      </div>

      <ErrorMessage message={error} />
    </div>
  );
}