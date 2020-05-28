import { Company } from './company.model';
import { Role } from './role.model';

export class User {
  constructor(
    public userID: number,
    public name: string,
    public password: string,
    public employeeNumber: string,
    public role: Role,
    public company: Company,
    public token?: string) {
  }
}
