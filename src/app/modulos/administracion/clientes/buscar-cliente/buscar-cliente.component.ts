import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})
export class BuscarClienteComponent implements OnInit {
  
  listadoRegistros: ModeloCliente[] = [];
  id: string ='';
  constructor(private clienteServicio: ClienteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.ObtenerListadoClientes();
  }

  ObtenerListadoClientes(){
    this.clienteServicio.ObtenerRegistros().subscribe((datos: ModeloCliente[])=>{
      this.listadoRegistros = datos;
    })
  }

  EliminarCliente(p: any){
    if(confirm(`¿Estas seguro de eliminar a ${p.nombre_completo}?`))
   this.clienteServicio.EliminarCliente(p.id).subscribe( res=> {
    alert("Cliente eliminado correctamente");
    this.ObtenerListadoClientes();
   })
  }

}
