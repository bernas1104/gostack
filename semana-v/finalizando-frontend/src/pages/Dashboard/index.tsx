import React from 'react';

import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
