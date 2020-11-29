<script>
  /**
   * This is the legend for linear inteporlation
   */
  import LegendIcons from "./LegendIcons.svelte";
  import { hexToRGB } from "../utils/colors";
  export let stops;
  export let mapFill;
  export let label;
  export let icons;

  let { gradient, spans } = generateGradient(stops);

  function generateGradient(stops) {
    // background: linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%);
    let gradient = "linear-gradient(to right,";
    let spans = "";
    for (let i = 0; i < stops.length; i += 2) {
      gradient += `${hexToRGB(mapFill, stops[i + 1])}`;
      if (i < stops.length - 2) {
        gradient += ",";
      }
      spans += `<span class="legend__number" style="left: ${stops[i + 1] * 100}%;">${stops[i]}</span>`;
    }

    gradient += ")";
    return { gradient, spans };
  }
</script>

<style>
  .legend {
    background: var(--color-background);
  }

  .legend__numbers {
    font: 14px/1em var(--sans-serif);
    height: 1em;
    margin-bottom: 0.25em;
    display: block;
    position: relative;
  }

  .legend :global(.legend__number) {
    position: absolute;
    top: 0;
  }

  .legend :global(.legend__number:last-child) {
    transform: translate(-100%, 0);
  }

  @supports (width: fit-content) or (width: -moz-fit-content) {
    .legend__list-item__label {
      margin-right: auto;
      width: -moz-fit-content;
      width: fit-content;
      transform: translate(-50%, 0);
    }
  }

  .legend__gradient {
    display: block;
    width: 100%;
    height: 16px;
    background: #eee;
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
  <div class="legend__numbers">
    {@html spans}
  </div>
  <span class="legend__gradient" style="background:{gradient};" />
  {#if icons}
    <LegendIcons {icons} />
  {/if}
</div>
