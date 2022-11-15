import { Component, OnInit } from '@angular/core';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {
  listadoRegistros: ModeloProducto[] = [];

  constructor(private productoServicio: ProductoService) { }

  ngOnInit(): void {
    this.ObtenerListadoProductos();
  }

  ObtenerListadoProductos(){
    this.productoServicio.ObtenerRegistros().subscribe((datos: ModeloProducto[]) => {
      this.listadoRegistros = datos;
    })
  }
  EliminarProducto(p: any){
    if(confirm(`¿Estas seguro de eliminar a ${p.nombre}?`))
   this.productoServicio.EliminarProducto(p.id).subscribe( res=> {
    alert("Cliente eliminado correctamente");
    this.ObtenerListadoProductos();
   })
  }
}
