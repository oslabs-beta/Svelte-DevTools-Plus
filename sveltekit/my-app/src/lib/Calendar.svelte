<script>
	const date = new Date();

	const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear()
	}

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
	$: numberOfDays = new Date(year, monthIndex + 1, 0).getDate();

	let currentDay = date.getDate();

	$: cellsQty = firstDayIndex <= 4 ? 35 : 42;

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

	$: console.log(
		`Month index: ${monthIndex} --- First Day Index: ${firstDayIndex} --- Number of Days: ${numberOfDays} ${month} ${today.dayNumber}`
	);
</script>

<main>
    <!-- should I turn these lists into tables to get them to line up properly? Currently lining up only when devtools are open -->
	<div class="month">
		<ul>
			<li class="prev" on:click={goToPrevMonth}>&#10094;</li>
			<li class="next" on:click={goToNextMonth}>&#10095;</li>
			<li>
				{month}<br />
				<span style="font-size:18px">{year}</span>
			</li>
		</ul>
	</div>

	<ul class="weekdays">
		<li>Sunday</li>
		<li>Monday</li>
		<li>Tuesday</li>
		<li>Wednesday</li>
		<li>Thursday</li>
		<li>Friday</li>
		<li>Saturday</li>
	</ul>

	<ul class="days">
		{#each Array(cellsQty) as _, i}
			{#if i < firstDayIndex || i >= numberOfDays + firstDayIndex}
				<li>&nbsp;</li>
			{:else}
				<li class:active={i === today.dayNumber + (firstDayIndex - 1) && monthIndex === today.month && year === today.year}>{i - firstDayIndex + 1}</li>
			{/if}
		{/each}
	</ul>
</main>

<style>
	ul {
		list-style-type: none;
	}
	main {
		font-family: Verdana, sans-serif;
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

	/* Weekdays */
	.weekdays {
        display: flex;
        justify-content: center;
		margin: 0;
		padding: 10px 0;
		background-color: #ddd;
	}


	.weekdays li {
		display: flex;
        justify-content: space-between;
		width: 11.6%;
		color: #666;
		text-align: center;
	}

	/* Days (#s) */
	.days {
		padding: 10px 0;
		background: #eee;
		margin: 0;
	}

	.days li {
		list-style-type: none;
		display: inline-block;
		border: 1px solid black;
		padding: 9px;
		width: 11.6%;
		text-align: center;
		margin-bottom: 1px;
		font-size: 1.2rem;
		color: #777;
		cursor: pointer; /*this makes the cursor into a pointer finger, demonstrates that something is clickable*/
	}

	/* Highlights the current day */
	.active {
		padding: 5px;
		background: #1abc9c;
		color: white !important;
	}
</style>