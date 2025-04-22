import React, { useState } from 'react';
import { EstimateItem } from './types';

interface BillOfMaterialsProps {
  items: EstimateItem[];
}

const BillOfMaterials: React.FC<BillOfMaterialsProps> = ({ items }) => {
  const [viewMode, setViewMode] = useState<'details' | 'list'>('list');

  // Calculate total materials and services
  const calculateTotals = () => {
    const materials = {
      hss: {
        'HSS 3/4 x 1 1/2': 0,
        'HSS 1 x 2': 0,
        'HSS 1 x 3': 0,
      },
      flat: {
        'Flat 3/8 x 1 1/2': 0,
        'Flat 3/8 x 2': 0,
        'Flat 1/2 x 2': 0,
      },
      glass: {
        'Clair 6mm': 0,
        'Clair 10mm': 0,
        'Flutex 6mm': 0,
        'Estriado 4.5mm': 0,
        'Givré 6mm': 0,
        'Bronze 6mm': 0,
        'Bronze 10mm': 0,
      },
      parclose: {
        'Carré 3/8': 0,
        'Carré 1/2': 0,
        'L 1/2': 0,
        'L 3/4': 0,
      },
      finish: {
        powdercoat: {
          total: 0,
          colors: {} as Record<string, number>,
        },
        placage: {
          total: 0,
          colors: {} as Record<string, number>,
        },
      },
      corners: 0,
      intersections: 0,
    };

    const services = {
      measurement: 0,
      installation: 0,
    };

    items.forEach(item => {
      // Calculate frame length (perimeter * quantity)
      const perimeter = 2 * (item.width + item.height) / 12; // Convert inches to feet
      const frameLength = perimeter * item.quantity;

      // Calculate total separators length
      const separatorsLength = ((item.horizontalSeparators * item.width) + (item.verticalSeparators * item.height)) / 12 * item.quantity;

      // Calculate corners (4 per frame)
      materials.corners += 4 * item.quantity;

      // Calculate intersections (2 per separator intersection)
      const intersections = item.horizontalSeparators * item.verticalSeparators * 2 * item.quantity;
      materials.intersections += intersections;

      // Calculate parclose length (perimeter * 2 + separators * 4)
      const parcloseLength = (perimeter * 2 + separatorsLength * 4) * item.quantity;
      materials.parclose[item.parcloseType] += parcloseLength;

      // Add frame material
      if (item.frameMaterial.startsWith('HSS')) {
        materials.hss[item.frameMaterial as keyof typeof materials.hss] += frameLength;
      } else if (item.frameMaterial.startsWith('Flat')) {
        materials.flat[item.frameMaterial as keyof typeof materials.flat] += frameLength;
      }

      // Add glass area
      const glassArea = (item.width * item.height * item.quantity) / 144; // Convert to square feet
      materials.glass[item.glassType as keyof typeof materials.glass] += glassArea;

      // Add finish
      if (item.finish === 'Powdercoat' && item.finishColor) {
        materials.finish.powdercoat.total += frameLength;
        materials.finish.powdercoat.colors[item.finishColor] = 
          (materials.finish.powdercoat.colors[item.finishColor] || 0) + frameLength;
      } else if (item.finish === 'Placage' && item.finishColor) {
        materials.finish.placage.total += frameLength;
        materials.finish.placage.colors[item.finishColor] = 
          (materials.finish.placage.colors[item.finishColor] || 0) + frameLength;
      }

      // Add services
      if (item.needsMeasurement) {
        services.measurement += 1;
      }
      if (item.needsInstallation) {
        services.installation += 1;
      }
    });

    return { materials, services };
  };

  const { materials, services } = calculateTotals();

  const calculateItemPrice = (item: EstimateItem) => {
    let total = 0;

    // Calculate frame perimeter and area
    const perimeter = 2 * (item.width + item.height) / 12; // Convert to feet
    const area = (item.width * item.height) / 144; // Convert to square feet

    // Frame material cost ($10/ft)
    total += perimeter * 10;

    // Glass cost ($10/sq ft)
    total += area * 10;

    // Separators cost ($10/ft)
    const separatorsLength = ((item.horizontalSeparators * item.width) + (item.verticalSeparators * item.height)) / 12;
    total += separatorsLength * 10;

    // Parclose cost ($10/ft)
    const parcloseLength = (perimeter * 2 + separatorsLength * 4);
    total += parcloseLength * 10;

    // Corners cost ($10/corner)
    total += 4 * 10; // 4 corners per frame

    // Intersections cost ($10/intersection)
    const intersections = item.horizontalSeparators * item.verticalSeparators * 2;
    total += intersections * 10;

    // Finish cost ($10/ft if applicable)
    if (item.finish !== 'Aucun fini') {
      total += perimeter * 10;
    }

    // Services
    if (item.needsMeasurement) total += 10;
    if (item.needsInstallation) total += 10;

    return total;
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          {viewMode === 'list' ? 'Liste des Éléments' : 'Détails des Matériaux'}
        </h2>
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'details' : 'list')}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {viewMode === 'list' ? 'Voir Détails' : 'Voir Liste'}
        </button>
      </div>

      {viewMode === 'list' ? (
        // Original order details view
        <table className="min-w-full divide-y divide-gray-800 mb-6">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Element</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantité</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prix Unitaire</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {items.map((item) => {
              const itemPrice = calculateItemPrice(item);
              return (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.type} - {item.width}" x {item.height}"
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${itemPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(itemPrice * item.quantity).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        // Detailed materials view
        <table className="min-w-full divide-y divide-gray-800 mb-6">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantité</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prix Unitaire</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {/* Frame Materials */}
            {Object.entries(materials.hss).map(([type, quantity]) => (
              quantity > 0 && (
                <tr key={type}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{quantity.toFixed(2)} pi</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(quantity * 10).toFixed(2)}</td>
                </tr>
              )
            ))}
            {Object.entries(materials.flat).map(([type, quantity]) => (
              quantity > 0 && (
                <tr key={type}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{quantity.toFixed(2)} pi</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(quantity * 10).toFixed(2)}</td>
                </tr>
              )
            ))}

            {/* Glass Materials */}
            {Object.entries(materials.glass).map(([type, area]) => (
              area > 0 && (
                <tr key={type}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Verre {type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{area.toFixed(2)} pi²</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(area * 10).toFixed(2)}</td>
                </tr>
              )
            ))}

            {/* Parclose Materials */}
            {Object.entries(materials.parclose).map(([type, quantity]) => (
              quantity > 0 && (
                <tr key={type}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Parclose {type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{quantity.toFixed(2)} pi</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(quantity * 10).toFixed(2)}</td>
                </tr>
              )
            ))}

            {/* Assembly Items */}
            {materials.corners > 0 && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Coins</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{materials.corners}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(materials.corners * 10).toFixed(2)}</td>
              </tr>
            )}
            {materials.intersections > 0 && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Intersections</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{materials.intersections}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(materials.intersections * 10).toFixed(2)}</td>
              </tr>
            )}

            {/* Finish Materials */}
            {Object.entries(materials.finish.powdercoat.colors).map(([color, quantity]) => (
              <tr key={`powdercoat-${color}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Powdercoat {color}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{quantity.toFixed(2)} pi</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(quantity * 10).toFixed(2)}</td>
              </tr>
            ))}
            {Object.entries(materials.finish.placage.colors).map(([color, quantity]) => (
              <tr key={`placage-${color}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Placage {color}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{quantity.toFixed(2)} pi</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(quantity * 10).toFixed(2)}</td>
              </tr>
            ))}

            {/* Services */}
            {services.measurement > 0 && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Prise de mesure</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{services.measurement}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(services.measurement * 10).toFixed(2)}</td>
              </tr>
            )}
            {services.installation > 0 && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Installation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{services.installation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">$10.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${(services.installation * 10).toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Grand Total */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Total</h3>
          <p className="text-2xl font-bold text-primary-400">
            ${items.reduce((total, item) => total + calculateItemPrice(item) * item.quantity, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillOfMaterials; 