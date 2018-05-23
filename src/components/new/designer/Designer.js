import React from 'react';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import styles from './Designer.css';

// Stateless functional components are not interested in how data changes or what to do with it when it does change
// As such they take in functions from their container as props and simply call them where needed
// Stateless functional components are only interested in how the data should be presented
// So if the data-provider changed for whatever reason, as long as it sticks to the prop-type contract, everything should still work
const Designer = ({ name, onRandomiseIconClick, handleNameChange, onInputBlur, setInputRef }) => (
  <div className={styles.designerContainer}>
    <Input
      id="designerInput"
      autoFocus
      type="text"
      label="Name"
      value={name}
      onChange={handleNameChange}
      innerRef={setInputRef}
      onBlur={onInputBlur}
    />
    {/* This button has no idea what onRandomiseIconClick does.
    If the function implementation changes in the future this button doesn't have strict ties to the logic and will not be affected */}
    <Button
      id="randomiseIconButton"
      icon="gesture"
      raised
      label="Randomise Icon"
      onClick={onRandomiseIconClick}
    />
  </div>
);

Designer.propTypes = {
  name: PropTypes.string,
  onRandomiseIconClick: PropTypes.func,
  handleNameChange: PropTypes.func,
  onInputBlur: PropTypes.func,
  setInputRef: PropTypes.func,
};

Designer.defaultProps = {
  name: '',
  onRandomiseIconClick: null,
  handleNameChange: null,
  onInputBlur: null,
  setInputRef: null,
};

export default Designer;
