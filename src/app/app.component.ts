import { Component, signal } from '@angular/core';
import { Task, TaskFilter } from './models/task.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  loadTasksFromLocalStorage,
  toggleTheme,
  getTotalTasks,
  getAllTasks,
  getActiveTasks,
  getCompletedTasks,
  addTask,
  deleteTask,
  clearCompletedTasks,
  markTaskAsCompleted,
  saveTasksToLocalStorage,
  loadThemeFromLocalStorage,
  saveThemeToLocalStorage
} from './logic/task-helpers';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly tasks = signal<Task[]>(loadTasksFromLocalStorage());
  readonly filteredTasks = signal<Task[]>(this.tasks());
  filterType: TaskFilter = 'all';

  readonly isDarkTheme = signal<boolean>(false);

  ngOnInit() {
    const savedTheme = loadThemeFromLocalStorage();
    this.isDarkTheme.set(savedTheme);
    toggleTheme(savedTheme)
  }

  switchTheme(): void {
    const newValue = !this.isDarkTheme();
    this.isDarkTheme.set(newValue);
    toggleTheme(newValue);
  }

  setFilter(filter: TaskFilter) {
    this.filterType = filter;
    this.updateFilteredTasks();
  }

  updateFilteredTasks(): void {
    switch (this.filterType) {
      case 'all':
        this.filteredTasks.set(getAllTasks(this.tasks()));
        break;
      case 'active':
        this.filteredTasks.set(getActiveTasks(this.tasks()));
        break;
      case 'completed':
        this.filteredTasks.set(getCompletedTasks(this.tasks()));
        break;
    }
  }

  getTotalTaks() {
    return getTotalTasks(this.tasks());
  }

  addTask(name: string) {
    if (!name.trim()) return;

    this.tasks.update(value => addTask(value, name));
    this.updateFilteredTasks();
  }

  completeTask(name: string) {
    this.tasks.update(value => markTaskAsCompleted(value, name));
  }

  deleteTask(name: string) {
    this.tasks.update(value => deleteTask(value, name));
    this.updateFilteredTasks();
  }

  clearCompletedTasks() {
    this.tasks.update(value => clearCompletedTasks(value))
  }

  onDroop(event: CdkDragDrop<Task[]>): void {
    const currentTasks = this.filteredTasks();
    moveItemInArray(currentTasks, event.previousIndex, event.currentIndex)
    this.tasks.update(() => [...currentTasks]);
    saveTasksToLocalStorage(this.filteredTasks());
  }
}
