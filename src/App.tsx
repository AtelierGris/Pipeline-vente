import React, { useState } from 'react';
import './App.css';
import './index.css';
import ItemForm from './components/ItemForm';
import BillOfMaterials from './components/BillOfMaterials';
import { EstimateItem } from './components/types';

const App: React.FC = () => {
  const [items, setItems] = useState<EstimateItem[]>([]);

  const handleAddItem = (newItem: EstimateItem) => {
    setItems([...items, newItem]);
  };

  const handleResetItems = () => {
    setItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Estimateur Steel & Glass</h1>
          <button
            onClick={() => setItems([])}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Réinitialiser la liste
          </button>
        </div>
        <div className="space-y-8">
          <ItemForm onSubmit={handleAddItem} />
          <BillOfMaterials items={items} />
        </div>
      </div>
    </div>
  );
};

export default App;
