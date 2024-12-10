export interface Task {
  readonly _id?: string;
  readonly name: string;
  readonly completed: boolean;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export const tasks: Task[] = [
  { name: 'Complete online Javascript course', completed: false },
  { name: 'Job around the park 3x', completed: true },
  { name: '10 minutes meditation', completed: false },
  { name: 'Read for 1 hour', completed: false },
  { name: 'Pick up groceries', completed: false },
  { name: 'Complete Todo App on Frontend Mentor', completed: false },
];
