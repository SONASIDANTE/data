import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HTreeComponent } from './h-tree.component';

describe('HTreeComponent', () => {
  let component: HTreeComponent;
  let fixture: ComponentFixture<HTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
