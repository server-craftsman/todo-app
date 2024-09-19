import React from 'react';
import { Task } from '../types/Task';
import { Form, Input, Select, DatePicker, Button, Slider } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Make sure to import moment

interface AddTaskFormProps {
  onAddTask: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleStatusChange = (value: string) => {
    if (value === 'Complete') {
      form.setFieldsValue({ progress: 100 });
    }
  };

  const handleSubmit = (values: any) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      tags: values.tags || [], // Use tags directly, it's already an array
      startDate: values.startDate.toDate(),
      endDate: values.endDate.toDate(),
      subtasks: [],
      progress: values.status === 'Complete' ? 100 : (values.progress || 0),
    };
    onAddTask(newTask);
    form.resetFields();
    navigate('/');
  };

  return (
    <Form 
      form={form} 
      onFinish={handleSubmit} 
      layout="vertical" 
      className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg space-y-6"
      initialValues={{ progress: 0 }} // Add this line
    >
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Add Task</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item 
          name="title" 
          label="Title" 
          rules={[{ required: true, message: 'Please input the title!' }]}
          className="col-span-1"
        >
          <Input className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
        </Form.Item>
        <Form.Item 
          name="priority" 
          label="Priority" 
          rules={[{ required: true, message: 'Please select the priority!' }]}
          className="col-span-1"
        >
          <Select className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500">
            <Select.Option value="Low">Low</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="High">High</Select.Option>
          </Select>
        </Form.Item>
      </div>
  
      <Form.Item 
        name="description" 
        label="Description"
        className="col-span-1"
      >
        <Input.TextArea rows={4} className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" />
      </Form.Item>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item 
          name="startDate" 
          label="Start Date" 
          rules={[
            { required: true, message: 'Please select the start date!' },
            () => ({
              validator(_, value) {
                if (!value || moment(value).isSameOrAfter(moment().startOf('day'))) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Start date must be today or in the future!'));
              },
            }),
          ]}
          className="col-span-1"
        >
          <DatePicker 
            className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            disabledDate={(current) => current && current < moment().startOf('day')}
          />
        </Form.Item>
        <Form.Item 
          name="endDate" 
          label="End Date" 
          rules={[
            { required: true, message: 'Please select the end date!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const startDate = getFieldValue('startDate');
                if (!value || !startDate) {
                  return Promise.resolve();
                }
                const endMoment = moment(value);
                const startMoment = moment(startDate);
                if (endMoment.isSameOrAfter(startMoment, 'day')) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('End date must be on or after the start date!'));
              },
            }),
          ]}
          className="col-span-1"
        >
          <DatePicker 
            className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            disabledDate={(current) => {
              const startDate = form.getFieldValue('startDate');
              if (!startDate) {
                return current && current < moment().startOf('day');
              }
              return current && (
                current < moment().startOf('day') || 
                current < moment(startDate).startOf('day')
              );
            }}
          />
        </Form.Item>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item 
          name="tags" 
          label="Tags"
          className="col-span-1"
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Enter tags"
            tokenSeparators={[',']}
          />
        </Form.Item>
        <Form.Item 
          name="status" 
          label="Status" 
          rules={[{ required: true, message: 'Please select the status!' }]}
          className="col-span-1"
        >
          <Select className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500" onChange={handleStatusChange}>
            <Select.Option value="New">New</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Complete">Complete</Select.Option>
          </Select>
        </Form.Item>
      </div>
  
      <Form.Item 
        name="progress" 
        label="Progress"
        className="col-span-1"
      >
        <Slider
          min={0}
          max={100}
          step={1}
          // Remove the defaultValue prop
          tooltip={{ formatter: value => `${value}%` }}
          className="my-4"
        />
      </Form.Item>
  
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md px-6 py-3 text-lg font-semibold"
        >
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
  
};

export default AddTaskForm;
