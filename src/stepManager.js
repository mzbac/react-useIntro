export const getStepManager = (steps = [], onNext, onPrevious) => {
  let currentStepIdx = 0;
  let isComplete = false;

  return {
    geNext: () => {
      if (currentStepIdx + 1 > steps.length - 1) {
        isComplete = true;
        return null;
      }

      if (onNext) {
        const shouldGoNext = onNext(steps[currentStepIdx + 1]);
        if (shouldGoNext) {
          currentStepIdx = currentStepIdx + 1;
          return steps[currentStepIdx];
        }

        return null;
      }
    },
    goPrevious: () => {
      if (currentStepIdx === 0) return null;
      if (onPrevious) {
        const shouldGoPrevious = onPrevious(steps[currentStepIdx]);
        if (shouldGoPrevious) {
          currentStepIdx = currentStepIdx - 1;
          return steps[currentStepIdx];
        }

        return null;
      }
    },
    currentStep: () => {
      return steps[currentStepIdx];
    },
    isLastStep: () => {
      return currentStepIdx === steps.length - 1;
    },
    isComplete: () => {
      return isComplete;
    }
  };
};
