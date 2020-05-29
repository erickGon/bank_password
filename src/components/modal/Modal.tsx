import React from 'react';

import './Modal.scss';

import StepActionsBuilder from '../../services/StepsActionsBuilder';

import ProductInformation from '../../views/ProductInformation/ProductInformation';
import FormStep from '../../views/FormStep/FormStep';
import FeedBack from '../../views/Feedback/Feedback';

import Header from '../header/Header';
import StepClass from '../../types/StepClass';

type Props = {
  handleCancel(): void;
};

type State = {
  currenStep: StepClass;
  steps: StepClass[];
  statusCode: number;
};

class Modal extends React.Component<Props, State> {
  public state: State = {
    currenStep: new StepActionsBuilder().firstStep(),
    steps: new StepActionsBuilder().generateSteps(),
    statusCode: 0,
  };

  public cancel = (): void => {
    this.props.handleCancel();
  };

  public showStepView = (step: StepClass): JSX.Element => {
    const views = [
      <ProductInformation cancel={this.cancel} next={this.nextStep} />,
      <FormStep cancel={this.cancel} next={this.nextStep} />,
      <FeedBack cancel={this.cancel} code={this.state.statusCode} />,
    ];

    const view = views[step.value - 1];
    return view;
  };

  public nextStep = (code?: number): void => {
    if (code) {
      this.setState({ statusCode: code });
    }

    const nextStep = this.state.steps.filter((step: StepClass) => {
      return step.value === this.state.currenStep.value + 1;
    });

    if (nextStep.length) {
      const oldStep = this.state.currenStep;

      const currenStep = nextStep[0];

      currenStep.stepActive();

      this.modifyArrayOfSteps(currenStep, oldStep);

      this.setState({ currenStep: currenStep });
    }
  };

  private modifyArrayOfSteps = (currentStep: StepClass, oldStep: StepClass) => {
    const arrayOfSteps = [...this.state.steps];

    arrayOfSteps.map(
      (value: StepClass, key: number): StepClass => {
        if (oldStep.value === value.value) {
          value.stepPassed();
        }

        if (currentStep.value === value.value) {
          value.stepActive();
        }
        return value;
      }
    );

    this.setState({ steps: arrayOfSteps });
  };

  public render() {
    return (
      <div className="window">
        <div className="window_modal">
          <Header steps={this.state.steps}></Header>

          <div className="window_modal-body">
            {this.showStepView(this.state.currenStep)}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
