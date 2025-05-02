
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  User, Heart, Brain, Pill, Microscope, Bone, 
  CircleUser, Activity, AlertTriangle 
} from 'lucide-react';

interface MedicalAgentCardProps {
  name: string;
  description: string;
  icon: string;
  isRecommended?: boolean;
  className?: string;
}

const MedicalAgentCard: React.FC<MedicalAgentCardProps> = ({
  name,
  description,
  icon,
  isRecommended = false,
  className
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'User':
        return <User className="h-5 w-5" />;
      case 'Heart':
        return <Heart className="h-5 w-5" />;
      case 'Brain':
        return <Brain className="h-5 w-5" />;
      case 'Pill':
        return <Pill className="h-5 w-5" />;
      case 'Microscope':
        return <Microscope className="h-5 w-5" />;
      case 'Bone':
        return <Bone className="h-5 w-5" />;
      case 'CircleUser':
        return <CircleUser className="h-5 w-5" />;
      case 'Activity':
        return <Activity className="h-5 w-5" />;
      case 'AlertTriangle':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };
  
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className={cn(
        "p-2 rounded-full flex-shrink-0",
        isRecommended ? "bg-medical-primary text-white" : "bg-gray-100 text-gray-700"
      )}>
        {getIcon()}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{name}</h3>
          {isRecommended && (
            <span className="text-xs bg-medical-light text-medical-primary px-2 py-0.5 rounded-full">
              Recommended
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default MedicalAgentCard;
