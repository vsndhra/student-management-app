import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDisplayComponent } from './mark-display.component';

describe('MarkDisplayComponent', () => {
  let component: MarkDisplayComponent;
  let fixture: ComponentFixture<MarkDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkDisplayComponent]
    });
    fixture = TestBed.createComponent(MarkDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
