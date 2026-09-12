import { TestBed } from '@angular/core/testing';
import { ActivityLog } from './activity-log';

describe('ActivityLog', () => {
  let service: ActivityLog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityLog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
