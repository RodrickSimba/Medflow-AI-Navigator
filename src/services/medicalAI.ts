
import { PatientInfo, DiagnosisResult, SpecialistType, Symptom } from '@/types/medical';

// This is a simulated service that would normally connect to LangChain, GPT-4, etc.
// In a real implementation, these would be actual API calls

// Mock medical knowledge database for RAG simulation
const medicalKnowledgeBase = {
  'headache': [
    { condition: 'Tension Headache', probability: 0.7, specialist: 'general_practitioner' },
    { condition: 'Migraine', probability: 0.5, specialist: 'neurologist' },
    { condition: 'Sinusitis', probability: 0.3, specialist: 'general_practitioner' }
  ],
  'chest pain': [
    { condition: 'Angina', probability: 0.6, specialist: 'cardiologist' },
    { condition: 'Gastroesophageal Reflux', probability: 0.4, specialist: 'gastroenterologist' },
    { condition: 'Muscle Strain', probability: 0.3, specialist: 'general_practitioner' }
  ],
  'fever': [
    { condition: 'Viral Infection', probability: 0.7, specialist: 'general_practitioner' },
    { condition: 'Bacterial Infection', probability: 0.5, specialist: 'general_practitioner' },
    { condition: 'COVID-19', probability: 0.4, specialist: 'pulmonologist' }
  ],
  'rash': [
    { condition: 'Contact Dermatitis', probability: 0.6, specialist: 'dermatologist' },
    { condition: 'Eczema', probability: 0.5, specialist: 'dermatologist' },
    { condition: 'Allergic Reaction', probability: 0.4, specialist: 'general_practitioner' }
  ],
  'abdominal pain': [
    { condition: 'Gastritis', probability: 0.6, specialist: 'gastroenterologist' },
    { condition: 'Appendicitis', probability: 0.3, specialist: 'emergency' },
    { condition: 'Irritable Bowel Syndrome', probability: 0.5, specialist: 'gastroenterologist' }
  ],
  'joint pain': [
    { condition: 'Osteoarthritis', probability: 0.6, specialist: 'orthopedist' },
    { condition: 'Rheumatoid Arthritis', probability: 0.4, specialist: 'orthopedist' },
    { condition: 'Gout', probability: 0.3, specialist: 'orthopedist' }
  ],
  'fatigue': [
    { condition: 'Anemia', probability: 0.5, specialist: 'general_practitioner' },
    { condition: 'Depression', probability: 0.4, specialist: 'psychiatrist' },
    { condition: 'Hypothyroidism', probability: 0.3, specialist: 'endocrinologist' }
  ],
  'shortness of breath': [
    { condition: 'Asthma', probability: 0.6, specialist: 'pulmonologist' },
    { condition: 'Anxiety', probability: 0.4, specialist: 'psychiatrist' },
    { condition: 'Heart Failure', probability: 0.3, specialist: 'cardiologist' }
  ],
  'dizziness': [
    { condition: 'Vertigo', probability: 0.6, specialist: 'neurologist' },
    { condition: 'Low Blood Pressure', probability: 0.4, specialist: 'cardiologist' },
    { condition: 'Anemia', probability: 0.3, specialist: 'general_practitioner' }
  ]
};

const conditionDescriptions: Record<string, string> = {
  'Tension Headache': 'A common type of headache characterized by mild to moderate pain that feels like pressure or tightness around the head.',
  'Migraine': 'A neurological condition characterized by intense, debilitating headaches, often accompanied by nausea, vomiting, and sensitivity to light and sound.',
  'Sinusitis': 'Inflammation of the sinuses, often due to infection, causing pain, pressure, and congestion.',
  'Angina': 'Chest pain caused by reduced blood flow to the heart muscles, often described as pressure or tightness in the chest.',
  'Gastroesophageal Reflux': 'A condition where stomach acid frequently flows back into the esophagus, causing heartburn and chest pain.',
  'Muscle Strain': 'Injury to muscles or tendons from overuse or improper use, causing pain and limited movement.',
  'Viral Infection': 'Illness caused by viruses, often resulting in fever, fatigue, and other symptoms depending on the virus.',
  'Bacterial Infection': 'Illness caused by bacteria, which may require antibiotics for treatment.',
  'COVID-19': 'Infectious disease caused by the SARS-CoV-2 virus, with symptoms ranging from mild to severe.',
  'Contact Dermatitis': 'Skin inflammation resulting from direct contact with an irritant or allergen.',
  'Eczema': 'Chronic skin condition characterized by itchy, inflamed skin.',
  'Allergic Reaction': 'Immune system response to a substance that is normally harmless.',
  'Gastritis': 'Inflammation of the stomach lining, often caused by infection or irritation.',
  'Appendicitis': 'Inflammation of the appendix, causing severe abdominal pain and requiring immediate medical attention.',
  'Irritable Bowel Syndrome': 'A common disorder affecting the large intestine, causing abdominal pain, bloating, and changes in bowel movements.',
  'Osteoarthritis': 'Degenerative joint disease where cartilage breaks down, causing pain and stiffness.',
  'Rheumatoid Arthritis': 'Autoimmune disorder that causes inflammation in the joints and other body systems.',
  'Gout': 'Form of arthritis characterized by sudden, severe attacks of pain, redness, and tenderness in joints.',
  'Anemia': 'Condition where you don\'t have enough healthy red blood cells to carry adequate oxygen to your tissues.',
  'Depression': 'Mental health disorder characterized by persistently depressed mood and loss of interest in activities.',
  'Hypothyroidism': 'Condition where the thyroid gland doesn\'t produce enough thyroid hormone.',
  'Asthma': 'Chronic condition affecting the airways in the lungs, causing breathing difficulty.',
  'Anxiety': 'Feeling of fear, dread, and uneasiness that can be a normal reaction to stress or in some cases, a disorder.',
  'Heart Failure': 'Chronic condition where the heart doesn\'t pump blood as well as it should.',
  'Vertigo': 'Sensation of feeling off balance or that you or your surroundings are spinning.',
  'Low Blood Pressure': 'Condition where blood pressure is much lower than normal, causing dizziness and fainting.'
};

