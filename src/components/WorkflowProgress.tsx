
import React from 'react';
import { cn } from '@/lib/utils';
import { WorkflowStage } from '@/types/medical';

type WorkflowProgressProps = {
  currentStage: WorkflowStage;
};

const stages: Array<{
  key: WorkflowStage;
  label: string;
}> = [
  { key: 'patient-input', label: 'Patient Info' },
  { key: 'symptom-analysis', label: 'Symptom Analysis' },
  { key: 'knowledge-retrieval', label: 'Knowledge Retrieval' },
  { key: 'specialist-routing', label: 'Specialist Routing' },
  { key: 'final-diagnosis', label: 'Diagnosis' },
];

const WorkflowProgress: React.FC<WorkflowProgressProps> = ({ currentStage }) => {
  const currentIndex = stages.findIndex(stage => stage.key === currentStage);

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center mb-2">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.key}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                  index <= currentIndex
                    ? "bg-medical-primary text-white"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {index + 1}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 hidden sm:block",
                  index <= currentIndex ? "text-medical-primary font-medium" : "text-gray-500"
                )}
              >
                {stage.label}
              </span>
            </div>
            
            {index < stages.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2",
                  index < currentIndex ? "bg-medical-primary" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WorkflowProgress;
