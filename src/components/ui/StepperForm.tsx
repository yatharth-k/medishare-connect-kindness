import React from "react";

interface StepperFormProps {
  steps: string[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  children: React.ReactNode;
}

const StepperForm: React.FC<StepperFormProps> = ({ steps, currentStep, onNext, onBack, children }) => (
  <div className="w-full max-w-xl mx-auto">
    {/* Stepper */}
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, idx) => (
        <div key={step} className="flex-1 flex flex-col items-center">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white transition-all duration-200 ${idx <= currentStep ? 'bg-gradient-to-r from-gradientFrom to-gradientTo shadow-lg' : 'bg-gray-200 text-gray-400'}`}>{idx + 1}</div>
          <span className={`mt-2 text-xs font-semibold ${idx === currentStep ? 'text-gradientFrom' : 'text-gray-400'}`}>{step}</span>
        </div>
      ))}
    </div>
    {/* Form Content */}
    <div className="transition-all duration-300 ease-in-out">
      {children}
    </div>
    {/* Navigation Buttons */}
    <div className="flex justify-between mt-8">
      <button type="button" onClick={onBack} disabled={currentStep === 0} className="text-gray-500 font-semibold px-4 py-2 rounded-lg disabled:opacity-50">Back</button>
      <button type="button" onClick={onNext} className="bg-gradient-to-r from-gradientFrom to-gradientTo text-white font-bold rounded-full px-6 py-2 shadow-md hover:scale-105 transition-all duration-200">{currentStep === steps.length - 1 ? 'Submit' : 'Next Step'}</button>
    </div>
  </div>
);

export default StepperForm; 