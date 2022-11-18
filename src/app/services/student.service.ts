import { Injectable } from '@angular/core';
import { Student } from '../models/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];
  private idStudenSelected = 0;
  constructor() {
    this.students=[
      {
        controlnumber: '18401082',
        age:22,
        career:'ISC',
        curp:'AIBP000629HNTVRDA3',
        email:'peavilabe@ittepic.edu.mx',
        name:'Pedro Avila Bermudez',
        nip: 5144,
        photo:'../../assets/pedro.png'
      },
      {
        controlnumber: '18401080',
        age:22,
        career:'ISC',
        curp:'GOFB001124HNTNLRA3',
        email:'brdas@ittepic.edu.mx',
        name: 'Braddly Addiel Gonzalez Flores',
        nip: 5142,
        photo:'../../assets/brad.png'
      },
      {
        controlnumber: '18401081',
        age:22,
        career:'ISC',
        curp:'JACJ000624HNTCVNA5',
        email:'itxalja@ittepic.edu.mx',
        name: 'Juan Axel Jacobo Covarrubia',
        nip: 5143,
        photo:'../../assets/jacobo.png'
      },
    ];
  }
  public getStudents(): Student[] {
    return this.students;
  }
  public getEspecificStudents(id: number): Student {
    return this.students[id];
  }
  public removeStudent(index: number){
    this.students.splice(index, 1); //Eliminar elemento de un array splice(index,cuantos elementos a partir del index)
  }
  public getStudentSelected() {
    return this.students[this.idStudenSelected];
  }
  public getIdStudentSelected() {
    return this.idStudenSelected;
  }
  public setStudentSelected(id:number) {
    this.idStudenSelected = id;
  }
  public addStudent(student:Student) {
    this.students.push(student);
  }
}

