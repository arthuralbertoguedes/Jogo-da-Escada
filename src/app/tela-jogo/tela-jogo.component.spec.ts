import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaJogoComponent } from './tela-jogo.component';

describe('TelaJogoComponent', () => {
  let component: TelaJogoComponent;
  let fixture: ComponentFixture<TelaJogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaJogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
