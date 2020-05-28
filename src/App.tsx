import React from 'react';

import './styles/App.scss';

import Header from './components/header/Header';
import Button from './components/button/Button';
import Modal from './components/modal/Modal';

import i18next from "i18next";

type Props = {};

type State = {
  showModal: boolean;
  buttonText: string;
};

class App extends React.Component<Props, State> {

  public state: State = {
    showModal: false,
    buttonText: i18next.t('start')
  };

  public toggleModal = (): void => {
    console.log('toggleModal');
    this.setState({ showModal: !this.state.showModal });
  };

  public render() {
    return (
      <div className="app">
        <Header steps={[]} />
        <main className="app_body">
          <Button
            text={this.state.buttonText}
            class="secondary-button"
            icon="icon-info"
            click={this.toggleModal}
          />
        </main>
        <footer className="app_footer-bottom">
          <p>Openbank S.A.</p>
        </footer>
        {this.state.showModal ? <Modal handleCancel={this.toggleModal}/> : null}
      </div>
    );
  }
}

export default App;
