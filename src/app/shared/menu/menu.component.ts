import { Component,OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe,CommonModule } from '@angular/common';
import {ClientListComponent} from '../../components/clientes/clientes.component'



@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule,AsyncPipe,ClientListComponent,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  showClientList: boolean = true;
  isSidebarOpen = true;


  ngOnInit() {
    console.log('MenuComponent initialized, showClientList:', this.showClientList);
  }


  actualizarListaClientes() {
    this.showClientList = !this.showClientList;
    console.log('toggleClientList called, showClientList:', this.showClientList);
  }
}

