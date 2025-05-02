
export type Symptom = {
  id: string;
  name: string;
  severity: number; // 1-10
  duration: string; // e.g., '3 days', '2 weeks'
  description: string;
};

export type PatientInfo = {
  age: number;
  gender: 'male' | 'female' | 'other' | '';
  medicalHistory: string[];
  currentSymptoms: Symptom[];
};

export type DiagnosisResult = {
  possibleConditions: Array<{
    name: string;
    probability: number;
    description: string;
  }>;
  confidence: number;
  recommendedSpecialist: SpecialistType;
  additionalTests?: string[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
};

export type SpecialistType = 
  | 'general_practitioner'
  | 'cardiologist'
  | 'neurologist'
  | 'gastroenterologist'
  | 'dermatologist'
  | 'orthopedist'
  | 'psychiatrist'
  | 'pulmonologist'
  | 'endocrinologist'
  | 'emergency';

export type SpecialistInfo = {
  type: SpecialistType;
  name: string;
  description: string;
  icon: string; // Icon identifier
  conditions: string[]; // Common conditions they treat
};

export type WorkflowStage = 
  | 'patient-input'
  | 'symptom-analysis'
  | 'knowledge-retrieval'
  | 'specialist-routing'
  | 'final-diagnosis';
