import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProyectsComponent } from './create-proyects.component';

describe('CreateProyectsComponent', () => {
  let component: CreateProyectsComponent;
  let fixture: ComponentFixture<CreateProyectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProyectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
