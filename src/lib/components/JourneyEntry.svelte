<script>
	import { journeyEntries } from '$lib/stores/journey.js';
	import { formatDistanceToNow } from 'date-fns';
	import Fistbump from './icons/Fistbump.svelte';
	import Comment from './icons/Comment.svelte';

	export let entry;

	function handleFistbump() {
		journeyEntries.toggleFistbump(entry.id);
	}

	function handleComment() {
		const comment = prompt('Leave an encouraging comment:');
		if (comment && comment.trim()) {
			journeyEntries.addComment(entry.id);
		}
	}

	function formatTime(timestamp) {
		try {
			return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
		} catch {
			return 'some time ago';
		}
	}

	function formatDate(timestamp) {
		try {
			return new Date(timestamp).toLocaleDateString('en-US', { 
				month: 'long', 
				day: 'numeric', 
				year: 'numeric' 
			});
		} catch {
			return 'Unknown date';
		}
	}

	// Belt color mapping for visual indicators
	const beltColors = {
		'White Belt': '#FFFFFF',
		'Gold Belt': '#F59E0B',
		'Orange Belt': '#F97316',
		'Purple Belt': '#A855F7',
		'Blue Belt': '#3B82F6',
		'Green Belt': '#22C55E',
		'Red Belt': '#EF4444',
		'Brown Belt': '#92400E',
		'Black Belt': '#000000'
	};
</script>

<div class="card journey-card fade-in">
	<!-- Journey Header with Belt Info -->
	<div class="journey-header">
		<div class="belt-indicator" style="background-color: {beltColors[entry.beltRank] || '#666'}">
			<div class="belt-rank-badge">
				<span class="rank-text">{entry.beltRank}</span>
				{#if entry.stripeCount > 0}
					<div class="stripes">
						{#each Array(entry.stripeCount) as _, i}
							<span class="stripe"></span>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<div class="journey-meta">
			<div class="journey-date">{formatDate(entry.timestamp)}</div>
			<div class="journey-time">{formatTime(entry.timestamp)}</div>
		</div>
	</div>

	<!-- Journey Content -->
	<div class="journey-content">
		<p>{entry.content}</p>
	</div>

	<!-- Journey Actions -->
	<div class="journey-actions">
		<button 
			class="action-btn fistbump-btn {entry.fistbumped ? 'active' : ''}" 
			on:click={handleFistbump}
			aria-label="Give fistbump"
		>
			<Fistbump size={20} active={entry.fistbumped} />
			<span class="action-count">{entry.fistbumps}</span>
		</button>
		<button class="action-btn" on:click={handleComment} aria-label="Comment">
			<Comment size={20} />
			<span class="action-count">{entry.comments}</span>
		</button>
	</div>
</div>

<style>
	.journey-card {
		margin-bottom: 1.5rem;
		border-radius: 8px;
		overflow: visible;
		position: relative;
		box-shadow: 
			0 3px 1px -2px rgba(0, 0, 0, 0.2),
			0 2px 2px 0 rgba(0, 0, 0, 0.14),
			0 1px 5px 0 rgba(0, 0, 0, 0.12);
		transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Stacked paper layers */
	.journey-card::before,
	.journey-card::after {
		content: '';
		position: absolute;
		left: 4px;
		right: 4px;
		height: 100%;
		border-radius: 8px;
		background: var(--card-bg);
		z-index: -1;
	}

	.journey-card::before {
		top: 4px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
	}

	.journey-card::after {
		top: 8px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		opacity: 0.5;
	}

	.journey-card:hover {
		box-shadow: 
			0 5px 5px -3px rgba(0, 0, 0, 0.2),
			0 8px 10px 1px rgba(0, 0, 0, 0.14),
			0 3px 14px 2px rgba(0, 0, 0, 0.12);
		transform: translateY(-2px);
	}

	.journey-card:hover::before {
		top: 6px;
	}

	.journey-card:hover::after {
		top: 10px;
	}

	.journey-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-bottom: 2px solid var(--border-color);
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%);
	}

	.belt-indicator {
		min-width: 120px;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		box-shadow: 
			inset 0 1px 3px rgba(0, 0, 0, 0.3),
			0 2px 4px rgba(0, 0, 0, 0.2);
		border: 2px solid rgba(0, 0, 0, 0.2);
	}

	.belt-rank-badge {
		text-align: center;
	}

	.rank-text {
		display: block;
		font-weight: 700;
		font-size: 0.85rem;
		color: #1a1a1a;
		text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
		margin-bottom: 0.25rem;
	}

	.stripes {
		display: flex;
		justify-content: center;
		gap: 3px;
		margin-top: 0.25rem;
	}

	.stripe {
		display: block;
		width: 20px;
		height: 3px;
		background: #1a1a1a;
		border-radius: 2px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.journey-meta {
		flex: 1;
	}

	.journey-date {
		font-weight: 600;
		font-size: 1rem;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.journey-time {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.journey-content {
		padding: 1.5rem;
	}

	.journey-content p {
		margin: 0;
		line-height: 1.6;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.journey-actions {
		display: flex;
		gap: 1rem;
		padding: 0.75rem 1.5rem;
		border-top: 1px solid var(--border-color);
	}

	.action-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: 0.5rem 0.75rem;
		border-radius: 8px;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		font-size: 0.9rem;
		font-weight: 500;
		min-width: 44px;
		min-height: 44px;
	}

	.action-btn:hover {
		background: var(--hover-bg);
		color: var(--text-primary);
		transform: scale(1.05);
	}

	.action-btn.active {
		color: var(--tk-warning);
	}

	.action-count {
		font-weight: 600;
	}

	/* Mobile responsive */
	@media (max-width: 599px) {
		.belt-indicator {
			min-width: 100px;
			padding: 0.5rem 0.75rem;
		}

		.rank-text {
			font-size: 0.75rem;
		}

		.stripe {
			width: 15px;
		}

		.journey-content {
			padding: 1rem;
		}

		.journey-actions {
			padding: 0.5rem 1rem;
		}
	}

	/* Animation */
	.fade-in {
		animation: fadeIn 0.3s ease-in;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
