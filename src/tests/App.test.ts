import { describe, expect, it } from 'vitest';
import App from '../App';
import { StrictMode } from 'react';

describe('App', () => {
  it('renders as expected', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    const app = new App();

    expect(root.querySelector('.App')).not.toBeNull();
  });
});
