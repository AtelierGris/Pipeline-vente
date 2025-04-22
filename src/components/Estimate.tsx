import React, { useState } from 'react';
import { EstimateItem } from './types';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

const Estimate: React.FC = () => {
  const [items, setItems] = useState<EstimateItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('all');

  const handleAddItem = (newItem: EstimateItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    return items.reduce((acc, item) => ({
      totalSquareFootage: acc.totalSquareFootage + item.squareFootage,
      totalMaterialCost: acc.totalMaterialCost + item.materialCost,
      totalExtraCosts: acc.totalExtraCosts + (item.extraCosts ?? 0),
      totalInstallationCosts: acc.totalInstallationCosts + (item.installationCosts ?? 0),
      grandTotal: acc.grandTotal + item.totalCost,
    }), {
      totalSquareFootage: 0,
      totalMaterialCost: 0,
      totalExtraCosts: 0,
      totalInstallationCosts: 0,
      grandTotal: 0,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const totals = calculateTotals();

  const filteredItems = activeSection === 'all' 
    ? items 
    : items.filter(item => item.type === activeSection);

  const sections = [
    { id: 'all', name: 'Tous les éléments' },
    { id: 'Steel Doors', name: 'Portes en Acier' },
    { id: 'Steel Windows', name: 'Fenêtres en Acier' },
    { id: 'Glass Partitions', name: 'Cloisons en Verre' },
    { id: 'Glass Railings', name: 'Garde-corps en Verre' },
    { id: 'Storefront Systems', name: 'Façades Vitrées' },
    { id: 'Curtain Walls', name: 'Murs-rideaux' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-soft">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Calculateur de Devis</h1>
        <p className="text-secondary-500">Calculez les coûts des installations en acier et verre</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ItemForm onSubmit={handleAddItem} />
          
          <div className="bg-white p-6 rounded-xl shadow-soft">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Catégories</h2>
            <div className="flex flex-wrap gap-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${activeSection === section.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-secondary-50 text-secondary-700 hover:bg-secondary-100'
                    }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>

          <ItemList items={filteredItems} onDeleteItem={handleDeleteItem} />
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-soft">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Résumé</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                <span className="text-secondary-700">Surface Totale</span>
                <span className="font-medium text-secondary-900">{formatNumber(totals.totalSquareFootage)} m²</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                <span className="text-secondary-700">Coûts Matériaux</span>
                <span className="font-medium text-secondary-900">{formatCurrency(totals.totalMaterialCost)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                <span className="text-secondary-700">Frais Supplémentaires</span>
                <span className="font-medium text-secondary-900">{formatCurrency(totals.totalExtraCosts)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                <span className="text-secondary-700">Coûts d'Installation</span>
                <span className="font-medium text-secondary-900">{formatCurrency(totals.totalInstallationCosts)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg border border-primary-200">
                <span className="text-primary-900 font-semibold">Total Général</span>
                <span className="text-primary-900 font-bold text-xl">{formatCurrency(totals.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimate; 