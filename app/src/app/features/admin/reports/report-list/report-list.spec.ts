import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportList } from './report-list';

describe('ReportList', () => {
  let component: ReportList;
  let fixture: ComponentFixture<ReportList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportList],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
