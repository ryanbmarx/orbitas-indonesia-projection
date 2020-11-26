<script>
  // import { currentYear } from "../utils/stores";

  // OUR SCOPED STORE SOLUTION
  import { key } from "../utils/stores";
  import { getContext } from "svelte";
  let { currentYear } = getContext(key);

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
    --play-btn-extra: 12px;
    --dot-height: 22px;
    --line-z-index: 1;
    --button-width: 44px;
    --button-height: 44px;

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
    list-style: none;
    margin: 0 0 0 0;
    padding: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

    transform: translateY(calc(var(--dot-height) / 2));
  }
  .timeline.timeline--compressed {
    --button-width: 35px;
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
    top: calc(var(--dot-height) / 2);
    left: 0;
    transform: translate(0, -50%);
  }

  .timeline__button {
    display: block;

    display: flex;
    flex-flow: column nowrap;

    border: none;
    background: none;
    padding: 0;
    margin: 0;
    height: var(--button-height);
    width: var(--button-width);

    cursor: pointer;
  }

  .timeline__button--play {
    position: relative;
    background-color: var(--color-accent);
    color: white;

    height: var(--button-height);
    width: 100%;
    min-width: var(--button-width);
    max-width: var(--button-width);

    border-radius: 50%;
    opacity: 1;
    transition: opacity 150ms ease;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    display: block;
    background: var(--color-accent-text);
    height: 90%;
    width: 90%;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    height: 40%;
    width: 30%;
    transform: translate(10%, 0);
  }

  .timeline__button--play::after {
    box-sizing: border-box;
    content: "";
    display: block;
    background: transparent;
    border-radius: 50%;
    position: absolute;
    top: calc(-0.5 * var(--play-btn-extra));
    left: calc(-0.5 * var(--play-btn-extra));
    height: calc(100% + var(--play-btn-extra));
    width: calc(100% + var(--play-btn-extra));
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

  .timeline__button--play.playing .icon {
    clip-path: none;
    height: 30%;
    transform: none;
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
    margin-top: 4px;
  }

  .timeline__button__circle {
    /* THIS IS THE DOT */
    display: block;
    width: var(--dot-height);
    height: var(--dot-height);
    min-width: var(--dot-height);
    min-height: var(--dot-height);

    box-sizing: border-box;
    z-index: calc(1 + var(--line-z-index));

    border: var(--line-width, 4px) solid var(--color-accent);
    background: var(--color-background);
    border-radius: 50px;
    margin: 0 auto;
    transition: background 150ms ease;
  }

  .timeline__button:focus .timeline__button__circle,
  .timeline__button:hover .timeline__button__circle {
    background: var(--color-accent);
  }

  .timeline__button.timeline__button--active .timeline__button__year {
    font-weight: bold;
    color: var(--color-accent);
  }
  .timeline__button.timeline__button--active .timeline__button__circle {
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
  <ol aria-labelledby="timeline-label" class="timeline" class:timeline--compressed={years.length > 7}>
    {#each years as year, i}
      <li>
        <button
          class="timeline__button"
          aria-label="View data for the year {year}"
          title="View data for the year {year}"
          data-year={year}
          class:timeline__button--active={year == $currentYear}
          on:click={handleClick}>
          <span class="timeline__button__circle" />
          <span class="timeline__button__year">{@html formatYear(year, i)}</span></button>
      </li>
    {/each}
  </ol>
  <button class:playing class="timeline__button timeline__button--play" aria-label="Click here to animate the data over time" title="Click to play animation" on:click={play}>
    <span class="icon" />
  </button>
</div>
