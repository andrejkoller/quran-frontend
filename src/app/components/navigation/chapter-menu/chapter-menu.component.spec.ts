import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterMenuComponent } from './chapter-menu.component';

describe('ChapterMenuComponent', () => {
  let component: ChapterMenuComponent;
  let fixture: ComponentFixture<ChapterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
