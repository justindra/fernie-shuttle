import { leadZero, convertTime } from './stop-timetable-helpers';

describe('Stop Timetable Helpers', () => {
  describe('leadZero', () => {
    it('should add zeroes if required', () => {
      expect(leadZero(1, 3)).toEqual('001');
    });
    it('should not add zeroes if not required', () => {
      expect(leadZero(201, 3)).toEqual('201');
    });
  });

  describe('convertTime', () => {
    it('should convert am time', () => {
      expect(convertTime(495)).toEqual('08:15 AM');
    });

    it('should convert pm time', () => {
      expect(convertTime(793)).toEqual('01:13 PM');
    });
  });
});
