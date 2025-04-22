import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientControlPanelComponent } from './client-control-panel.component';

describe('ClientControlComponent', () => {
  let component: ClientControlPanelComponent;
  let fixture: ComponentFixture<ClientControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientControlPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
