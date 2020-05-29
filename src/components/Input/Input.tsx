import React from 'react';

// Styles
import './Input.scss';

type Props = {
  name: string;
  placeholder: string;
  type: string;
  handleChange(event: React.FormEvent<HTMLInputElement>): void;
  max?: number;
  min?: number;
  required?: boolean;
  icon?: string;
};

type State = {
  inputValue: string;
  inputType: string;
};

class Input extends React.Component<Props, State> {
  public state: State = {
    inputValue: '',
    inputType: '',
  };

  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    this.props.handleChange(event);
    this.setState({ inputValue: event.currentTarget.value });
  };

  public changeTypeInput = (type: string): void => {
    if (this.state.inputType === type) {
      this.setState({ inputType: this.props.type });
    } else {
      this.setState({ inputType: type });
    }
  };

  public render() {
    const type = this.state.inputType ? this.state.inputType : this.props.type;

    return (
      <div className="input-container_main-input">
        <input
          className="main-input"
          name={this.props.name}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          type={type}
          value={this.state.inputValue}
          maxLength={this.props.max}
          minLength={this.props.min}
          required={this.props.required}
        />
        {this.props.icon ? (
          <button type="button" onClick={() => this.changeTypeInput('text')}>
            <i className={this.props.icon}></i>
          </button>
        ) : null}
      </div>
    );
  }
}

export default Input;
