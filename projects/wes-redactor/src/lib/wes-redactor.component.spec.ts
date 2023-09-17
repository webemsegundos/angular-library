import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WesRedactorComponent } from './wes-redactor.component';

describe('WesRedactorComponent', () => {
  let component: WesRedactorComponent;
  let fixture: ComponentFixture<WesRedactorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WesRedactorComponent]
    });
    fixture = TestBed.createComponent(WesRedactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
