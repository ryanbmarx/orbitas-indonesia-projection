import { writable } from "svelte/store";

export let loading = writable(true);
export let activeData = writable(null);
export let currentYear = writable(null);
