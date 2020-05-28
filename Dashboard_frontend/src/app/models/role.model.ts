import { User } from './user.model';

export class Role {
  constructor(
    public roleID: number,
    public name: string,
    public users: User[]) {
  }
}
