<script>
  /**
   * This component adds share buttons to your app, ideally in a drag-and-drop way. If the browser
   * supports native WebSharing, then a webshare button will be displayed. If not, it will be replaced
   * with an email share button using a mailto link. [Current compatibility data](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
   * says this will work in all Safari browsers, Chrome for Android and NOT in any Firefox.
   *
   * If the current site's twitter handle is available in the ga_data, then it will be appended to the tweet.
   *
   * The buttons are muted in style, and pick up --theme-color when hovered/focused.
   *
   * @prop alignment {string}: "left" (default), "center" or "right" will determine which way the buttons align
   * @prop twitter {bool}: default true — false will disable the twitter button.
   * @prop facebook {bool}: default true — false will disable the FB button
   * @prop shareHeadline {string}: required — the headline text for these buttons to serve up. The component will not display without it.
   * @prop shareUrl {string}: defaults to current url — the specific url to be shared. It's best that you set this manually, probably.
   *
   *
   */

  import Twitter from "../icons/Twitter.svelte";
  import Facebook from "../icons/Facebook.svelte";
  import Email from "../icons/Email.svelte";
  import Share from "../icons/Share.svelte";
  import { fireEvent } from "../utils/analytics";
  import get from "lodash.get";

  export let alignment = "left";
  export let twitter = true;
  export let facebook = true;
  export let shareHeadline;
  export let shareUrl = window.location.href;
  let webShareButton;

  let webShare = testForWebShare();
  let facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  let twitterShareUrl = getTwitterShareUrl();
  let emailShareUrl = `mailto:?subject=${encodeURIComponent(
    shareHeadline
  )}&body=${encodeURIComponent(shareHeadline + ": " + shareUrl)}`;

  function getTwitterShareUrl() {
    /**
     * getTwitterShareUrl generates the sharing url for twitter. It adds the via @TwitterHandle
     * for the current property, if that info is present in ga_data.
     */

    let via = "";
    if (typeof window !== "undefined") {
      via = get(window, "ga_data.site.twitter.primary_account", "");
    }
    let url = new URL("https://twitter.com/intent/tweet");

    url.searchParams.set("url", shareUrl);
    url.searchParams.set("text", shareHeadline);
    if (via) url.searchParams.set("via", via);

    return url.toString();
  }

  function handleWebShare(e) {
    /**
     * handleWebShare will, if supported, trigger a device's native share functions
     */
    if (webShare) {
      navigator
        .share({
          text: shareHeadline,
          url: shareUrl
        })
        .catch(err => {
          console.error(`Couldn't share because of`, err);
        });
    }
  }

  function testForWebShare() {
    /**
     * testForWebShare returns true/false based on whether webshare is supported.
     * You quickly can check this in Safari desktop, which supports WebShare
     */
    if (typeof window !== "undefined") {
      return window.navigator && window.navigator.share;
    }
    return false;
  }
</script>

<style>
  .share {
    --button-dimension: 40px;
    list-style: none;
    display: flex;
    justify-content: flex-start;

    margin: 1em 0;
    padding: 0;
  }

  .share--center {
    justify-content: center;
  }

  .share--right {
    justify-content: flex-end;
  }

  .share li {
    margin: 0 1em 0 0;
  }
  .share li:last-child {
    margin: 0;
  }

  .share-btn {
    width: var(--button-dimension, 40px);
    height: var(--button-dimension, 40px);
    background: #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 150ms ease;
    border: none;
    padding: 0;
  }

  .share-btn:hover,
  .share-btn:focus {
    background: var(--theme-color, #009bff);
    transition: background 150ms ease;
  }

  .share-btn :global(svg) {
    fill: white;
    width: 60%;
    height: 60%;
    transition: fill 150ms ease;
  }

  .share-btn:hover :global(svg),
  .share-btn:focus :global(svg) {
    fill: var(--theme-color-text, white);
    transition: fill 150ms ease;
  }

  @media all and (pointer: fine) {
    /* This is a target for NON touch devices */
    /* https://css-tricks.com/touch-devices-not-judged-size/ */

    .share {
      --button-dimension: 30px;
    }
  }
</style>

{#if shareHeadline}
  <ul
    class="share"
    class:share--center={alignment.toLowerCase() === 'center'}
    class:share--right={alignment.toLowerCase() === 'right'}>
    {#if twitter}
      <li>
        <a
          target="_blank"
          rel="noreferrer noopener"
          class="share-btn"
          aria-label="Share this on Twitter"
          href={twitterShareUrl}>
          <Twitter />
        </a>
      </li>
    {/if}
    {#if facebook}
      <li>
        <a
          target="_blank"
          rel="noreferrer noopener"
          class="share-btn"
          aria-label="Share this on Facebook"
          href={facebookShareUrl}>
          <Facebook />
        </a>
      </li>
    {/if}
    {#if webShare}
      <li>
        <button
          class="share-btn"
          aria-label="Share this"
          on:click|preventDefault={handleWebShare}>
          <Share />
        </button>
      </li>
    {:else}
      <li>
        <a
          target="_blank"
          rel="noreferrer noopener"
          class="share-btn"
          aria-label="Share this by email"
          href={emailShareUrl}>
          <Email />
        </a>
      </li>
    {/if}
  </ul>
{/if}
