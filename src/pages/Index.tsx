
import React from "react";
import { MedicalWorkflowProvider, useMedicalWorkflow } from "@/contexts/MedicalWorkflowContext";
import MedFlowHeader from "@/components/MedFlowHeader";
import WorkflowProgress from "@/components/WorkflowProgress";
import PatientInputForm from "@/components/PatientInputForm";
import SymptomAnalyzer from "@/components/SymptomAnalyzer";
import KnowledgeRetrieval from "@/components/KnowledgeRetrieval";
import SpecialistRouter from "@/components/SpecialistRouter";
import DiagnosisDisplay from "@/components/DiagnosisDisplay";

const WorkflowContent = () => {
  const { currentStage } = useMedicalWorkflow();
  
  const renderCurrentStage = () => {
    switch (currentStage) {
      case 'patient-input':
        return <PatientInputForm />;
      case 'symptom-analysis':
        return <SymptomAnalyzer />;
      case 'knowledge-retrieval':
        return <KnowledgeRetrieval />;
      case 'specialist-routing':
        return <SpecialistRouter />;
      case 'final-diagnosis':
        return <DiagnosisDisplay />;
      default:
        return <PatientInputForm />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <MedFlowHeader />
      
      <main className="medical-container py-8">
        <div className="max-w-4xl mx-auto">
          <WorkflowProgress currentStage={currentStage} />
          
          <div className="bg-white border rounded-lg p-4 md:p-8 shadow-sm">
            {renderCurrentStage()}
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t bg-white mt-12">
        <div className="medical-container">
          <div className="text-center text-sm text-gray-500">
            <p>MedFlow AI Workflow Orchestrator - For demonstration purposes only.</p>
            <p className="mt-1">Not for actual medical use. Consult healthcare professionals for medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Index = () => {
  return (
    <MedicalWorkflowProvider>
      <WorkflowContent />
    </MedicalWorkflowProvider>
  );
};

export default Index;
