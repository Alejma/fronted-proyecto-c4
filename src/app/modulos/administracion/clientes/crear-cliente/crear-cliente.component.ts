import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'num_documento' : ['', [Validators.required]],
    'nombre_completo' : ['', [Validators.required]],
    'direccion' : ['', [Validators.required]],
    'telefono' : ['', [Validators.required]],
    'correo' : ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioCliente: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarCliente(){

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

    // Creacion del objeto cliente que va a ser mandando en el post
    this.servicioCliente.CrearCliente(p).subscribe((datos: ModeloCliente) => {
      alert("Producto almacenado correctamente")
      this.router.navigate(["/administracion/listar-clientes"]);
    }, (err: any) =>{
      alert("Error almacenadno el producto")
    })
  }

}
