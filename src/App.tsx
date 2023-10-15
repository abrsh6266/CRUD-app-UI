import React, { useState } from 'react';
import { Button } from 'antd';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css'; // Import the CSS file for styling

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleCreate = (values: any) => {
    // Implement the logic to send a request to create a user
    console.log('Received values:', values);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="app-container">
      <Button type="primary" onClick={() => setVisible(true)}>
        Create User
      </Button>
      <UserList />
      <UserForm visible={visible} onCreate={handleCreate} onCancel={handleCancel} />
    </div>
  );
};

export default App;
