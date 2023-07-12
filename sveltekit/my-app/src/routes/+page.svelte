<script lang="ts">
	import { onDestroy } from 'svelte';
	import { scheduleStore } from '../lib/schedule-store';
	import Calendar from '../lib/Calendar.svelte';
	import Scheduler from '../lib/Scheduler.svelte';
	// add in a better CSS manager - picocss? daisy UI? tailwind?

	let schedule = {};

	// console.dir(scheduleStore)

	const unsubscribe = scheduleStore.subscribe(currState => {
		schedule = currState;
	});

	onDestroy(() => {
		if(unsubscribe) unsubscribe();
	})

	let schedulerShowing = false;
	let dateID = "";
	let dateHeading = "";

	// create an array of appointments
	$: appointments = schedule[dateID];

	const makeDateHeading = () => {
		let dateAsHeading = dateID.replace(/_/g, ' ');
		let date = new Date(`${dateAsHeading}`);
		return dateHeading = date.toLocaleString("en-US", {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
		// console.log(dateHeading);
	};

	const handleScheduler = (e) => {
		// console.dir(e.target)
		schedulerShowing = true;
		dateID = e.target.dataset.dateid; // passing the event object
		makeDateHeading();
	};

	const removeEmptyDate = () => {
		if(schedule[dateID] && schedule[dateID].length === 0) {
			scheduleStore.update(currDataState => {
				delete currDataState[dateID];
				return currDataState;
			});
		}
		return;
	}

	const closeScheduler = () => {
		schedulerShowing = false;
		removeEmptyDate();
	}

	const setApptToSch = (e) => {
		// console.log(e.detail);
		let time = `${e.detail.hour}:${e.detail.minutes < 10 ? '0' + e.detail.minutes : e.detail.minutes}${e.detail.amOrPM}`;
		console.log(time);

		// creates new appointment objects to go into array of appointment objects within the schedule object - tracks appointments for each given day
		let newAppt = {
			id: Math.floor(Math.random() * 1000000),
			eventname: e.detail.eventName,
			time: time === ":0" ? "no time set" : time,
			completed: false
		};

		// if the schedule object doesn't have a key of the current dateID, then create a key with current dateID that has the value of an array
		if (!schedule[dateID]) {
			scheduleStore.update(currState => {
				currState[dateID] = [newAppt];
				return currState;
			})
		} else {
			scheduleStore.update(currState => {
				let currDayAppts = currState[dateID];
				currState[dateID] = [...currDayAppts, newAppt];
				return currState;
			})
		}
	};

	$: console.log(schedule);
</script>

<main>
	<Calendar on:click={handleScheduler} {schedule}/>
	<!-- add conditional rendering to either show calendar or scheduler -->
	{#if schedulerShowing}
		<Scheduler
			on:modalClose={closeScheduler}
			on:addAppt={setApptToSch}
			{dateID}
			{dateHeading}
			{appointments}
		/>
	{/if}
</main>

<style>
	main {
		/* change this font to something prettier */
		font-family: Verdana, sans-serif;
	}
</style>
