<script>
  import '../App.css';
  import '../index.scss';
  import motokoLogo from '../assets/motoko_moving.png';
  import motokoShadowLogo from '../assets/motoko_shadow.png';
  import svelteLogo from '../assets/svelte.svg';
  import viteLogo from '../assets/vite.svg';
  import { createActor, canisterId } from '../declarations/backend';
  import { onMount } from 'svelte';

  const isLocal = process.env.DFX_NETWORK === 'local';
  const host = isLocal ? 'http://localhost:4943' : 'https://icp-api.io';
  const backend = createActor(canisterId, { agentOptions: { host } });

  let count;
  let loading;

  const fetchCount = async () => {
    try {
      loading = true;
      const newCount = await backend.get();
      count = +newCount.toString(); // Convert BigInt to number
    } catch (err) {
      console.error(err);
    } finally {
      loading = false;
    }
  };

  const increment = async () => {
    if (loading) return; // Cancel if waiting for a new count
    try {
      loading = true;
      await backend.inc(); // Increment the count by 1
      await fetchCount(); // Fetch the new count
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    await fetchCount();
  });
</script>

<main id="root">
  <div class="App">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} class="logo vite" alt="Vite logo" />
      </a>
      <a
        href="https://svelte.dev/docs/introduction"
        target="_blank"
      >
        <img src={svelteLogo} class="logo svelte" alt="Svelte logo" />
      </a>
      <a
        href="https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/"
        target="_blank"
      >
        <span class="logo-stack">
          <img
            src={motokoShadowLogo}
            class="logo motoko-shadow"
            alt="Motoko logo"
          />
          <img src={motokoLogo} class="logo motoko" alt="Motoko logo" />
        </span>
      </a>
    </div>
    <h1>Vite + Svelte + Motoko</h1>
    <div class="card">
      <button id="count" on:click={increment} style="opacity: {loading ? 0.5 : 1}">count is {count}</button>
      <p>Edit <code>backend/Backend.mo</code> and save to test HMR</p>
    </div>
    <p class="read-the-docs">
      Click on the Vite, Svelte, and Motoko logos to learn more
    </p>
  </div>
</main>
