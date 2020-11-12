<script>
  import Timeline from "./Timeline.svelte";
  import InputSelect from "./InputSelect.svelte";
  import { loading } from "../utils/stores";
  let options = [
    {
      label: "data1",
      value: "val",
      disabled: false,
    },
    {
      label: "data2",
      value: "val2",
      disabled: false,
    },
    {
      label: "data3",
      value: "val3",
      disabled: false,
    },
    {
      label: "data4",
      value: "val4",
      disabled: false,
    },
  ];
</script>

<style>
  .nav {
    display: grid;
    grid-template: auto / repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 24px;
    gap: 24px;
  }

  :global(.select) {
    --input-height: 44px;
    --border-radius: 0;
    --color-icon: var(--color-accent) !important;
    --outline-color: var(--color-accent) !important;
    border: var(--line-width, 3px) solid var(--color-accent);
    font-family: var(--sans-serif);
  }
</style>

<nav class="nav">
  <Timeline />
  <div class="select-wrapper">
    <InputSelect
      id="data"
      label="Select the data"
      {options}
      on:input={e => {
        console.log('NEW DATA!', `${$loading} becomes ${!$loading}`);
        $loading = !$loading;
      }} />
  </div>
</nav>
