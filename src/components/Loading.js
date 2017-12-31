import React, {PureComponent} from 'react';
import { FadeLoader } from 'halogenium';


export default class Loading extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {text = 'Please wait'} = this.props;
    return (
      <div className="loading-container">
        <h3>{text}</h3>
        <FadeLoader color="#26A65B" size="16px" margin="4px"/>
      </div>
    );
  }
}
