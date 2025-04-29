import React from 'react';
import { useForm } from 'react-hook-form';
import { ScoringWeights, PriorityThresholds, DealbreakerSettings } from '../types/lead';

interface FormData {
  leadTime_asap: string;
  leadTime_within_1_month: string;
  leadTime_1_3_months: string;
  leadTime_3_6_months: string;
  leadTime_over_6_months: string;
  finishQuality_basic: string;
  finishQuality_mid_range: string;
  finishQuality_high_end: string;
  finishQuality_luxury: string;
  professionals_architect: string;
  professionals_interior_designer: string;
  professionals_general_contractor: string;
  professionals_none: string;
  designFabricationRatio_mostly_design: string;
  designFabricationRatio_balanced: string;
  designFabricationRatio_mostly_fabrication: string;
  complexity_simple: string;
  complexity_moderate: string;
  complexity_complex: string;
  clientCategory_large_architecture_firm: string;
  clientCategory_small_architecture_firm: string;
  clientCategory_big_contractor: string;
  clientCategory_small_contractor: string;
  clientCategory_individual: string;
  clientCategory_store: string;
  clientCategory_other: string;
  clientType_new: string;
  clientType_returning: string;
  projectSize_small: string;
  projectSize_medium: string;
  projectSize_large: string;
  timelineFlexibility_strict: string;
  timelineFlexibility_moderate: string;
  timelineFlexibility_flexible: string;
  good_but_save_for_later: string;
  good_easy_quick: string;
  big_and_tough: string;
  risky: string;
  added_value_opportunity: string;
  minimumLeadTime_urgent: string;
  minimumLeadTime_flexible: string;
  minimumLeadTime_long_term: string;
  minimumProfessionals: string;
  maximumComplexity_simple: string;
  maximumComplexity_moderate: string;
  maximumComplexity_complex: string;
  minimumDesignRatio: string;
}

interface ScoringConfigProps {
  weights: ScoringWeights;
  thresholds: PriorityThresholds;
  dealbreakerSettings: DealbreakerSettings;
  onSave: (weights: ScoringWeights, thresholds: PriorityThresholds, dealbreakerSettings: DealbreakerSettings) => void;
}

