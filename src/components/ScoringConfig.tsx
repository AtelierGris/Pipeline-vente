import React from 'react';
import { useForm } from 'react-hook-form';
import { ScoringWeights, PriorityThresholds } from '../types/lead';

interface FormData {
  leadTime_urgent: string;
  leadTime_flexible: string;
  leadTime_long_term: string;
  finishQuality_basic: string;
  finishQuality_standard: string;
  finishQuality_premium: string;
  finishQuality_luxury: string;
  professionals_designer: string;
  professionals_architect: string;
  professionals_general_contractor: string;
  professionals_engineer: string;
  professionals_woodworker_artisan: string;
  designFabricationRatio_mostly_design: string;
  designFabricationRatio_balanced: string;
  designFabricationRatio_mostly_fabrication: string;
  complexity_simple: string;
  complexity_moderate: string;
  complexity_complex: string;
  clientType_new: string;
  clientType_returning: string;
  projectSize_small: string;
  projectSize_medium: string;
  projectSize_large: string;
  budgetRange_low: string;
  budgetRange_medium: string;
  budgetRange_high: string;
  timelineFlexibility_strict: string;
  timelineFlexibility_moderate: string;
  timelineFlexibility_flexible: string;
  good_but_save_for_later: string;
  good_easy_quick: string;
  big_and_tough: string;
  risky: string;
  added_value_opportunity: string;
}

interface ScoringConfigProps {
  weights: ScoringWeights;
  thresholds: PriorityThresholds;
  onSave: (weights: ScoringWeights, thresholds: PriorityThresholds) => void;
}

