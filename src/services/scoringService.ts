import { LeadFormData, PriorityCategory, ScoringWeights, PriorityThresholds } from '../types/lead';

const defaultWeights: ScoringWeights = {
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
};

const defaultThresholds: PriorityThresholds = {
  good_but_save_for_later: 15,
  good_easy_quick: 20,
  big_and_tough: 25,
  risky: 30,
  added_value_opportunity: 35
};

export const calculateLeadScore = (
  lead: LeadFormData,
  weights: ScoringWeights = defaultWeights
): number => {
  let score = 0;

  // Add base scores
  score += weights.leadTime[lead.leadTime];
  score += weights.finishQuality[lead.finishQuality];
  score += weights.designFabricationRatio[lead.designFabricationRatio];
  score += weights.complexity[lead.complexity];
  score += weights.clientType[lead.clientType];
  score += weights.projectSize[lead.projectSize];
  score += weights.budgetRange[lead.budgetRange];
  score += weights.timelineFlexibility[lead.timelineFlexibility];

  // Add professional scores
  lead.professionals.forEach(professional => {
    score += weights.professionals[professional];
  });

  return score;
};

export const determinePriorityCategory = (
  score: number,
  thresholds: PriorityThresholds = defaultThresholds
): PriorityCategory => {
  if (score >= thresholds.added_value_opportunity) {
    return 'added_value_opportunity';
  } else if (score >= thresholds.risky) {
    return 'risky';
  } else if (score >= thresholds.big_and_tough) {
    return 'big_and_tough';
  } else if (score >= thresholds.good_easy_quick) {
    return 'good_easy_quick';
  } else {
    return 'good_but_save_for_later';
  }
};

export const assignSpecialist = (
  priorityCategory: PriorityCategory,
  score: number
): 'A' | 'B' | 'C' => {
  switch (priorityCategory) {
    case 'good_easy_quick':
      return 'A';
    case 'big_and_tough':
      return 'B';
    case 'risky':
    case 'added_value_opportunity':
      return 'C';
    default:
      // For 'good_but_save_for_later', assign based on score
      return score > 20 ? 'B' : 'A';
  }
}; 