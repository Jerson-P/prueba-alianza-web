import { Component,OnInit, Inject, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MaterialModule} from '../../modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesServicio } from '../../servicios/clientes.servicicios';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,DatePipe,MatDatepickerModule,MatInputModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers: [{provide: ClientesServicio},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    
  ]
})

export class ClienteComponent implements OnInit {
  private _clientServices: ClientesServicio | undefined;
  clientForm!: FormGroup;
  clientData: any;
  clients: any[] = [];
 
  dataSource = new MatTableDataSource();
  filteredClients = new MatTableDataSource();

  searchValue = '';
  

  subscription$: Subscription[] = [];

  servicioClientes=inject(ClientesServicio);


  constructor(
    
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    this.clientData = data.client;
  }

 
  ngOnInit(): void {
    this.isEditing = !!this.data.client.sharedKey;
    this.clientForm = this.formBuilder.group({
      claveCompartida: [(this.clientData as any).claveCompartida, ''],
      idEmpresarial: [(this.clientData as any).idEmpresarial, Validators.required],
      correo: [(this.clientData as any).correo, [Validators.required]],
      telefono: [(this.clientData as any).telefono, Validators.required],
      fechaAgregada: [(this.clientData as any).fechaAgregada, Validators.required]
    });
    this.isEditing = !!this.data.client.sharedKey;
  }

  guardar(client: any) {
    this.subscription$ = [
      ...this.subscription$,
      this.servicioClientes.crearCliente(client).subscribe(res => {
      })
    ];
  }

  
  actualizar(client: any) {
    this.subscription$ = [
      ...this.subscription$,
      this.servicioClientes.crearCliente(client).subscribe(res => {
      })
    ];
  }
  isEditing: boolean = false;
  onSubmit() {
    

    if (this.data.isEditing){
      const ClientDTO= {   
        claveCompartida :this.clientForm.controls['claveCompartida'].value,
        idEmpresarial: this.clientForm.controls['idEmpresarial'].value,
        correo: this.clientForm.controls['correo'].value,
        telefono: this.clientForm.controls['telefono'].value,
        fechaAgregada:this.clientForm.controls['fechaAgregada'].value
      };
      this.actualizar(ClientDTO);
    }
    else {
        const Clients= {      
          
          idEmpresarial: this.clientForm.controls['idEmpresarial'].value,
          correo: this.clientForm.controls['correo'].value,
          telefono: this.clientForm.controls['telefono'].value,
          fechaAgregada:this.clientForm.controls['fechaAgregada'].value
        };
        this.guardar(Clients);
      
    }
    
    this.dialogRef.close(this.clientForm.value);
  }

  limpiarFormulario() {
    this.clientForm.reset();
  }

  cerrarDialogo() {
    this.dialogRef.close(this.clientForm.value);
  }

  obtenerTodosClientes() {
    this.subscription$ = [
      ...this.subscription$,
      this.servicioClientes.getTodosLosClientes().subscribe(res => {

        this.clients = res.response;
        this.filteredClients.data = this.clients;
      })
    ];
  }

}