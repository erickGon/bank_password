import React from 'react';
import i18next from 'i18next';
import submitForm from '../../services/api';

import Title from '../../components/title/Title';
import Button from '../../components/button/Button';
import Input from '../../components/Input/Input';
import Loader from '../../components/loader/Loader';

import './FormStep.scss';

type Props = {
  cancel(): void;
  next(code?: number): void;
};

type State = {
  disable: boolean;
  password: string;
  passwordRepeat: string;
  hint: string;
  showErrorPasswordRepeat: boolean;
  showErrorPasswordFormat: boolean;
  showErrorHint: boolean;
  hintMaxLength: number;
  showLoader: boolean;
};

class FormStep extends React.Component<Props, State> {
  public state: State = {
    disable: true,
    password: '',
    passwordRepeat: '',
    hint: '',
    showErrorPasswordRepeat: false,
    showErrorPasswordFormat: false,
    showErrorHint: false,
    hintMaxLength: 255,
    showLoader: false,
  };

  private passwordFormat = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,24})$/;

  public click = () => {
    console.log('click');
  };

  public next = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (this.checkSubmmit()) {
      this.submitData();
    }
  };

  private submitData() {
    this.setState({ showLoader: true });

    submitForm(this.state.password)
      .then((data: any) => {
        this.setState({ showLoader: false });
        this.goToNextStep(data.status);
      })
      .catch((error) => {
        this.setState({ showLoader: false });
        this.goToNextStep(error.status);
      });
  }

  private goToNextStep = (code: number): void => {
    if (code === 200) {
      this.props.next(code);
    } else {
      this.props.next(code);
    }
  };

  private checkSubmmit = (): boolean => {
    const pass =
      !this.state.disable &&
      !this.state.showErrorPasswordFormat &&
      !this.state.showErrorPasswordRepeat &&
      !this.state.showErrorHint;
    return pass;
  };

  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const name: string = event.currentTarget.name;
    const value: any = event.currentTarget.value;

    this.setState(
      {
        [name]: value,
      } as Pick<State, keyof State>,
      () => {
        this.checkPasswordEquals();
        this.checkPasswordFormat();
        this.checkHintLength();
      }
    );
  };

  private checkPasswordEquals = (): void => {
    let pass = true;
    const password = this.state.password;
    const passwordRepeat = this.state.passwordRepeat;

    if (password && passwordRepeat) {
      pass = password !== passwordRepeat;
      this.setState({ disable: pass });
      this.setState({ showErrorPasswordRepeat: pass });
    }
  };

  private checkPasswordFormat = (): void => {
    if (this.state.password) {
      const pass = this.passwordFormat.test(this.state.password);

      this.setState({ showErrorPasswordFormat: !pass });
    }
  };

  private checkHintLength() {
    if (this.state.hint) {
      const pass = this.state.hint.length <= this.state.hintMaxLength;
      this.setState({ showErrorHint: !pass });
    }
  }

  render() {
    return (
      <section className="modal-body">
        <Title text={i18next.t('CreateYourPasswordManager')} underline={true} />
        <form onSubmit={this.next}>
          <section className="modal-body_content">
            <div className="modal-body_content_info">
              <p>
                {i18next.t('step2.text1')}
                <br></br>
                {i18next.t('step2.text2')}
              </p>
            </div>
            <div className="modal-body_content_inputs">
              <div className="modal-body_content_inputs-password">
                <label htmlFor="password">
                  {i18next.t('step2.passwordLabel')}
                </label>
                <Input
                  name="password"
                  placeholder={i18next.t('step2.passwordPlaceholder')}
                  type="password"
                  handleChange={this.handleChange}
                  required={true}
                  max={24}
                  min={8}
                  icon="icon-eye"
                />
                {this.state.showErrorPasswordFormat ? (
                  <span className="modal-body_content_inputs_error">
                    {i18next.t('step2.passwordError')}
                  </span>
                ) : null}
              </div>

              <div className="modal-body_content_inputs-password">
                <label htmlFor="passwordRepeat">
                  {i18next.t('step2.passwordRepeateLabel')}
                </label>
                <Input
                  name="passwordRepeat"
                  placeholder={i18next.t('step2.passwordRepeatPlaceholder')}
                  type="password"
                  handleChange={this.handleChange}
                  required={true}
                  max={24}
                  min={8}
                  icon="icon-eye"
                />

                {this.state.showErrorPasswordRepeat ? (
                  <span className="modal-body_content_inputs_error">
                    {i18next.t('step2.passwordRepearError')}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="modal-body_content_info">
              <p>{i18next.t('step2.text3')}</p>
            </div>

            <div className="modal-body_content_inputs">
              <div className="modal-body_content_inputs-text">
                <label htmlFor="hint">
                  {i18next.t('step2.passwordRemenberLabel')}
                </label>
                <Input
                  name="hint"
                  placeholder={i18next.t('step2.passwordRemenberPlaceholder')}
                  type="text"
                  handleChange={this.handleChange}
                  required={false}
                  max={this.state.hintMaxLength}
                />
                <span>0/{this.state.hintMaxLength}</span>
                {this.state.showErrorHint ? (
                  <div className="modal-body_content_inputs_error">
                    {i18next.t('step2.passwordRememberError')}
                  </div>
                ) : null}
              </div>
            </div>
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
              click={this.click}
              disable={this.state.disable}
            />
          </section>
        </form>

        {this.state.showLoader ? <Loader /> : null}
      </section>
    );
  }
}

export default FormStep;
