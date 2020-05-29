import React from 'react';
import Title from '../../components/title/Title';
import Button from '../../components/button/Button';

import i18next from 'i18next';

import './Feedback.scss';

type Props = {
  cancel(): void;
  code: number;
};

type State = {};

class Feedback extends React.Component<Props, State> {
  public selectIcon = (): string => {
    const icon =
      this.props.code === 200 ? 'icon-check-circle' : 'icon-alert-triangle';

    return icon;
  };

  public selectText = (key: string): string => {
    const code = this.props.code === 200 ? 'succes' : 'error';

    const text = i18next.t(`step3.${code}.${key}`);
    return text;
  };

  render() {
    return (
      <section className="modal-body_content">
        <section className="modal-body_content_feedback">
          <i className={this.selectIcon()}></i>
          <section className="modal-body_content">
            <Title text={this.selectText('title')} underline={false} />

            <p>{this.selectText('text')}</p>
          </section>
        </section>

        <section className="modal-body_footer">
          <Button
            text={this.selectText('button')}
            class="primary-button"
            click={this.props.cancel}
            icon="icon-chevron-right"
          />
        </section>
      </section>
    );
  }
}

export default Feedback;
