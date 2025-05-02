
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMedicalWorkflow } from '@/contexts/MedicalWorkflowContext';
import { specialistDatabase, getSpecialistDiagnosis } from '@/services/medicalAI';
import MedicalAgentCard from './MedicalAgentCard';
import { Network } from 'lucide-react';
import { toast } from 'sonner';

const SpecialistRouter: React.FC = () => {
  const { 
    diagnosisResult, 
    patientInfo,
    proceedToNextStage,
    setIsProcessing,
    error,
    setError
  } = useMedicalWorkflow();

  const [selectedSpecialist, setSelectedSpecialist] = React.useState<string | null>(null);
  const [specialistDiagnosis, setSpecialistDiagnosis] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  
  useEffect(() => {
    // Set the recommended specialist as selected by default
    if (diagnosisResult?.recommendedSpecialist) {
      setSelectedSpecialist(diagnosisResult.recommendedSpecialist);
    }
  }, [diagnosisResult]);
  
  const handleSpecialistSelect = (specialistType: string) => {
    setSelectedSpecialist(specialistType);
    setSpecialistDiagnosis('');
  };
  
  const handleConsultSpecialist = async () => {
    if (!selectedSpecialist || !diagnosisResult) return;
    
    setLoading(true);
    try {
      const diagnosis = await getSpecialistDiagnosis(
        selectedSpecialist as any,
        patientInfo,
        diagnosisResult
      );
      setSpecialistDiagnosis(diagnosis);
    } catch (err) {
      console.error('Error getting specialist diagnosis:', err);
      setError('Failed to get specialist consultation. Please try again.');
      toast.error('Error consulting specialist');
    } finally {
      setLoading(false);
    }
  };
  
  const handleContinue = () => {
    proceedToNextStage();
  };
  
  if (!diagnosisResult) {
    return (
      <div className="text-center py-12">
        <p>No diagnosis results available. Please go back and try again.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in py-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-medical-light rounded-full mb-4">
          <Network className="h-10 w-10 text-medical-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Specialist Routing</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Based on your symptoms, we'll route you to the appropriate specialist.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium mb-4">Available Specialists</h3>
          
          <div className="space-y-3">
            {Object.entries(specialistDatabase).map(([type, info]) => (
              <div 
                key={type}
                onClick={() => handleSpecialistSelect(type)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedSpecialist === type 
                    ? 'border-medical-primary bg-medical-light' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <MedicalAgentCard 
                  name={info.name}
                  description={info.description}
                  icon={info.icon}
                  isRecommended={diagnosisResult.recommendedSpecialist === type}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white border rounded-lg p-6 h-full">
            <h3 className="text-lg font-medium mb-4">Specialist Consultation</h3>
            
            {selectedSpecialist ? (
              <>
                <div className="mb-4">
                  <p className="text-sm mb-2">Selected Specialist:</p>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <MedicalAgentCard 
                      name={specialistDatabase[selectedSpecialist as keyof typeof specialistDatabase].name}
                      description={specialistDatabase[selectedSpecialist as keyof typeof specialistDatabase].description}
                      icon={specialistDatabase[selectedSpecialist as keyof typeof specialistDatabase].icon}
                      isRecommended={diagnosisResult.recommendedSpecialist === selectedSpecialist}
                    />
                  </div>
                </div>
                
                {!specialistDiagnosis && (
                  <Button 
                    onClick={handleConsultSpecialist}
                    disabled={loading}
                    className="w-full bg-medical-primary hover:bg-medical-dark mb-4"
                  >
                    {loading ? 'Consulting...' : 'Consult Specialist'}
                  </Button>
                )}
                
                {specialistDiagnosis && (
                  <div className="space-y-4 mb-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Specialist Assessment</h4>
                      <p className="text-sm">{specialistDiagnosis}</p>
                    </div>
                    
                    <Button 
                      onClick={handleContinue}
                      className="w-full bg-medical-primary hover:bg-medical-dark"
                    >
                      Continue to Final Diagnosis
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">Please select a specialist to consult.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistRouter;
