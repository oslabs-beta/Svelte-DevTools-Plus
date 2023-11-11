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
    ],
    July_27_2023: [
        {
            id: 2983017,
            eventname: "Prep for OSP Launch",
            time: "9:05am",
            completed: false
        },
        {
            id: 7394017,
            eventname: "Launch",
            time: "10:00am",
            completed: false
        },
        {
            id: 4039176,
            eventname: "Launch celebration",
            time: "12:15pm",
            completed: false
        },
        {
            id: 8293041,
            eventname: "Lecture: System Design",
            time: "2:30pm",
            completed: false
        },
        {
            id: 9384071,
            eventname: "OSP Launch Presentation",
            time: "6:30pm",
            completed: false
        }
    ],
    July_31_2023: [
        {
            id: 1203928,
            eventname: "Reinforcement Project Brief",
            time: "1:30pm",
            completed: false
        }
    ],
    August_4_2023: [
        {
            id: 2938049,
            eventname: "Solo Technical Interview Practice",
            time: "2:00pm",
            completed: false
        }
    ],
    August_8_2023: [
        {
            id: 2931234,
            eventname: "Lecture: Online Profiles Kickoff",
            time: "3:00pm",
            completed: false
        }
    ],
    August_11_2023: [
        {
            id: 3710293,
            eventname: "Codesmith Graduation",
            time: "5:30pm",
            completed: false
        }
    ]
});