import React, { useState, ChangeEvent } from 'react';
import type { EstimateItem, ItemType, FrameMaterial, FinishType, PowdercoatColor, PlacageColor, ParcloseType } from './types';
import ShapeVisualizer from './ShapeVisualizer';

interface ItemFormProps {
  onSubmit: (item: EstimateItem) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<ItemType>('Partition');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [isArched, setIsArched] = useState(false);
  const [archHeight, setArchHeight] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [frameMaterial, setFrameMaterial] = useState<FrameMaterial>('HSS 3/4 x 1 1/2');
  const [horizontalSeparators, setHorizontalSeparators] = useState(0);
  const [verticalSeparators, setVerticalSeparators] = useState(0);
  const [useFlatSeparators, setUseFlatSeparators] = useState(false);
  const [glassType, setGlassType] = useState('Clair 6mm');
  const [finish, setFinish] = useState<FinishType>('Aucun fini');
  const [finishColor, setFinishColor] = useState<PowdercoatColor | PlacageColor | ''>('');
  const [needsMeasurement, setNeedsMeasurement] = useState(false);
  const [needsInstallation, setNeedsInstallation] = useState(false);
  const [parcloseType, setParcloseType] = useState<ParcloseType>('Carré 3/8');
  const [enApplique, setEnApplique] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: EstimateItem = {
      id: Date.now().toString(),
      name,
      type,
      width: parseFloat(width),
      height: parseFloat(height),
      isArched,
      archHeight: isArched ? parseFloat(archHeight) : undefined,
      quantity,
      frameMaterial,
      horizontalSeparators,
      verticalSeparators,
      useFlatSeparators,
      glassType,
      finish,
      finishColor,
      needsMeasurement,
      needsInstallation,
      squareFootage: (parseFloat(width) * parseFloat(height) * quantity) / 144,
      materialCost: 0,
      totalCost: 0,
      parcloseType,
      enApplique
    };

    onSubmit(newItem);
    
    // Reset form
    setName('');
    setType('Partition');
    setWidth('');
    setHeight('');
    setIsArched(false);
    setArchHeight('');
    setQuantity(1);
    setFrameMaterial('HSS 3/4 x 1 1/2');
    setHorizontalSeparators(0);
    setVerticalSeparators(0);
    setUseFlatSeparators(false);
    setGlassType('Clair 6mm');
    setFinish('Aucun fini');
    setFinishColor('');
    setNeedsMeasurement(false);
    setNeedsInstallation(false);
    setParcloseType('Carré 3/8');
    setEnApplique(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      switch (name) {
        case 'useFlatSeparators':
          setUseFlatSeparators(checked);
          break;
        case 'needsMeasurement':
          setNeedsMeasurement(checked);
          break;
        case 'needsInstallation':
          setNeedsInstallation(checked);
          break;
        case 'isArched':
          setIsArched(checked);
          if (!checked) {
            setArchHeight('');
          }
          break;
        case 'enApplique':
          setEnApplique(checked);
          break;
      }
    } else {
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'type':
          setType(value as ItemType);
          break;
        case 'frameMaterial':
          setFrameMaterial(value as FrameMaterial);
          break;
        case 'glassType':
          setGlassType(value);
          break;
        case 'finish':
          setFinish(value as FinishType);
          setFinishColor(''); // Reset finish color when finish type changes
          break;
        case 'finishColor':
          setFinishColor(value as PowdercoatColor | PlacageColor);
          break;
        case 'parcloseType':
          setParcloseType(value as ParcloseType);
          break;
        case 'quantity':
          setQuantity(parseInt(value) || 1);
          break;
        case 'width':
          setWidth(value);
          break;
        case 'height':
          setHeight(value);
          break;
        case 'archHeight':
          setArchHeight(value);
          break;
        case 'horizontalSeparators':
          setHorizontalSeparators(parseInt(value) || 0);
          break;
        case 'verticalSeparators':
          setVerticalSeparators(parseInt(value) || 0);
          break;
      }
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnApplique(e.target.checked);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-4">Ajouter un Élément</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Nom de l'Élément
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">
                  Quantité
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-300">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="Partition">Partition</option>
                <option value="Porte">Porte</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isArched"
                name="isArched"
                checked={isArched}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isArched" className="ml-2 block text-sm text-gray-300">
                Forme Arquée
              </label>
            </div>

