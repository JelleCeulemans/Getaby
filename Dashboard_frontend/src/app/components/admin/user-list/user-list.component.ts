import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  allUsers: User[];
  closeResult: string;
  editForm: FormGroup;
  user: User;
  roles: Role[];
  company: Company;
  companyname: string;
  allRoles: Role[];
  users: User[];
  submitted = false;
  registerForm: FormGroup;
  searchText: string;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private roleService: RoleService,
    private companyService: CompanyService,
    private router: Router) { }


  ngOnInit() {
    this.getUsers();
    // this.roleService.getAllRoles().subscribe(result => {
    //   this.roles = result;
    // });

    this.registerForm = new FormGroup({
      role: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] }),
      employeeNumber: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] })
    });

    this.roleService.getAllRoles().subscribe(res => {
      this.allRoles = res;
    });

    this.companyService.getCompanyFromToken().subscribe(result => {
      this.company = result;
    });
  }

  onEditUser() {
    this.userService.updateUser(this.user).subscribe(result => {
      console.log(result);
    });
  }

  open(content, user: User) {
    this.user = user;
    this.modalService.open(content);
  }

  changeRole(event: { target: { checked: any; }; }) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.user.role = this.roles.find(r => r.name === 'Admin');
    } else {
      this.user.role = this.roles.find(r => r.name === 'Supervisor');
    }
  }

  getUsers() {
    this.companyService.getCompanyFromToken().subscribe(result => {
      this.company = result;
      this.companyname = this.company.name;
      this.userService.getUsersByCompany(this.company.companyID).subscribe(res => {
        this.allUsers = res;
        console.log(this.allUsers);
      });
    });
  }

  // delete(userid: number) {
  //   this.userService.getUser(userid).subscribe(result => {
  //     if (confirm("Zeker dat je " + result.name + " als gebruiker wil verwijderen?")) {
  //       this.userService.deleteUser(userid).subscribe(result => {
  //         this.getUsers();
  //       });
  //     }
  //   });
  // }

  onSubmit() {
    this.submitted = true;
    const { role, name, employeeNumber, password } = this.registerForm.value;
    this.userService.addUser(
      new User(0, name, password, employeeNumber, role, this.company)
    ).subscribe(result => {
      this.ngOnInit();
    });
  }


  deleteUser() {
    this.userService.deleteUser(this.user.userID).subscribe(result => {
      this.getUsers();
    });
  }
}
