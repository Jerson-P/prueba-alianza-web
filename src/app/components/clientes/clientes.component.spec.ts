import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponent } from './clientes.component';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
