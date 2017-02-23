import React, { Component } from 'react';


var h5HostName = {
  marginBottom: 5 + 'px',
  fontWeight: 600
};
var logoWapper = {
  marginBottom:5 + 'px',
  marginTop:5 + 'px'
}
var imgMapLogo = {
  width:15 + 'px',
  marginTop:-3 +'px'
};
var imgMsLogo = {
  height:35 + 'px',
  marginTop:-3 +'px'
};
var imgTpLogo = {
  height:15 + 'px',
  marginTop:-3 + 'px'
};


class Footer extends Component {
  render() {
    return (
      <footer className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="col-sm-4 col-sm-offset-4">
            <h5 className="text-center" style={h5HostName}>
              <a href="https://goo.gl/maps/tFgbirhZvxk" target="_blank">
                <img src="assets/img/map-logo.png" style={imgMapLogo} />
              </a>
              「實習x就業博覽會」3/18 10:30-16:00 花博爭豔館 | Copyright © 2017
            </h5>
            <h5 className="text-center" style={logoWapper}>
              <img src="assets/img/ms-logo.png" style={imgMsLogo} />
              <img src="assets/img/tp-logo.png" style={imgTpLogo} />
            </h5>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
