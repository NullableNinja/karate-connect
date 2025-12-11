<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/stores/auth.js';
	import Message from '$lib/components/icons/Message.svelte';
	import Fist from '$lib/components/icons/Fist.svelte';
	import EmptyState from '$lib/components/icons/EmptyState.svelte';
	import BeltTag from '$lib/components/BeltTag.svelte';
	import { buddies } from '$lib/stores/social.js';

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/login');
		}
	});
</script>

<div class="container">
	<div class="buddies-page">
		<div class="page-header">
			<h1>🤝 Training Buddies</h1>
			<p class="subtitle">Connect with your martial arts buddies! HI-YAH!</p>
		</div>

		<div class="buddies-grid">
			{#each $buddies as buddy (buddy.id)}
				<div class="buddy-card card">
					<div class="buddy-status {buddy.status}"></div>
					<img src={buddy.avatar} alt={buddy.name} class="buddy-avatar" />
					<h3>{buddy.name}</h3>
					<BeltTag rank={buddy.rank} role={buddy.role} size="small" />
					<p class="buddy-username">@{buddy.username}</p>
					<div class="buddy-actions">
						<button class="btn btn-primary"><Message size={18} /> Message</button>
						<button class="btn btn-secondary"><Fist size={18} /> Fistbump</button>
					</div>
				</div>
			{/each}
		</div>

		{#if $buddies.length === 0}
			<div class="empty-state card">
				<EmptyState size={64} />
				<p>No training buddies yet! Start connecting with other students!</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.buddies-page {
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

	.buddies-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.buddy-card {
		text-align: center;
		position: relative;
		padding: 2rem 1.5rem;
		overflow: visible;
	}

	/* Paper-Fu stacked effect */
	.buddy-card::before,
	.buddy-card::after {
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

	.buddy-card::before {
		top: 6px;
		left: 6px;
		right: -6px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		opacity: 0.85;
		transform: rotate(0.5deg);
	}

	.buddy-card::after {
		top: 12px;
		left: 12px;
		right: -12px;
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
		transform: rotate(1deg);
	}

	.buddy-card:hover::before {
		top: 8px;
		left: 8px;
		right: -8px;
		transform: rotate(0.8deg);
	}

	.buddy-card:hover::after {
		top: 16px;
		left: 16px;
		right: -16px;
		transform: rotate(1.5deg);
	}

	.buddy-status {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid var(--card-bg);
	}

	.buddy-status.online {
		background: var(--tk-success);
		box-shadow: 0 0 8px var(--tk-success);
	}

	.buddy-status.offline {
		background: var(--text-muted);
	}

	.buddy-avatar {
		width: 80px;
		height: 80px;
		border-radius: 16px;
		margin: 0 auto 1rem;
		object-fit: cover;
		border: 3px solid var(--tk-primary);
	}

	.buddy-card h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1.1rem;
	}

	.buddy-rank {
		color: var(--tk-warning);
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.buddy-username {
		color: var(--text-secondary);
		margin: 0 0 1rem 0;
		font-size: 0.9rem;
	}

	.buddy-actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.buddy-actions .btn {
		width: 100%;
		justify-content: center;
		font-size: 0.9rem;
	}

	.empty-state {
		text-align: center;
		padding: 3rem 2rem;
		font-size: 1.1rem;
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		color: var(--tk-primary);
		opacity: 0.6;
	}

	.empty-state p {
		margin: 0;
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		.buddies-page {
			padding: 1rem 0.75rem;
		}

		.page-header h1 {
			font-size: 1.5rem;
		}

		.buddies-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
