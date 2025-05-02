
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PatientInfo, DiagnosisResult, WorkflowStage, Symptom } from '@/types/medical';

interface MedicalWorkflowContextType {
  currentStage: WorkflowStage;
  patientInfo: PatientInfo;
  diagnosisResult: DiagnosisResult | null;
  isProcessing: boolean;
  error: string | null;
  updatePatientInfo: (info: Partial<PatientInfo>) => void;
  addSymptom: (symptom: Symptom) => void;
  removeSymptom: (id: string) => void;
  proceedToNextStage: () => void;
  setDiagnosisResult: (result: DiagnosisResult) => void;
  setStage: (stage: WorkflowStage) => void;
  resetWorkflow: () => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
}

const initialPatientInfo: PatientInfo = {
  age: 0,
  gender: '',
  medicalHistory: [],
  currentSymptoms: [],
};

const MedicalWorkflowContext = createContext<MedicalWorkflowContextType | undefined>(undefined);

export function MedicalWorkflowProvider({ children }: { children: ReactNode }) {
  const [currentStage, setCurrentStage] = useState<WorkflowStage>('patient-input');
  const [patientInfo, setPatientInfo] = useState<PatientInfo>(initialPatientInfo);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stageSequence: WorkflowStage[] = [
    'patient-input',
    'symptom-analysis',
    'knowledge-retrieval',
    'specialist-routing',
    'final-diagnosis',
  ];

  const updatePatientInfo = (info: Partial<PatientInfo>) => {
    setPatientInfo(prev => ({ ...prev, ...info }));
  };

  const addSymptom = (symptom: Symptom) => {
    setPatientInfo(prev => ({
      ...prev,
      currentSymptoms: [...prev.currentSymptoms, symptom],
    }));
  };

  const removeSymptom = (id: string) => {
    setPatientInfo(prev => ({
      ...prev,
      currentSymptoms: prev.currentSymptoms.filter(s => s.id !== id),
    }));
  };

  const proceedToNextStage = () => {
    const currentIndex = stageSequence.indexOf(currentStage);
    if (currentIndex < stageSequence.length - 1) {
      setCurrentStage(stageSequence[currentIndex + 1]);
    }
  };

  const resetWorkflow = () => {
    setCurrentStage('patient-input');
    setPatientInfo(initialPatientInfo);
    setDiagnosisResult(null);
    setError(null);
  };

  return (
    <MedicalWorkflowContext.Provider
      value={{
        currentStage,
        patientInfo,
        diagnosisResult,
        isProcessing,
        error,
        updatePatientInfo,
        addSymptom,
        removeSymptom,
        proceedToNextStage,
        setDiagnosisResult,
        setStage: setCurrentStage,
        resetWorkflow,
        setIsProcessing,
        setError
      }}
    >
      {children}
    </MedicalWorkflowContext.Provider>
  );
}

export function useMedicalWorkflow() {
  const context = useContext(MedicalWorkflowContext);
  if (context === undefined) {
    throw new Error('useMedicalWorkflow must be used within a MedicalWorkflowProvider');
  }
  return context;
}
