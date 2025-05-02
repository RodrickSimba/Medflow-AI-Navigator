
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useMedicalWorkflow } from '@/contexts/MedicalWorkflowContext';
import { Symptom } from '@/types/medical';
import { PlusCircle, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

const commonSymptoms = [
  'Headache', 
  'Fever', 
  'Cough', 
  'Fatigue',
  'Shortness of breath',
  'Chest pain',
  'Abdominal pain',
  'Rash',
  'Dizziness',
  'Joint pain',
  'Nausea',
  'Back pain'
];

const PatientInputForm: React.FC = () => {
  const { patientInfo, updatePatientInfo, addSymptom, removeSymptom, proceedToNextStage } = useMedicalWorkflow();
  const [newSymptom, setNewSymptom] = useState<string>('');
  const [symptomSeverity, setSymptomSeverity] = useState<number>(5);
  const [symptomDuration, setSymptomDuration] = useState<string>('');
  const [symptomDescription, setSymptomDescription] = useState<string>('');
  const [medicalHistory, setMedicalHistory] = useState<string>('');

  const handleAddSymptom = () => {
    if (!newSymptom) {
      toast.error('Please enter a symptom name');
      return;
    }

    if (!symptomDuration) {
      toast.error('Please specify how long you\'ve had this symptom');
      return;
    }

    const symptom: Symptom = {
      id: uuidv4(),
      name: newSymptom,
      severity: symptomSeverity,
      duration: symptomDuration,
      description: symptomDescription
    };

    addSymptom(symptom);
    setNewSymptom('');
    setSymptomSeverity(5);
    setSymptomDuration('');
    setSymptomDescription('');
    toast.success(`Added symptom: ${newSymptom}`);
  };

  const handleSelectSymptom = (selectedSymptom: string) => {
    setNewSymptom(selectedSymptom);
  };

  const handleProceed = () => {
    if (patientInfo.age === 0) {
      toast.error('Please enter your age');
      return;
    }
    
    if (!patientInfo.gender) {
      toast.error('Please select your gender');
      return;
    }
    
    if (patientInfo.currentSymptoms.length === 0) {
      toast.error('Please add at least one symptom');
      return;
    }
    
    // Process the medical history text into an array
    if (medicalHistory) {
      const historyArray = medicalHistory
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');
      updatePatientInfo({ medicalHistory: historyArray });
    }
    
    proceedToNextStage();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            value={patientInfo.age || ''}
            onChange={(e) => updatePatientInfo({ age: parseInt(e.target.value) || 0 })}
            placeholder="Enter your age"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select 
            value={patientInfo.gender} 
            onValueChange={(value) => updatePatientInfo({ gender: value as 'male' | 'female' | 'other' | '' })}
          >
            <SelectTrigger id="gender" className="mt-1">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="medical-history">Medical History (comma-separated)</Label>
        <Textarea
          id="medical-history"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          placeholder="e.g., Diabetes, High blood pressure, Previous surgeries"
          className="mt-1"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium text-lg mb-4">Current Symptoms</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="symptom">Symptom</Label>
            <div className="flex mt-1">
              <Input
                id="symptom"
                value={newSymptom}
                onChange={(e) => setNewSymptom(e.target.value)}
                placeholder="Enter symptom"
                className="rounded-r-none"
              />
              <Button 
                variant="outline" 
                onClick={handleAddSymptom} 
                className="rounded-l-none"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={symptomDuration}
              onChange={(e) => setSymptomDuration(e.target.value)}
              placeholder="e.g., 3 days, 2 weeks"
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <Label htmlFor="severity">Severity (1-10)</Label>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm">Mild</span>
            <Slider
              id="severity"
              min={1}
              max={10}
              step={1}
              value={[symptomSeverity]}
              onValueChange={(value) => setSymptomSeverity(value[0])}
              className="flex-1"
            />
            <span className="text-sm">Severe</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium w-8 text-center">
              {symptomSeverity}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            value={symptomDescription}
            onChange={(e) => setSymptomDescription(e.target.value)}
            placeholder="Describe your symptom in detail"
            className="mt-1"
          />
        </div>
        
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Common symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Badge 
                key={symptom} 
                variant="outline" 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectSymptom(symptom)}
              >
                {symptom}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Added symptoms:</h4>
          {patientInfo.currentSymptoms.length > 0 ? (
            <div className="space-y-2">
              {patientInfo.currentSymptoms.map((symptom) => (
                <div 
                  key={symptom.id} 
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{symptom.name}</span>
                      <span className="text-xs text-gray-500">({symptom.duration})</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        symptom.severity >= 7 
                          ? 'bg-red-100 text-red-800' 
                          : symptom.severity >= 4 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                      }`}>
                        Severity: {symptom.severity}
                      </span>
                    </div>
                    {symptom.description && (
                      <p className="text-sm text-gray-600 mt-1">{symptom.description}</p>
                    )}
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => removeSymptom(symptom.id)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No symptoms added yet.</p>
          )}
        </div>
        
        <Button 
          onClick={handleProceed} 
          className="w-full md:w-auto bg-medical-primary hover:bg-medical-dark"
        >
          Continue to Symptom Analysis
        </Button>
      </div>
    </div>
  );
};

export default PatientInputForm;
