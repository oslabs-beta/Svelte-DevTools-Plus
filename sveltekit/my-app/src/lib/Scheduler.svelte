<script>
	import { createEventDispatcher } from 'svelte';
	import Appointment from './Appointment.svelte';
	export let dateID;
	export let dateHeading;
	export let appointments;

	const dispatch = createEventDispatcher();

	let apptDetails = {
		eventName: '',
		hour: '',
		minutes: '',
		amOrPM: '',
		completed: false
	};

	const submitAppt = () => {
		dispatch('addAppt', apptDetails);
		// reset properties
		apptDetails = {
			eventName: '',
			hour: '',
			minutes: '',
			amOrPM: '',
			completed: false
		};
	};
</script>

<section>
	<form id={dateID} on:submit|preventDefault={submitAppt}>
		<div id="closer-cont">
			<span class="close" title="Close Modal" on:click={() => dispatch('modalClose')}>
				&times;
			</span>
		</div>
		<!-- Header -->
		<header>
			<h2>My Schedule for</h2>
			<h2>{dateHeading}</h2>
			<input
				type="text"
				id="event-input"
				required
				placeholder="Add an event..."
				bind:value={apptDetails.eventName}
			/>
			<!-- Container for Time inputs -->
			<div id="time-container">
				<!-- Container for hours/mins input -->
				<div id="hrs-mins-container">
					<input
						type="number"
						id="hour-input"
						name="time"
						min="1"
						max="12"
						step="1"
						placeholder="Hr."
						bind:value={apptDetails.hour}
					/>
					<span id="time-colon">:</span>
					<input
						type="number"
						id="mins-input"
						name="time"
						min="0"
						max="59"
						step="1"
						placeholder="Mins."
						bind:value={apptDetails.minutes}
					/>
				</div>

				<!-- Container for AM/PM buttons -->
				<div id="am-pm-countainer">
					<!-- div for AM radio button -->
					<div>
						<input
							type="radio"
							id="amPMChoice1"
							name="contact"
							bind:group={apptDetails.amOrPM}
							value="am"
						/>
						<label for="contactChoice1">AM</label>
					</div>

					<!-- div for PM radio button -->
					<div>
						<input
							type="radio"
							id="amPMChoice2"
							name="contact"
							bind:group={apptDetails.amOrPM}
							value="pm"
						/>
						<label for="contactChoice2">PM</label>
					</div>
				</div>
			</div>
			<!--End of time container-->

			<div>
				<button class="addBtn">Add</button>
			</div>
		</header>
	</form>

	<table id="appts-container">
		{#if appointments.length === 0}
			<h1>No appointments scheduled</h1>
		{:else}
			{#each appointments as appt}
				<!--appt will be a JS object-->
				<Appointment apptName={appt.eventname}, time={appt.time}, completed={appt.completed} />
				<!--props being passed down to Appointment-->
			{/each}
		{/if}
	</table>
</section>

<style>
	section {
		box-sizing: border-box;
		width: 100%;
		height: 100vh;
		position: absolute;
		left: 0;
		top: 0;
		background-color: white;
	}
	
	h1 {
		text-align: center;
		color: gray;
	}

	h2 {
		margin: 5px 0;
	}

	/* Include the padding and border in an element's total width and height */
	* {
		box-sizing: border-box;
	}

	/* Remove margins and padding from the list */
	ul {
		margin: 0;
		padding: 0;
	}

	/* Style the list items */
	ul li {
		cursor: pointer;
		position: relative;
		padding: 12px 8px 12px 40px;
		background: #eee;
		font-size: 18px;
		transition: 0.2s;

		/* make the list items unselectable */
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	/* Set all odd list items to a different color (zebra-stripes) */
	ul li:nth-child(odd) {
		background: #f9f9f9;
	}

	/* Darker background-color on hover */
	ul li:hover {
		background: #ddd;
	}

	/* When clicked on, add a background color and strike out text */
	ul li.checked {
		background: #888;
		color: #fff;
		text-decoration: line-through;
	}

	/* Add a "checked" mark when clicked on */
	ul li.checked::before {
		content: '';
		position: absolute;
		border-color: #fff;
		border-style: solid;
		border-width: 0 2px 2px 0;
		top: 10px;
		left: 16px;
		transform: rotate(45deg);
		height: 15px;
		width: 7px;
	}

	/* Style the header */
	header {
		background-color: #f44336;
		padding: 30px 40px;
		color: white;
		text-align: center;
	}

	/* Clear floats after the header */
	header:after {
		content: '';
		display: table;
		clear: both;
	}

	/* Style the input */
	input {
		margin: 0;
		border: none;
		border-radius: 0;
		width: 75%;
		padding: 10px;
		float: left;
		font-size: 16px;
	}

	/* Style the "Add" button */
	.addBtn {
		padding: 10px;
		width: 25%;
		background: #d9d9d9;
		color: #555;
		float: left;
		text-align: center;
		font-size: 16px;
		cursor: pointer;
		transition: 0.3s;
		border-radius: 0;
	}

	.addBtn:hover {
		background-color: #bbb;
	}

	/* Style the close button */
	.close {
		position: absolute;
		font-size: 2rem;
		color: white;
		right: 0;
		top: 0;
		padding: 8px 16px 12px 16px;
		cursor: pointer;
	}

	.close:hover {
		background-color: hsl(168, 76%, 40%);
	}
</style>
