<script>
  // //         {
  //     "label": "Aggressive projection",
  //             "value": "Aggressive_CAPACITY_26OCT2020.csv",
  //             "description": "A brief description of Aggressive. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
  //           },

  export let label = "Label";
  export let description = "Description";
</script>

<style>
  .description {
    margin: 24px 0;
  }
  .description__name {
    display: inline;
    font-weight: bold;
    margin: 0 0.5em 0 0;
    color: var(--color-accent);
  }
  .description__name::after {
    content: ":";
  }
  .description__text {
    display: inline;
    margin: 0;
  }
</style>

<dl class="description">
  <dt class="description__name">{label}</dt>
  <dd class="description__text">{description}</dd>
</dl>
