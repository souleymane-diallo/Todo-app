import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../tokens/base-url.token';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly http = inject(HttpClient);
  readonly baseUrl = inject(BASE_URL_TOKEN);

  constructor() { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  addTask(name: string): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, { name });
  }

  markTaskAsCompleted(id: string): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}/completed`, {});
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/${id}`);
  }
}
