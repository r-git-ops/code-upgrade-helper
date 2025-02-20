import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: string;
  prefix?: string;
  suffix?: string;
}

export default function InputField({
  label,
  name,
  value,
  onChange,
  min = 0,
  max,
  step = "1",
  prefix,
  suffix
}: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type="number"
          name={name}
          value={value || ''}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className={`block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm
            ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}