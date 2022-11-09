import {Component, OnInit} from "@angular/core";
import {Estudiante} from "./estudiante";
import {EstudianteService} from "./estudiante.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './estudiante.form.html'
})
export class EstudianteForm implements OnInit{
   public estudiante: Estudiante = new Estudiante();
   public titulo: string = "Formulario de edicion de estudiante";

   constructor(private estudianteService: EstudianteService,
               private router: Router, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
      this.cargarEstudiante()
  }

  cargarEstudiante(): void {
     this.activatedRoute.params.subscribe(
        params =>{
          let id = params['id']
          if(id){
              this.estudianteService.getEstudiante(id).subscribe(
                estudiante => this.estudiante = estudiante
              );
          }
        }
     );
  }

  update(): void {
     this.estudianteService.update(this.estudiante).subscribe(
         estudiante => {
           this.router.navigate(['/estudiantes']);
           //TODO: Agregar el codigo del SweetAlert
         }
     );
  }

  create(): void {
    this.estudianteService.create(this.estudiante).subscribe(
      estudiante => {
        this.router.navigate(['/estudiantes'])
        //TODO: Sweet Alert: Nuevo estudiante mensaje: Estudiante ${estudiante.nombre} creado con exito
      }
    );
  }
}
