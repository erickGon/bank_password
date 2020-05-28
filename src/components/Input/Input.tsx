import React from "react";

// Styles
import "./Input.scss";

type Props = {
  name: string;
  placeholder: string;
  type: string;
  handleChange(event: React.FormEvent<HTMLInputElement>): void;
};

type State = {
  inputValue: string;
};

class Input extends React.Component<Props, State> {
  public state: State = {
    inputValue: ""
  };

  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: event.currentTarget.value });
    this.props.handleChange(event);
  };

  public render() {
    return (
      <input
        className="main-input"
        name={this.props.name}
        onChange={this.handleChange}
        placeholder={this.props.name}
        type={this.props.type}
        value={this.state.inputValue}
      />
    );
  }
}

export default Input;
