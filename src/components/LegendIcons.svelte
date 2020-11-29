<script>
  export let icons = [];
</script>

<style>
  .icons {
    --box-width: 0.75em;
    margin: 8px 0 0 0;
    display: grid;
    gap: var(--box-width);
    grid-template: auto / 8px 1fr;
  }

  dd,
  dt {
    font: 14px/1.3em var(--sans-serif);
    margin: 0;
    padding: 0;
  }

  .icon__box {
    display: block;
    height: var(--box-width);
    width: var(--box-width);
    margin-top: calc(1em - var(--box-width));
  }
</style>

<dl class="icons">
  {#each icons as { color, text }}
    <dt class="icon"><span class="icon__box" style="background:{color}; " /></dt>
    <dd class="icon__text">{text}</dd>
  {/each}
</dl>
