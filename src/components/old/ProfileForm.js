import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import Avatar from 'react-toolbox/lib/avatar';
import Api from '../../Api';
import styles from './ProfileForm.css';

class ProfileForm extends Component {
  state = {
    name: '',
    iconList: ['help'],
    iconIndex: 0,
    iconColor: '#ddd',
    inputRef: null,
  }

  componentDidMount() {
    Api.getIconList().then((iconList) => {
      this.setState({ iconList });
    });
  }

  onInputBlur = () => {
    this.state.inputRef.focus();
  }

  setInputRef = (input) => {
    this.setState({ inputRef: input });
  }

  getRandomColor = () => `hsl(${Math.floor(Math.random() * 10) * 36 % 360},100%,50%)`;

  handleNameChange = (name) => {
    this.setState({ name });
    if (name) {
      this.randomiseIcon();
    } else {
      this.setState({
        iconIndex: 0,
        iconColor: '#ddd',
      });
    }
  }

  randomiseIcon = () => {
    this.setState({
      iconIndex: Math.floor(Math.random() * this.state.iconList.length),
      iconColor: this.getRandomColor(),
    });
  }

  render() {
    return (
      <div className={styles.profileFormContainer}>
        <div className={styles.designerContainer}>
          <Input
            autoFocus
            type="text"
            label="Name"
            value={this.state.name}
            onChange={this.handleNameChange}
            innerRef={this.setInputRef}
            onBlur={this.onInputBlur}
          />
          <Button icon="gesture" raised label="Randomise Icon" onClick={this.randomiseIcon} />
        </div>
        <div className={styles.profileCardContainer}>
          <div className={styles.nameContainer}>
            <Avatar style={{ backgroundColor: this.state.iconColor }} icon={this.state.iconList[this.state.iconIndex]} />
            <div className={styles.nameSubContainer}>
              <p className={styles.name}>{this.state.name}</p>
              {this.state.name ?
                <p className={styles.complement}>Has  very cool name!</p>
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
