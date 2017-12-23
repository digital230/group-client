import React, {Component, PureComponent} from 'react';

export default class Layout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {}
  }


  render() {
    const {children} = this.props;
    const component  = React.cloneElement(children)

    return (
      <div>
        {component}
      </div>
    );
  }
}
