import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorAndPreviewComponent } from './editor-and-preview.component';

describe('EditorAndPreviewComponent', () => {
  let component: EditorAndPreviewComponent;
  let fixture: ComponentFixture<EditorAndPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorAndPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorAndPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
