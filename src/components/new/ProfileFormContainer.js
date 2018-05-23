import React, { Component } from 'react';
import Api from '../../Api';
import styles from './ProfileFormContainer.css';
import ProfileCard from './profileCard/ProfileCard';
import Designer from './designer/Designer';

// Container components handle all state changes. They are interested in data and how it changes
class ProfileFormContainer extends Component {
  state = {
    name: '',
    iconList: ['help'],
    iconIndex: 0,
    iconColor: 'lightgrey',
    inputRef: null,
  }

  // Container components can access React's lifecycle methods (unlike stateless functional components)
  componentDidMount() {
    // Container components will handle things such as calling api's and updating state
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
        iconColor: 'lightgrey',
      });
    }
  }

  randomiseIcon = () => {
    this.setState({
      iconIndex: Math.floor(Math.random() * this.state.iconList.length),
      iconColor: this.getRandomColor(),
    });
  }

  // This container component is simply a container which renders and passes state/functions to other presentation components
  render() {
    return (
      <div className={styles.profileFormContainer}>
        <Designer
          name={this.state.name}
          handleNameChange={this.handleNameChange}
          onRandomiseIconClick={this.randomiseIcon}
          onInputBlur={this.onInputBlur}
          setInputRef={this.setInputRef}
        />
        <ProfileCard
          name={this.state.name}
          icon={this.state.iconList[this.state.iconIndex]}
          iconColor={this.state.iconColor}
        />
      </div>
    );
  }
}

export default ProfileFormContainer;
