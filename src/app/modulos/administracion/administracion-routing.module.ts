import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { CrearEmpleadoComponent } from './empleados/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './empleados/editar-empleado/editar-empleado.component';

const routes: Routes = [
  {
    path:'crear-empleado',
    component: CrearEmpleadoComponent
  },
  {
    path: 'editar-empleado',
    component: EditarEmpleadoComponent
  },
  {
    path: 'crear-cliente',
    component: CrearClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
