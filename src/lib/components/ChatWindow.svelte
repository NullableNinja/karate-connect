<script>
	import { onMount } from 'svelte';
	import { currentUser } from '$lib/stores/auth.js';
	
	export let conversation = null;
	export let onClose = () => {};
	export let onSend = (message) => {};
	
	let messageInput = '';
	let messagesContainer;
	
	$: if (messagesContainer && conversation && messagesContainer.scrollHeight) {
		setTimeout(() => {
			if (messagesContainer) {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}
		}, 100);
	}
	
	function handleSend() {
		if (messageInput.trim()) {
			onSend(messageInput.trim());
			messageInput = '';
		}
	}
	
	function handleKeypress(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}
</script>

{#if conversation}
	<div class="chat-window">
		<div class="chat-header">
			<div class="chat-user-info">
				<img src={conversation.avatar} alt={conversation.name} class="chat-avatar" />
				<div class="chat-user-details">
					<span class="chat-user-name">{conversation.name}</span>
					<span class="chat-user-status" class:online={conversation.status === 'online'}>
						{conversation.status === 'online' ? 'Active now' : 'Offline'}
					</span>
				</div>
			</div>
			<button class="close-btn" on:click={onClose} aria-label="Close chat">×</button>
		</div>
		
		<div class="chat-messages" bind:this={messagesContainer}>
			{#each conversation.messages as msg (msg.id)}
				<div class="message-bubble" class:sent={msg.senderId === $currentUser.id} class:received={msg.senderId !== $currentUser.id}>
					<div class="bubble-content">
						{msg.content}
					</div>
					<span class="message-timestamp">
						{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
					</span>
				</div>
			{/each}
		</div>
		
		<div class="chat-input-area">
			<input 
				type="text" 
				bind:value={messageInput}
				on:keypress={handleKeypress}
				placeholder="Type a message..."
				class="chat-input"
			/>
			<button class="send-btn" on:click={handleSend} disabled={!messageInput.trim()}>
				Send
			</button>
		</div>
	</div>
{/if}

<style>
	.chat-window {
		position: fixed;
		bottom: 0;
		right: 2rem;
		width: 350px;
		height: 500px;
		background: var(--card-bg);
		border-radius: 12px 12px 0 0;
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: column;
		z-index: 1000;
		border: 1px solid var(--border-color);
	}
	
	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		background: linear-gradient(135deg, var(--tk-primary), var(--tk-secondary));
		border-radius: 12px 12px 0 0;
		color: white;
	}
	
	.chat-user-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	
	.chat-avatar {
		width: 40px;
		height: 40px;
		border-radius: 12px;
		object-fit: cover;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}
	
	.chat-user-details {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}
	
	.chat-user-name {
		font-weight: 700;
		font-size: 0.95rem;
	}
	
	.chat-user-status {
		font-size: 0.75rem;
		opacity: 0.8;
	}
	
	.chat-user-status.online {
		opacity: 1;
		font-weight: 600;
	}
	
	.close-btn {
		background: rgba(255, 255, 255, 0.2);
		border: none;
		color: white;
		font-size: 1.5rem;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s ease;
		line-height: 1;
		padding: 0;
	}
	
	.close-btn:hover {
		background: rgba(255, 255, 255, 0.3);
	}
	
	.chat-messages {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		background: var(--bg-primary);
	}
	
	.message-bubble {
		display: flex;
		flex-direction: column;
		max-width: 75%;
		animation: slideIn 0.2s ease;
	}
	
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.message-bubble.sent {
		align-self: flex-end;
		align-items: flex-end;
	}
	
	.message-bubble.received {
		align-self: flex-start;
		align-items: flex-start;
	}
	
	.bubble-content {
		padding: 0.75rem 1rem;
		border-radius: 18px;
		word-wrap: break-word;
	}
	
	.sent .bubble-content {
		background: var(--tk-primary);
		color: white;
		border-bottom-right-radius: 4px;
	}
	
	.received .bubble-content {
		background: var(--card-bg);
		color: var(--text-primary);
		border-bottom-left-radius: 4px;
		border: 1px solid var(--border-color);
	}
	
	.message-timestamp {
		font-size: 0.7rem;
		color: var(--text-secondary);
		margin-top: 0.25rem;
		padding: 0 0.5rem;
	}
	
	.chat-input-area {
		display: flex;
		gap: 0.5rem;
		padding: 1rem;
		border-top: 1px solid var(--border-color);
		background: var(--card-bg);
	}
	
	.chat-input {
		flex: 1;
		padding: 0.75rem;
		border-radius: 20px;
		border: 1px solid var(--border-color);
		background: var(--input-bg);
		color: var(--text-primary);
		font-size: 0.9rem;
		outline: none;
	}
	
	.chat-input:focus {
		border-color: var(--tk-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}
	
	.send-btn {
		padding: 0.75rem 1.25rem;
		border-radius: 20px;
		border: none;
		background: var(--tk-primary);
		color: white;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s ease;
	}
	
	.send-btn:hover:not(:disabled) {
		background: var(--tk-primary-dark);
	}
	
	.send-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	@media (max-width: 768px) {
		.chat-window {
			right: 0;
			left: 0;
			width: 100%;
			border-radius: 0;
		}
	}
</style>
