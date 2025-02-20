import React, { useState } from 'react';
import type { LifeEvent } from '../../../types/lifeEvents';
import InputField from '../InputField';

interface EventFormProps {
  onSubmit: (event: LifeEvent) => void;
  onCancel: () => void;
  initialValues?: LifeEvent;
}

export default function EventForm({ onSubmit, onCancel, initialValues }: EventFormProps) {
  const [formData, setFormData] = useState<LifeEvent>({
    age: initialValues?.age ?? 0,
    name: initialValues?.name ?? '',
    cost: initialValues?.cost ?? 0,
    description: initialValues?.description ?? '',
    category: initialValues?.category ?? 'milestone',
    priority: initialValues?.priority ?? 'important',
    inflationRate: initialValues?.inflationRate
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Age"
          name="age"
          value={formData.age}
          onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
          type="number"
          min={0}
        />
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          type="text"
        />
        <InputField
          label="Cost"
          name="cost"
          value={formData.cost}
          onChange={(e) => setFormData(prev => ({ ...prev, cost: parseFloat(e.target.value) }))}
          type="number"
          prefix="₹"
          min={0}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as LifeEvent['category'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="milestone">Milestone</option>
            <option value="luxury">Luxury</option>
            <option value="family">Family</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as LifeEvent['priority'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="essential">Essential</option>
            <option value="important">Important</option>
            <option value="optional">Optional</option>
          </select>
        </div>
        <InputField
          label="Custom Inflation Rate (%)"
          name="inflationRate"
          value={formData.inflationRate ?? ''}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            inflationRate: e.target.value ? parseFloat(e.target.value) : undefined 
          }))}
          type="number"
          step="0.1"
          min={0}
          suffix="%"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialValues ? 'Update Event' : 'Add Event'}
        </button>
      </div>
    </form>
  );
}