// Simulates an LLM analyzing patient symptoms
export async function analyzePatientSymptoms(patientInfo: PatientInfo): Promise<string[]> {
  // In a real implementation, this would call an LLM to analyze symptoms
  // For now, we'll just return the symptom names for simplicity
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(patientInfo.currentSymptoms.map(s => s.name.toLowerCase()));
    }, 1500); // Simulated delay
  });
}

// Simulates RAG with a medical knowledge base
export async function queryMedicalKnowledge(symptomNames: string[]): Promise<DiagnosisResult> {
  // In a real implementation, this would query vector databases like Pinecone
  return new Promise((resolve) => {
    setTimeout(() => {
      let possibleConditions: Array<{name: string; probability: number; description: string}> = [];
      let specialistVotes: Record<SpecialistType, number> = {
        general_practitioner: 0,
        cardiologist: 0,
        neurologist: 0,
        gastroenterologist: 0,
        dermatologist: 0,
        orthopedist: 0,
        psychiatrist: 0,
        pulmonologist: 0,
        endocrinologist: 0,
        emergency: 0
      };

      let highestUrgency = 0;
      
      symptomNames.forEach(symptom => {
        const knowledgeEntries = medicalKnowledgeBase[symptom];
        if (knowledgeEntries) {
          knowledgeEntries.forEach(entry => {
            // Add condition if not already in the list or update probability if higher
            const existingCondition = possibleConditions.find(c => c.name === entry.condition);
            if (!existingCondition) {
              possibleConditions.push({
                name: entry.condition,
                probability: entry.probability,
                description: conditionDescriptions[entry.condition] || 'No description available'
              });
            } else if (entry.probability > existingCondition.probability) {
              existingCondition.probability = entry.probability;
            }
            
            // Vote for specialist
            specialistVotes[entry.specialist] = (specialistVotes[entry.specialist] || 0) + 1;
            
            // Update urgency
            if (entry.specialist === 'emergency') {
              highestUrgency = Math.max(highestUrgency, 3); // Emergency
            } else if (entry.probability > 0.5) {
              highestUrgency = Math.max(highestUrgency, 2); // High
            } else if (entry.probability > 0.3) {
              highestUrgency = Math.max(highestUrgency, 1); // Medium
            }
          });
        }
      });

      // Sort conditions by probability
      possibleConditions.sort((a, b) => b.probability - a.probability);
      
      // Get the most voted specialist
      let recommendedSpecialist: SpecialistType = 'general_practitioner';
      let maxVotes = 0;
      
      Object.entries(specialistVotes).forEach(([specialist, votes]) => {
        if (votes > maxVotes) {
          maxVotes = votes;
          recommendedSpecialist = specialist as SpecialistType;
        }
      });

      // Calculate overall confidence
      const confidence = possibleConditions.length > 0
        ? possibleConditions.reduce((sum, condition) => sum + condition.probability, 0) / possibleConditions.length
        : 0;

      // Map urgency level
      const urgencyMap = ['low', 'medium', 'high', 'emergency'] as const;
      const urgencyLevel = urgencyMap[highestUrgency];
      
      resolve({
        possibleConditions: possibleConditions.slice(0, 5), // Top 5 conditions
        confidence: confidence,
        recommendedSpecialist,
        additionalTests: getRecommendedTests(possibleConditions.slice(0, 3).map(c => c.name)),
        urgencyLevel
      });
    }, 2000); // Simulated delay
  });
}

// Helper function to get recommended tests based on conditions
function getRecommendedTests(conditionNames: string[]): string[] {
  const testMap: Record<string, string[]> = {
    'Tension Headache': ['Physical examination'],
    'Migraine': ['Neurological examination', 'MRI scan'],
    'Sinusitis': ['Nasal endoscopy', 'Sinus CT scan'],
    'Angina': ['ECG', 'Stress test', 'Coronary angiography'],
    'Gastroesophageal Reflux': ['Upper endoscopy', 'Esophageal pH monitoring'],
    'COVID-19': ['PCR test', 'Chest X-ray'],
    'Appendicitis': ['Abdominal ultrasound', 'CT scan', 'Blood tests'],
    'Vertigo': ['Vestibular testing', 'Head MRI'],
    'Hypothyroidism': ['Thyroid function tests', 'Anti-thyroid antibody tests'],
    'Heart Failure': ['Echocardiogram', 'BNP blood test']
  };

  const tests = new Set<string>();
  conditionNames.forEach(condition => {
    const recommendedTests = testMap[condition];
    if (recommendedTests) {
      recommendedTests.forEach(test => tests.add(test));
    }
  });

  return Array.from(tests);
}

