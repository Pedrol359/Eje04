/* eslint-disable no-trailing-spaces */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];
  constructor(private studentServices: StudentService, private router: Router) {
    this.students = this.studentServices.getStudents();
  }
  public removeStudent(index){
    this.studentServices.removeStudent(index);
    // alert()
  }

  goToInfoUser(user: Student) {
    console.log(user);
    this.router.navigate(['/info-alumno']);
  }

}
