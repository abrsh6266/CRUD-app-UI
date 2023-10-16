import React from 'react';
import { Form, Input, Modal} from 'antd';
import { useQueryClient } from 'react-query';

interface UserFormProps {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ visible, onCreate, onCancel }) => {
  const queryClient = useQueryClient();

  const createUser = async (formData: any) => {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      queryClient.invalidateQueries('users');
      onCreate(formData);
    } else {
      console.error('Error creating user');
    }
  };

  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Create User"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            createUser(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;