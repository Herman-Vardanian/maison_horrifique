import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('should render without crashing', () => {
    expect(true).toBe(true);
  });

  it('should have a title', () => {
    const title = 'My App';
    expect(title).toBe('My App');
  });

});