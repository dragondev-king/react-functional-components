import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import Avatar from 'react-toolbox/lib/avatar';
import Api from '../../Api';
import styles from './ProfileForm.css';

class ProfileForm extends Component {
  state = {
    name: '',
    iconList: ['person_outline'],
    iconIndex: 0,
    iconColor: '#dddddd',
  }

  componentDidMount() {
    Api.getIconList().then((iconList) => {
      this.setState({ iconList });
    });
  }

  getRandomColor = () => `hsl(${Math.floor(Math.random() * 10) * 36 % 360},100%,50%)`;

  handleNameChange = (name) => {
    this.setState({ name });
    this.randomiseIcon();
  }

  randomiseIcon = () => {
    this.setState({
      iconIndex: Math.floor(Math.random() * this.state.iconList.length),
      iconColor: this.getRandomColor(),
    });
  }

  isNameAwesome = (name) => {
    if (name === 'Rowan') {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className={styles.profileFormContainer}>
        <div className={styles.controllerContainer}>
          <Input
            autoFocus
            type="text"
            label="Name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <Button icon="gesture" raised primary label="Randomise Icon" onClick={this.randomiseIcon} />
        </div>
        <div className={styles.profileCardContainer}>
          <div className={styles.nameContainer}>
            <Avatar style={{ backgroundColor: this.state.iconColor }} icon={this.state.iconList[this.state.iconIndex]} />
            <div className={styles.nameSubContainer}>
              <p className={styles.name}>{this.state.name}</p>
              {this.state.name !== '' ?
                <p className={styles.complement}>You have an {this.isNameAwesome(this.state.name) ? 'Awesome' : 'okay'} name!</p>
                : <p className={styles.complement}>Waiting on name input...</p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileForm;
