import { LeadFormData, PriorityCategory, ScoringWeights, PriorityThresholds, DealbreakerSettings, DealbreakerResult, ScoreDimensions } from '../types/lead';

const DEFAULT_WEIGHTS: ScoringWeights = {
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
  },
  dimensionWeights: {
    monetary: 0.3,
    logistics: 0.3,
    risk: 0.2,
    addedValue: 0.2
  },
  clientValueRanking: {
    big_contractor: 10,
    large_architecture_firm: 9,
    small_contractor: 8,
    small_architecture_firm: 7,
    designer: 6,
    store: 5,
    other: 4,
    individual: 3
  },
  capacityThresholds: {
    design: 100,
    fabrication: 100
  }
};

const defaultThresholds: PriorityThresholds = {
  good_but_save_for_later: 15,
  good_easy_quick: 20,
  big_and_tough: 25,
  risky: 30,
  added_value_opportunity: 35
};

export const calculateDimensionScores = (
  lead: LeadFormData,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): ScoreDimensions => {
  // Monetary Value Score (0-1 range)
  const monetaryScore = Math.min(1, (
    (weights.projectSize[lead.projectSize] * 2) +
    (weights.clientValueRanking[lead.clientCategory])
  ) / 10);

  // Logistics Score (0-1 range)
  const leadTimeScore = weights.leadTime[lead.leadTime];
  const sizeImpact = weights.projectSize[lead.projectSize];
  const timelineFlexibility = weights.timelineFlexibility[lead.timelineFlexibility];
  
  const logisticsScore = Math.min(1, (
    (leadTimeScore * sizeImpact * timelineFlexibility) / 27
  ));

  // Risk Score (0-1 range)
  const professionalCount = lead.professionals.length;
  const complexityScore = weights.complexity[lead.complexity];
  const riskScore = Math.min(1, (
    (complexityScore * leadTimeScore * (professionalCount < 2 ? 3 : professionalCount < 4 ? 2 : 1))
  ) / 27);

  // Added Value Score (0-1 range)
  const finishQualityScore = weights.finishQuality[lead.finishQuality];
  const addedValueScore = Math.min(1, (
    (weights.clientValueRanking[lead.clientCategory] / 10) +
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
    dimensions.monetary * weights.dimensionWeights.monetary +
    dimensions.logistics * weights.dimensionWeights.logistics +
    dimensions.risk * weights.dimensionWeights.risk +
    dimensions.addedValue * weights.dimensionWeights.addedValue;

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
  priorityCategory: PriorityCategory,
  lead: LeadFormData
): string => {
  // Estimator C specializes in complex, risky projects
  if (lead.complexity === 'complex' && 
      (lead.leadTime === 'urgent' || lead.timelineFlexibility === 'strict') &&
      lead.clientType === 'new' &&
      lead.professionals.length <= 2) {
    return "Estimateur C";
  }

  // Estimator B handles standard to premium projects with flexible timelines
  if (lead.finishQuality === 'premium' || 
      lead.finishQuality === 'standard' || 
      lead.timelineFlexibility === 'flexible') {
    return "Estimateur B";
  }

  // Estimator A handles everything else (basic, quick turnaround projects)
  return "Estimateur A";
};

export const checkDealbreakers = (formData: LeadFormData, settings: DealbreakerSettings): DealbreakerResult => {
  const reasons: string[] = [];

  // Check lead time
  const minimumDays = settings.minimumLeadTime[formData.leadTime];
  if (formData.leadTime === 'urgent' && minimumDays > 0) {
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