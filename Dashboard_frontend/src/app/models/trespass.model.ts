import { Camera } from './camera.model';

export class Trespass {
  constructor(
    public trespassID: number,
    public path: string,
    public moment: Date,
    public camera: Camera,
    public archive: boolean) {
  }
}
