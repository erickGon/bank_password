import React from "react";
import i18next from 'i18next';

import Title from '../../components/title/Title';
import Button from '../../components/button/Button';

type Props = {
	cancel(): void;
	next(): void;
};

type State = {
	disable: boolean;
};


class FormStep extends React.Component<Props, State> {

  public state: State = {
    disable: true
  }

	public next = () => {
    if(!this.state.disable) {
      console.log("next");
      this.props.next();
    }
  };

	render() {
		return (
			<section className="modal-body">
				<Title text={i18next.t('CreateYourPasswordManager')} underline={true} />
				<section className="modal-body_content"></section>
				<section className="modal-body_footer">
          <Button
            text={i18next.t('cancel')}
            class="secondary-button-invert"
            click={this.props.cancel}
          />

          <Button
            text={i18next.t('next')}
            class="secondary-button"
            click={this.next}
            disable={this.state.disable}
          />
        </section>
			</section>
		);
	}
}

export default FormStep;