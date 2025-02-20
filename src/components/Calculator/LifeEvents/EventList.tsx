
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { LifeEvent } from '../../../types/lifeEvents';
import { formatINR } from '../../../utils/formatters';

interface EventListProps {
  events: LifeEvent[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function EventList({ events, onEdit, onDelete }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No life events added yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-800">{event.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  event.priority === 'essential' ? 'bg-red-100 text-red-800' :
                  event.priority === 'important' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {event.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Age: {event.age}</p>
              <p className="text-sm text-gray-600">Cost: {formatINR(event.cost)}</p>
              <p className="text-sm text-gray-600">Category: {event.category}</p>
              {event.description && (
                <p className="text-sm text-gray-600 mt-2">{event.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(index)}
                className="p-1 text-gray-400 hover:text-blue-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(index)}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
