<script>
	import { onMount } from 'svelte';
	
	export let attendanceDates = [];
	
	let currentDate = new Date();
	let currentMonth = currentDate.getMonth();
	let currentYear = currentDate.getFullYear();
	
	// Generate calendar data
	function generateCalendar(month, year) {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();
		
		const weeks = [];
		let week = new Array(7).fill(null);
		
		// Fill in the days
		for (let day = 1; day <= daysInMonth; day++) {
			const dayOfWeek = (startingDayOfWeek + day - 1) % 7;
			week[dayOfWeek] = day;
			
			if (dayOfWeek === 6 || day === daysInMonth) {
				weeks.push([...week]);
				week = new Array(7).fill(null);
			}
		}
		
		return weeks;
	}
	
	function isAttendanceDate(day) {
		if (!day) return false;
		const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		return attendanceDates.includes(dateStr);
	}
	
	function isToday(day) {
		if (!day) return false;
		const now = new Date();
		return day === now.getDate() && 
		       currentMonth === now.getMonth() && 
		       currentYear === now.getFullYear();
	}
	
	function previousMonth() {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
	}
	
	function nextMonth() {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
	}
	
	const monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];
	
	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	
	$: weeks = generateCalendar(currentMonth, currentYear);
	$: monthYear = `${monthNames[currentMonth]} ${currentYear}`;
</script>

<div class="calendar">
	<div class="calendar-header">
		<button class="nav-button" on:click={previousMonth} aria-label="Previous month">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>
		<h3>{monthYear}</h3>
		<button class="nav-button" on:click={nextMonth} aria-label="Next month">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>
	</div>
	
	<div class="calendar-grid">
		{#each dayNames as dayName}
			<div class="day-header">{dayName}</div>
		{/each}
		
		{#each weeks as week}
			{#each week as day}
				{#if day}
					<div 
						class="day-cell" 
						class:attended={isAttendanceDate(day)}
						class:today={isToday(day)}
					>
						<span class="day-number">{day}</span>
						{#if isAttendanceDate(day)}
							<div class="attendance-indicator"></div>
						{/if}
					</div>
				{:else}
					<div class="day-cell empty"></div>
				{/if}
			{/each}
		{/each}
	</div>
	
	<div class="calendar-legend">
		<div class="legend-item">
			<div class="legend-dot attended"></div>
			<span>Attended</span>
		</div>
		<div class="legend-item">
			<div class="legend-dot today"></div>
			<span>Today</span>
		</div>
	</div>
</div>

<style>
	.calendar {
		width: 100%;
	}
	
	.calendar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		padding: 0 0.5rem;
	}
	
	.calendar-header h3 {
		font-family: var(--font-display);
		font-size: 1.5rem;
		margin: 0;
		color: var(--text-primary);
	}
	
	.nav-button {
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 8px;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--tk-primary);
	}
	
	.nav-button:hover {
		background: rgba(59, 130, 246, 0.2);
		border-color: var(--tk-primary);
		transform: scale(1.05);
	}
	
	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
	}
	
	.day-header {
		text-align: center;
		font-weight: 600;
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		padding: 0.5rem 0;
		letter-spacing: 0.05em;
	}
	
	.day-cell {
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.2s ease;
		cursor: default;
	}
	
	.day-cell.empty {
		background: transparent;
		border: none;
	}
	
	.day-cell.today {
		border-color: var(--tk-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
	}
	
	.day-cell.attended {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.15));
		border-color: rgba(34, 197, 94, 0.4);
	}
	
	.day-cell.attended.today {
		border-color: var(--tk-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(34, 197, 94, 0.2);
	}
	
	.day-number {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-primary);
		z-index: 1;
	}
	
	.attendance-indicator {
		position: absolute;
		bottom: 4px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgb(34, 197, 94);
		box-shadow: 0 0 6px rgba(34, 197, 94, 0.6);
	}
	
	.calendar-legend {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}
	
	.legend-dot {
		width: 12px;
		height: 12px;
		border-radius: 4px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.legend-dot.attended {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.3));
		border-color: rgba(34, 197, 94, 0.4);
	}
	
	.legend-dot.today {
		border: 2px solid var(--tk-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
	}
</style>
