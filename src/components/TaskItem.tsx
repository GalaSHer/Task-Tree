import React from 'react';
import { observer } from 'mobx-react-lite';
import { ITask, taskStore } from '../store/taskStore';
import styled from 'styled-components';


interface TaskItemProps {
  task: ITask;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task }) => {
  const handleCheck = () => {
    task.toggleCheck();
    taskStore.toggleSubTasks(task);
    if (task.parent) {
      taskStore.checkParentStatus(task.parent);
    }
  };

  return (
    <TaskWrapper style={{ marginLeft: task.parent ? '20px' : '0' }}>
      <label>
        <input
          type="checkbox"
          checked={task.isChecked}
          onChange={handleCheck}
        />
        {task.title}
      </label>
      {task.subTasks.length > 0 && (
        <div>
          {task.subTasks.map((subTask) => (
            <TaskItem key={subTask.id} task={subTask} />
          ))}
        </div>
      )}
    </TaskWrapper>
  );
});

export default TaskItem;

const TaskWrapper = styled.div`
  padding: 5px 0;
  font-size: 16px;

  label {
    font-weight: bold;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }

  & > div {
    margin-left: 20px;
    padding-left: 10px;
    border-left: 2px solid #ccc;
  }
`;
