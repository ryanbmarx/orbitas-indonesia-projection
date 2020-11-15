<script>
  /**
   * @prop label
   * @prop id
   * @prop value | The prop to which the current value of the select menu will bind. This accessible in the parent component
   * @prop options | An array of objects which is used to construct the menu
   * ```
   * [
   * 	{
   * 		label: "",
   * 		value: "",
   * 		disabled: true/false
   * 	},
   * 	...
   * ]
   * ```
   * @prop showAll | When defined, will automatically add a "show all" option to the menu. Is an object with two properties: the option label and value..
   * ```
   * showAll = {
   * 	label: "Show all things"
   * 	value: "show-all-things"
   * }```
   */
  export let label, id;
  export let value;
  export let options = [];
  export let showAll = "";
</script>

<style>
  label {
    margin: 0 0 8px 0;
    display: block;
  }
  .select {
    position: relative;
    background: white;
    height: var(--input-height);
    border-radius: var(--border-radius, 5px);
    box-sizing: border-box;
  }

  .select::after {
    content: "";
    display: block;
    width: 1em;
    height: 0.75em;
    background-color: var(--color-icon, #aaa);

    -webkit-clip-path: polygon(0 0, 100% 0, 50% 100%);
    clip-path: polygon(0 0, 100% 0, 50% 100%);

    position: absolute;
    right: 8px;
    bottom: calc(var(--input-height) / 2);
    transform: translate(0, 50%);
  }

  .select__input {
    font-size: 1em;
    width: 100%;
    height: 100%;
    padding: 0 0.5em;
    position: relative;
    border: none;
    z-index: 3;
    background: transparent;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;

    outline-color: var(--outline-color, #009bff);
  }

  .select__input::-ms-expand {
    display: none;
  }
</style>

<svelte:options accessors={true} />

<label for={id}>{label}</label>
<div class="select">
  <select class="select__input" {id} on:input bind:value>
    {#if showAll}
      <option value={showAll.value} selected>{showAll.label}</option>
    {/if}
    {#each options as { value, label, disabled, selected } (value)}
      {#if label}
        <option {value} {disabled} {selected}>{label}</option>
      {/if}
    {/each}
  </select>
</div>
