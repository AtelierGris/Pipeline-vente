import React from 'react';
import { useForm } from 'react-hook-form';
import { LeadFormData, ProfessionalType } from '../types/lead';

const professionalTypes: ProfessionalType[] = [
  'designer',
  'architect',
  'general_contractor',
  'engineer',
  'woodworker_artisan'
];

const LeadIntakeForm: React.FC<{ onSubmit: (data: LeadFormData) => void }> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-2xl font-normal text-gray-900 mb-8">New Lead Information</h2>
      
      {/* Lead Time */}
      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Estimate Lead Time</label>
        <select
          {...register('leadTime', { required: true })}
          className="form-input"
        >
          <option value="urgent">Urgent (1-2 weeks)</option>
          <option value="flexible">Flexible (2-4 weeks)</option>
          <option value="long_term">Long Term (4+ weeks)</option>
        </select>
      </div>

      {/* Finish Quality */}
      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Desired Quality of Finish</label>
        <select
          {...register('finishQuality', { required: true })}
          className="form-input"
        >
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      {/* Professionals */}
      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide mb-2">Project Professionals</label>
        <div className="grid grid-cols-2 gap-4">
          {professionalTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                value={type}
                {...register('professionals')}
                className="form-checkbox h-5 w-5 text-primary border-gray-300 rounded-none focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">
                {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Design/Fabrication Ratio */}
      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Design/Fabrication Ratio</label>
        <select
          {...register('designFabricationRatio', { required: true })}
          className="form-input"
        >
          <option value="mostly_design">Mostly Design</option>
          <option value="balanced">Balanced</option>
          <option value="mostly_fabrication">Mostly Fabrication</option>
        </select>
      </div>

      {/* Complexity */}
      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Project Complexity</label>
        <select
          {...register('complexity', { required: true })}
          className="form-input"
        >
          <option value="simple">Simple</option>
          <option value="moderate">Moderate</option>
          <option value="complex">Complex</option>
        </select>
      </div>

      {/* Client Type */}
      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Client Type</label>
        <select
          {...register('clientType', { required: true })}
          className="form-input"
        >
          <option value="new">New Client</option>
          <option value="returning">Returning Client</option>
        </select>
      </div>

      {/* Project Size */}
      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Project Size</label>
        <select
          {...register('projectSize', { required: true })}
          className="form-input"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Budget Range</label>
        <select
          {...register('budgetRange', { required: true })}
          className="form-input"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Timeline Flexibility */}
      <div>
        <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Timeline Flexibility</label>
        <select
          {...register('timelineFlexibility', { required: true })}
          className="form-input"
        >
          <option value="strict">Strict</option>
          <option value="moderate">Moderate</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 border-2 border-primary text-sm font-normal text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors uppercase tracking-wide"
      >
        Submit Lead
      </button>
    </form>
  );
};

export default LeadIntakeForm; 