import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecitersComponent } from './reciters.component';

describe('RecitersComponent', () => {
  let component: RecitersComponent;
  let fixture: ComponentFixture<RecitersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecitersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
