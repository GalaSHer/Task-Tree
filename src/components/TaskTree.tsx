import React from 'react';
import { observer } from 'mobx-react-lite';
import { taskStore } from '../store/taskStore';
import TaskItem from './TaskItem';
import styled from 'styled-components';


const TaskTree: React.FC = observer(() => {
  return (
    <TaskTreeWrapper>
      {taskStore.tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </TaskTreeWrapper>
  );
});

export default TaskTree;

const TaskTreeWrapper = styled.div`
  margin-top: 20px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
`;
