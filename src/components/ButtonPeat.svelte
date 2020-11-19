<script>
  export let peatVisible = false;
  export let peatColor;
</script>

<style>
  button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
    z-index: 100;
    background: var(--color);
    color: white;
    border-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: opacity 150ms ease;
    min-width: 100px;
  }

  button:hover,
  button:focus {
    opacity: 0.85;
  }

  @media all and (min-width: 768px) {
    button {
      transform: translate(-50%, 0);
      top: 10px;
      left: 75%;
      right: unset;
    }
  }
</style>

<button on:click style="--color:{peatColor}">
  {#if peatVisible}Hide peat{:else}Display peat{/if}
</button>
