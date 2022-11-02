import { Injectable } from '@angular/core';
import { Student } from '../models/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];
  constructor() {
    this.students=[
      {
        contorlnumber: '18401082',
        age:22,
        career:'ISC',
        curp:'ABCD1223652SDH2',
        email:'peavilabe@ittepic.edu.mx',
        name:'Pedro Avila Bermudez',
        nip: 5144
      },
      {
        contorlnumber: '18401081',
        age:22,
        career:'ISC',
        curp:'JDC1223652SDH2',
        email:'itxalja@ittepic.edu.mx',
        name: 'Juan Axel Jacobo Covarrubia',
        nip: 5143
      },
      {
        contorlnumber: '18401080',
        age:22,
        career:'ISC',
        curp:'BRD1223652SDH2',
        email:'brdas@ittepic.edu.mx',
        name: 'Braddly Addiel Gonzalez Flores',
        nip: 5142
      }
    ];
  }
  public getStudents(): Student[] {
    return this.students;
  }
  public removeStudent(index: number){
    this.students.splice(index, 1); //Eliminar elemento de un array splice(index,cuantos elementos a partir del index)
  }

}