const ScoringConfig: React.FC<ScoringConfigProps> = ({ weights, thresholds, onSave }) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      leadTime_urgent: weights.leadTime.urgent.toString(),
      leadTime_flexible: weights.leadTime.flexible.toString(),
      leadTime_long_term: weights.leadTime.long_term.toString(),
      finishQuality_basic: weights.finishQuality.basic.toString(),
      finishQuality_standard: weights.finishQuality.standard.toString(),
      finishQuality_premium: weights.finishQuality.premium.toString(),
      finishQuality_luxury: weights.finishQuality.luxury.toString(),
      professionals_designer: weights.professionals.designer.toString(),
      professionals_architect: weights.professionals.architect.toString(),
      professionals_general_contractor: weights.professionals.general_contractor.toString(),
      professionals_engineer: weights.professionals.engineer.toString(),
      professionals_woodworker_artisan: weights.professionals.woodworker_artisan.toString(),
      designFabricationRatio_mostly_design: weights.designFabricationRatio.mostly_design.toString(),
      designFabricationRatio_balanced: weights.designFabricationRatio.balanced.toString(),
      designFabricationRatio_mostly_fabrication: weights.designFabricationRatio.mostly_fabrication.toString(),
      complexity_simple: weights.complexity.simple.toString(),
      complexity_moderate: weights.complexity.moderate.toString(),
      complexity_complex: weights.complexity.complex.toString(),
      clientType_new: weights.clientType.new.toString(),
      clientType_returning: weights.clientType.returning.toString(),
      projectSize_small: weights.projectSize.small.toString(),
      projectSize_medium: weights.projectSize.medium.toString(),
      projectSize_large: weights.projectSize.large.toString(),
      budgetRange_low: weights.budgetRange.low.toString(),
      budgetRange_medium: weights.budgetRange.medium.toString(),
      budgetRange_high: weights.budgetRange.high.toString(),
      timelineFlexibility_strict: weights.timelineFlexibility.strict.toString(),
      timelineFlexibility_moderate: weights.timelineFlexibility.moderate.toString(),
      timelineFlexibility_flexible: weights.timelineFlexibility.flexible.toString(),
      good_but_save_for_later: thresholds.good_but_save_for_later.toString(),
      good_easy_quick: thresholds.good_easy_quick.toString(),
      big_and_tough: thresholds.big_and_tough.toString(),
      risky: thresholds.risky.toString(),
      added_value_opportunity: thresholds.added_value_opportunity.toString(),
    }
  });

  const onSubmit = (data: FormData) => {
    const newWeights: ScoringWeights = {
      leadTime: {
        urgent: Number(data.leadTime_urgent),
        flexible: Number(data.leadTime_flexible),
        long_term: Number(data.leadTime_long_term)
      },
      finishQuality: {
        basic: Number(data.finishQuality_basic),
        standard: Number(data.finishQuality_standard),
        premium: Number(data.finishQuality_premium),
        luxury: Number(data.finishQuality_luxury)
      },
      professionals: {
        designer: Number(data.professionals_designer),
        architect: Number(data.professionals_architect),
        general_contractor: Number(data.professionals_general_contractor),
        engineer: Number(data.professionals_engineer),
        woodworker_artisan: Number(data.professionals_woodworker_artisan)
      },
      designFabricationRatio: {
        mostly_design: Number(data.designFabricationRatio_mostly_design),
        balanced: Number(data.designFabricationRatio_balanced),
        mostly_fabrication: Number(data.designFabricationRatio_mostly_fabrication)
      },
      complexity: {
        simple: Number(data.complexity_simple),
        moderate: Number(data.complexity_moderate),
        complex: Number(data.complexity_complex)
      },
      clientType: {
        new: Number(data.clientType_new),
        returning: Number(data.clientType_returning)
      },
      projectSize: {
        small: Number(data.projectSize_small),
        medium: Number(data.projectSize_medium),
        large: Number(data.projectSize_large)
      },
      budgetRange: {
        low: Number(data.budgetRange_low),
        medium: Number(data.budgetRange_medium),
        high: Number(data.budgetRange_high)
      },
      timelineFlexibility: {
        strict: Number(data.timelineFlexibility_strict),
        moderate: Number(data.timelineFlexibility_moderate),
        flexible: Number(data.timelineFlexibility_flexible)
      }
    };

    const newThresholds: PriorityThresholds = {
      good_but_save_for_later: Number(data.good_but_save_for_later),
      good_easy_quick: Number(data.good_easy_quick),
      big_and_tough: Number(data.big_and_tough),
      risky: Number(data.risky),
      added_value_opportunity: Number(data.added_value_opportunity)
    };

    onSave(newWeights, newThresholds);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <h2 className="text-2xl font-normal text-gray-900 mb-8">Scoring Configuration</h2>

      {/* Lead Time Weights */}
      <div className="space-y-4">
        <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Lead Time Weights</h3>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Urgent</label>
            <input
              type="number"
              {...register('leadTime_urgent')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Flexible</label>
            <input
              type="number"
              {...register('leadTime_flexible')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Long Term</label>
            <input
              type="number"
              {...register('leadTime_long_term')}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Finish Quality Weights */}
      <div className="space-y-4">
        <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Finish Quality Weights</h3>
        <div className="grid grid-cols-4 gap-8">
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Basic</label>
            <input
              type="number"
              {...register('finishQuality_basic')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Standard</label>
            <input
              type="number"
              {...register('finishQuality_standard')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Premium</label>
            <input
              type="number"
              {...register('finishQuality_premium')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Luxury</label>
            <input
              type="number"
              {...register('finishQuality_luxury')}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Priority Thresholds */}
      <div className="space-y-4">
        <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Priority Thresholds</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Good but Save for Later</label>
            <input
              type="number"
              {...register('good_but_save_for_later')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Good Easy Quick</label>
            <input
              type="number"
              {...register('good_easy_quick')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Big and Tough</label>
            <input
              type="number"
              {...register('big_and_tough')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Risky</label>
            <input
              type="number"
              {...register('risky')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Added Value Opportunity</label>
            <input
              type="number"
              {...register('added_value_opportunity')}
              className="form-input"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 border-2 border-primary text-sm font-normal text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors uppercase tracking-wide"
      >
        Save Configuration
      </button>
    </form>
  );
};

export default ScoringConfig; 