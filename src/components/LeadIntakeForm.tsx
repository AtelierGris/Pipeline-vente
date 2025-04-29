import React, { useState } from 'react';
import { LeadFormData } from '../types/lead';

interface LeadIntakeFormProps {
  onSubmit: (formData: LeadFormData) => void;
}

const LeadIntakeForm: React.FC<LeadIntakeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    clientName: '',
    contactEmail: '',
    contactPhone: '',
    leadSource: 'website_inquiry',
    projectType: 'other',
    leadTime: 'within_1_month',
    deliveryFlexibility: 3,
    finishQuality: 'mid_range',
    professionals: {
      architect: false,
      interior_designer: false,
      general_contractor: false,
      none: false
    },
    jobSize: 50000,
    projectComplexity: 3,
    clarityOfMandate: 3,
    notes: '',
    projectSize: 'medium',
    clientCategory: 'individual',
    clientType: 'new',
    timelineFlexibility: 'moderate',
    complexity: 'moderate',
    designFabricationRatio: 'balanced'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        professionals: {
          ...prev.professionals,
          [name]: checkbox.checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Informations de Base</h3>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Nom du Client</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Téléphone</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
              required
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Détails du Projet</h3>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Source du Lead</label>
            <select
              name="leadSource"
              value={formData.leadSource}
              onChange={handleChange}
              className="form-select mt-1 block w-full"
            >
              <option value="referral">Référence</option>
              <option value="repeat_client">Client Répété</option>
              <option value="website_inquiry">Site Web</option>
              <option value="tender_platform">Plateforme d'Appels d'Offres</option>
              <option value="advertisement">Publicité</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Type de Projet</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="form-select mt-1 block w-full"
            >
              <option value="new_build">Nouvelle Construction</option>
              <option value="major_renovation">Rénovation Majeure</option>
              <option value="addition">Ajout</option>
              <option value="kitchen_bath_reno">Rénovation Cuisine/Salle de Bain</option>
              <option value="specific_scope">Portée Spécifique</option>
              <option value="commercial_fit_out">Aménagement Commercial</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Délais</h3>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Délai Requis</label>
            <select
              name="leadTime"
              value={formData.leadTime}
              onChange={handleChange}
              className="form-select mt-1 block w-full"
            >
              <option value="asap">ASAP (&lt;1 semaine)</option>
              <option value="within_1_month">Dans 1 mois</option>
              <option value="1_3_months">1-3 mois</option>
              <option value="3_6_months">3-6 mois</option>
              <option value="over_6_months">&gt;6 mois</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">
              Flexibilité de Livraison (1: Date Fixe - 5: Très Flexible)
            </label>
            <input
              type="range"
              name="deliveryFlexibility"
              min="1"
              max="5"
              value={formData.deliveryFlexibility}
              onChange={handleChange}
              className="w-full mt-1"
            />
            <div className="text-sm text-gray-500 text-center">{formData.deliveryFlexibility}</div>
          </div>
        </div>

        {/* Project Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Spécifications</h3>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Qualité de Finition</label>
            <select
              name="finishQuality"
              value={formData.finishQuality}
              onChange={handleChange}
              className="form-select mt-1 block w-full"
            >
              <option value="basic">Basique/Standard</option>
              <option value="mid_range">Moyen de Gamme</option>
              <option value="high_end">Haut de Gamme</option>
              <option value="luxury">Luxe/Sur Mesure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Taille du Projet ($)</label>
            <input
              type="range"
              name="jobSize"
              min="1000"
              max="1000000"
              step="1000"
              value={formData.jobSize}
              onChange={handleChange}
              className="w-full mt-1"
            />
            <div className="text-sm text-gray-500 text-center">
              ${formData.jobSize.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Professionals */}
        <div className="space-y-4">
          <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Professionnels Impliqués</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="architect"
                checked={formData.professionals.architect}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Architecte</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="interior_designer"
                checked={formData.professionals.interior_designer}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Designer d'Intérieur</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="general_contractor"
                checked={formData.professionals.general_contractor}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Entrepreneur Général</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="none"
                checked={formData.professionals.none}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Aucun</span>
            </label>
          </div>
        </div>

        {/* Project Assessment */}
        <div className="space-y-4">
          <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Évaluation du Projet</h3>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">
              Complexité (1: Très Simple - 5: Très Complexe/Unique)
            </label>
            <input
              type="range"
              name="projectComplexity"
              min="1"
              max="5"
              value={formData.projectComplexity}
              onChange={handleChange}
              className="w-full mt-1"
            />
            <div className="text-sm text-gray-500 text-center">{formData.projectComplexity}</div>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">
              Clarté du Mandat (1: Idée Vague - 5: Plans et Spécifications Détaillés)
            </label>
            <input
              type="range"
              name="clarityOfMandate"
              min="1"
              max="5"
              value={formData.clarityOfMandate}
              onChange={handleChange}
              className="w-full mt-1"
            />
            <div className="text-sm text-gray-500 text-center">{formData.clarityOfMandate}</div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="form-textarea mt-1 block w-full"
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default LeadIntakeForm; 