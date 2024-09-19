import React, { useState } from 'react';
import { Task } from '../types/Task';
import { Card, Tag, Progress, Select, Button, Input, DatePicker, Form, Slider } from 'antd';
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [localTitle, setLocalTitle] = useState(task.title);

  const handleStatusChange = (newStatus: Task['status']) => {
    const updatedTask = { ...task, status: newStatus };
    updatedTask.progress = newStatus === 'Complete' ? 100 : Math.min(task.progress, 99);
    onUpdate(updatedTask);
  };

  const handleProgressChange = (newProgress: number) => {
    const updatedTask = { ...task, progress: newProgress };
    updatedTask.status = newProgress === 100 ? 'Complete' : (task.status === 'Complete' ? 'In Progress' : task.status);
    onUpdate(updatedTask);
  };

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      ...task,
      startDate: task.startDate ? dayjs(task.startDate) : null,
      endDate: task.endDate ? dayjs(task.endDate) : null,
      tags: task.tags.join(', '),
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      try {
        const updatedTask: Task = {
          ...task,
          ...values,
          startDate: values.startDate ? values.startDate.toDate() : null,
          endDate: values.endDate ? values.endDate.toDate() : null,
          tags: Array.isArray(values.tags) 
            ? values.tags 
            : (typeof values.tags === 'string' ? values.tags.split(',').map((tag: string) => tag.trim()) : []),
        };

        // Ensure consistency between status and progress
        if (updatedTask.status === 'Complete') {
          updatedTask.progress = 100;
        } else if (updatedTask.progress === 100) {
          updatedTask.status = 'Complete';
        } else {
          updatedTask.progress = Math.min(updatedTask.progress, 99);
        }

        onUpdate(updatedTask);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }).catch((error) => {
      console.error("Form validation failed:", error);
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
  };

  return (
    <Card 
      title={
        <div style={{ textAlign: 'left' }}>
          {isEditing ? (
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{localTitle}</span>
          ) : (
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{task.title}</span>
          )}
        </div>
      }
      extra={
        isEditing ? (
          <>
            <Button onClick={handleSave} type="primary" style={{ marginRight: 8 }}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} icon={<EditOutlined />} style={{ marginRight: 8 }}>Edit</Button>
            <Button danger onClick={() => onDelete(task.id)} icon={<DeleteOutlined />}>Delete</Button>
          </>
        )
      }
      className='mb-8 bg-gradient-to-r from-gray-50 to-gray-50 text-gray-500 py-6 shadow-lg border-3 border-amber-200'
    >
      {isEditing ? (
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleSave}
          initialValues={{
            ...task,
            startDate: task.startDate ? dayjs(task.startDate) : null,
            endDate: task.endDate ? dayjs(task.endDate) : null,
            tags: task.tags.join(', '),
            progress: task.progress
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="title" rules={[{ required: true, message: 'Title is required' }]} className="col-span-2">
              <Input onChange={handleTitleChange} placeholder="Task Title" />
            </Form.Item>
            <Form.Item name="description" label="Description" className="col-span-2">
              <Input.TextArea rows={4} placeholder="Task Description" />
            </Form.Item>
            <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Priority is required' }]}>
              <Select>
                <Select.Option value="Low">Low</Select.Option>
                <Select.Option value="Medium">Medium</Select.Option>
                <Select.Option value="High">High</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select onChange={handleStatusChange}>
                <Select.Option value="New">New</Select.Option>
                <Select.Option value="In Progress">In Progress</Select.Option>
                <Select.Option value="Complete">Complete</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item 
              name="startDate" 
              label="Start Date" 
              rules={[{ required: true, message: 'Start Date is required' }]}
            >
              <DatePicker 
                style={{ width: '100%' }} 
                disabledDate={(current) => current && current.isBefore(dayjs().startOf('day'))}
              />
            </Form.Item>
            <Form.Item 
              name="endDate" 
              label="End Date" 
              rules={[{ required: true, message: 'End Date is required' }]}
            >
              <DatePicker 
                style={{ width: '100%' }} 
                disabledDate={(current) => {
                  const startDate = form.getFieldValue('startDate');
                  return current && (current.isBefore(dayjs().startOf('day')) || (startDate && current.isBefore(startDate)));
                }}
              />
            </Form.Item>
            <Form.Item name="tags" label="Tags" className="col-span-2">
              <Input placeholder="Enter tags separated by commas" />
            </Form.Item>
            <Form.Item name="progress" label="Progress" className="col-span-2">
              <Slider
                min={0}
                max={100}
                step={1}
                tooltip={{ formatter: value => `${value}%` }}
                onChange={handleProgressChange}
              />
            </Form.Item>
          </div>
        </Form>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-100 p-6 rounded-xl text-left shadow-md border border-amber-200">
            <p className="text-gray-800 font-serif leading-relaxed">{task.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold mr-2">Priority:</span>
              <Tag color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green'}>
                {task.priority}
              </Tag>
            </div>
            <div>
              <span className="font-semibold mr-2">Status:</span>
              <Select value={task.status} onChange={handleStatusChange} style={{ width: 130 }}>
                <Select.Option value="New">New</Select.Option>
                <Select.Option value="In Progress">In Progress</Select.Option>
                <Select.Option value="Complete">Complete</Select.Option>
              </Select>
            </div>
          </div>
          
          <div className="text-left flex flex-grow">
            <span className="font-semibold mr-2 text-lg">Tags:</span>
            <div className="mt-1 flex flex-nowrap">
              {task.tags.map(tag => <Tag key={tag} className="mr-1 mb-1">{tag}</Tag>)}
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <span className="font-semibold mr-2">Start Date:</span>
              <span>{task.startDate ? dayjs(task.startDate).format('MMM D, YYYY') : 'N/A'}</span>
            </div>
            <div>
              <span className="font-semibold mr-2">End Date:</span>
              <span>{task.endDate ? dayjs(task.endDate).format('MMM D, YYYY') : 'N/A'}</span>
            </div>
          </div>
          
          <div 
            className="cursor-pointer"
            onClick={(event) => {
              const progressBar = event.currentTarget;
              const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
              const newProgress = Math.round((clickPosition / progressBar.offsetWidth) * 100);
              handleProgressChange(newProgress);
            }}
          >
            <span className="font-semibold mb-2 block">Progress:</span>
            <Progress percent={task.progress} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default TaskItem;
