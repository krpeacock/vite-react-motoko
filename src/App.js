import './App.css';
import { html, render } from 'lit-html';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import jsLogo from './assets/js.svg';
import viteLogo from './assets/vite.svg';
import { backend } from './declarations/backend';

class App {
  #count = 0;
  #loading = false;

  set count(value) {
    this.#count = value;
    this.#render();
  }

  get count() {
    return this.#count;
  }

  set loading(value) {
    this.#loading = value;
    this.#render();
  }

  get loading() {
    return this.#loading;
  }

  // Get the current counter value
  fetchCount = async () => {
    try {
      this.loading = true;
      const count = await backend.get();
      this.count = +count.toString(); // Convert BigInt to number
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  };

  increment = async () => {
    if (this.loading) return; // Cancel if waiting for a new count
    try {
      this.loading = true;
      await backend.inc(); // Increment the count by 1
      await this.fetchCount(); // Fetch the new count
    } finally {
      this.loading = false;
    }
  };

  constructor() {
    this.fetchCount();
  }

  #render() {
    let body = html`
      <div class="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src=${viteLogo} class="logo vite" alt="Vite logo" />
          </a>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            target="_blank"
          >
            <img src=${jsLogo} class="logo ts" alt="JavaScript logo" />
          </a>
          <a
            href="https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/"
            target="_blank"
          >
            <span class="logo-stack">
              <img
                src=${motokoShadowLogo}
                class="logo motoko-shadow"
                alt="Motoko logo"
              />
              <img src=${motokoLogo} class="logo motoko" alt="Motoko logo" />
            </span>
          </a>
        </div>
        <h1>Vite + JavaScript + Motoko</h1>
        <div class="card">
          <button id="count">count is ${this.count}</button>
          <p>Edit <code>backend/Backend.mo</code> and save to test HMR</p>
        </div>
        <p class="read-the-docs">
          Click on the Vite, JavaScript, and Motoko logos to learn more
        </p>
      </div>
    `;
    render(body, document.getElementById('root'));
    const opacity = this.loading ? 0.5 : 1;
    const button = document.getElementById('count');
    button.style.opacity = opacity.toString();
    button.onclick = this.increment;
  }
}

export default App;
