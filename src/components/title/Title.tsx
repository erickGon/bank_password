import React from 'react';

import './Title.scss';

type Props = {
  text: string;
  underline?: boolean;
  icon?: string;
};

class Button extends React.Component<Props> {
  public render() {
    return (
      <section className="title">
        <h2>
          {this.props.icon ? <i className={this.props.icon}></i> : null}
          {this.props.text}
        </h2>
        {this.props.underline ? (
          <span className="title_underline"></span>
        ) : null}
      </section>
    );
  }
}

export default Button;
