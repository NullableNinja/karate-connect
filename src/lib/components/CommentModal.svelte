<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	
	export let postAuthor = '';
	
	const dispatch = createEventDispatcher();
	
	let commentText = '';
	let textareaElement;
	
	function handleSubmit() {
		if (commentText.trim()) {
			dispatch('submit', { comment: commentText.trim() });
		}
	}
	
	function handleCancel() {
		dispatch('cancel');
	}
	
	function handleKeydown(e) {
		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			handleSubmit();
		} else if (e.key === 'Escape') {
			handleCancel();
		}
	}
	
	// Auto-focus textarea
	$: if (textareaElement) {
		textareaElement.focus();
	}
</script>

<div class="modal-backdrop" on:click={handleCancel} transition:fade={{ duration: 200 }}>
	<div class="modal-content" on:click|stopPropagation transition:scale={{ duration: 250, start: 0.9 }}>
		<div class="modal-header">
			<h3>💬 Add a Comment</h3>
			<button class="close-btn" on:click={handleCancel}>×</button>
		</div>
		
		{#if postAuthor}
			<p class="modal-subtitle">Replying to <strong>{postAuthor}</strong></p>
		{/if}
		
		<textarea
			bind:this={textareaElement}
			bind:value={commentText}
			placeholder="Share your thoughts..."
			class="comment-input"
			rows="4"
			on:keydown={handleKeydown}
		></textarea>
		
		<div class="modal-footer">
			<button class="btn btn-cancel" on:click={handleCancel}>
				Cancel
			</button>
			<button 
				class="btn btn-submit" 
				on:click={handleSubmit}
				disabled={!commentText.trim()}
			>
				Post Comment
			</button>
		</div>
		
		<p class="hint">Tip: Press Ctrl+Enter to submit</p>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		padding: 1rem;
	}
	
	.modal-content {
		background: #1e293b;
		border-radius: 16px;
		border: 1px solid rgba(59, 130, 246, 0.2);
		box-shadow: 
			0 20px 60px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(59, 130, 246, 0.1);
		width: 100%;
		max-width: 500px;
		padding: 1.5rem;
	}
	
	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
	
	.modal-header h3 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 700;
		color: #f1f5f9;
		font-family: var(--font-sans);
	}
	
	.close-btn {
		background: rgba(15, 23, 42, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #cbd5e1;
		font-size: 1.75rem;
		width: 36px;
		height: 36px;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
		line-height: 1;
		padding: 0;
	}
	
	.close-btn:hover {
		background: rgba(239, 68, 68, 0.2);
		border-color: rgba(239, 68, 68, 0.4);
		color: #fca5a5;
		transform: scale(1.05);
	}
	
	.modal-subtitle {
		color: #94a3b8;
		font-size: 0.875rem;
		margin: 0 0 1rem 0;
	}
	
	.modal-subtitle strong {
		color: #cbd5e1;
		font-weight: 600;
	}
	
	.comment-input {
		width: 100%;
		background: #0f172a;
		border: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 0.875rem;
		color: #f1f5f9;
		font-family: var(--font-sans);
		font-size: 0.9375rem;
		resize: vertical;
		min-height: 100px;
		transition: all 0.2s;
		line-height: 1.5;
	}
	
	.comment-input:focus {
		outline: none;
		border-color: rgba(59, 130, 246, 0.6);
		background: rgba(15, 23, 42, 0.8);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}
	
	.comment-input::placeholder {
		color: #64748b;
	}
	
	.modal-footer {
		display: flex;
		gap: 0.75rem;
		margin-top: 1rem;
		justify-content: flex-end;
	}
	
	.btn {
		padding: 0.75rem 1.5rem;
		border-radius: 10px;
		font-weight: 700;
		font-size: 0.9375rem;
		cursor: pointer;
		transition: all 0.2s;
		border: none;
		font-family: var(--font-sans);
	}
	
	.btn-cancel {
		background: rgba(15, 23, 42, 0.5);
		color: #cbd5e1;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.btn-cancel:hover {
		background: rgba(15, 23, 42, 0.8);
		border-color: rgba(255, 255, 255, 0.2);
		color: #f1f5f9;
	}
	
	.btn-submit {
		background: linear-gradient(135deg, #3b82f6, #6366f1);
		color: white;
		box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
	}
	
	.btn-submit:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
	}
	
	.btn-submit:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	.hint {
		margin: 0.75rem 0 0 0;
		font-size: 0.75rem;
		color: #64748b;
		text-align: center;
	}
	
	@media (max-width: 599px) {
		.modal-content {
			padding: 1.25rem;
		}
		
		.modal-footer {
			flex-direction: column;
		}
		
		.btn {
			width: 100%;
		}
	}
</style>
