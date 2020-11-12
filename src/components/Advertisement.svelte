<script>
  /**
   *
   * This component is a polymer UW component and is pretty much plug and play.
   * It uses the in-depth css variable font-color, which probably should be set
   * in the main App CSS anyways.
   *
   *
   */
</script>

<style>
  .advert {
    background: #eee;
    min-height: 250px;
    margin: var(--grid-gap, 30px) auto;
  }
</style>

<aside class="advert">
  <partner-inline
    util-module-path="elements/partner"
    sizes="[[300, 250]]"
    conditional-sizes="[]"
    lazy="lazy"
    fluid="fluid"
    style="margin: 0 auto; --color-boulder: var(--font-color, #fff)" />
  <partner-banner
    util-module-path="elements/partner"
    sizes="[[300, 250]]"
    lazy="lazy"
    fluid="fluid"
    style="margin: 0 auto; --color-boulder: var(--font-color, #fff)" />
</aside>
