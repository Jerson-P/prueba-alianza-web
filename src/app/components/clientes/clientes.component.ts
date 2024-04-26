import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../modules/material/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { ClienteComponent } from '../client-form/cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientesServicio } from '../../servicios/clientes.servicicios';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [MaterialModule, MatToolbarModule,ClienteComponent,HttpClientModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClientesServicio]
})
export class ClientListComponent {
  displayedColumns: string[] = [
    'sharedKey',
    'businessId',
    'email',
    'phone',
    'dataAdded',
    'actions',
  ];
  clientes: any[] = [];

  filtroClientes = new MatTableDataSource();
  searchValue=0;

  subscripcion$: Subscription[] = [];

  servicioClientes=inject(ClientesServicio);
  isEditing: boolean = false;


  constructor(private cdRef: ChangeDetectorRef, public dialog: MatDialog ) {}

  ngOnInit(): void {
   
    this.getAllClients();
 
  }

  getAllClients() {
    this.subscripcion$ = [
      ...this.subscripcion$,
      this.servicioClientes.getTodosLosClientes().subscribe(res => {

        this.clientes = res.response;
        this.filtroClientes.data = this.clientes;
      })
    ];
  }

  getClientePorClave() {
    if(this.searchValue == undefined || this.searchValue ==null || this.searchValue  ==0){
      this.getAllClients();
    }else{
      this.subscripcion$ = [
        ...this.subscripcion$,
        this.servicioClientes.getClienteClaveCompartida(this.searchValue).subscribe(res => {
  
          this.clientes = res.response;
          this.filtroClientes.data = this.clientes;
        })
      ];
    }
    
  }

  save(client: any) {
    this.subscripcion$ = [
      ...this.subscripcion$,
      this.servicioClientes.crearCliente(client).subscribe(res => {
        console.log(res);
      })
    ];
  }

  editClient(client: any) {
    this.isEditing = true;
    const dialogRef = this.dialog.open(ClienteComponent, {
      data: { client: client, isEditing: this.isEditing } // Pasar los datos del cliente como parte de la configuración del diálogo
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.getAllClients();
    });
    
  }

  

  fetchData() {
    const url = 'your-api-endpoint'; // Replace with your API URL
    return null; //this.http.get<Client[]>(url); // GET request returning an array of Client objects
  }


  openClientForm() {
    const dialogRef = this.dialog.open(ClienteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  agregarNuevoCliente() {
    this.isEditing = false;
    const dialogRef = this.dialog.open(ClienteComponent, {
      data: { client: { claveCompartida: 0, idEmpresarial: '', correo: '', telefono: '', fechaAgregada: '' } }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.getAllClients();
    });

   
  }
  exportClients() {
    const dataToExport = this.clientes.map((clientes) => ({
      claveCompartida: clientes.claveCompartida,
      idEmpresarial: clientes.idEmpresarial,
      correo: clientes.correo,
      telefono: clientes.telefono,
      fechaAgregada: clientes.fechaAgregada,
    }));

    const csvData = this.convertToCSV(dataToExport);
    const blob = new Blob([csvData], { type: 'text/csv' });

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'clients.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const csv = data.map((row) => Object.values(row).join(',')).join('\n');
    return `${header}\n${csv}`;
  }

  openAdvancedSearch(){}
  

}


