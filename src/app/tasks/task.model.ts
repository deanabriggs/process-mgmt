export class Task {
  constructor(
    public id: number,
    public title: string,
    public completed: boolean = false,
    public dueDate?: Date,
    public assignedTo?: string,
    public _id?: string
  ) {}
}