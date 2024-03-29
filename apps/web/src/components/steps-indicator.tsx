interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-[50%] ${
            currentStep === index + 1 ? "bg-black" : "bg-black/10"
          }`}
        ></div>
      ))}
    </div>
  );
}

export default StepIndicator;
