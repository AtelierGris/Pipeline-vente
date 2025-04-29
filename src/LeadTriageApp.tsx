import React, { useState } from 'react';
import LeadIntakeForm from './components/LeadIntakeForm';
import ScoringConfig from './components/ScoringConfig';
import Logo from './components/Logo';
import { Lead, LeadFormData, ScoringWeights, PriorityThresholds, DealbreakerSettings } from './types/lead';
import { processLead } from './services/scoringService';

const LeadTriageApp: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'config'>('leads');
  const [weights, setWeights] = useState<ScoringWeights>(() => ({
    leadTime: {
      asap: 1.0,
      within_1_month: 0.8,
      '1_3_months': 0.6,
      '3_6_months': 0.4,
      over_6_months: 0.2
    },
    deliveryFlexibility: {
      firm_date: 1.0,
      very_flexible: 0.5
    },
    finishQuality: {
      basic: 0.3,
      mid_range: 0.6,
      high_end: 0.8,
      luxury: 1.0
    },
    professionals: {
      architect: 0.8,
      interior_designer: 0.6,
      general_contractor: 0.4,
      none: 0.2
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
    projectSize: {
      small: 0.3,
      medium: 0.6,
      large: 1.0
    },
    clientCategory: {
      large_architecture_firm: 1.0,
      small_architecture_firm: 0.8,
      big_contractor: 0.9,
      small_contractor: 0.7,
      individual: 0.5,
      store: 0.6,
      other: 0.4
    },
    clientType: {
      new: 0.5,
      returning: 1.0
    },
    timelineFlexibility: {
      strict: 0.3,
      moderate: 0.6,
      flexible: 1.0
    },
    complexity: {
      simple: 0.3,
      moderate: 0.6,
      complex: 1.0
    },
    designFabricationRatio: {
      mostly_design: 0.3,
      balanced: 0.6,
      mostly_fabrication: 1.0
    }
  }));

  const [thresholds] = useState<PriorityThresholds>(() => ({
    good_but_save_for_later: 0.6,
    good_easy_quick: 0.8,
    big_and_tough: 0.7,
    risky: 0.4,
    added_value_opportunity: 0.9
  }));

  const [dealbreakerSettings] = useState<DealbreakerSettings>(() => ({
    minimumLeadTime: {
      urgent: 0.8,
      flexible: 0.6,
      long_term: 0.4
    },
    minimumProfessionals: 0.5,
    maximumComplexity: {
      simple: true,
      moderate: true,
      complex: false
    },
    minimumDesignRatio: 0.3
  }));

  const handleLeadSubmit = (formData: LeadFormData) => {
    const processedLead = processLead(formData, weights);
    const newLead: Lead = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date(),
      leadOpportunityProfile: processedLead.leadOpportunityProfile,
      assignedEstimator: processedLead.assignedEstimator,
      urgencyScore: processedLead.urgency,
      complexityScore: processedLead.value,
      clarityScore: processedLead.fit,
      valueScore: processedLead.value,
      riskScore: processedLead.fit
    };
    setLeads(prevLeads => [newLead, ...prevLeads]);
  };

  const handleConfigSave = (newWeights: ScoringWeights, newThresholds: PriorityThresholds, newDealbreakerSettings: DealbreakerSettings) => {
    setWeights(newWeights);
    // Note: thresholds and dealbreakerSettings are not currently used in the scoring process
  };

  const getProfileLabel = (profile: Lead['leadOpportunityProfile']): string => {
    const labels: Record<Lead['leadOpportunityProfile'], string> = {
      fast_easy: 'Rapide et Facile',
      rush_simple: 'Urgent Simple',
      rush_complex: 'Urgent Complexe',
      standard_project: 'Projet Standard',
      high_value_strategic: 'Valeur Élevée Stratégique',
      added_value_potential: 'Potentiel de Valeur Ajoutée',
      high_effort_qualify: 'Qualification à Effort Élevé'
    };
    return labels[profile];
  };

  const getEstimatorLabel = (estimator: Lead['assignedEstimator']): string => {
    const labels: Record<Lead['assignedEstimator'], string> = {
      estimator_a: 'Estimateur A',
      estimator_b: 'Estimateur B',
      estimator_c: 'Estimateur C',
      estimator_d: 'Estimateur D'
    };
    return labels[estimator];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <Logo />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Système de Tri des Prospects
          </h1>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('leads')}
                className={`${
                  activeTab === 'leads'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Prospects
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`${
                  activeTab === 'config'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Configuration
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'leads' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Formulaire de Saisie</h2>
              <LeadIntakeForm onSubmit={handleLeadSubmit} />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Prospects Récents</h2>
              <div className="space-y-4">
                {leads.map(lead => (
                  <div key={lead.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{lead.clientName}</h3>
                        <p className="text-sm text-gray-500">{lead.contactEmail}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getProfileLabel(lead.leadOpportunityProfile)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Urgence</p>
                        <p className="font-medium">{lead.urgencyScore.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Complexité</p>
                        <p className="font-medium">{lead.complexityScore.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Clarté</p>
                        <p className="font-medium">{lead.clarityScore.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Valeur</p>
                        <p className="font-medium">{lead.valueScore.toFixed(1)}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Estimateur Assigné</p>
                      <p className="font-medium">{getEstimatorLabel(lead.assignedEstimator)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration du Système</h2>
            <ScoringConfig
              weights={weights}
              thresholds={thresholds}
              dealbreakerSettings={dealbreakerSettings}
              onSave={handleConfigSave}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadTriageApp; 