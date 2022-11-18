import { StudentService } from './../services/student.service';

import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-info-alumno',
  templateUrl: './info-alumno.page.html',
  styleUrls: ['./info-alumno.page.scss'],
})
export class InfoAlumnoPage implements OnInit {
  public student: Student;
  constructor(private studentService: StudentService, private router: Router, private validate:SessionService) {
    this.student = this.studentService.getStudentSelected();
    if (!this.validate.getValidate()) {
      this.router.navigate(['/login']);
      return;
    } 
    // Load student
   }
  ngOnInit() {
    if (!this.validate.getValidate()) {
      this.router.navigate(['/login']);
      return;
    } 
  }
  
  public logOut(){
    this.validate.setValidate(false);
    this.router.navigate(['/login']);
  }
}
