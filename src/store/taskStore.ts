import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

export interface ITask {
  id: string;
  title: string;
  isChecked: boolean;
  subTasks: ITask[];
  parent?: ITask;
  toggleCheck: () => void; 
  addSubTask: (subTask: ITask) => void;  
}

// Класс задачи
export class Task implements ITask{
  id: string;
  title: string;
  isChecked: boolean;
  subTasks: Task[];
  parent?: Task; 

  constructor(title: string) {
    makeAutoObservable(this);
    this.id = nanoid();
    this.title = title;
    this.isChecked = false;
    this.subTasks = [];
    this.parent = undefined; 
  }

  toggleCheck() {
    this.isChecked = !this.isChecked;
  }

  addSubTask(subTask: Task) {
    subTask.parent = this;
    this.subTasks.push(subTask);
  }
}

// Хранилище всех задач
class TaskStore {
  tasks: Task[];

  constructor() {
    this.tasks = [];
    makeAutoObservable(this);
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  toggleSubTasks(task: Task) {
    task.subTasks.forEach(subTask => {
      subTask.isChecked = task.isChecked;
      this.toggleSubTasks(subTask); 
    });
  }

  checkParentStatus(task: Task) {
    const allSubTasksChecked = task.subTasks.every(subTask => {
      if (subTask.subTasks.length > 0) {
        this.checkParentStatus(subTask);
      }
      return subTask.isChecked;
    });
  
    task.isChecked = allSubTasksChecked;
  }
}

export const taskStore = new TaskStore();