// Simulated specialist database
export const specialistDatabase: Record<SpecialistType, {
  name: string;
  description: string;
  icon: string;
  conditions: string[];
}> = {
  general_practitioner: {
    name: 'General Practitioner',
    description: 'Provides primary healthcare and coordinates with specialists',
    icon: 'User',
    conditions: ['Common cold', 'Flu', 'Minor infections', 'Preventive care']
  },
  cardiologist: {
    name: 'Cardiologist',
    description: 'Specializes in disorders of the heart and cardiovascular system',
    icon: 'Heart',
    conditions: ['Heart disease', 'Hypertension', 'Arrhythmias', 'Coronary artery disease']
  },
  neurologist: {
    name: 'Neurologist',
    description: 'Specializes in disorders of the nervous system, including the brain',
    icon: 'Brain',
    conditions: ['Migraine', 'Epilepsy', 'Multiple sclerosis', 'Parkinson\'s disease']
  },
  gastroenterologist: {
    name: 'Gastroenterologist',
    description: 'Specializes in disorders of the digestive system',
    icon: 'Pill',
    conditions: ['Irritable bowel syndrome', 'Gastritis', 'Hepatitis', 'Crohn\'s disease']
  },
  dermatologist: {
    name: 'Dermatologist',
    description: 'Specializes in disorders of the skin, hair, and nails',
    icon: 'Microscope',
    conditions: ['Acne', 'Eczema', 'Psoriasis', 'Skin cancer']
  },
  orthopedist: {
    name: 'Orthopedist',
    description: 'Specializes in disorders of the musculoskeletal system',
    icon: 'Bone',
    conditions: ['Arthritis', 'Fractures', 'Joint pain', 'Osteoporosis']
  },
  psychiatrist: {
    name: 'Psychiatrist',
    description: 'Specializes in mental health disorders',
    icon: 'CircleUser',
    conditions: ['Depression', 'Anxiety', 'Bipolar disorder', 'Schizophrenia']
  },
  pulmonologist: {
    name: 'Pulmonologist',
    description: 'Specializes in disorders of the respiratory system',
    icon: 'Lungs',
    conditions: ['Asthma', 'COPD', 'Pneumonia', 'Sleep apnea']
  },
  endocrinologist: {
    name: 'Endocrinologist',
    description: 'Specializes in disorders of the endocrine system',
    icon: 'Activity',
    conditions: ['Diabetes', 'Thyroid disorders', 'Hormonal imbalances']
  },
  emergency: {
    name: 'Emergency Medicine',
    description: 'Provides immediate care for acute illnesses and injuries',
    icon: 'AlertTriangle',
    conditions: ['Trauma', 'Stroke', 'Heart attack', 'Severe infections']
  }
};

// Get diagnosis from a specific specialist based on patient info
export async function getSpecialistDiagnosis(
  specialist: SpecialistType, 
  patientInfo: PatientInfo,
  preliminaryDiagnosis: DiagnosisResult
): Promise<string> {
  // In a real implementation, this would call a specific agent with specialist knowledge
  return new Promise((resolve) => {
    setTimeout(() => {
      const specialistInfo = specialistDatabase[specialist];
      const topCondition = preliminaryDiagnosis.possibleConditions[0];
      
      let diagnosisText = '';
      
      if (topCondition) {
        if (specialist === 'emergency' || preliminaryDiagnosis.urgencyLevel === 'emergency') {
          diagnosisText = `Based on your symptoms, particularly ${patientInfo.currentSymptoms.map(s => s.name).join(', ')}, ` + 
            `I recommend immediate emergency care. The possible condition of ${topCondition.name} requires prompt medical attention. ` +
            `Please proceed to the nearest emergency room or call emergency services.`;
        } else {
          diagnosisText = `After reviewing your symptoms (${patientInfo.currentSymptoms.map(s => s.name).join(', ')}), ` +
            `I believe you may be experiencing ${topCondition.name}. ${topCondition.description} ` +
            `I recommend the following tests: ${preliminaryDiagnosis.additionalTests?.join(', ') || 'None at this time'}. ` +
            `Follow-up with a ${specialistInfo.name} is advised within ${preliminaryDiagnosis.urgencyLevel === 'high' ? '24-48 hours' : '1-2 weeks'}.`;
        }
      } else {
        diagnosisText = `Based on the information provided, I don't have enough data to make a confident diagnosis. ` +
          `I recommend a comprehensive examination with a ${specialistInfo.name} to properly evaluate your condition.`;
      }
      
      resolve(diagnosisText);
    }, 1500);
  });
}
