import StepType from '../types/StepType';
import StepClass from '../types/StepClass';

import stepsList from '../mocks/stepsList';

export default class StepActionsBuilder {
  constructor() {
    this.steps = [];
  }

  public steps: StepClass[];

  public generateSteps = (): StepClass[] => {
    stepsList.map(
      (value: StepType): StepClass => {
        const stepObject = new StepClass(
          value.title,
          value.value,
          value.active,
          value.passed
        );
        this.steps.push(stepObject);
        return stepObject;
      }
    );
    return this.steps;
  };

  public firstStep = (): StepClass => {
    let activeStep = stepsList[0];
    stepsList.map(
      (value: StepType): StepType => {
        if (value.active) activeStep = value;
        return value;
      }
    );

    return new StepClass(
      activeStep.title,
      activeStep.value,
      activeStep.active,
      activeStep.passed
    );
  };
}
