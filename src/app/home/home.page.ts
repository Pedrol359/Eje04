/* eslint-disable no-trailing-spaces */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];
  constructor(
    private studentServices: StudentService, 
    private router: Router,
    private alertController: AlertController) {
    this.students = this.studentServices.getStudents();
  }
  public removeStudent(index){
    this.confirmDelete(index);
    // alert()
  }

  goToInfoUser(idUser: number) {
    this.studentServices.setStudentSelected(idUser);
    this.router.navigate(['/info-alumno']);
  }
  async confirmDelete(index: number) {
    const alert = await this.alertController.create({
      header: `Quieres eliminar a ${this.students[index].name}!`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.studentServices.removeStudent(index);
          },
        },
      ],
    });

    await alert.present();

    // const { role } = await alert.onDidDismiss();
  }
}
