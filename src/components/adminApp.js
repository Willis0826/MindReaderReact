import React, { Component } from 'react';
import RecordDisplay from './recordDisplay';
import Footer from './footer';

class AdminApp extends Component {
  render() {
    return (
      <div>
        <RecordDisplay />
        <Footer />
      </div>
    );
  }
}

export default AdminApp;
