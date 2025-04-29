export type ClientCategory = 
  | 'large_architecture_firm'
  | 'small_architecture_firm'
  | 'big_contractor'
  | 'small_contractor'
  | 'individual'
  | 'store'
  | 'other';

export type ProfessionalType =
  | 'designer'
  | 'architect'
  | 'general_contractor'
  | 'engineer'
  | 'woodworker_artisan';

export type PriorityCategory = 
  | 'good_but_save_for_later'
  | 'good_easy_quick'
  | 'big_and_tough'
  | 'risky'
  | 'added_value_opportunity';

export type SpecialistType = 'A' | 'B' | 'C';

export interface LeadFormData {
  clientName: string;
  contactEmail: string;
  contactPhone: string;
  leadSource: 'referral' | 'repeat_client' | 'website_inquiry' | 'tender_platform' | 'advertisement' | 'other';
  projectType: 'new_build' | 'major_renovation' | 'addition' | 'kitchen_bath_reno' | 'specific_scope' | 'commercial_fit_out' | 'other';
  leadTime: 'asap' | 'within_1_month' | '1_3_months' | '3_6_months' | 'over_6_months';
  deliveryFlexibility: number; // 1-5 scale
  finishQuality: 'basic' | 'mid_range' | 'high_end' | 'luxury';
  professionals: {
    architect: boolean;
    interior_designer: boolean;
    general_contractor: boolean;
    none: boolean;
  };
  jobSize: number; // in dollars
  projectComplexity: number; // 1-5 scale
  clarityOfMandate: number; // 1-5 scale
  notes: string;
  projectSize: 'small' | 'medium' | 'large';
  clientCategory: ClientCategory;
  clientType: 'new' | 'returning';
  timelineFlexibility: 'strict' | 'moderate' | 'flexible';
  complexity: 'simple' | 'moderate' | 'complex';
  designFabricationRatio: 'mostly_design' | 'balanced' | 'mostly_fabrication';
}

export type LeadOpportunityProfile = 
  | 'fast_easy'
  | 'rush_simple'
  | 'rush_complex'
  | 'standard_project'
  | 'high_value_strategic'
  | 'added_value_potential'
  | 'high_effort_qualify';

export type EstimatorType = 
  | 'estimator_a'
  | 'estimator_b'
  | 'estimator_c'
  | 'estimator_d';

export interface Lead extends LeadFormData {
  id: string;
  createdAt: Date;
  leadOpportunityProfile: LeadOpportunityProfile;
  assignedEstimator: EstimatorType;
  urgencyScore: number;
  complexityScore: number;
  clarityScore: number;
  valueScore: number;
  riskScore: number;
}

export type LeadTime = 'asap' | 'within_1_month' | '1_3_months' | '3_6_months' | 'over_6_months';
export type DeliveryFlexibility = 'firm_date' | 'very_flexible';
export type ProjectType = 'new_build' | 'major_renovation' | 'addition' | 'kitchen_bath_reno' | 'specific_scope' | 'commercial_fit_out' | 'other';
export type JobSizeCategory = 'small' | 'medium' | 'large' | 'very_large';
export type FinishQuality = 'basic' | 'mid_range' | 'high_end' | 'luxury';
export type ProjectComplexity = 'very_simple' | 'very_complex';
export type ClarityOfMandate = 'vague_idea' | 'detailed_plans';
export type ProjectSize = 'small' | 'medium' | 'large';
export type ClientType = 'new' | 'returning';
export type TimelineFlexibility = 'strict' | 'moderate' | 'flexible';
export type Complexity = 'simple' | 'moderate' | 'complex';
export type DesignFabricationRatio = 'mostly_design' | 'balanced' | 'mostly_fabrication';

export interface LeadScores {
  urgency: number;
  value: number;
  fit: number;
  total: number;
}

export interface ScoringWeights {
  leadTime: Record<LeadTime, number>;
  deliveryFlexibility: Record<DeliveryFlexibility, number>;
  projectType: Record<ProjectType, number>;
  jobSize: Record<JobSizeCategory, number>;
  finishQuality: Record<FinishQuality, number>;
  projectComplexity: Record<ProjectComplexity, number>;
  clarityOfMandate: Record<ClarityOfMandate, number>;
  professionals: {
    architect: number;
    interior_designer: number;
    general_contractor: number;
    none: number;
  };
  projectSize: Record<ProjectSize, number>;
  clientCategory: Record<ClientCategory, number>;
  clientType: Record<ClientType, number>;
  timelineFlexibility: Record<TimelineFlexibility, number>;
  complexity: Record<Complexity, number>;
  designFabricationRatio: Record<DesignFabricationRatio, number>;
}

export interface PriorityThresholds {
  good_but_save_for_later: number;
  good_easy_quick: number;
  big_and_tough: number;
  risky: number;
  added_value_opportunity: number;
}

export interface DealbreakerSettings {
  minimumLeadTime: {
    urgent: number;
    flexible: number;
    long_term: number;
  };
  minimumProfessionals: number;
  maximumComplexity: {
    simple: boolean;
    moderate: boolean;
    complex: boolean;
  };
  minimumDesignRatio: number;
}

export interface DealbreakerResult {
  isDealbreaker: boolean;
  reasons: string[];
}

export interface ScoreDimensions {
  monetary: number;
  logistics: number;
  risk: number;
  addedValue: number;
}

export interface CapacityStatus {
  design: number;
  fabrication: number;
}

export interface ClientValueRanking {
  [key: string]: number;
  large_architecture_firm: number;
  small_architecture_firm: number;
  big_contractor: number;
  small_contractor: number;
  individual: number;
  store: number;
  other: number;
} 