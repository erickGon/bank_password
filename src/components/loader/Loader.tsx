import React from 'react';

import './Loader.scss';

import logo from '../../assets/img/key_openbank.png';

type Props = {};

type State = {};

class Loader extends React.Component<Props, State> {
  public render() {
    return (
      <section id="loader">
        <div className="loader_background">
          <img src={logo} className="loader_background_logo" alt="logo" />
        </div>
      </section>
    );
  }
}

export default Loader;
