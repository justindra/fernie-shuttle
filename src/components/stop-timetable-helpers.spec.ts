import { leadZero, convertTime, isInHalfHour, getNextDueMin } from './stop-timetable-helpers';

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

  describe('isInHalfHour', () => {
    it('should return true if its within the next half hour', () => {
      expect(isInHalfHour(100, 75)).toEqual(true);
      expect(isInHalfHour(100, 100)).toEqual(true);
    });

    it('should return false if its not within the next half hour', () => {
      expect(isInHalfHour(100, 65)).toEqual(false);
      expect(isInHalfHour(100, 105)).toEqual(false);
    });
  });

  describe('getNextDueMin', () => {
    beforeAll(() => {
      // Mock the current date to make it easier to test
      const DATE_TO_USE = new Date('2019-01-01T02:30:00');
      const _Date = Date;
      Date = (jest.fn(() => DATE_TO_USE) as unknown) as DateConstructor;
      Date.UTC = _Date.UTC;
      Date.parse = _Date.parse;
      Date.now = _Date.now;
    });

    it('should return the next days due time if none exists', () => {
      const times = [100];
      const expected = 'at 01:40 AM';

      expect(getNextDueMin(times)).toEqual(expected);
    });

    it('should return the next due time if its within half hour', () => {
      const times = [100, 160, 300, 500];
      const expected = 'in 10 min';

      expect(getNextDueMin(times)).toEqual(expected);
    });

    it('should return the next due time if its over half hour', () => {
      const times = [100, 300, 500];
      const expected = 'at 05:00 AM';

      expect(getNextDueMin(times)).toEqual(expected);
    });

    it('should return the next due time even if the list is unsorted', () => {
      const times = [500, 160, 300, 100, 400];
      const expected = 'in 10 min';

      expect(getNextDueMin(times)).toEqual(expected);
    });
  });
});
