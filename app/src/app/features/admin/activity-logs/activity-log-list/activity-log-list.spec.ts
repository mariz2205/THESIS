import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityLogList } from './activity-log-list';

describe('ActivityLogList', () => {
  let component: ActivityLogList;
  let fixture: ComponentFixture<ActivityLogList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityLogList],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityLogList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
