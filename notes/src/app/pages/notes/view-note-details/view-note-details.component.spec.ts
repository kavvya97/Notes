import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNoteDetailsComponent } from './view-note-details.component';

describe('ViewNoteDetailsComponent', () => {
  let component: ViewNoteDetailsComponent;
  let fixture: ComponentFixture<ViewNoteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNoteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
