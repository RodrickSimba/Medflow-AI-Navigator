
import React from 'react';
import { Activity } from 'lucide-react';

const MedFlowHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="medical-container flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-medical-primary" />
          <div>
            <h1 className="text-xl font-bold text-medical-dark">MedFlow</h1>
            <p className="text-xs text-muted-foreground">AI Workflow Orchestrator</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center text-sm">
            <span className="bg-medical-light text-medical-primary px-3 py-1 rounded-full text-xs font-medium">
              Demo Mode
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MedFlowHeader;
