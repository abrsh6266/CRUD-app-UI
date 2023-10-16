import React, { useState } from 'react';
import { Button } from 'antd';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleCreate = (values: any) => {
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
