import React, { useEffect } from 'react';
import { Task, taskStore } from './store/taskStore';
import TaskTree from './components/TaskTree';
import GlobalStyle from './globalStyles';
import { tasks, subTasks1, subTasks2, subsubTasks1 } from './mockData';


const App: React.FC = () => {
  useEffect(() => {
    if (taskStore.tasks.length === 0) {
      const arrTask = tasks.map(task => {
        return new Task(task)
      })
    
      const arrSubTask1 = subTasks1.map(task => {
        return new Task(task)
      })
    
      const arrSubTask2 = subTasks2.map(task => {
        return new Task(task)
      })
    
      const arrSubSubTask1 = subsubTasks1.map(task => {
        return new Task(task)
      })

      arrTask.forEach(task => taskStore.addTask(task));
      arrSubTask1.forEach(subTask => arrTask[0].addSubTask(subTask));
      arrSubTask2.forEach(subTask => arrTask[1].addSubTask(subTask));
      arrSubSubTask1.forEach(subSubTask => arrSubTask1[0].addSubTask(subSubTask));  
    }
  }, []);

  return (
    <div>
    <GlobalStyle />
    <h1>Task Tree</h1>
    <TaskTree />
  </div>
  );
};

export default App;
