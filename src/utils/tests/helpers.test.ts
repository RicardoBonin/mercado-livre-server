import { teste } from '../helpers';

describe('test', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // cleanup();
    jest.resetAllMocks();
  });

  test('test function', () => {
    expect(teste(1, 2)).toBe(3);
  });
});
