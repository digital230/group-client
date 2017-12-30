import React, {PureComponent} from 'react';
import {
  Avatar
} from 'material-ui';

export default class MyAvatar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {image, styles, name} = this.props;

    return (
      <React.Fragment>
        {image ?
          <Avatar
            alt={name}
            className={styles.avatar}
          />
          :
          <Avatar className={styles.avatar}>{name}</Avatar>
        }
      </React.Fragment>
    );
  }
}
