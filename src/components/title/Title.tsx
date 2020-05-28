import React from 'react';

import './Title.scss';

type Props = {
  text: string;
  underline?: boolean;
};

class Button extends React.Component<Props> {
  public render() {
    return (
      <section className="title">
        <h2>{this.props.text}</h2>
        {this.props.underline ? (
          <span className="title_underline"></span>
        ) : null}
      </section>
    );
  }
}

export default Button;
