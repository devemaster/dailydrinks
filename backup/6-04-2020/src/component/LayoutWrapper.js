import React from 'react';
import Helmet from 'react-helmet';

const LayoutWrapper = ({ children, title, header }) => (
  <div className="outer_wrapper">
    <Helmet
      title={title}
    />
    <div>
      {children}
    </div>
  </div>
);

LayoutWrapper.propTypes = {
  children: React.PropTypes.any,
  title: React.PropTypes.string,
  header: React.PropTypes.any,
};

export default LayoutWrapper;
