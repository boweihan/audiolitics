import React, { PureComponent } from 'react';

const styles = {
  container: {
    backgroundColor: '#323E47',
    height: '100%',
    width: '100%',
    borderRadius: 3,
  },
};

class Bubble extends PureComponent {
  render() {
    return <div style={styles.container} />;
  }
}

export default Bubble;
