import React, { Component } from 'react';
import Api from '../../Api';
import styles from './ProfileForm.css';
import ProfileCard from './profileCard/ProfileCard';
import Designer from './designer/Designer';

// Container components handle all state changes. They are interested in data and how it changes
class ProfileForm extends Component {
  state = {
    name: '',
    iconList: ['help'],
    iconIndex: 0,
    iconColor: '#ddd',
  }

  // Container components can access React's lifecycle methods (unlike stateless functional components)
  componentDidMount() {
    // Container components will handle things such as calling api's and updating state
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

  // This container component is simply a container which renders and passes state/functions to other presentation components
  render() {
    return (
      <div className={styles.profileFormContainer}>
        <Designer name={this.state.name} handleNameChange={this.handleNameChange} onRandomiseIconClick={this.randomiseIcon} />
        <ProfileCard name={this.state.name} icon={this.state.iconList[this.state.iconIndex]} iconColor={this.state.iconColor} />
      </div>
    );
  }
}

export default ProfileForm;
