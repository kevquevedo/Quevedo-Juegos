import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralaObligadaComponent } from './generala-obligada.component';

describe('GeneralaObligadaComponent', () => {
  let component: GeneralaObligadaComponent;
  let fixture: ComponentFixture<GeneralaObligadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralaObligadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralaObligadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
