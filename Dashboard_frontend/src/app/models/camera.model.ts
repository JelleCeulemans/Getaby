import { Site } from './site.model';
import { Trespass } from './trespass.model';

export class Camera {
  constructor(
    public cameraID: number,
    public site: Site,
    public name: string,
    public ip: string,
    public trespasses: Trespass[]) {
  }
}
