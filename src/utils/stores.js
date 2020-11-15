import { writable } from "svelte/store";

export let activeData = writable(null);
export let currentYear = writable(null);
export let loading = writable(true);
