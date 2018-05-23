import React from 'react';
import styles from './App.css';
import ProfileForm from './components/old/ProfileForm';
// replace with './components/new/ProfileFormContainer' for new ProfileForm

const App = () => (
  <div className={styles.app}>
    <ProfileForm />
  </div>
);

export default App;
