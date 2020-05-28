import { Site } from './site.model';
import { User } from './user.model';

export class Company {
  constructor(
    public companyID: number,
    public name: string,
    public city: string,
    public street: string,
    public strNumber: string,
    public zipcode: string,
    public sites: Site[],
    public users: User[]) {
  }
}
