import { Task } from "../tasks/task.model";

export class Process {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public completed: boolean = false,
    public tasks?: Task[],
    public _id?: string
  ) {}
}