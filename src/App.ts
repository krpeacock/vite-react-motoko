import './App.css';
import { html, render } from 'lit-html';
import { backend } from './declarations/backend';
import logo from './assets/logo2.svg';

class App {
  greeting = '';

  constructor() {
    this.#render();
  }

  #handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const name = (document.getElementById('name') as HTMLInputElement).value;
    this.greeting = await backend.greet(name);
    this.#render();
  };

  #render() {
    let body = html`
      <main>
        <img src="${logo}" alt="DFINITY logo" />
        <br />
        <br />
        <form action="#">
          <label for="name">Enter your name: &nbsp;</label>
          <input id="name" alt="Name" type="text" />
          <button type="submit">Click Me!</button>
        </form>
        <section id="greeting">${this.greeting}</section>
      </main>
    `;
    render(body, document.getElementById('root')!);
    document
      .querySelector('form')!
      .addEventListener('submit', this.#handleSubmit);
  }
}

export default App;
