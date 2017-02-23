import React, { Component } from 'react';
import PredictGame from './predictGame';
import Footer from './footer';

class IndexApp extends Component {
  render() {
    return (
      <div>
        <PredictGame />
        <Footer />
      </div>
    );
  }
}

export default IndexApp;
