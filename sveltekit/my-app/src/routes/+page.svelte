<script lang="ts">
	import Calendar from '../lib/Calendar.svelte';
	import Scheduler from '../lib/Scheduler.svelte';
	// add in a better CSS manager - picocss? daisy UI? tailwind?

	let schedule = {
		July_11_2023: [
			{ id: 7362341, eventname: 'Grocery shopping', time: '8:00am', completed: false },
			{}
		]
	};

	let schedulerShowing = false;
	let dateID;
	let dateHeading;

	// create an array of appointments
	$: appointments = schedule[dateID];

	const makeDateHeading = () => {
		let dateAsHeading = dateID.replace(/_/g, ' ');
		const date = new Date(dateAsHeading);
		return (dateHeading = date.toLocaleString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}));
		// console.log(dateHeading);
	};

	const handleScheduler = (e) => {
		// console.dir(e.target)
		schedulerShowing = true;
		dateID = e.target.dataset.dateid; // passing the event object
		makeDateHeading();
	};

	const setApptToSch = (e) => {
		// console.log(e.detail);
		let time = `${e.detail.hour}:${
			e.detail.minutes < 10 ? '0' + e.detail.minutes : e.detail.minutes
		}${e.detail.amOrPM}`;
		console.log(time);

		// creates new appointment objects to go into array of appointment objects within the schedule object - tracks appointments for each given day
		let newAppt = {
			id: Math.floor(Math.random() * 100000),
			eventname: e.detail.eventName,
			time,
			completed: e.detail.completed
		};

		// if the schedule object doesn't have a key of the current dateID, then create a key with current dateID that has the value of an array
		if (!schedule[dateID]) {
			schedule[dateID] = [newAppt];
		} else {
			let currentSchedAppts = schedule[dateID];
			schedule[dateID] = [...currentSchedAppts, newAppt];
		}
	};

	$: console.log(schedule);
</script>

<main>
	<Calendar on:click={handleScheduler} />
	<!-- add conditional rendering to either show calendar or scheduler -->
	{#if schedulerShowing}
		<Scheduler
			on:modalClose={() => (schedulerShowing = false)}
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
