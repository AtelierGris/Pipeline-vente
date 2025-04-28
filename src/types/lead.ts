export type ProfessionalType = 'designer' | 'architect' | 'general_contractor' | 'engineer' | 'woodworker_artisan';

export type PriorityCategory = 
  | 'good_but_save_for_later'
  | 'good_easy_quick'
  | 'big_and_tough'
  | 'risky'
  | 'added_value_opportunity';

export type SpecialistType = 'A' | 'B' | 'C';

export interface LeadFormData {
  leadTime: 'urgent' | 'flexible' | 'long_term';
  finishQuality: 'basic' | 'standard' | 'premium' | 'luxury';
  professionals: ProfessionalType[];
  designFabricationRatio: 'mostly_design' | 'balanced' | 'mostly_fabrication';
  complexity: 'simple' | 'moderate' | 'complex';
  clientType: 'new' | 'returning';
  projectSize: 'small' | 'medium' | 'large';
  budgetRange: 'low' | 'medium' | 'high';
  timelineFlexibility: 'strict' | 'moderate' | 'flexible';
}

export interface Lead extends LeadFormData {
  id: string;
  createdAt: Date;
  priorityCategory: PriorityCategory;
  assignedSpecialist?: SpecialistType;
  score: number;
  notes?: string;
}

export interface ScoringWeights {
  leadTime: Record<LeadFormData['leadTime'], number>;
  finishQuality: Record<LeadFormData['finishQuality'], number>;
  professionals: Record<ProfessionalType, number>;
  designFabricationRatio: Record<LeadFormData['designFabricationRatio'], number>;
  complexity: Record<LeadFormData['complexity'], number>;
  clientType: Record<LeadFormData['clientType'], number>;
  projectSize: Record<LeadFormData['projectSize'], number>;
  budgetRange: Record<LeadFormData['budgetRange'], number>;
  timelineFlexibility: Record<LeadFormData['timelineFlexibility'], number>;
}

export interface PriorityThresholds {
  good_but_save_for_later: number;
  good_easy_quick: number;
  big_and_tough: number;
  risky: number;
  added_value_opportunity: number;
} 