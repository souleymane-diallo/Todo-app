import { Task } from "../models/task.model";

export function loadTasksFromLocalStorage(): Task[] {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

export function toggleTheme(isDarkTheme: boolean): boolean {
  const body = document.body;

  body.classList.toggle('dark-theme', isDarkTheme);
  body.classList.toggle('light-theme', !isDarkTheme);

  saveThemeToLocalStorage(isDarkTheme);
  
  return !isDarkTheme;
}

export function saveThemeToLocalStorage(isDarkTheme: boolean): void {
  localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
}

export function loadThemeFromLocalStorage(): boolean {
  const savedTheme = localStorage.getItem('isDarkTheme');
  return savedTheme ? JSON.parse(savedTheme) : false;
}

export function getTotalTasks(tasks: Task[]): number {
  return tasks.length;
}

export function getAllTasks(tasks: Task[]): Task[] {
  return tasks;
}

export function getActiveTasks(tasks: Task[]): Task[] {
  return tasks.filter(task => !task.completed);
}

export function getCompletedTasks(tasks: Task[]): Task[] {
  return tasks.filter(task => task.completed);
}

export function addTask(tasks: Task[], name: string): Task[] {
  const updatedTasks = [...tasks, { name, completed: false }];
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

export function markTaskAsCompleted(tasks: Task[], name: string): Task[] {
  const updatedTasks = tasks.map(task => task.name ===  name
    ? {...task, completed: true }
    : task
  );
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

export function deleteTask(tasks: Task[], name: string): Task[] {
  const updatedTasks = tasks.filter(task => task.name !== name);
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

export function clearCompletedTasks(tasks: Task[]): Task[] {
  const updatedTasks = tasks.filter(task => !task.completed);
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

export function saveTasksToLocalStorage(tasks: Task[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


