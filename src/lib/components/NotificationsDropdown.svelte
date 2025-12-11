<script>
	import { notifications, markNotificationAsRead } from '$lib/stores/social.js';
	import Bell from '$lib/components/icons/Bell.svelte';
	import Fistbump from '$lib/components/icons/Fistbump.svelte';
	import Message from '$lib/components/icons/Message.svelte';
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	function handleMarkRead(notificationId) {
		markNotificationAsRead(notificationId);
	}
	
	function getNotificationIcon(type) {
		switch(type) {
			case 'fistbump': return Fistbump;
			case 'comment': return Message;
			case 'achievement': return Bell;
			default: return Bell;
		}
	}
	
	function closeDropdown() {
		dispatch('close');
	}
</script>

<div class="notifications-dropdown paper-fu">
	<div class="dropdown-header">
		<h3>Notifications</h3>
		<button class="close-btn" on:click={closeDropdown}>×</button>
	</div>
	
	<div class="notifications-list">
		{#if $notifications.length === 0}
			<div class="empty-state">
				<Bell size={48} />
				<p>No notifications yet</p>
			</div>
		{:else}
			{#each $notifications as notification (notification.id)}
				<div class="notification-item" class:unread={!notification.read}>
					<div class="notification-icon">
						<svelte:component this={getNotificationIcon(notification.type)} size={20} />
					</div>
					<div class="notification-content">
						<div class="notification-text">
							<strong>{notification.from}</strong> {notification.content}
						</div>
						<div class="notification-time">
							{new Date(notification.timestamp).toLocaleString(undefined, {
								month: 'short',
								day: 'numeric',
								hour: 'numeric',
								minute: '2-digit'
							})}
						</div>
					</div>
					{#if !notification.read}
						<button 
							class="mark-read-btn" 
							on:click={() => handleMarkRead(notification.id)}
							title="Mark as read"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						</button>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
	
	<div class="dropdown-footer">
		<a href="/notifications" on:click={closeDropdown}>View All Notifications</a>
	</div>
</div>

<style>
	.notifications-dropdown {
		position: absolute;
		top: calc(100% + 10px);
		right: 0;
		width: 400px;
		max-height: 520px;
		background: #1e293b;
		backdrop-filter: blur(20px);
		border-radius: 16px;
		border: 1px solid rgba(59, 130, 246, 0.2);
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(59, 130, 246, 0.1);
		overflow: hidden;
		z-index: 1000;
		animation: slideDown 0.3s cubic-bezier(0.0, 0, 0.2, 1);
	}
	
	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	
	.dropdown-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15));
		backdrop-filter: blur(10px);
	}
	
	.dropdown-header h3 {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 700;
		color: #f1f5f9;
		font-family: var(--font-sans);
		letter-spacing: -0.01em;
	}
	
	.close-btn {
		background: rgba(15, 23, 42, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #cbd5e1;
		font-size: 1.5rem;
		cursor: pointer;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		transition: all 0.2s;
		line-height: 1;
	}
	
	.close-btn:hover {
		background: rgba(59, 130, 246, 0.2);
		border-color: rgba(59, 130, 246, 0.4);
		color: #f1f5f9;
		transform: scale(1.05);
	}
	
	.notifications-list {
		max-height: 400px;
		overflow-y: auto;
		background: #0f172a;
	}
	
	.empty-state {
		padding: 4rem 2rem;
		text-align: center;
		color: #64748b;
	}
	
	.empty-state :global(svg) {
		opacity: 0.2;
		margin-bottom: 1rem;
		color: #475569;
	}
	
	.empty-state p {
		font-size: 0.9375rem;
		font-weight: 500;
	}
	
	.notification-item {
		display: flex;
		gap: 1rem;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.2s;
		cursor: pointer;
		position: relative;
	}
	
	.notification-item:hover {
		background: rgba(59, 130, 246, 0.08);
	}
	
	.notification-item.unread {
		background: rgba(59, 130, 246, 0.12);
	}
	
	.notification-item.unread::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: linear-gradient(180deg, var(--tk-primary), var(--tk-secondary));
	}
	
	.notification-item.unread:hover {
		background: rgba(59, 130, 246, 0.15);
	}
	
	.notification-icon {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
		border: 1px solid rgba(59, 130, 246, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #60a5fa;
	}
	
	.notification-content {
		flex: 1;
		min-width: 0;
	}
	
	.notification-text {
		font-size: 0.875rem;
		line-height: 1.5;
		color: #cbd5e1;
		margin-bottom: 0.375rem;
	}
	
	.notification-text strong {
		font-weight: 700;
		color: #f1f5f9;
	}
	
	.notification-time {
		font-size: 0.75rem;
		color: #64748b;
		font-weight: 500;
	}
	
	.mark-read-btn {
		flex-shrink: 0;
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.3);
		color: #60a5fa;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}
	
	.mark-read-btn:hover {
		background: linear-gradient(135deg, var(--tk-primary), var(--tk-secondary));
		color: white;
		border-color: transparent;
		transform: scale(1.1);
	}
	
	.dropdown-footer {
		padding: 1rem 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(15, 23, 42, 0.8);
	}
	
	.dropdown-footer a {
		display: block;
		text-align: center;
		color: #60a5fa;
		font-size: 0.875rem;
		font-weight: 700;
		text-decoration: none;
		transition: all 0.2s;
		padding: 0.5rem;
		border-radius: 8px;
	}
	
	.dropdown-footer a:hover {
		color: #93c5fd;
		background: rgba(59, 130, 246, 0.1);
	}
</style>
