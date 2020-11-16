<script>
  import { currentYear } from "../utils/stores";
  export let start;
  export let end;
  export let step;

  // Generate our list of years to build the years
  let years = generateYears();

  // For the play animation
  let timer;

  // How fast to animate each step
  const ANIMATION_INTERVAL = 2000;

  // Monitor the play state.
  let playing = false;

  $: yearString = `${$currentYear}`;

  // generateYears | Returns an array of
  function generateYears() {
    let retval = [];
    for (let y = start; y <= end; y += step) {
      retval.push(y);
    }
    return retval;
  }

  function handleClick(e) {
    // Switch the current year to the clicked/selected year
    $currentYear = this.dataset.year;
  }

  // play | starts at the beginning and cycles through the available years
  // by switching the store value `currentYear`, the map also will
  // cycle through the available data
  function play(e) {
    if (!playing) {
      // If not playing, then start playing
      playing = true;
      $currentYear = start;
      timer = setInterval(() => {
        $currentYear += step;
        if ($currentYear === end) {
          clearInterval(timer);
          playing = false;
        }
      }, ANIMATION_INTERVAL);
    } else {
      // If playing, then stop playing.
      playing = false;
      clearInterval(timer);
    }
  }

  function formatYear(y, i) {
    // Return the full thing if it is the first.
    if (i === 0) return y;
    // Otherwise, return an apostrophe and last two characters
    return `&#8217;${y - 2000}`;
  }
</script>

<style>
  /* STRUCTURE */

  .timeline-wrapper {
    --extra: 12px;

    flex: 1 1;
    display: grid;
    grid-gap: 16px;
    gap: 16px;
    grid-template: auto / 1fr 44px;
  }
  .label {
    margin: 0;
    grid-row: 1;
    grid-column: 1/-1;
  }

  /* DOTS */
  .timeline {
    --dot-height: 22px;
    --line-z-index: 1;
    list-style: none;
    margin: 0 0 0 0;
    padding: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

    transform: translate(0, calc(var(--dot-height, 20px) / 2));
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

  .timeline__button.timeline__button--compressed {
    min-width: 35px;
  }
  .timeline__button--play {
    position: relative;
    background-color: var(--color-accent);
    color: white;
    max-width: 44px;
    min-width: 44px;
    border-radius: 50%;
    opacity: 1;
    transition: opacity 150ms ease;
  }

  .timeline__button--play::after {
    box-sizing: border-box;
    content: "";
    display: block;
    background: transparent;
    border-radius: 50%;
    position: absolute;
    top: calc(-0.5 * var(--extra));
    left: calc(-0.5 * var(--extra));
    height: calc(100% + var(--extra));
    width: calc(100% + var(--extra));
    border: 2px dashed red;

    opacity: 0;
    transition: opacity 150ms ease;
  }

  .timeline__button--play:focus,
  .timeline__button--play:hover {
    opacity: 0.8;
  }

  /* PLAY BUTTON PLAYING STATE */
  .timeline__button--play.playing {
    animation: pulse 3s linear alternate infinite;
  }

  .timeline__button--play.playing::after {
    opacity: 1;
    animation: spin 10s linear infinite;
  }

  /* END PLAY BUTTON PLAYING STATE */

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

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes pulse {
    100% {
      background-color: var(--color-accent-faded);
    }

    0% {
      background-color: var(--color-accent);
    }
  }
</style>

<div class="timeline-wrapper">
  <span id="timeline-label" class="label">Select a year</span>
  <ol aria-labelledby="timeline-label" class="timeline">
    {#each years as year, i}
      <li>
        <button
          class="timeline__button"
          aria-label="View data for the year {year}"
          title="View data for the year {year}"
          class:timeline__button--compressed={years.length > 7}
          data-year={year}
          class:timeline__button--active={year == $currentYear}
          on:click={handleClick}><span class="timeline__button__year">{@html formatYear(year, i)}</span></button>
      </li>
    {/each}
  </ol>
  <button class:playing class="timeline__button timeline__button--play" aria-label="Click here to animate the data over time" title="Click to play animation" on:click={play}>
    {#if playing}
      <!-- Square-->
      &#9724;
    {:else}
      <!-- Triangle -->
      &#9658;
    {/if}
  </button>
</div>
