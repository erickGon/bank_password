import React from 'react';

// Styles
import './Button.scss';

type Props = {
  text: string;
  icon?: string;
  class?: string;
  click: any;
  disable?: boolean
};

class Button extends React.Component<Props> {
  public showIcon = (): JSX.Element | null => {
    const iconHtml = this.props.icon ? (
      <i className={this.props.icon}></i>
    ) : null;

    return iconHtml;
  };

  public render() {
    const buttonStyle = this.props.class ? this.props.class : 'primary-button';

    return (
      <button
        className={buttonStyle}
        disabled={this.props.disable}
        onClick={() => this.props.click()}
        type="submit"
      >
        <span className="primary-button_text">{this.props.text}</span>
        {this.showIcon()}
      </button>
    );
  }
}

export default Button;
