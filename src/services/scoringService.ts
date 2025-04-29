import { LeadFormData, PriorityCategory, ScoringWeights, PriorityThresholds, ScoreDimensions, LeadOpportunityProfile, EstimatorType, LeadScores } from '../types/lead';

const DEFAULT_WEIGHTS: ScoringWeights = {
  leadTime: {
    asap: 5,
    within_1_month: 4,
    '1_3_months': 3,
    '3_6_months': 2,
    over_6_months: 1
  },
  deliveryFlexibility: {
    firm_date: 5,
    very_flexible: 1
  },
  finishQuality: {
    basic: 1,
    mid_range: 2,
    high_end: 3,
    luxury: 4
  },
  professionals: {
    architect: 3,
    interior_designer: 2,
    general_contractor: 2,
    none: 1
  },
  projectType: {
    new_build: 3,
    major_renovation: 3,
    addition: 2,
    kitchen_bath_reno: 2,
    specific_scope: 2,
    commercial_fit_out: 3,
    other: 1
  },
  jobSize: {
    small: 1,
    medium: 2,
    large: 3,
    very_large: 4
  },
  projectComplexity: {
    very_simple: 1,
    very_complex: 5
  },
  clarityOfMandate: {
    vague_idea: 1,
    detailed_plans: 5
  },
  projectSize: {
    small: 1,
    medium: 2,
    large: 3
  },
  clientCategory: {
    large_architecture_firm: 4,
    small_architecture_firm: 3,
    big_contractor: 4,
    small_contractor: 3,
    individual: 1,
    store: 2,
    other: 2
  },
  clientType: {
    new: 1,
    returning: 2
  },
  timelineFlexibility: {
    strict: 1,
    moderate: 2,
    flexible: 3
  },
  complexity: {
    simple: 1,
    moderate: 2,
    complex: 3
  },
  designFabricationRatio: {
    mostly_design: 3,
    balanced: 2,
    mostly_fabrication: 1
  }
};

const defaultThresholds: PriorityThresholds = {
  good_but_save_for_later: 15,
  good_easy_quick: 20,
  big_and_tough: 25,
  risky: 30,
  added_value_opportunity: 35
};

const getJobSizeCategory = (size: number): keyof ScoringWeights['jobSize'] => {
  if (size <= 25000) return 'small';
  if (size <= 100000) return 'medium';
  if (size <= 500000) return 'large';
  return 'very_large';
};

export const calculateScores = (lead: LeadFormData, weights: ScoringWeights): LeadScores => {
  const scores: LeadScores = {
    urgency: 0,
    value: 0,
    fit: 0,
    total: 0
  };

  // Urgency Score
  if (lead.leadTime && weights.leadTime[lead.leadTime]) {
    scores.urgency += weights.leadTime[lead.leadTime];
  }
  if (lead.deliveryFlexibility) {
    scores.urgency += weights.deliveryFlexibility[lead.deliveryFlexibility === 5 ? 'firm_date' : 'very_flexible'] || 0;
  }
  if (lead.projectType && weights.projectType[lead.projectType]) {
    scores.urgency += weights.projectType[lead.projectType];
  }

  // Value Score
  if (lead.jobSize) {
    const jobSizeCategory = getJobSizeCategory(lead.jobSize);
    scores.value += weights.jobSize[jobSizeCategory] || 0;
  }
  if (lead.finishQuality && weights.finishQuality[lead.finishQuality]) {
    scores.value += weights.finishQuality[lead.finishQuality];
  }
  if (lead.projectComplexity) {
    scores.value += weights.projectComplexity[lead.projectComplexity === 1 ? 'very_simple' : 'very_complex'] || 0;
  }
  if (lead.clarityOfMandate) {
    scores.value += weights.clarityOfMandate[lead.clarityOfMandate === 1 ? 'vague_idea' : 'detailed_plans'] || 0;
  }

  // Fit Score
  if (lead.professionals) {
    scores.fit += weights.professionals.architect && lead.professionals.architect ? 1 : 0;
    scores.fit += weights.professionals.interior_designer && lead.professionals.interior_designer ? 1 : 0;
    scores.fit += weights.professionals.general_contractor && lead.professionals.general_contractor ? 1 : 0;
    scores.fit += weights.professionals.none && lead.professionals.none ? 1 : 0;
  }

  // Additional scoring factors
  if (lead.projectSize && weights.projectSize[lead.projectSize]) {
    scores.value += weights.projectSize[lead.projectSize];
  }
  if (lead.clientCategory && weights.clientCategory[lead.clientCategory]) {
    scores.value += weights.clientCategory[lead.clientCategory];
  }
  if (lead.clientType && weights.clientType[lead.clientType]) {
    scores.value += weights.clientType[lead.clientType];
  }
  if (lead.timelineFlexibility && weights.timelineFlexibility[lead.timelineFlexibility]) {
    scores.value += weights.timelineFlexibility[lead.timelineFlexibility];
  }
  if (lead.complexity && weights.complexity[lead.complexity]) {
    scores.value += weights.complexity[lead.complexity];
  }
  if (lead.designFabricationRatio && weights.designFabricationRatio[lead.designFabricationRatio]) {
    scores.value += weights.designFabricationRatio[lead.designFabricationRatio];
  }

  // Calculate total score
  scores.total = scores.urgency + scores.value + scores.fit;

  return scores;
};

