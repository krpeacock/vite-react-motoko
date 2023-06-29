import { describe, expect, it } from 'vitest';
import App from '../App';
import { StrictMode } from 'react';

describe('App', () => {
  it('renders as expected', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    const app = new App();

    expect(root.innerHTML).toMatchInlineSnapshot(`
      "<!---->
            <div class=\\"App\\">
              <div>
                <a href=\\"https://vitejs.dev\\" target=\\"_blank\\">
                  <img class=\\"logo vite\\" alt=\\"Vite logo\\" src=\\"/assets/vite.svg\\">
                </a>
                <a href=\\"https://developer.mozilla.org/en-US/docs/Web/JavaScript\\" target=\\"_blank\\">
                  <img class=\\"logo ts\\" alt=\\"JavaScript logo\\" src=\\"/assets/js.svg\\">
                </a>
                <a href=\\"https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/\\" target=\\"_blank\\">
                  <span class=\\"logo-stack\\">
                    <img class=\\"logo motoko-shadow\\" alt=\\"Motoko logo\\" src=\\"/assets/motoko_shadow.png\\">
                    <img class=\\"logo motoko\\" alt=\\"Motoko logo\\" src=\\"/assets/motoko_moving.png\\">
                  </span>
                </a>
              </div>
              <h1>Vite + JavaScript + Motoko</h1>
              <div class=\\"card\\">
                <button id=\\"count\\" style=\\"opacity: 0.5;\\">count is <!--?lit$8407403134$-->0</button>
                <p>Edit <code>backend/Backend.mo</code> and save to test HMR</p>
              </div>
              <p class=\\"read-the-docs\\">
                Click on the Vite, JavaScript, and Motoko logos to learn more
              </p>
            </div>
          "
    `);
  });
});
