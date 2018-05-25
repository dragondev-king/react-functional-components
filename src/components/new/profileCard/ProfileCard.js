import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-toolbox/lib/avatar';
import styles from './ProfileCard.css';

// The goal for a stateless functional component like this is to have it small and concise enough that it can be reused anywhere
// To do so it should not have any ties to how data is collected or manipulated
// Everything that can change is handled in the a controller component which passes those values as props
const ProfileCard = ({ name, icon, iconColor }) => {
  // Stateless functional components can include functions inside them as long as they are only for presentational logic
  // Arguably this could be refactored into its own stateless functional component
  const renderCompliment = () => {
    let compliment = 'Missing name...';
    if (name) {
      compliment = 'Has a very cool name!';
    }
    return <p id="profileCardCompliment" className={styles.compliment}>{compliment}</p>;
  };

  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.nameContainer}>
        <Avatar id="profileCardIcon" style={{ backgroundColor: iconColor }} icon={icon} />
        <div className={styles.nameSubContainer}>
          <p id="profileCardName" className={styles.name}>{name}</p>
          {renderCompliment()}
        </div>
      </div>
    </div>
  );
};

// It is very important for reusability that a prop-type contract is defined and upheld by all components passing props to this one
// By defining prop types and naming props appropriately it should be clear what each prop is for
ProfileCard.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
};

ProfileCard.defaultProps = {
  name: '',
  iconColor: 'lightgrey',
};

export default ProfileCard;
