import React, { useState } from 'react';
import LeadIntakeForm from './components/LeadIntakeForm';
import ScoringConfig from './components/ScoringConfig';
import { LeadFormData, Lead, ScoringWeights, PriorityThresholds } from './types/lead';
import { calculateLeadScore, determinePriorityCategory, assignSpecialist } from './services/scoringService';

const LeadTriageApp: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showConfig, setShowConfig] = useState(false);
  const [weights, setWeights] = useState<ScoringWeights>({
    leadTime: {
      urgent: 3,
      flexible: 2,
      long_term: 1
    },
    finishQuality: {
      basic: 1,
      standard: 2,
      premium: 3,
      luxury: 4
    },
    professionals: {
      designer: 2,
      architect: 3,
      general_contractor: 2,
      engineer: 3,
      woodworker_artisan: 2
    },
    designFabricationRatio: {
      mostly_design: 3,
      balanced: 2,
      mostly_fabrication: 1
    },
    complexity: {
      simple: 1,
      moderate: 2,
      complex: 3
    },
    clientType: {
      new: 1,
      returning: 2
    },
    projectSize: {
      small: 1,
      medium: 2,
      large: 3
    },
    budgetRange: {
      low: 1,
      medium: 2,
      high: 3
    },
    timelineFlexibility: {
      strict: 1,
      moderate: 2,
      flexible: 3
    }
  });

  const [thresholds, setThresholds] = useState<PriorityThresholds>({
    good_but_save_for_later: 15,
    good_easy_quick: 20,
    big_and_tough: 25,
    risky: 30,
    added_value_opportunity: 35
  });

  const handleLeadSubmit = (formData: LeadFormData) => {
    const score = calculateLeadScore(formData, weights);
    const priorityCategory = determinePriorityCategory(score, thresholds);
    const assignedSpecialist = assignSpecialist(priorityCategory, score);

    const newLead: Lead = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date(),
      priorityCategory,
      assignedSpecialist,
      score
    };

    setLeads([...leads, newLead]);
  };

  const handleConfigSave = (newWeights: ScoringWeights, newThresholds: PriorityThresholds) => {
    setWeights(newWeights);
    setThresholds(newThresholds);
    setShowConfig(false);
  };

  const getPriorityColor = (priority: Lead['priorityCategory']) => {
    switch (priority) {
      case 'good_but_save_for_later':
        return 'border-gray-300';
      case 'good_easy_quick':
        return 'border-primary';
      case 'big_and_tough':
        return 'border-gray-600';
      case 'risky':
        return 'border-gray-800';
      case 'added_value_opportunity':
        return 'border-primary border-2';
      default:
        return 'border-gray-200';
    }
  };

  const getPriorityLabel = (priority: Lead['priorityCategory']) => {
    switch (priority) {
      case 'good_but_save_for_later':
        return 'Good but Save for Later';
      case 'good_easy_quick':
        return 'Good Easy Quick';
      case 'big_and_tough':
        return 'Big and Tough';
      case 'risky':
        return 'Risky';
      case 'added_value_opportunity':
        return 'Added Value Opportunity';
      default:
        return priority;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12">
        <div className="px-8">
          <div className="flex justify-between items-center mb-12 architectural-border p-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-normal tracking-tight text-gray-900">ATELIER GRIS</h1>
              <h2 className="text-xl font-normal text-primary">Lead Triage System</h2>
            </div>
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="px-6 py-3 border-2 border-primary text-sm font-normal text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              {showConfig ? 'HIDE CONFIGURATION' : 'SHOW CONFIGURATION'}
            </button>
          </div>

          {showConfig ? (
            <div className="architectural-border p-8">
              <ScoringConfig weights={weights} thresholds={thresholds} onSave={handleConfigSave} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="architectural-border p-8">
                  <LeadIntakeForm onSubmit={handleLeadSubmit} />
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="architectural-border p-8">
                  <h2 className="text-2xl font-normal text-gray-900 mb-8">Recent Leads</h2>
                  <div className="space-y-6">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className={`p-6 border ${getPriorityColor(lead.priorityCategory)} architectural-border`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-normal text-gray-900">
                              {getPriorityLabel(lead.priorityCategory)}
                            </h3>
                            <p className="text-sm text-primary mt-1">
                              Score: {lead.score} | Specialist: {lead.assignedSpecialist}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-4 text-sm text-gray-600 grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-gray-500">Lead Time</p>
                            <p className="mt-1">{lead.leadTime}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Quality</p>
                            <p className="mt-1">{lead.finishQuality}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Professionals</p>
                            <p className="mt-1">{lead.professionals.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadTriageApp; 