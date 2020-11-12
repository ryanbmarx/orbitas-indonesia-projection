<script>
  let currentYear = "2020";
  let years = ["2020", "2025", "2030", "2035", "2040", "2045", "2050"];

  function handleClick(e) {
    currentYear = this.dataset.year;
  }
</script>

<style>
  .timeline {
    --dot-height: 20px;
    --line-z-index: 1;
    list-style: none;
    margin: 0 0 0 0;
    padding: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .timeline li {
    flex: 1 1;
  }

  .timeline::before {
    /* THIS IS THE LINE OF TIME */
    content: "";
    display: block;
    width: 100%;
    height: var(--line-width, 4px);
    background: var(--color-accent);
    border-radius: var(--line-width, 4px);

    position: absolute;
    top: calc(var(--dot-height, 20px) / 2);
    left: 0;
    transform: translate(0, -50%);
  }

  .timeline__button {
    display: block;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    height: 44px;
    min-width: 44px;
    width: 100%;

    cursor: pointer;
  }

  .timeline__button__year {
    font: 500 12px/1em var(--sans-serif);
    text-align: center;
    z-index: calc(var(--line-z-index, 1) + 1);
    position: relative;
  }

  .timeline__button__year::before {
    /* THIS IS THE DOT */
    content: "";
    display: block;
    width: var(--dot-height, 20px);
    height: var(--dot-height, 20px);
    box-sizing: border-box;

    border: var(--line-width, 4px) solid var(--color-accent);
    background: var(--color-background);
    border-radius: 50px;
    margin: calc(var(--line-width, 4px) * -1) auto 0 auto;
    transition: background 150ms ease;
  }

  .timeline__button:focus .timeline__button__year::before,
  .timeline__button:hover .timeline__button__year::before {
    background: var(--color-accent);
  }

  .timeline__button.timeline__button--active .timeline__button__year {
    font-weight: bold;
    color: var(--color-accent);
  }
  .timeline__button.timeline__button--active .timeline__button__year::before {
    background: var(--color-accent);
  }

  @media all and (min-width: 768px) {
    .timeline {
      /* THIS IS THE LINE OF TIME */
      transform: translate(0, 10px);
    }
  }
</style>

<div class="timeline-wrapper">
  <span id="timeline-label" class="label">Select a year</span>
  <ol aria-labelledby="timeline-label" class="timeline">
    {#each years as year, i}
      <li>
        <button class="timeline__button" data-year={year} class:timeline__button--active={year === currentYear} on:click={handleClick}><span class="timeline__button__year">{year}</span></button>
      </li>
    {/each}
  </ol>
</div>