            {isArched && (
              <div className="md:col-span-2 flex justify-end">
                <div className="w-1/2">
                  <label htmlFor="archHeight" className="block text-sm font-medium text-gray-300">
                    Hauteur de l'Arc (pouces)
                  </label>
                  <input
                    type="number"
                    id="archHeight"
                    name="archHeight"
                    value={archHeight}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="width" className="block text-sm font-medium text-gray-300">
                Largeur (pouces)
              </label>
              <input
                type="number"
                id="width"
                name="width"
                value={width}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-300">
                Hauteur (pouces)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={height}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="frameMaterial" className="block text-sm font-medium text-gray-300">
                Matériau du Cadre
              </label>
              <select
                id="frameMaterial"
                name="frameMaterial"
                value={frameMaterial}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              >
                <option value="">Sélectionner un matériau</option>
                <option value="HSS 3/4 x 1 1/2">HSS 3/4 x 1 1/2</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="useFlatSeparators"
                name="useFlatSeparators"
                checked={useFlatSeparators}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="useFlatSeparators" className="ml-2 block text-sm text-gray-300">
                Séparateur en fer plat
              </label>
            </div>

            <div>
              <label htmlFor="parcloseType" className="block text-sm font-medium text-gray-300">
                Parclose
              </label>
              <select
                id="parcloseType"
                name="parcloseType"
                value={parcloseType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              >
                <option value="Carré 3/8">Carré 3/8</option>
                <option value="Carré 1/2">Carré 1/2</option>
                <option value="L 1/2">L 1/2</option>
                <option value="L 3/4">L 3/4</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="enApplique"
                name="enApplique"
                checked={enApplique}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="enApplique" className="ml-2 block text-sm text-gray-300">
                En applique
              </label>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Séparateurs horizontaux
                </label>
                <input
                  type="number"
                  min="0"
                  value={horizontalSeparators}
                  onChange={(e) => setHorizontalSeparators(parseInt(e.target.value) || 0)}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Séparateurs verticaux
                </label>
                <input
                  type="number"
                  min="0"
                  value={verticalSeparators}
                  onChange={(e) => setVerticalSeparators(parseInt(e.target.value) || 0)}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="glassType" className="block text-sm font-medium text-gray-300">
                Type de Verre
              </label>
              <select
                id="glassType"
                name="glassType"
                value={glassType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              >
                <option value="">Sélectionner un type de verre</option>
                <option value="Clair">Clair</option>
                <option value="Teinté">Teinté</option>
                <option value="Réfléchissant">Réfléchissant</option>
              </select>
            </div>

            <div className="col-span-2">
              <label htmlFor="finish" className="block text-sm font-medium text-gray-300">
                Fini
              </label>
              <select
                id="finish"
                name="finish"
                value={finish}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              >
                <option value="">Sélectionner un type de fini</option>
                <option value="Powdercoat">Powdercoat</option>
                <option value="Placage">Placage</option>
              </select>
            </div>

            {finish !== 'Aucun fini' && (
              <div className="col-span-2">
                <label htmlFor="finishColor" className="block text-sm font-medium text-gray-300">
                  Couleur du Fini
                </label>
                <select
                  id="finishColor"
                  name="finishColor"
                  value={finishColor}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                >
                  <option value="">Sélectionner une couleur</option>
                  {finish === 'Powdercoat' ? (
                    <>
                      <option value="Blanc">Blanc</option>
                      <option value="Noir">Noir</option>
                      <option value="Gris">Gris</option>
                    </>
                  ) : (
                    <>
                      <option value="Chêne">Chêne</option>
                      <option value="Érable">Érable</option>
                      <option value="Noyer">Noyer</option>
                    </>
                  )}
                </select>
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="needsMeasurement"
                name="needsMeasurement"
                checked={needsMeasurement}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="needsMeasurement" className="ml-2 block text-sm text-gray-300">
                Prise de mesure
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="needsInstallation"
                name="needsInstallation"
                checked={needsInstallation}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="needsInstallation" className="ml-2 block text-sm text-gray-300">
                Installation
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Ajouter
            </button>
          </div>
        </form>

        <div>
          <ShapeVisualizer
            width={parseFloat(width) || 0}
            height={parseFloat(height) || 0}
            archHeight={isArched ? parseFloat(archHeight) || 0 : undefined}
            isArched={isArched}
            horizontalSeparators={horizontalSeparators}
            verticalSeparators={verticalSeparators}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemForm; 