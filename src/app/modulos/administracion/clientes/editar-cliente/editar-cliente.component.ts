import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
id: string ='';
  fgValidador: FormGroup = this.fb.group({
    'id':['', [Validators.required]],
    'num_documento' : ['', [Validators.required]],
    'nombre_completo' : ['', [Validators.required]],
    'direccion' : ['', [Validators.required]],
    'telefono' : ['', [Validators.required]],
    'correo' : ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioCliente: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarCliente();
  }

  BuscarCliente(){
    this.servicioCliente.ObtenerRegistrosPorId(this.id).subscribe((datos: ModeloCliente) =>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["num_documento"].setValue(datos.num_documento);
      this.fgValidador.controls["nombre_completo"].setValue(datos.nombre_completo);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["correo"].setValue(datos.correo);
    });
  }

  EditarCliente(){
    let num_documento = this.fgValidador.controls["num_documento"].value;
    let nombre_completo = this.fgValidador.controls["nombre_completo"].value;
    let direccion = this.fgValidador.controls["direccion"].value;
    let telefono = this.fgValidador.controls["telefono"].value;
    let correo = this.fgValidador.controls["correo"].value;
    
    // Creacion del Modelo Cliente con los datos del formulario
    let p = new ModeloCliente();
    p.num_documento = num_documento;
    p.nombre_completo = nombre_completo;
    p.direccion = direccion;
    p.telefono = telefono;
    p.correo = correo;
    p.id = this.id;
    // Creacion del objeto cliente que va a ser mandando en el post
    this.servicioCliente.ActualizarCliente(p).subscribe((datos: ModeloCliente) => {
      alert("Producto actualizado correctamente")
      this.router.navigate(["/administracion/listar-clientes"]);
    }, (err: any) =>{
      alert("Error actualizando el producto")
    })
  }
}
