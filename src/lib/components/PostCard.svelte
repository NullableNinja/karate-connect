<script>
	import { toggleFistbump, addComment } from '$lib/stores/social.js';
	import { formatDistanceToNow } from 'date-fns';
	import { fade, fly } from 'svelte/transition';
	import Fist from './icons/Fist.svelte';
	import Comment from './icons/Comment.svelte';
	import MenuDots from './icons/MenuDots.svelte';
	import BeltTag from './BeltTag.svelte';
	import CommentModal from './CommentModal.svelte';

	export let post;
	export let style = "";

	let showMenu = false;
	let showCommentModal = false;

	function handleFistbump() {
		toggleFistbump(post.id);
	}

	function handleComment() {
		showCommentModal = true;
	}
	
	function handleCommentSubmit(event) {
		const { comment } = event.detail;
		addComment(post.id, comment);
		showCommentModal = false;
	}
	
	function handleCommentCancel() {
		showCommentModal = false;
	}

	function formatTime(timestamp) {
		try {
			return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
		} catch {
			return 'some time ago';
		}
	}

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function handleEdit() {
		showMenu = false;
		alert('Edit functionality coming soon!');
	}

	function handleDelete() {
		showMenu = false;
		if (confirm('Delete this post?')) {
			// Delete logic here
		}
	}

	function handleReport() {
		showMenu = false;
		alert('Report functionality coming soon!');
	}
</script>

<div 
	class="card post-card" 
	in:fly="{{ y: 60, duration: 500, opacity: 0 }}"
	{style}
