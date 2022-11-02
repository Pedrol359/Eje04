import { StudentService } from './../services/student.service';

import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';

@Component({
  selector: 'app-info-alumno',
  templateUrl: './info-alumno.page.html',
  styleUrls: ['./info-alumno.page.scss'],
})
export class InfoAlumnoPage implements OnInit {
  public student: Student;
  constructor(private studentService: StudentService) {
    // Load student
    this.student = {...this.studentService.getStudentSelected()};
   }
  ngOnInit() {
  }

  public uboCambioEnInfo(): boolean {
    const studentOriginal = this.studentService.getStudentSelected();
    if (studentOriginal.name !== this.student.name
      || studentOriginal.controlnumber !== this.student.controlnumber
      || studentOriginal.age !== this.student.age
      || studentOriginal.email !== this.student.email
      || studentOriginal.nip !== this.student.nip
      || studentOriginal.curp !== this.student.curp
      || studentOriginal.career !== this.student.career) {
      return true;
    }
    return false;
  }
}
