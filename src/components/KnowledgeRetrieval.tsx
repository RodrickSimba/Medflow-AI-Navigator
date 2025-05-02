
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMedicalWorkflow } from '@/contexts/MedicalWorkflowContext';
import { queryMedicalKnowledge } from '@/services/medicalAI';
import { AlertCircle, Database, Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const KnowledgeRetrieval: React.FC = () => {
  const {
    patientInfo,
    proceedToNextStage,
    setDiagnosisResult,
    isProcessing,
    setIsProcessing,
    setError
  } = useMedicalWorkflow();
  const [progress, setProgress] = React.useState(0);
  const [searchStatus, setSearchStatus] = React.useState<string>('');
  
  useEffect(() => {
    const retrieveKnowledge = async () => {
      try {
        setIsProcessing(true);
        setProgress(10);
        setSearchStatus('Connecting to medical knowledge bases...');
        
        // Simulate searching through medical databases
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(30);
        setSearchStatus('Searching relevant medical literature...');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(50);
        setSearchStatus('Retrieving clinical guidelines...');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(70);
        setSearchStatus('Analyzing potential diagnoses...');
        
        // Get the symptom names for querying
        const symptomNames = patientInfo.currentSymptoms.map(s => s.name.toLowerCase());
        
        const diagnosisResult = await queryMedicalKnowledge(symptomNames);
        
        setProgress(100);
        setSearchStatus('Analysis complete!');
        setDiagnosisResult(diagnosisResult);
        setIsProcessing(false);
      } catch (error) {
        console.error('Error during knowledge retrieval:', error);
        setError('Failed to retrieve medical knowledge. Please try again.');
        toast.error('Error retrieving medical information');
        setIsProcessing(false);
      }
    };
    
    retrieveKnowledge();
  }, [patientInfo, setDiagnosisResult, setIsProcessing, setError]);
  
  const handleContinue = () => {
    proceedToNextStage();
  };
  
  return (
    <div className="space-y-6 animate-fade-in py-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-medical-light rounded-full mb-4">
          <Database className="h-10 w-10 text-medical-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Medical Knowledge Retrieval</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Accessing medical databases to find relevant information based on your symptoms.
        </p>
      </div>
      
      {isProcessing ? (
        <div className="space-y-8 max-w-md mx-auto">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Retrieval progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="text-center space-y-2">
            <Search className="h-8 w-8 mx-auto text-medical-primary animate-pulse" />
            <p className="text-sm font-medium">{searchStatus}</p>
            <p className="text-xs text-gray-500">This would use RAG with medical knowledge bases in a production environment</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Knowledge Retrieval Complete</h3>
            
            <div className="flex items-center gap-2 mb-6 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>In a production environment, this would utilize advanced RAG techniques with PubMed, FHIR databases, and clinical guidelines.</p>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleContinue}
                className="bg-medical-primary hover:bg-medical-dark"
              >
                Continue to Specialist Routing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeRetrieval;