>
	<!-- Post Header -->
	<div class="post-header">
		<img src={post.authorAvatar} alt={post.authorName} class="author-avatar" />
		<div class="author-info">
			<div class="author-name">{post.authorName}</div>
			<BeltTag rank={post.authorRank} role={post.authorRole} is3Level={post.is3Level} size="small" />
			<div class="post-time">{formatTime(post.timestamp)}</div>
		</div>
		<div class="post-options-wrapper">
			<button class="post-options" on:click={toggleMenu} aria-label="Post options">
				<MenuDots size={20} />
			</button>
			{#if showMenu}
				<div class="options-menu">
					<button class="menu-option" on:click={handleEdit}>Edit</button>
					<button class="menu-option" on:click={handleDelete}>Delete</button>
					<button class="menu-option" on:click={handleReport}>Report</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- Post Content -->
	<div class="post-content">
		{#if post.type === 'achievement' && post.achievement}
			<div class="achievement-banner">
				<div class="achievement-icon">🏆</div>
				<div class="achievement-info">
					<div class="achievement-title">{post.achievement}</div>
					<div class="achievement-level {post.achievementLevel?.toLowerCase()}">{post.achievementLevel} Badge</div>
				</div>
			</div>
		{/if}
		<p>{post.content}</p>
		{#if post.image}
			<img src={post.image} alt={post.content} class="post-image" />
		{/if}
	</div>

	<!-- Post Actions -->
	<div class="post-actions">
		<button 
			class="action-btn fistbump-btn {post.fistbumped ? 'active' : ''}" 
			on:click={handleFistbump}
			aria-label="Give fistbump"
		>
			<Fist size={20} />
			<span class="action-count">{post.fistbumps}</span>
		</button>
		<button class="action-btn" on:click={handleComment} aria-label="Comment">
			<Comment size={20} />
			<span class="action-count">{post.comments}</span>
		</button>
	</div>
</div>

{#if showCommentModal}
	<CommentModal 
		postAuthor={post.authorName}
		on:submit={handleCommentSubmit}
		on:cancel={handleCommentCancel}
	/>
{/if}

<style>
	.post-card {
		margin-bottom: 1.5rem;
		border-radius: 8px;
		overflow: visible;
		position: relative;
		/* Paper-Fu stacked layers effect */
		box-shadow: 
			/* Top card shadow */
			0 3px 1px -2px rgba(0, 0, 0, 0.2),
			0 2px 2px 0 rgba(0, 0, 0, 0.14),
			0 1px 5px 0 rgba(0, 0, 0, 0.12);
		transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Stacked paper layers behind the card */
	.post-card::before,
	.post-card::after {
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

	.post-card::before {
		top: 6px;
		left: 6px;
		right: -6px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		opacity: 0.85;
		transform: rotate(0.5deg);
	}

	.post-card::after {
		top: 12px;
		left: 12px;
		right: -12px;
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
		transform: rotate(1deg);
	}

	.post-card:hover {
		/* Material Design elevation 8 */
		box-shadow: 
			0 5px 5px -3px rgba(0, 0, 0, 0.2),
			0 8px 10px 1px rgba(0, 0, 0, 0.14),
			0 3px 14px 2px rgba(0, 0, 0, 0.12);
		transform: translateY(-2px);
	}

	.post-card:hover::before {
		top: 8px;
		left: 8px;
		right: -8px;
		transform: rotate(0.8deg);
	}

	.post-card:hover::after {
		top: 16px;
		left: 16px;
		right: -16px;
		transform: rotate(1.5deg);
	}

	.post-header {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.author-avatar {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		object-fit: cover;
		/* Subtle elevation for avatar */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		border: 2px solid var(--border-color);
	}

	.author-info {
		flex: 1;
		min-width: 0; /* Prevents flex overflow */
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.author-name {
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.4;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.post-time {
		color: var(--text-secondary);
		font-size: 0.8125rem;
		line-height: 1.4;
	}

	.post-options-wrapper {
		position: relative;
	}

	.post-options {
		background: none;
		border: none;
		color: var(--text-secondary);
		font-size: 1.5rem;
		padding: 0.5rem;
		border-radius: 50%;
		cursor: pointer;
		transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.options-menu {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 100;
		min-width: 150px;
		overflow: hidden;
	}

	.menu-option {
		display: block;
		width: 100%;
		padding: 0.75rem 1rem;
		background: none;
		border: none;
		text-align: left;
		color: var(--text-primary);
		cursor: pointer;
		transition: background 0.2s;
		font-size: 0.9rem;
	}

	.menu-option:hover {
		background: var(--hover-bg);
	}

	.post-options:hover {
		background: var(--hover-bg);
	}

	.post-options:active {
		background: rgba(59, 130, 246, 0.2);
	}

	.post-content {
		margin-bottom: 1rem;
	}
	
	.achievement-banner {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
		border: 2px solid rgba(59, 130, 246, 0.3);
		border-radius: 12px;
		margin-bottom: 1rem;
	}
	
	.achievement-icon {
		font-size: 2.5rem;
		line-height: 1;
	}
	
	.achievement-info {
		flex: 1;
	}
	
	.achievement-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--tk-text);
		margin-bottom: 0.25rem;
	}
	
	.achievement-level {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.25rem 0.625rem;
		border-radius: 4px;
		display: inline-block;
	}
	
	.achievement-level.bronze {
		background: rgba(184, 125, 59, 0.2);
		color: #b87d3b;
	}
	
	.achievement-level.silver {
		background: rgba(192, 192, 192, 0.2);
		color: #c0c0c0;
	}
	
	.achievement-level.gold {
		background: rgba(255, 215, 0, 0.2);
		color: #ffd700;
	}
	
	.achievement-level.diamond {
		background: rgba(185, 243, 252, 0.2);
		color: #b9f3fc;
	}

	.post-content p {
		margin: 0 0 1rem 0;
		line-height: 1.6;
		font-size: 1rem;
		word-wrap: break-word;
	}

	.post-image {
		width: 100%;
		border-radius: 8px;
		margin-top: 0.5rem;
		object-fit: cover;
		max-height: 500px;
		/* Material elevation for images */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
	}

	.post-actions {
		display: flex;
		gap: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
	}

	.action-btn {
		background: none;
		border: none;
		color: #94a3b8;
		font-size: 0.875rem;
		padding: 0.625rem 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 500;
		flex: 1;
		justify-content: center;
		min-height: 44px; /* Touch-friendly size */
	}

	.action-btn:hover {
		background: var(--hover-bg);
		color: #cbd5e1;
	}

	.action-btn:active {
		transform: scale(0.96);
	}

	.action-btn.active {
		color: var(--tk-warning);
		font-weight: 600;
	}
	
	.action-btn :global(svg) {
		color: inherit;
	}

	.action-count, .action-label {
		font-size: 0.9375rem;
		font-weight: 600;
	}

	.share-btn {
		color: var(--tk-success);
	}

	/* Mobile responsive - Material Design breakpoints */
	@media (max-width: 599px) {
		.post-header {
			gap: 0.625rem;
		}

		.author-avatar {
			width: 40px;
			height: 40px;
		}

		.author-name {
			font-size: 0.9375rem;
		}

		.post-options {
			width: 36px;
			height: 36px;
		}

		.post-content p {
			font-size: 0.9375rem;
		}

		.post-actions {
			gap: 0.25rem;
		}

		.action-btn {
			padding: 0.625rem 0.5rem;
			font-size: 0.8125rem;
		}

		.action-count, .action-label {
			font-size: 0.875rem;
		}

		/* Hide labels on small screens, keep icons */
		.action-label {
			display: none;
		}
	}

	@media (min-width: 600px) and (max-width: 904px) {
		.post-card {
			margin-bottom: 1.25rem;
		}
	}
</style>