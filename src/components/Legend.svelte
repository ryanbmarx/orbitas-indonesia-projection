<script>
  export let stops;
  export let mapFill;
  export let label;
</script>

<style>
  .legend {
    background: var(--color-background);
  }
  .legend__list {
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
    align-items: stretch;
  }

  .legend__list-item {
    flex: 1 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
  }
  .legend__list-item__label {
    text-align: left;
    font: 14px/1em var(--sans-serif);
    position: relative;
    transform: translate(-3px, 0);
  }

  @supports (width: fit-content) or (width: -moz-fit-content) {
    .legend__list-item__label {
      margin-right: auto;
      width: -moz-fit-content;
      width: fit-content;
      transform: translate(-50%, 0);
    }
  }
  .legend__list-item__box {
    display: block;
    height: 6px;
    margin-top: 4px;
  }

  @media all and (min-width: 768px) {
    .legend {
      background: rgba(255, 255, 255, 0.9);
      position: absolute;
      top: 10px;
      left: 10px;
      width: 33vw;
      max-width: 380px;
      padding: 8px;
      z-index: 90;
    }
  }
</style>

<div class="legend">
  <span class="label">{label}</span>
  <ol class="legend__list">
    {#each stops as stop, i}
      <li class="legend__list-item">
        {#if i > 0}<span class="legend__list-item__label">{stop[0]}</span>{/if}
        <span style="background:{mapFill};opacity:{stop[1]}" class="legend__list-item__box" />
      </li>
    {/each}
  </ol>
</div>
