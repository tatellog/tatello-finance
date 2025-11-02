import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

export const EditableField = ({ 
  value, 
  onSave, 
  type = 'text',
  format = 'text',
  editMode = false,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  const formatDisplay = (val) => {
    if (format === 'currency') {
      return `$${parseFloat(val).toLocaleString('es-MX', {maximumFractionDigits: 0})}`;
    }
    if (format === 'percentage') {
      return `${val}%`;
    }
    return val;
  };

  if (!editMode) {
    return <span className={className}>{formatDisplay(value)}</span>;
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type={type}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-blue-500"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="text-green-400 hover:text-green-300 p-1"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          className="text-red-400 hover:text-red-300 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className={`${className} hover:bg-slate-700/50 px-2 py-1 rounded transition-colors cursor-pointer`}
    >
      {formatDisplay(value)}
    </button>
  );
};