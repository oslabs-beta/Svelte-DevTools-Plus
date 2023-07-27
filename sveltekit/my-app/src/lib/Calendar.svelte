<script>
	export let schedule;

	const date = new Date();

	const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear()
	};

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	//JS/TS Date methods
	let monthIndex = date.getMonth();

	$: month = monthNames[monthIndex];

	let year = date.getFullYear();

	$: firstDayIndex = new Date(year, monthIndex, 1).getDay();

	// const currentDay = date.getDate();

	$: numberOfDays = new Date(year, monthIndex + 1, 0).getDate();

	$: calendarCellsQty = firstDayIndex <= 4 ? 35 : 42;

	const goToNextMonth = () => {
		if (monthIndex >= 11) {
			year += 1;
			return (monthIndex = 0);
		}
		return (monthIndex += 1);
	};

	const goToPrevMonth = () => {
		if (monthIndex <= 0) {
			year -= 1;
			return (monthIndex = 11);
		}
		return (monthIndex -= 1);
	};

	// $: console.log(
	// 	`Month index: ${monthIndex} --- First Day Index: ${firstDayIndex} --- Number of Days: ${numberOfDays} ${month} ${today.dayNumber}`
	// );
</script>


<div class="month">
	<ul>
		<li class="prev" on:click={goToPrevMonth}>&#10094;</li>
		<li class="next" on:click={goToNextMonth}>&#10095;</li>
		<li>{month}<br />
			<span style="font-size:18px">{year}</span>
		</li>
	</ul>
</div>

<ul class="weekdays">
	<li>Sun</li>
	<li>Mon</li>
	<li>Tue</li>
	<li>Wed</li>
	<li>Thu</li>
	<li>Fri</li>
	<li>Sat</li>
</ul>

<ul class="days">
	{#each Array(calendarCellsQty) as _, i}
		{#if i < firstDayIndex || i >= numberOfDays + firstDayIndex}
			<li>&nbsp;</li>
		{:else}
			<li
				class:active={i === today.dayNumber + (firstDayIndex - 1) &&
					monthIndex === today.month &&
					year === today.year}
				data-dateID={`${month}_${(i - firstDayIndex) + 1}_${year}`}
				class:has-appts={`${month}_${(i - firstDayIndex) + 1}_${year}` in schedule}
				on:click>
				<!--Will come to serve as the data object that we'll create. We'll have a key with a value of an array of objects. Each obj will represent an appointment. Will have an ID, an event name, and a time, as well as a property called "completed"-->
				{(i - firstDayIndex) + 1}
			</li>
		{/if}
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
	}

	/* Month header */
	.month {
		padding: 70px 25px;
		width: auto;
		background: #1abc9c;
		text-align: center;
	}

	/* Month list */
	.month ul {
		margin: 0;
		padding: 0;
	}

	.month ul li {
		color: white;
		font-size: 20px;
		text-transform: uppercase;
		letter-spacing: 3px;
	}

	/* Previous button inside month header */
	.month .prev {
		float: left;
		padding-top: 10px;
	}

	/* Next button */
	.month .next {
		float: right;
		padding-top: 10px;
	}

	.next:hover {
		cursor: pointer;
	}

	.prev:hover {
		cursor: pointer;
	}

	/* Weekdays */
	.weekdays {
		/* display: flex; */
		/* justify-content: center; */
		margin: 0px;
		padding: 10px 0;
		background-color: #ddd;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.weekdays li {
		display: inline-block;
		width: 11.6%;
		color: #666;
		text-align: center;
		padding: 9px;
	}

	/* Days (1-31 #s) */
	.days {
		padding: 0px 0;
		background: #eee;
		margin: 0;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.days li {
		list-style-type: none;
		/* display: inline-block; */
		border: 1px solid black;
		padding: 9px;
		width: 11.6%;
		text-align: center;
		margin-bottom: 1px;
		font-size: 1.2rem;
		color: #777;
		cursor: pointer;
	}

	/* Highlights the current day */
	.active {
		padding: 5px;
		background: #F2EB16;
		color: white;
	}

	.days li.has-appts {
		color: #F2480A;
	}

</style>
