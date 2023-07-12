import { writable } from 'svelte/store';

export const scheduleStore = writable({
    July_11_2023: [
        {
            id: 7382377,
            eventname: "Go for a walk",
            time: "11:00am",
            completed: false
        }
    ],
    July_13_2023: [
        {
            id: 7382376,
            eventname: "Bike ride",
            time: "6:00am",
            completed: false
        }
    ]
});