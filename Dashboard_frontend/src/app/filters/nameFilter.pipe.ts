import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'nameFilter',
  pure: false
})

export class NameFilterPipe implements PipeTransform {
  transform(users: User[], filter: any): any {
    if (!users || !filter){
      return users;
    }
    return users.filter(user => user.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}