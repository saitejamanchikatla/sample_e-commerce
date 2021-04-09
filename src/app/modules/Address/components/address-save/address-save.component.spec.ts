import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSaveComponent } from './address-save.component';

describe('AddressSaveComponent', () => {
  let component: AddressSaveComponent;
  let fixture: ComponentFixture<AddressSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
