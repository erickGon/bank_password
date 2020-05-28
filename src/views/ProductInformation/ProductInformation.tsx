import React from 'react';
import Button from '../../components/button/Button';
import Title from '../../components/title/Title';
import Input from '../../components/Input/Input';

import './ProductInformation.scss';
import securitySave from '../../assets/img/group-3.svg';
import remenberPassword from '../../assets/img/group.svg';

import i18next from 'i18next';

type Props = {
  cancel(): void;
  next(): void;
};

type State = {
  disable: boolean;
};

class ProductInformation extends React.Component<Props, State> {
  public state: State = {
    disable: true,
  };

  public next = () => {
    if(!this.state.disable) {
      console.log("next");
      this.props.next();
    }
  };

  public handleCheck = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({disable: !event.currentTarget.checked})
  };

  public render() {
    return (
      <section className="modal-body">
        <Title text={i18next.t('CreateYourPasswordManager')} underline={true} />

        <section className="modal-body_content">
          <section className="modal-body_content-same-row">
            <div className="modal-body_content-same-row_paragraph">
              <img alt="remenberPassword" src={remenberPassword}></img>
              <p>{i18next.t('step1.textImage1')}</p>
            </div>

            <div className="modal-body_content-same-row_paragraph">
              <img alt="securitySave" src={securitySave}></img>
              <p>{i18next.t('step1.textImage2')}</p>
            </div>
          </section>
          <section className="modal-body_content_paragraph">
            <h3>{i18next.t('step1.title1')}</h3>
            <p>{i18next.t('step1.text1')}</p>
          </section>
          <section className="modal-body_content_paragraph">
            <h3>{i18next.t('step1.title2')}</h3>
            <p>{i18next.t('step1.text2')}</p>
          </section>
          <section className="modal-body_content_check">
            <Input
              name="check"
              placeholder={i18next.t('step1.textCheck')}
              type="checkbox"
              handleChange={this.handleCheck}
            />
            <label htmlFor="check">{i18next.t('step1.textCheck')}</label>
          </section>
        </section>
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

export default ProductInformation;
