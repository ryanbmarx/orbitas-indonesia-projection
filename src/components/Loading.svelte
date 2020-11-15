<script>
  import { fade } from "svelte/transition";
  export let text = "Loading data";
</script>

<style>
  .spinner {
    --spinner-height: 80px;
    display: flex;
    position: relative;
    height: 200px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 100%;
    height: 100%;
    background: #eee;
    z-index: 100;
  }

  .spinner__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  span {
    margin: auto;
  }
  .spinner__animation {
    display: block;
    width: var(--spinner-height, 80px);
    height: var(--spinner-height, 80px);
    margin: 100px auto;
    background-color: var(--color-accent, #009bff);

    border-radius: 100%;
    -webkit-animation: sk-scaleout 1s infinite ease-in-out;
    animation: sk-scaleout 1s infinite ease-in-out;
  }

  .spinner__text {
    animation-name: fade;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }

  @keyframes fade {
    to {
      opacity: 0.3;
    }
  }
</style>

<div class="spinner" transition:fade={{ duration: 150 }}><span class="spinner__wrapper"> <span class="spinner__animation" /> </span> <span class="spinner__text">{text}</span></div>
