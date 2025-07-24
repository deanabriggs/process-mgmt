import { Process } from "../processes/process.model";

export class Project {
  constructor(
    public id: string,
    public title: string,
    public notes: string,
    public status: 'not-started' | 'in-progress' | 'completed',
    public processes?: Process[],
    public _id?: string
  ) {}
}   