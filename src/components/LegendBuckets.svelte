<script>
  import LegendIcons from "./LegendIcons.svelte";
  /**
   * This is the legend for the bucketized display of data
   */
  export let buckets;
  export let mapFill;
  export let label;
  export let icons;
</script>

<style>
  .legend {
    background: var(--color-background);
    /* Import b/c of conflicts with WP theme styling */
    margin: 8px 0 !important;
  }
  .legend__list {
    /* Import b/c of conflicts with WP theme styling */
    margin: 0 !important;
    padding: 0 !important;
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

{#if buckets && buckets.length > 0}
  <div class="legend">
    <span class="label">{label}</span>
    <ol class="legend__list">
      {#each buckets as bucket, i}
        <li class="legend__list-item">
          {#if i > 0}<span class="legend__list-item__label">{bucket[0]}</span>{/if}
          <span style="background:{mapFill};opacity:{bucket[1]}" class="legend__list-item__box" />
        </li>
      {/each}
    </ol>
    {#if icons}
      <LegendIcons {icons} />
    {/if}
  </div>
{/if}
