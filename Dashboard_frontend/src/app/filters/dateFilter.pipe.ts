import { Pipe, PipeTransform } from '@angular/core';
import { Trespass } from '../models/trespass.model';

@Pipe({
  name: 'dateFilter',
  pure: false
})

export class DateFilterPipe implements PipeTransform {
  transform(trespasses: Trespass[], filter: any): any {
    if (!trespasses || !filter){
      return trespasses;
    }
    return trespasses.filter(trespass => trespass.moment.toString().indexOf(filter) !== -1);
  }
}
