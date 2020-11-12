<script>
</script>

<style>
  .timeline {
    --dot-height: 20px;
    --line-z-index: 1;
    list-style: none;
    margin: 0 0 24px 0;
    padding: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .timeline::before {
    content: "";
    display: block;
    width: 100%;
    height: 4px;
    background: var(--color-accent);
    border-radius: 4px;

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
    width: 44px;

    cursor: pointer;
  }

  .timeline__button__year {
    font: 500 12px/1em var(--sans-serif);
    text-align: center;
    z-index: calc(var(--line-z-index, 1) + 1);
    position: relative;
  }

  .timeline__button__year::before {
    content: "";
    display: block;
    width: var(--dot-height, 20px);
    height: var(--dot-height, 20px);
    box-sizing: border-box;

    border: 4px solid var(--color-accent);
    background: var(--color-background);
    border-radius: 50px;
    margin: 0 auto 8px auto;
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
</style>

<div class="timeline-wrapper">
  <span id="timeline-label" class="label">Select a year</span>
  <ol aria-labelledby="timeline-label" class="timeline">
    <li><button class="timeline__button timeline__button--active"><span class="timeline__button__year">2020</span></button></li>
    <li><button class="timeline__button"><span class="timeline__button__year">2025</span></button></li>
    <li><button class="timeline__button"><span class="timeline__button__year">2030</span></button></li>
    <li><button class="timeline__button"><span class="timeline__button__year">2035</span></button></li>
    <li><button class="timeline__button"><span class="timeline__button__year">2040</span></button></li>
    <li><button class="timeline__button"><span class="timeline__button__year">2045</span></button></li>
    <li><button class="timeline__button"><span class="timeline__button__year">2050</span></button></li>
  </ol>
</div>
