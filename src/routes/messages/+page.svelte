<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { currentUser, isAuthenticated } from '$lib/stores/auth.js';
	import { messages, markMessageAsRead } from '$lib/stores/social.js';
	import Message from '$lib/components/icons/Message.svelte';
	import EmptyState from '$lib/components/icons/EmptyState.svelte';
	import ChatWindow from '$lib/components/ChatWindow.svelte';

	let activeConversation = null;
	
	// Mock conversation data structure
	const conversations = [
		{
			id: 'mike-chen',
			name: 'Mike Chen',
			avatar: 'https://picsum.photos/seed/mike/200/200.jpg',
			status: 'online',
			lastMessage: 'See you at training tomorrow!',
			timestamp: '2025-01-07T15:30:00Z',
			unread: 2,
			messages: [
				{ id: 1, senderId: 'mike-chen', content: 'Hey! Great class today!', timestamp: '2025-01-07T14:00:00Z' },
				{ id: 2, senderId: 'emma-thompson', content: 'Thanks! You too! That new kata is tricky.', timestamp: '2025-01-07T14:05:00Z' },
				{ id: 3, senderId: 'mike-chen', content: 'Yeah, but we\'ll get it with practice!', timestamp: '2025-01-07T14:10:00Z' },
				{ id: 4, senderId: 'mike-chen', content: 'See you at training tomorrow!', timestamp: '2025-01-07T15:30:00Z' }
			]
		},
		{
			id: 'sarah-jones',
			name: 'Sarah Jones',
			avatar: 'https://picsum.photos/seed/sarah/200/200.jpg',
			status: 'offline',
			lastMessage: 'Want to practice sparring?',
			timestamp: '2025-01-06T18:20:00Z',
			unread: 0,
			messages: [
				{ id: 1, senderId: 'sarah-jones', content: 'Want to practice sparring?', timestamp: '2025-01-06T18:20:00Z' },
				{ id: 2, senderId: 'emma-thompson', content: 'Sure! When works for you?', timestamp: '2025-01-06T18:25:00Z' }
			]
		}
	];

	onMount(() => {
		if (!$isAuthenticated) {
			goto(`${base}/login`);
		}
	});

	function openChat(conversation) {
		activeConversation = conversation;
		// Mark conversation as read
		if (conversation.unread > 0) {
			conversation.unread = 0;
			// Also mark messages as read in the store
			conversation.messages.forEach(msg => {
				if (msg.senderId !== $currentUser.id) {
					markMessageAsRead(msg.id);
				}
			});
		}
	}
	
	function closeChat() {
		activeConversation = null;
	}
	
	function handleSendMessage(content) {
		if (activeConversation) {
			const newMessage = {
				id: Date.now(),
				senderId: $currentUser.id,
				content: content,
				timestamp: new Date().toISOString()
			};
			activeConversation.messages = [...activeConversation.messages, newMessage];
			activeConversation.lastMessage = content;
			activeConversation.timestamp = newMessage.timestamp;
		}
	}
</script>

<div class="container">
	<div class="messages-page">
		<div class="page-header">
			<h1><Message size={32} /> Messages</h1>
			<p class="subtitle">Chat with your training buddies! HI-YAH!</p>
		</div>

		<div class="conversations-list">
			{#each conversations as conversation (conversation.id)}
				<button class="conversation-item card" on:click={() => openChat(conversation)}>
					<img src={conversation.avatar} alt={conversation.name} class="conversation-avatar" />
					<div class="conversation-info">
						<div class="conversation-header">
							<span class="conversation-name">{conversation.name}</span>
							<span class="conversation-time">{new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
						</div>
						<div class="conversation-preview">
							<p class="last-message">{conversation.lastMessage}</p>
							{#if conversation.unread > 0}
								<span class="unread-badge">{conversation.unread}</span>
							{/if}
						</div>
					</div>
					<div class="status-indicator" class:online={conversation.status === 'online'}></div>
				</button>
			{/each}

			{#if conversations.length === 0}
				<div class="empty-state card">
					<EmptyState size={64} />
					<p>No conversations yet! Start chatting with your buddies!</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<ChatWindow 
	conversation={activeConversation}
	onClose={closeChat}
	onSend={handleSendMessage}
/>

<style>
	.messages-page {
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

	.conversations-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.conversation-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-radius: 12px;
		background: var(--card-bg);
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
		border: 1px solid transparent;
		text-align: left;
		width: 100%;
	}

	/* Paper-fu layering effect */
	.conversation-item::before,
	.conversation-item::after {
		content: '';
		position: absolute;
		pointer-events: none;
		background: var(--card-bg);
		border-radius: 12px;
		z-index: -1;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.conversation-item::before {
		top: 6px;
		left: 6px;
		right: -6px;
		bottom: 0;
		transform: rotate(0.5deg);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		opacity: 0.85;
	}

	.conversation-item::after {
		top: 12px;
		left: 12px;
		right: -12px;
		bottom: 0;
		transform: rotate(1deg);
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
	}

	.conversation-item:hover {
		border-color: var(--tk-primary);
		transform: translateY(-2px);
	}

	.conversation-item:hover::before {
		top: 8px;
		left: 8px;
		right: -8px;
	}

	.conversation-item:hover::after {
		top: 16px;
		left: 16px;
		right: -16px;
	}

	.conversation-avatar {
		width: 56px;
		height: 56px;
		border-radius: 12px;
		object-fit: cover;
		border: 2px solid var(--border-color);
		flex-shrink: 0;
	}

	.conversation-info {
		flex: 1;
		min-width: 0;
	}

	.conversation-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.25rem;
	}

	.conversation-name {
		font-weight: 700;
		font-size: 0.95rem;
		color: var(--text-primary);
	}

	.conversation-time {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.conversation-preview {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}

	.last-message {
		flex: 1;
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.85rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.unread-badge {
		background: var(--tk-primary);
		color: white;
		border-radius: 50%;
		width: 22px;
		height: 22px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.status-indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--text-muted);
		border: 2px solid var(--card-bg);
		position: absolute;
		bottom: 1rem;
		left: 3.5rem;
	}

	.status-indicator.online {
		background: var(--tk-success);
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
		.messages-page {
			padding: 1rem 0.75rem;
		}

		.page-header h1 {
			font-size: 1.5rem;
		}

		.conversation-avatar {
			width: 48px;
			height: 48px;
		}

		.status-indicator {
			left: 3rem;
		}
	}
</style>
