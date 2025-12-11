<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated, currentUser } from '$lib/stores/auth.js';
	import KarateGi from '$lib/components/icons/KarateGi.svelte';
	import Calendar from '$lib/components/icons/Calendar.svelte';
	import CheckCircle from '$lib/components/icons/CheckCircle.svelte';
	import Lightbulb from '$lib/components/icons/Lightbulb.svelte';

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/login');
		}
	});

	let eventRSVPs = {}; // {eventId: 'going' | 'interested' | null}

	function handleRSVP(eventId, status) {
		if (eventRSVPs[eventId] === status) {
			eventRSVPs[eventId] = null; // Toggle off
		} else {
			eventRSVPs[eventId] = status;
		}
		eventRSVPs = eventRSVPs; // Trigger reactivity
	}

	// Mock buddy data for each event
	const eventBuddies = {
		1: {
			going: ['Emma Thompson', 'Mike Chen', 'Sarah Kim'],
			interested: ['Alex Rivera', 'Jordan Lee']
		},
		2: {
			going: ['Mike Chen', 'Jordan Lee'],
			interested: ['Emma Thompson']
		},
		3: {
			going: ['Sarah Kim', 'Alex Rivera'],
			interested: ['Mike Chen', 'Emma Thompson', 'Jordan Lee']
		},
		4: {
			going: ['Emma Thompson', 'Alex Rivera', 'Jordan Lee', 'Mike Chen'],
			interested: ['Sarah Kim']
		}
	};

	const upcomingEvents = [
		{
			id: 1,
			title: 'Belt Testing Day!',
			date: '2025-01-13',
			time: '2:00 PM - 4:00 PM',
			description: 'Time to show off what you\'ve learned! HI-YAH!'
		},
		{
			id: 2,
			title: 'Family Training Day',
			date: '2025-01-18',
			time: '10:00 AM - 12:00 PM',
			description: 'Bring your family for a fun training session!'
		},
		{
			id: 3,
			title: 'Tournament Prep',
			date: '2025-01-25',
			time: '3:00 PM - 5:00 PM',
			description: 'Get ready for the big tournament!'
		},
		{
			id: 4,
			title: 'Pizza Party & Movie Night',
			date: '2025-02-01',
			time: '6:00 PM - 8:00 PM',
			description: 'Watch martial arts movies and eat pizza!'
		}
	];
</script>

<div class="container">
	<div class="events-page">
		<div class="page-header">
			<h1><KarateGi size={32} /> Awesome Events!</h1>
			<p class="subtitle">Check out all the cool things happening at the dojo! HI-YAH!</p>
		</div>

		<div class="events-grid">
			{#each upcomingEvents as event (event.id)}
				<div class="event-card card">
					<h3>{event.title}</h3>
					<div class="event-details">
						<div class="event-detail">
							<span class="detail-icon"><Calendar size={18} /></span>
							<span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
						</div>
						<div class="event-detail">
							<span class="detail-icon">⏰</span>
							<span>{event.time}</span>
						</div>
					</div>
					<p class="event-description">{event.description}</p>
					
					<!-- RSVP Buttons -->
					<div class="rsvp-buttons">
						<button 
							class="btn {eventRSVPs[event.id] === 'going' ? 'btn-primary active' : 'btn-secondary'}"
							on:click={() => handleRSVP(event.id, 'going')}
						>
							<CheckCircle size={18} /> Going
						</button>
						<button 
							class="btn {eventRSVPs[event.id] === 'interested' ? 'btn-warning active' : 'btn-secondary'}"
							on:click={() => handleRSVP(event.id, 'interested')}
						>
							<Lightbulb size={18} /> Interested
						</button>
					</div>

					<!-- Buddy Lists -->
					{#if eventBuddies[event.id]}
						<div class="event-buddies">
							{#if eventBuddies[event.id].going.length > 0}
								<div class="buddy-list">
									<strong>Going ({eventBuddies[event.id].going.length}):</strong>
									<span class="buddy-names">{eventBuddies[event.id].going.join(', ')}</span>
								</div>
							{/if}
							{#if eventBuddies[event.id].interested.length > 0}
								<div class="buddy-list interested">
									<strong>Interested ({eventBuddies[event.id].interested.length}):</strong>
									<span class="buddy-names">{eventBuddies[event.id].interested.join(', ')}</span>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.events-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.page-header {
		margin-bottom: 2rem;
		text-align: center;
	}

	.page-header h1 {
		margin: 0 0 0.5rem 0;
		color: var(--tk-primary);
		font-size: 2rem;
	}

	.subtitle {
		color: var(--text-secondary);
		margin: 0;
	}

	.events-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.event-card {
		text-align: center;
		padding: 2rem 1.5rem;
		transition: transform 0.3s ease;
		position: relative;
		overflow: visible;
	}

	/* Paper-Fu effect */
	.event-card::before,
	.event-card::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 100%;
		border-radius: 12px;
		background: var(--card-bg);
		z-index: -1;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.event-card::before {
		top: 6px;
		left: 6px;
		right: -6px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		opacity: 0.85;
		transform: rotate(0.5deg);
	}

	.event-card::after {
		top: 12px;
		left: 12px;
		right: -12px;
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
		transform: rotate(1deg);
	}

	.event-card:hover::before {
		top: 8px;
		left: 8px;
		right: -8px;
		transform: rotate(0.8deg);
	}

	.event-card:hover::after {
		top: 16px;
		left: 16px;
		right: -16px;
		transform: rotate(1.5deg);
	}

	.event-card:hover {
		transform: translateY(-4px) scale(1.02);
	}

	.event-card h3 {
		margin: 0 0 1rem 0;
		font-size: 1.3rem;
		color: var(--tk-primary);
	}

	.event-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
		padding: 1rem;
		background: var(--bg-secondary);
		border-radius: 8px;
	}

	.event-detail {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.9rem;
	}

	.detail-icon {
		font-size: 1.1rem;
	}

	.event-description {
		color: var(--text-secondary);
		margin: 0 0 1.5rem 0;
		line-height: 1.5;
		font-size: 0.95rem;
	}

	.rsvp-buttons {
		display: flex;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.rsvp-buttons .btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: all 0.2s;
	}

	.rsvp-buttons .btn.active {
		transform: scale(1.05);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.btn-warning {
		background: var(--tk-warning);
		color: white;
	}

	.btn-warning:hover {
		background: #f59e0b;
	}

	.btn-warning.active {
		box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
	}

	.event-buddies {
		text-align: left;
		padding: 1rem;
		background: var(--bg-secondary);
		border-radius: 8px;
		font-size: 0.85rem;
		margin-top: 1rem;
	}

	.buddy-list {
		margin-bottom: 0.75rem;
	}

	.buddy-list:last-child {
		margin-bottom: 0;
	}

	.buddy-list strong {
		color: var(--tk-primary);
		display: block;
		margin-bottom: 0.25rem;
	}

	.buddy-list.interested strong {
		color: var(--tk-warning);
	}

	.buddy-names {
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.event-card .btn {
		width: 100%;
		justify-content: center;
		font-weight: 700;
		font-size: 1rem;
	}

	.event-card .btn:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
	}

	@media (max-width: 768px) {
		.events-page {
			padding: 1rem 0.75rem;
		}

		.page-header h1 {
			font-size: 1.5rem;
		}

		.events-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
