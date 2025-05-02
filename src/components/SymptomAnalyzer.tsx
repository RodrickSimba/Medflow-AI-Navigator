
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMedicalWorkflow } from '@/contexts/MedicalWorkflowContext';
import { analyzePatientSymptoms } from '@/services/medicalAI';
import { Activity, BarChart3, Brain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const SymptomAnalyzer: React.FC = () => {
  const { 
    patientInfo, 
    proceedToNextStage, 
    isProcessing, 
    setIsProcessing, 
    setError 
  } = useMedicalWorkflow();
  const [progress, setProgress] = React.useState(0);
  const [analyzedSymptoms, setAnalyzedSymptoms] = React.useState<string[]>([]);
  
  useEffect(() => {
    const analyzeSymptoms = async () => {
      try {
        setIsProcessing(true);
        setProgress(20);
        
        // Add artificial delay stages to simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress(40);
        
        const analyzedResults = await analyzePatientSymptoms(patientInfo);
        setAnalyzedSymptoms(analyzedResults);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(70);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(100);
        
        setIsProcessing(false);
      } catch (error) {
        console.error('Error analyzing symptoms:', error);
        setError('Failed to analyze symptoms. Please try again.');
        toast.error('Error analyzing symptoms');
        setIsProcessing(false);
      }
    };
    
    analyzeSymptoms();
  }, [patientInfo, setIsProcessing, setError]);
  
  const handleContinue = () => {
    proceedToNextStage();
  };
  
  return (
    <div className="space-y-6 animate-fade-in py-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-medical-light rounded-full mb-4">
          <Brain className="h-10 w-10 text-medical-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Analyzing Your Symptoms</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Our AI is processing your symptoms and medical information to provide accurate analysis.
        </p>
      </div>
      
      {isProcessing ? (
        <div className="space-y-8 max-w-md mx-auto">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Analysis progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 gap-4 text-center">
            {progress >= 20 && (
              <div className={`p-4 border rounded-lg ${progress >= 40 ? 'bg-gray-50' : 'border-medical-primary bg-medical-light animate-pulse'}`}>
                <div className="flex items-center justify-center mb-2">
                  <Activity className="h-5 w-5 text-medical-primary mr-2" />
                  <span className="font-medium">Extracting Symptoms</span>
                </div>
                <p className="text-sm text-gray-500">Processing patient input and categorizing symptoms</p>
              </div>
            )}
            
            {progress >= 40 && (
              <div className={`p-4 border rounded-lg ${progress >= 70 ? 'bg-gray-50' : 'border-medical-primary bg-medical-light animate-pulse'}`}>
                <div className="flex items-center justify-center mb-2">
                  <Brain className="h-5 w-5 text-medical-primary mr-2" />
                  <span className="font-medium">Running LLM Analysis</span>
                </div>
                <p className="text-sm text-gray-500">Applying medical knowledge to understand your condition</p>
              </div>
            )}
            
            {progress >= 70 && (
              <div className={`p-4 border rounded-lg ${progress >= 100 ? 'bg-gray-50' : 'border-medical-primary bg-medical-light animate-pulse'}`}>
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-5 w-5 text-medical-primary mr-2" />
                  <span className="font-medium">Preparing Results</span>
                </div>
                <p className="text-sm text-gray-500">Compiling insights and preparing for knowledge retrieval</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Symptom Analysis Complete</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Detected Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {analyzedSymptoms.map((symptom, index) => (
                    <span 
                      key={index} 
                      className="bg-medical-light text-medical-primary px-3 py-1 rounded-full text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Considering Patient Information:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="font-medium">Age:</span> {patientInfo.age}
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="font-medium">Gender:</span> {patientInfo.gender}
                  </div>
                  {patientInfo.medicalHistory && patientInfo.medicalHistory.length > 0 && (
                    <div className="col-span-2 bg-gray-50 p-2 rounded">
                      <span className="font-medium">Medical History:</span> {patientInfo.medicalHistory.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleContinue}
                className="bg-medical-primary hover:bg-medical-dark"
              >
                Continue to Knowledge Retrieval
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomAnalyzer;
