import React from 'react';

import './Header.scss';

import StepType from '../../types/StepType';

type Props = {
  steps: StepType[];
};

type State = {
  currenStep: number;
};

class Header extends React.Component<Props, State> {
  public state: State = {
    currenStep: 1,
  };

  public checkStepClass = (step: StepType): string => {
    let cssClass = step.active
      ? 'main-header_steps-cicle main-header_steps-cicle-active'
      : 'main-header_steps-cicle ';

      if (step.passed) cssClass = 'main-header_steps-cicle main-header_steps-cicle-passed';

    return cssClass;
  };

  public checkstepstate = (step: StepType): JSX.Element => {
    const htmlTag = step.passed ? (
      <i className="icon-check"></i>
    ) : (
      <span>{step.title}</span>
    );

    return htmlTag;
  };

  public checkShowConnector = (step: StepType): JSX.Element | null => {
    const cssClass = step.passed
      ? 'main-header_steps-line main-header_steps-line-passed'
      : 'main-header_steps-line';

    const htmlTag =
      this.props.steps[this.props.steps.length - 1].value ===
      step.value ? null : (
        <div className={cssClass}></div>
      );

    return htmlTag;
  };

  public render() {
    const headerSteps = this.props.steps.map((step: StepType) => {
      return (
        <div key={step.value} className="main-header_steps-container">
          <div className={this.checkStepClass(step)}>
            <div className="main-header_steps-cicle_title">
              {this.checkstepstate(step)}
            </div>
          </div>
          {this.checkShowConnector(step)}
        </div>
      );
    });

    return (
      <header className="main-header">
        <div className="main-header_steps">{headerSteps}</div>
      </header>
    );
  }
}

export default Header;
