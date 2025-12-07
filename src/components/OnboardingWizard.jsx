import React, { useState } from 'react';
import ConceptStep from './ConceptStep';
import EntityStep from './EntityStep';
import RegistrationStep from './RegistrationStep';
import MarketingStep from './MarketingStep';
import FinanceStep from './FinanceStep';
import WebsiteStep from './WebsiteStep';
import '../styles/Wizard.scss';

const steps = [
  { name: 'Concept', component: ConceptStep },
  { name: 'Entity', component: EntityStep },
  { name: 'Registration', component: RegistrationStep },
  { name: 'Marketing', component: MarketingStep },
  { name: 'Finance', component: FinanceStep },
  { name: 'Website', component: WebsiteStep },
];

function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessData, setBusinessData] = useState({});

  const updateBusinessData = (step, data) => {
    setBusinessData(prev => ({ ...prev, [step]: data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className="wizard-container">
      <h1 className="wizard-title">Business Formation Assistant</h1>
      <StepComponent
        businessData={businessData[steps[currentStep].name.toLowerCase()] || {}}
        updateBusinessData={(data) =>
          updateBusinessData(steps[currentStep].name.toLowerCase(), data)
        }
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </div>
  );
}

export default Wizard;
