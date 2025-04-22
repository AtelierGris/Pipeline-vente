import React from 'react';
import { EstimateItem } from './types';

interface ItemListProps {
  items: EstimateItem[];
  onDeleteItem: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDeleteItem }) => {
  const formatCurrency = (amount: number | undefined) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount || 0);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800 text-center text-gray-300">
        Aucun élément ajouté. Utilisez le formulaire ci-dessus pour ajouter des éléments à votre devis.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800 overflow-x-auto">
      <h2 className="text-xl font-semibold text-white mb-4">Liste des Éléments</h2>
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Nom
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Dimensions
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Quantité
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Surface
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Prix/m²
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Coût Matériaux
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Frais Supp.
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Coût Install.
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {item.width}" × {item.height}"
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {formatNumber(item.squareFootage)}m²
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {formatCurrency(item.pricePerSqFt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {formatCurrency(item.materialCost)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {formatCurrency(item.extraCosts)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {formatCurrency(item.installationCosts)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {formatCurrency(item.totalCost)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList; 