const ScoringConfig: React.FC<ScoringConfigProps> = ({ weights, thresholds, dealbreakerSettings, onSave }) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      leadTime_asap: weights.leadTime.asap.toString(),
      leadTime_within_1_month: weights.leadTime.within_1_month.toString(),
      leadTime_1_3_months: weights.leadTime['1_3_months'].toString(),
      leadTime_3_6_months: weights.leadTime['3_6_months'].toString(),
      leadTime_over_6_months: weights.leadTime.over_6_months.toString(),
      finishQuality_basic: weights.finishQuality.basic.toString(),
      finishQuality_mid_range: weights.finishQuality.mid_range.toString(),
      finishQuality_high_end: weights.finishQuality.high_end.toString(),
      finishQuality_luxury: weights.finishQuality.luxury.toString(),
      professionals_architect: weights.professionals.architect.toString(),
      professionals_interior_designer: weights.professionals.interior_designer.toString(),
      professionals_general_contractor: weights.professionals.general_contractor.toString(),
      professionals_none: weights.professionals.none.toString(),
      designFabricationRatio_mostly_design: weights.designFabricationRatio.mostly_design.toString(),
      designFabricationRatio_balanced: weights.designFabricationRatio.balanced.toString(),
      designFabricationRatio_mostly_fabrication: weights.designFabricationRatio.mostly_fabrication.toString(),
      complexity_simple: weights.complexity.simple.toString(),
      complexity_moderate: weights.complexity.moderate.toString(),
      complexity_complex: weights.complexity.complex.toString(),
      clientCategory_large_architecture_firm: weights.clientCategory.large_architecture_firm.toString(),
      clientCategory_small_architecture_firm: weights.clientCategory.small_architecture_firm.toString(),
      clientCategory_big_contractor: weights.clientCategory.big_contractor.toString(),
      clientCategory_small_contractor: weights.clientCategory.small_contractor.toString(),
      clientCategory_individual: weights.clientCategory.individual.toString(),
      clientCategory_store: weights.clientCategory.store.toString(),
      clientCategory_other: weights.clientCategory.other.toString(),
      clientType_new: weights.clientType.new.toString(),
      clientType_returning: weights.clientType.returning.toString(),
      projectSize_small: weights.projectSize.small.toString(),
      projectSize_medium: weights.projectSize.medium.toString(),
      projectSize_large: weights.projectSize.large.toString(),
      timelineFlexibility_strict: weights.timelineFlexibility.strict.toString(),
      timelineFlexibility_moderate: weights.timelineFlexibility.moderate.toString(),
      timelineFlexibility_flexible: weights.timelineFlexibility.flexible.toString(),
      good_but_save_for_later: thresholds.good_but_save_for_later.toString(),
      good_easy_quick: thresholds.good_easy_quick.toString(),
      big_and_tough: thresholds.big_and_tough.toString(),
      risky: thresholds.risky.toString(),
      added_value_opportunity: thresholds.added_value_opportunity.toString(),
      minimumLeadTime_urgent: dealbreakerSettings.minimumLeadTime.urgent.toString(),
      minimumLeadTime_flexible: dealbreakerSettings.minimumLeadTime.flexible.toString(),
      minimumLeadTime_long_term: dealbreakerSettings.minimumLeadTime.long_term.toString(),
      minimumProfessionals: dealbreakerSettings.minimumProfessionals.toString(),
      maximumComplexity_simple: dealbreakerSettings.maximumComplexity.simple.toString(),
      maximumComplexity_moderate: dealbreakerSettings.maximumComplexity.moderate.toString(),
      maximumComplexity_complex: dealbreakerSettings.maximumComplexity.complex.toString(),
      minimumDesignRatio: dealbreakerSettings.minimumDesignRatio.toString(),
    }
  });

  const onSubmit = (data: FormData) => {
    const newWeights: ScoringWeights = {
      leadTime: {
        asap: Number(data.leadTime_asap),
        within_1_month: Number(data.leadTime_within_1_month),
        '1_3_months': Number(data.leadTime_1_3_months),
        '3_6_months': Number(data.leadTime_3_6_months),
        over_6_months: Number(data.leadTime_over_6_months)
      },
      deliveryFlexibility: {
        firm_date: 1.0,
        very_flexible: 0.5
      },
      finishQuality: {
        basic: Number(data.finishQuality_basic),
        mid_range: Number(data.finishQuality_mid_range),
        high_end: Number(data.finishQuality_high_end),
        luxury: Number(data.finishQuality_luxury)
      },
      professionals: {
        architect: Number(data.professionals_architect),
        interior_designer: Number(data.professionals_interior_designer),
        general_contractor: Number(data.professionals_general_contractor),
        none: Number(data.professionals_none)
      },
      projectType: {
        new_build: 1.0,
        major_renovation: 0.9,
        addition: 0.8,
        kitchen_bath_reno: 0.7,
        specific_scope: 0.6,
        commercial_fit_out: 0.5,
        other: 0.4
      },
      jobSize: {
        small: 0.3,
        medium: 0.6,
        large: 0.8,
        very_large: 1.0
      },
      projectComplexity: {
        very_simple: 0.3,
        very_complex: 1.0
      },
      clarityOfMandate: {
        vague_idea: 0.3,
        detailed_plans: 1.0
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
      clientCategory: {
        large_architecture_firm: Number(data.clientCategory_large_architecture_firm),
        small_architecture_firm: Number(data.clientCategory_small_architecture_firm),
        big_contractor: Number(data.clientCategory_big_contractor),
        small_contractor: Number(data.clientCategory_small_contractor),
        individual: Number(data.clientCategory_individual),
        store: Number(data.clientCategory_store),
        other: Number(data.clientCategory_other)
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

    const newDealbreakerSettings: DealbreakerSettings = {
      minimumLeadTime: {
        urgent: Number(data.minimumLeadTime_urgent),
        flexible: Number(data.minimumLeadTime_flexible),
        long_term: Number(data.minimumLeadTime_long_term)
      },
      minimumProfessionals: Number(data.minimumProfessionals),
      maximumComplexity: {
        simple: data.maximumComplexity_simple === 'true',
        moderate: data.maximumComplexity_moderate === 'true',
        complex: data.maximumComplexity_complex === 'true'
      },
      minimumDesignRatio: Number(data.minimumDesignRatio)
    };

    onSave(newWeights, newThresholds, newDealbreakerSettings);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <h2 className="text-2xl font-normal text-gray-900 mb-8">CONFIGURATION DU SYSTÈME</h2>

      {/* Client Category Weights */}
      <div className="space-y-4">
        <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Pondération par Type de Client</h3>
        <p className="text-sm text-gray-600 mb-4">
          Ces poids déterminent l'importance relative de chaque type de client dans le calcul du score de valeur.
          Les clients avec des poids plus élevés auront un impact plus significatif sur le score total.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Grande Firme d'Architecture</label>
            <input
              type="number"
              {...register('clientCategory_large_architecture_firm')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Petite Firme d'Architecture</label>
            <input
              type="number"
              {...register('clientCategory_small_architecture_firm')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Grand Entrepreneur</label>
            <input
              type="number"
              {...register('clientCategory_big_contractor')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Petit Entrepreneur</label>
            <input
              type="number"
              {...register('clientCategory_small_contractor')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Particulier</label>
            <input
              type="number"
              {...register('clientCategory_individual')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Commerce</label>
            <input
              type="number"
              {...register('clientCategory_store')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Autre</label>
            <input
              type="number"
              {...register('clientCategory_other')}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Lead Time Weights */}
      <div className="space-y-4">
        <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Pondération des Délais</h3>
        <p className="text-sm text-gray-600 mb-4">
          Ces poids influencent le score d'urgence. Les délais plus courts ont généralement des poids plus élevés,
          reflétant leur priorité plus élevée dans le processus de tri.
        </p>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Urgent</label>
            <input
              type="number"
              {...register('leadTime_asap')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Flexible</label>
            <input
              type="number"
              {...register('leadTime_within_1_month')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Long Terme</label>
            <input
              type="number"
              {...register('leadTime_1_3_months')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Long Terme</label>
            <input
              type="number"
              {...register('leadTime_3_6_months')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Long Terme</label>
            <input
              type="number"
              {...register('leadTime_over_6_months')}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Priority Thresholds */}
      <div className="space-y-4">
        <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Seuils de Priorité</h3>
        <p className="text-sm text-gray-600 mb-4">
          Ces seuils déterminent la catégorisation des prospects en fonction de leur score total.
          Chaque seuil représente le score minimum requis pour être classé dans une catégorie spécifique.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">À Conserver</label>
            <input
              type="number"
              {...register('good_but_save_for_later')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Simple et Rapide</label>
            <input
              type="number"
              {...register('good_easy_quick')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Grand et Complexe</label>
            <input
              type="number"
              {...register('big_and_tough')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Risqué</label>
            <input
              type="number"
              {...register('risky')}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Opportunité à Valeur Ajoutée</label>
            <input
              type="number"
              {...register('added_value_opportunity')}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Dealbreaker Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Paramètres des Dealbreakers</h3>
        <p className="text-sm text-gray-600 mb-4">
          Ces paramètres définissent les critères qui peuvent automatiquement disqualifier un prospect.
          Si un prospect ne répond pas à ces critères minimums, il sera marqué comme non éligible.
        </p>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-normal text-gray-600 uppercase tracking-wide mb-4">Délais Minimum</h4>
            <p className="text-sm text-gray-600 mb-4">
              Définit les délais minimums acceptables pour différents niveaux d'urgence.
              Les prospects avec des délais plus courts que ces seuils seront considérés comme non éligibles.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Urgent (jours)</label>
                <input
                  type="number"
                  {...register('minimumLeadTime_urgent')}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Flexible (jours)</label>
                <input
                  type="number"
                  {...register('minimumLeadTime_flexible')}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Long Terme (jours)</label>
                <input
                  type="number"
                  {...register('minimumLeadTime_long_term')}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Nombre Minimum de Professionnels</label>
            <p className="text-sm text-gray-600 mb-2">
              Définit le nombre minimum de professionnels requis pour qu'un projet soit considéré comme viable.
            </p>
            <input
              type="number"
              {...register('minimumProfessionals')}
              className="form-input"
            />
          </div>

          <div>
            <h4 className="text-sm font-normal text-gray-600 uppercase tracking-wide mb-4">Complexité Maximum</h4>
            <p className="text-sm text-gray-600 mb-4">
              Définit les niveaux de complexité maximum acceptables pour différents types de projets.
              Les projets plus complexes que ces seuils seront considérés comme non éligibles.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('maximumComplexity_simple')}
                  className="form-checkbox h-4 w-4 text-primary"
                />
                <label className="ml-2 text-sm font-normal text-gray-600">Simple</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('maximumComplexity_moderate')}
                  className="form-checkbox h-4 w-4 text-primary"
                />
                <label className="ml-2 text-sm font-normal text-gray-600">Modéré</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('maximumComplexity_complex')}
                  className="form-checkbox h-4 w-4 text-primary"
                />
                <label className="ml-2 text-sm font-normal text-gray-600">Complexe</label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-normal text-gray-600 uppercase tracking-wide">Ratio Design/Fabrication Minimum</label>
            <p className="text-sm text-gray-600 mb-2">
              Définit le ratio minimum acceptable entre le design et la fabrication.
              Les projets avec un ratio inférieur seront considérés comme non éligibles.
            </p>
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              {...register('minimumDesignRatio')}
              className="form-input"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 border-2 border-primary text-sm font-normal text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors uppercase tracking-wide"
      >
        ENREGISTRER LA CONFIGURATION
      </button>
    </form>
  );
};

export default ScoringConfig; 