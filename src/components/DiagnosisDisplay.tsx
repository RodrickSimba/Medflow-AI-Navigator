
import React from 'react';
import { Button } from '@/components/ui/button';
import { useMedicalWorkflow } from '@/contexts/MedicalWorkflowContext';
import { Progress } from '@/components/ui/progress';
import { Activity, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';

const DiagnosisDisplay: React.FC = () => {
  const { diagnosisResult, resetWorkflow } = useMedicalWorkflow();
  
  if (!diagnosisResult) {
    return (
      <div className="text-center py-12">
        <p>No diagnosis results available. Please go back and try again.</p>
        <Button 
          onClick={resetWorkflow}
          className="mt-4 bg-medical-primary hover:bg-medical-dark"
        >
          Start Over
        </Button>
      </div>
    );
  }
  
  const getUrgencyColor = () => {
    switch (diagnosisResult.urgencyLevel) {
      case 'emergency':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in py-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-medical-light rounded-full mb-4">
          <FileText className="h-10 w-10 text-medical-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Diagnosis Summary</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Here's the final assessment based on your symptoms and specialist consultation.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">Diagnostic Assessment</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor()}`}>
                {diagnosisResult.urgencyLevel.charAt(0).toUpperCase() + diagnosisResult.urgencyLevel.slice(1)} Urgency
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h4 className="text-sm font-medium text-gray-500 mb-4">Possible Conditions</h4>
            
            <div className="space-y-4 mb-6">
              {diagnosisResult.possibleConditions.map((condition, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{condition.name}</span>
                    <span className="text-sm">
                      {Math.round(condition.probability * 100)}% probability
                    </span>
                  </div>
                  <Progress value={condition.probability * 100} className="h-1.5" />
                  <p className="text-sm text-gray-600">{condition.description}</p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-medical-primary" />
                  <h4 className="font-medium">Confidence Score</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={diagnosisResult.confidence * 100} className="h-2 flex-grow" />
                  <span className="text-sm font-medium">
                    {Math.round(diagnosisResult.confidence * 100)}%
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-medical-primary" />
                  <h4 className="font-medium">Recommended Specialist</h4>
                </div>
                <p className="text-sm">
                  {diagnosisResult.recommendedSpecialist.split('_').map(
                    word => word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </p>
              </div>
            </div>
            
            {diagnosisResult.additionalTests && diagnosisResult.additionalTests.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Recommended Tests</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {diagnosisResult.additionalTests.map((test, index) => (
                    <li key={index}>{test}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Important Disclaimer</h4>
                  <p className="text-sm text-yellow-700">
                    This is a demonstration application. Do not use for actual medical diagnosis. 
                    Always consult with a healthcare professional for medical advice.
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={resetWorkflow}
              className="w-full bg-medical-primary hover:bg-medical-dark"
            >
              Start New Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisDisplay;
