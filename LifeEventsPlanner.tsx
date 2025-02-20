import React, { useState } from 'react';
import { Milestone, Plus, Trash2, Settings } from 'lucide-react';
import type { LifeEvent } from '../../types/lifeEvents';
import { formatINR } from '../../utils/formatters';
import { defaultCategoryInflationRates, ExpenseCategory } from '../../utils/inflationRates';

interface LifeEventsPlannerProps {
  events: LifeEvent[];
  enabled: boolean;
  defaultRates: Record<ExpenseCategory, number>;
  onToggle: (enabled: boolean) => void;
  onAdd: (event: LifeEvent) => void;
  onRemove: (index: number) => void;
  onEdit: (index: number, event: LifeEvent) => void;
  onUpdateDefaultRates: (rates: Record<ExpenseCategory, number>) => void;
}

export default function LifeEventsPlanner({
  events,
  enabled,
  defaultRates,
  onToggle,
  onAdd,
  onRemove,
  onEdit,
  onUpdateDefaultRates
}: LifeEventsPlannerProps) {
  const [showForm, setShowForm] = useState(false);
  const [showRatesConfig, setShowRatesConfig] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<LifeEvent>>({
    category: 'milestone',
    priority: 'important'
  });
  const [editingRates, setEditingRates] = useState(defaultRates);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.age && newEvent.name && newEvent.cost) {
      onAdd(newEvent as LifeEvent);
      setNewEvent({ category: 'milestone', priority: 'important' });
      setShowForm(false);
    }
  };

  const handleRatesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDefaultRates(editingRates);
    setShowRatesConfig(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Milestone className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold">Life Events & Major Expenses</h3>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowRatesConfig(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Configure Inflation Rates</span>
          </button>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => onToggle(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <span className="text-sm text-gray-600">Include in calculations</span>
          </label>
        </div>
      </div>

      {showRatesConfig && (
        <form onSubmit={handleRatesSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-4">Default Inflation Rates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(editingRates).map(([category, rate]) => (
              <div key={category} className="flex items-center gap-2">
                <label className="flex-1 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}:
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setEditingRates({
                    ...editingRates,
                    [category]: parseFloat(e.target.value)
                  })}
                  className="w-24 rounded-md border-gray-300"
                  step="0.1"
                  min="0"
                  required
                />
                <span className="text-gray-600">%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowRatesConfig(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Rates
            </button>
          </div>
        </form>
      )}

      {/* Rest of the component remains the same */}
      {/* ... existing event list and form code ... */}
    </div>
  );
}