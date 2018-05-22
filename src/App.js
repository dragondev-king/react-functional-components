import React from 'react';
import styles from './App.css';
// replace with './components/new/ProfileForm' for new ProfileForm
import ProfileForm from './components/old/ProfileForm';

const App = () => (
  <div className={styles.app}>
    <ProfileForm />
  </div>
);

export default App;
