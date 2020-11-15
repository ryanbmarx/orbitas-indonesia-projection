<script>
  import { format } from "d3-format";
  export let data;
  let fakedata = [
    {
      min: 0.2,
      max: 1.0,
      color: "red",
    },
    {
      min: 1.0,
      max: 2.0,
      color: "blue",
    },
    {
      min: 2.0,
      max: 3.0,
      color: "orange",
    },
    {
      min: 3,
      max: 4,
      color: "green",
    },
    {
      min: 4,
      max: 4.9,
      color: "purple",
    },
  ];
</script>

<style>
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
    text-align: right;
    font: 14px/1em var(--sans-serif);
    position: relative;
    transform: translate(3px, 0);
  }

  @supports (width: fit-content) or (width: -moz-fit-content) {
    .legend__list-item__label {
      margin-left: auto;
      width: -moz-fit-content;
      width: fit-content;
      transform: translate(50%, 0);
    }
  }
  .legend__list-item__box {
    display: block;
    height: 6px;
    margin-top: 4px;
  }

  .label {
    position: absolute;
    top: 0;
    left: 0;
  }
  @media all and (min-width: 768px) {
    .legend {
      background: rgba(255, 255, 255, 0.9);
      position: absolute;
      top: 16px;
      left: 16px;
      width: 33vw;
      max-width: 380px;
      padding: 8px;
      z-index: 90;
    }

    .label {
      position: unset;
    }
  }
</style>

<div class="legend">
  <span class="label">Legend</span>
  <ol class="legend__list">
    {#each fakedata as d, i}
      <li class="legend__list-item">
        {#if i + 1 < data.length}<span class="legend__list-item__label">{format('.1f')(d.max)}</span>{/if}
        <span style="background:{d.color}" class="legend__list-item__box" />
      </li>
    {/each}
  </ol>
</div>
