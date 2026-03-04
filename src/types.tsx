export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  order: number;
  categoryId?: string;
}

export interface Category {
  id: string;
  name: string;
}
