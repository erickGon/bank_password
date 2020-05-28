import React from 'react';

import './Modal.scss';

import steps from '../../mocks/stepsList';

import StepType from '../../types/StepType';

import Header from '../header/Header';
import ProductInformation from '../../views/ProductInformation/ProductInformation';
import FormStep from '../../views/FormStep/FormStep';


type Props = {
	handleCancel(): void;
};

type State = {
  currenStep: StepType;
  steps: StepType[];
};

class Modal extends React.Component<Props, State> {
  public state: State = {
    currenStep: {...steps[0]},
    steps: [...steps],
  };

  public cancel = (): void =>  {
    console.log(this.state.steps, steps);
    // this.setState({steps: steps});
    this.props.handleCancel();
  }

	public showStepView = (step: StepType): JSX.Element => {
    const views = [
      <ProductInformation cancel={this.cancel} next={this.nextStep}/>,
      <FormStep cancel={this.cancel} next={this.nextStep}/>,
      <ProductInformation cancel={this.cancel} next={this.nextStep}/>
    ]

		const view = views[(step.value - 1)];
		return view;
  }
  
  public nextStep = (): void => {

    const nextStep = this.state.steps.filter((step: StepType) => {
      return step.value === (this.state.currenStep.value + 1);
    })

    if(nextStep.length)  {

      const oldStep = this.state.currenStep;

      const currenStep = nextStep[0];
      currenStep.active = true;
      currenStep.passed = false;

      this.modifyArrayOfSteps(currenStep, oldStep);

      this.setState({currenStep: currenStep});
    }
  }

  private modifyArrayOfSteps = (currenStep: StepType, oldStep: StepType) => {
    const arrayOfSteps = [...this.state.steps];

    arrayOfSteps.map((value: StepType, key: number) => {
      arrayOfSteps[key].active = false;

      if(oldStep.value === value.value) {
        arrayOfSteps[key].passed = true;
      }

      if(currenStep.value === value.value) {
        arrayOfSteps[key].active = true;
      }
    });

    this.setState({steps: arrayOfSteps})
  }

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
