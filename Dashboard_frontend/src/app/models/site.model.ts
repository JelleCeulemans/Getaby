import { Company } from './company.model';
import { Trespass } from './trespass.model';

export class Site {
  constructor(
    public siteID: number,
    public name: string,
    public company: Company,
    public trespasses: Trespass[]) {
  }
}