const determineLeadOpportunityProfile = (scores: LeadScores): 'rush_simple' | 'rush_complex' | 'fast_easy' | 'high_value_strategic' | 'added_value_potential' | 'high_effort_qualify' | 'standard_project' => {
  const { urgency, value, fit } = scores;

  if (urgency > 4 && value < 3 && fit > 3) {
    return 'rush_simple';
  }
  if (urgency > 4 && value >= 3) {
    return 'rush_complex';
  }
  if (urgency <= 3 && value < 3 && fit > 3) {
    return 'fast_easy';
  }
  if (value >= 4 && fit <= 2) {
    return 'high_value_strategic';
  }
  if (value >= 3 && fit >= 4) {
    return 'added_value_potential';
  }
  if (fit <= 2) {
    return 'high_effort_qualify';
  }
  return 'standard_project';
};

const assignEstimator = (profile: LeadOpportunityProfile): EstimatorType => {
  switch (profile) {
    case 'fast_easy':
    case 'rush_simple':
      return 'estimator_a';
    case 'standard_project':
    case 'high_value_strategic':
      return 'estimator_b';
    case 'rush_complex':
      return 'estimator_c';
    case 'high_effort_qualify':
    case 'added_value_potential':
      return 'estimator_d';
    default:
      return 'estimator_b';
  }
};

export const processLead = (lead: LeadFormData, weights: ScoringWeights = DEFAULT_WEIGHTS) => {
  const scores = calculateScores(lead, weights);
  const profile = determineLeadOpportunityProfile(scores);
  const estimator = assignEstimator(profile);

  return {
    ...scores,
    leadOpportunityProfile: profile,
    assignedEstimator: estimator
  };
};

export const calculateDimensionScores = (
  lead: LeadFormData,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): ScoreDimensions => {
  // Monetary Value Score (0-1 range)
  const monetaryScore = Math.min(1, (
    (weights.projectSize[lead.projectSize] * 2) +
    (weights.clientCategory[lead.clientCategory])
  ) / 10);

  // Logistics Score (0-1 range)
  const leadTimeScore = weights.leadTime[lead.leadTime];
  const sizeImpact = weights.projectSize[lead.projectSize];
  const timelineFlexibility = weights.timelineFlexibility[lead.timelineFlexibility];
  
  const logisticsScore = Math.min(1, (
    (leadTimeScore * sizeImpact * timelineFlexibility) / 27
  ));

  // Risk Score (0-1 range)
  const professionalCount = Object.values(lead.professionals).filter(Boolean).length;
  const complexityScore = weights.complexity[lead.complexity];
  const riskScore = Math.min(1, (
    (complexityScore * leadTimeScore * (professionalCount < 2 ? 3 : professionalCount < 4 ? 2 : 1))
  ) / 27);

  // Added Value Score (0-1 range)
  const finishQualityScore = weights.finishQuality[lead.finishQuality];
  const addedValueScore = Math.min(1, (
    (weights.clientCategory[lead.clientCategory] / 10) +
    (lead.clientType === 'new' ? 1 : 0.5) +
    (finishQualityScore / 4)
  ) / 3);

  return {
    monetary: monetaryScore,
    logistics: logisticsScore,
    risk: riskScore,
    addedValue: addedValueScore
  };
};

export const calculateLeadScore = (
  lead: LeadFormData,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): { total: number; dimensions: ScoreDimensions } => {
  const dimensions = calculateDimensionScores(lead, weights);
  
  const total = 
    dimensions.monetary * 0.3 +
    dimensions.logistics * 0.3 +
    dimensions.risk * 0.2 +
    dimensions.addedValue * 0.2;

  return { total, dimensions };
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
  priorityCategory: string,
  lead: LeadFormData
): 'estimator_a' | 'estimator_b' | 'estimator_c' | 'estimator_d' => {
  // Estimator C specializes in complex, risky projects
  if (lead.complexity === 'complex' && 
      (lead.leadTime === 'asap' || lead.timelineFlexibility === 'strict') &&
      lead.clientType === 'new' &&
      Object.values(lead.professionals).filter(Boolean).length <= 2) {
    return 'estimator_c';
  }

  // Estimator B handles standard to premium projects with flexible timelines
  if (lead.finishQuality === 'high_end' || 
      lead.finishQuality === 'luxury' || 
      lead.timelineFlexibility === 'flexible') {
    return 'estimator_b';
  }

  // Estimator A handles everything else (basic, quick turnaround projects)
  return 'estimator_a';
};

export const checkDealbreakers = (formData: LeadFormData, settings: any): { isDealbreaker: boolean; reasons: string[] } => {
  const reasons: string[] = [];

  // Check lead time
  const minimumDays = settings.minimumLeadTime[formData.leadTime === 'asap' ? 'urgent' : formData.leadTime === 'within_1_month' ? 'flexible' : 'long_term'];
  if (formData.leadTime === 'asap' && minimumDays > 0) {
    reasons.push(`Délai trop court (${minimumDays} jours minimum requis)`);
  }

  // Check professionals count
  const professionalsCount = Object.values(formData.professionals).filter(Boolean).length;
  if (professionalsCount < settings.minimumProfessionals) {
    reasons.push(`Nombre insuffisant de professionnels (${settings.minimumProfessionals} minimum requis)`);
  }

  // Check complexity
  if (settings.maximumComplexity[formData.complexity]) {
    reasons.push(`Niveau de complexité trop élevé`);
  }

  // Check design ratio
  if (formData.designFabricationRatio === 'mostly_design' && settings.minimumDesignRatio > 0) {
    reasons.push(`Ratio design/fabrication trop élevé`);
  }

  return {
    isDealbreaker: reasons.length > 0,
    reasons
  };
}; 