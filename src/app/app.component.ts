import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MaterialModule} from './modules/material/material.module';
import { ClienteComponent } from './components/client-form/cliente.component';
import { ClientListComponent } from './components/clientes/clientes.component';
import {MenuComponent} from './shared/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MaterialModule,ClienteComponent,ClientListComponent,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client-management-app';
}
