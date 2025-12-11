<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/stores/auth.js';
	import { notifications, markNotificationAsRead } from '$lib/stores/social.js';
	import Bell from '$lib/components/icons/Bell.svelte';
	import Fistbump from '$lib/components/icons/Fistbump.svelte';
	import Message from '$lib/components/icons/Message.svelte';

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/login');
		}
	});

	function handleMarkRead(notificationId) {
		markNotificationAsRead(notificationId);
	}

	function getNotificationIcon(type) {
		// Returns component for rendering
		switch(type) {
			case 'fistbump': return Fistbump;
			case 'comment': return Message;
			case 'achievement': return Bell;
			default: return Bell;
		}
	}
</script>

<div class="container">
	<div class="notifications-page">
		<div class="page-header">
			<h1><Bell size={32} /> Notifications</h1>
			<p class="subtitle">Stay updated with your training journey!</p>
		</div>

		<div class="notifications-list">
			{#each $notifications as notification (notification.id)}
				<div class="notification-card card" class:unread={!notification.read}>
					<div class="notification-content">
						<span class="notification-icon">
							<svelte:component this={getNotificationIcon(notification.type)} size={20} />
						</span>
						<div class="notification-text">
							<strong>{notification.from}</strong> {notification.content}
							<p class="notification-time">{new Date(notification.timestamp).toLocaleString()}</p>
						</div>
					</div>
					{#if !notification.read}
						<button class="mark-read-btn" on:click={() => handleMarkRead(notification.id)}>
							✓
						</button>
					{/if}
				</div>
			{/each}

			{#if $notifications.length === 0}
				<div class="empty-state card">
					<EmptyState size={64} />
					<p>No notifications yet! Keep training and connecting with buddies!</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.notifications-page {
		max-width: 800px;
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

	.notifications-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.notification-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		transition: transform 0.2s ease;
	}

	.notification-card.unread {
		border-left: 4px solid var(--tk-warning);
		background: rgba(245, 158, 11, 0.05);
	}

	.notification-content {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
	}

	.notification-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.notification-text {
		flex: 1;
	}

	.notification-text strong {
		color: var(--tk-primary);
	}

	.notification-time {
		margin: 0.25rem 0 0 0;
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.mark-read-btn {
		width: 32px;
		height: 32px;
		padding: 0;
		background: var(--tk-success);
		color: white;
		border: none;
		border-radius: 50%;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.mark-read-btn:hover {
		background: #16a34a;
		transform: scale(1.1);
	}

	.empty-state {
		text-align: center;
		padding: 3rem 2rem;
		font-size: 1.1rem;
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
		.notifications-page {
			padding: 1rem 0.75rem;
		}

		.page-header h1 {
			font-size: 1.5rem;
		}

		.notification-card {
			padding: 0.75rem;
		}
	}
</style>
