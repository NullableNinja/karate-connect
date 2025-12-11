<script>
	import { goldStarEvents } from '$lib/data/badges.js';
	
	export let goldStars = [];
	
	let selectedStar = null;
	
	function getEventDetails(starName) {
		// Try to match event by name
		const event = goldStarEvents.find(e => 
			starName.toLowerCase().includes(e.name.toLowerCase()) ||
			e.name.toLowerCase().includes(starName.toLowerCase())
		);
		return event || { icon: '⭐', description: 'Special studio event' };
	}
	
	function formatDate(dateStr) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
	}
	
	function openStarDetails(star) {
		selectedStar = star;
	}
	
	function closeModal() {
		selectedStar = null;
	}
</script>

<div class="gold-star-wall">
	<div class="wall-header">
		<h2>⭐ Gold Star Wall</h2>
		<p class="wall-subtitle">Events, Activities & Special Achievements</p>
	</div>
	
	{#if goldStars && goldStars.length > 0}
		<div class="stars-grid">
			{#each goldStars as star}
				{@const eventDetails = getEventDetails(star.name)}
				<button class="star-item" on:click={() => openStarDetails(star)}>
					<div class="star-icon">{eventDetails.icon}</div>
					<div class="star-plaque">
						<div class="star-name">{star.name}</div>
						<div class="star-date">{formatDate(star.date)}</div>
					</div>
					<div class="star-shine"></div>
				</button>
			{/each}
		</div>
	{:else}
		<div class="empty-wall">
			<div class="empty-icon">⭐</div>
			<p>Gold stars are awarded for participating in studio events!</p>
			<p class="empty-hint">Join the next event to earn your first gold star.</p>
		</div>
	{/if}
</div>

{#if selectedStar}
	{@const eventDetails = getEventDetails(selectedStar.name)}
	<div class="modal-backdrop" on:click={closeModal} on:keydown={(e) => e.key === 'Escape' && closeModal()} role="button" tabindex="0">
		<div class="modal-card" on:click|stopPropagation on:keydown|stopPropagation role="dialog">
			<button class="modal-close" on:click={closeModal} aria-label="Close">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
			
			<div class="modal-icon">{eventDetails.icon}</div>
			<h3>{selectedStar.name}</h3>
			<p class="modal-date">{formatDate(selectedStar.date)}</p>
			<p class="modal-description">{eventDetails.description}</p>
			
			<div class="modal-star-display">⭐</div>
		</div>
	</div>
{/if}

<style>
	.gold-star-wall {
		width: 100%;
	}
	
	.wall-header {
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.wall-header h2 {
		font-family: var(--font-display);
		font-size: 2rem;
		margin: 0 0 0.5rem 0;
		color: var(--tk-primary);
	}
	
	.wall-subtitle {
		font-size: 1rem;
		color: var(--text-secondary);
		margin: 0;
	}
	
	.stars-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.5rem;
	}
	
	.star-item {
		position: relative;
		background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.05));
		border: 2px solid rgba(255, 215, 0, 0.3);
		border-radius: 12px;
		padding: 1.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		overflow: hidden;
		text-align: center;
	}
	
	.star-item:hover {
		transform: translateY(-4px) scale(1.02);
		border-color: rgba(255, 215, 0, 0.6);
		box-shadow: 0 8px 24px rgba(255, 215, 0, 0.2);
	}
	
	.star-item:hover .star-shine {
		opacity: 1;
	}
	
	.star-shine {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}
	
	.star-icon {
		font-size: 3rem;
		margin-bottom: 0.75rem;
		filter: drop-shadow(0 2px 8px rgba(255, 215, 0, 0.3));
	}
	
	.star-plaque {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		padding: 0.75rem;
		border: 1px solid rgba(255, 215, 0, 0.2);
	}
	
	.star-name {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
		line-height: 1.3;
	}
	
	.star-date {
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	
	.empty-wall {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-secondary);
	}
	
	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}
	
	.empty-wall p {
		margin: 0.5rem 0;
	}
	
	.empty-hint {
		font-size: 0.875rem;
		font-style: italic;
	}
	
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}
	
	.modal-card {
		position: relative;
		background: var(--card-bg);
		border: 2px solid rgba(255, 215, 0, 0.4);
		border-radius: 16px;
		padding: 2.5rem;
		max-width: 500px;
		width: 100%;
		text-align: center;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
		animation: modalSlideUp 0.3s ease;
	}
	
	@keyframes modalSlideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.modal-close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--text-primary);
	}
	
	.modal-close:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}
	
	.modal-icon {
		font-size: 5rem;
		margin-bottom: 1rem;
		filter: drop-shadow(0 4px 12px rgba(255, 215, 0, 0.4));
	}
	
	.modal-card h3 {
		font-family: var(--font-display);
		font-size: 1.75rem;
		margin: 0 0 0.5rem 0;
		color: var(--tk-primary);
	}
	
	.modal-date {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0 0 1.5rem 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	
	.modal-description {
		font-size: 1rem;
		color: var(--text-primary);
		line-height: 1.6;
		margin: 0 0 2rem 0;
	}
	
	.modal-star-display {
		font-size: 3rem;
		animation: starPulse 2s ease-in-out infinite;
	}
	
	@keyframes starPulse {
		0%, 100% {
			transform: scale(1);
			filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
		}
		50% {
			transform: scale(1.1);
			filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
		}
	}
</style>
