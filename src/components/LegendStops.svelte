<script>
  /**
   * This is the legend for linear inteporlation
   */
  import LegendIcons from "./LegendIcons.svelte";
  // import { hexToRGB } from "../utils/colors";
  export let stops;
  // export let mapFill;
  export let label;
  export let icons;
  export let max = 31;

  let { gradient, spans, spansMiddle } = generateGradient(stops);

  function generateGradient(stops) {
    console.log(stops);
    // background: linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%);
    let gradient = "linear-gradient(to right,";
    let spans = "";
    let spansMiddle = "";
    let counter = 0;
    for (let i = 0; i < stops.length; i += 2) {
      gradient += `${stops[i + 1]} ${(stops[i] / max) * 100}%`;
      if (i < stops.length - 2) {
        gradient += ",";
      }
      if (counter == 0) {
        spans += `<span class="legend__number" style="left: ${(stops[i] / max) * 100}%;">${stops[i]}</span>`;
      } else if (i === stops.length - 2) {
        spans += `<span class="legend__number" style="left: ${(stops[i] / max) * 100}%;">${stops[i]}</span>`;
      } else {
        spansMiddle += `<span class="legend__number" style="left: ${(stops[i] / max) * 100}%;">${stops[i]}</span>`;
      }
      counter++;
    }

    gradient += ")";
    return { gradient, spans, spansMiddle };
  }
</script>

<style>
  .legend {
    background: var(--color-background);
  }

  .legend__numbers {
    font: 14px/1em var(--sans-serif);
    height: 1em;
    margin: 0.25em 0;
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
  {#if spansMiddle}
    <div class="legend__numbers">
      {@html spansMiddle}
    </div>
  {/if}
  {#if icons}
    <LegendIcons {icons} />
  {/if}
</div>
