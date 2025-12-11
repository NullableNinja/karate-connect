<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { currentUser, isAuthenticated } from '$lib/stores/auth.js';
	import { posts, createPost, toggleFistbump } from '$lib/stores/social.js';
	import PostCard from '$lib/components/PostCard.svelte';
	import CreatePost from '$lib/components/CreatePost.svelte';
	import BeltTag from '$lib/components/BeltTag.svelte';
	import Home from '$lib/components/icons/Home.svelte';
	import Teacher from '$lib/components/icons/Teacher.svelte';
	import Announcement from '$lib/components/icons/Announcement.svelte';
	import Trophy from '$lib/components/icons/Trophy.svelte';
	import Pencil from '$lib/components/icons/Pencil.svelte';

	let activeFilter = 'all';
	let isScrolled = false;
	let showCreatePost = false;
	
	// Drag-to-scroll state
	let isDragging = false;
	let startY = 0;
	let startScrollY = 0;
	let feedMainElement;
	
	const filters = [
		{ id: 'all', label: 'All Posts', icon: Home },
		{ id: 'instructor', label: 'Instructor', icon: Teacher },
		{ id: 'news', label: 'Announcements', icon: Announcement },
		{ id: 'achievements', label: 'Achievements', icon: Trophy }
	];

	$: filteredPosts = $posts.filter(post => {
		if (activeFilter === 'all') return true;
		if (activeFilter === 'instructor') return post.authorRole?.includes('Instructor');
		if (activeFilter === 'news') return post.type === 'news' || post.type === 'announcement';
		if (activeFilter === 'achievements') return post.type === 'achievement';
		return true;
	});

	onMount(() => {
		if (!$isAuthenticated) {
			goto(`${base}/login`);
		}
		
		// Scroll detection with hysteresis to prevent jitter
		let scrollTimeout;
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			isScrolled = scrollTop > 20;
			
			// Auto-hide create post when scrolling down
			if (scrollTop > 150 && showCreatePost) {
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(() => {
					showCreatePost = false;
				}, 100);
			}
		};
		
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		// Drag-to-scroll handlers
		const handleMouseDown = (e) => {
			// Only start drag if clicking on the feed area, not on interactive elements
			const target = e.target;
			if (target.closest('button, a, input, textarea, .card')) {
				return;
			}
			
			isDragging = true;
			startY = e.pageY;
			startScrollY = window.scrollY;
			document.body.style.cursor = 'grabbing';
			document.body.style.userSelect = 'none';
		};
		
		const handleMouseMove = (e) => {
			if (!isDragging) return;
			
			e.preventDefault();
			const deltaY = startY - e.pageY;
			window.scrollTo(0, startScrollY + deltaY);
		};
		
		const handleMouseUp = () => {
			if (isDragging) {
				isDragging = false;
				document.body.style.cursor = '';
				document.body.style.userSelect = '';
			}
		};
		
		// Add event listeners
		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mouseleave', handleMouseUp);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(scrollTimeout);
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('mouseleave', handleMouseUp);
		};
	});

	function handleCreatePost(event) {
		const { content, location } = event.detail;
		createPost(content, location);
	}
	
	function setFilter(filterId) {
		activeFilter = filterId;
	}
	
	function toggleCreatePost() {
		showCreatePost = !showCreatePost;
		if (showCreatePost) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
	
	function handleCloseCreatePost() {
		showCreatePost = false;
	}
</script>

<div class="container">
	<div class="feed-layout">
		<!-- Main Feed -->
		<div class="feed-main">
			<!-- Sticky Container for Filter + New Post Button -->
			<div class="sticky-header" class:scrolled={isScrolled}>
				<div class="filter-bar-container">
					<!-- Filter Tabs -->
					<div class="filter-tabs">
						{#each filters as filter}
							<button 
								class="filter-btn {activeFilter === filter.id ? 'active' : ''}"
								on:click={() => setFilter(filter.id)}
							>
								<span class="filter-icon">
									<svelte:component this={filter.icon} size={18} />
								</span>
								<span class="filter-label">{filter.label}</span>
							</button>
						{/each}
					</div>
					
					<!-- New Post Button -->
					<button 
						class="new-post-btn {showCreatePost ? 'active' : ''}" 
						on:click={toggleCreatePost}
						title="Create new post"
					>
						<span class="new-post-icon">
							<Pencil size={18} />
						</span>
						<span class="new-post-text">New Post</span>
					</button>
				</div>
			</div>
			
			<!-- Create Post Panel -->
			{#if $currentUser}
				<CreatePost 
					visible={showCreatePost}
					on:create={handleCreatePost}
					on:close={handleCloseCreatePost}
				/>
			{/if}

			<!-- Posts Feed -->
			<div class="posts-feed">
				{#each filteredPosts as post, index (post.id)}
					<PostCard {post} style="animation-delay: {index * 50}ms" />
				{/each}
			</div>
		</div>

		<!-- Sidebar -->
		<div class="feed-sidebar">
			<!-- User Profile Card -->
			{#if $currentUser}
				<div class="card sidebar-card">
					<div class="profile-card">
						<img src={$currentUser.avatar} alt={$currentUser.name} class="profile-avatar" />
						<h3>{$currentUser.name}</h3>
						<BeltTag rank={$currentUser.rank} role={$currentUser.role} size="medium" />
						<p class="profile-bio">{$currentUser.bio}</p>
						<div class="profile-stats">
							<div class="stat">
								<span class="stat-number">{$currentUser.posts}</span>
								<span class="stat-label">Posts</span>
							</div>
							<div class="stat">
								<span class="stat-number">{$currentUser.followers}</span>
								<span class="stat-label">Training Partners</span>
							</div>
							<div class="stat">
								<span class="stat-number">{$currentUser.following}</span>
								<span class="stat-label">Following Path</span>
							</div>
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Upcoming Events -->
			<div class="card sidebar-card">
				<h3>Upcoming Events</h3>
				<div class="events-list">
					<div class="event-item">
						<div class="event-date">
							<span class="event-day">13</span>
							<span class="event-month">JAN</span>
						</div>
						<div class="event-details">
							<h4>Belt Testing</h4>
							<p class="event-time">2:00 PM - 4:00 PM</p>
						</div>
					</div>
					<div class="event-item">
						<div class="event-date">
							<span class="event-day">18</span>
							<span class="event-month">JAN</span>
						</div>
						<div class="event-details">
							<h4>Family Training Day</h4>
							<p class="event-time">10:00 AM - 12:00 PM</p>
						</div>
					</div>
					<div class="event-item">
						<div class="event-date">
							<span class="event-day">25</span>
							<span class="event-month">JAN</span>
						</div>
						<div class="event-details">
							<h4>Tournament Prep</h4>
							<p class="event-time">3:00 PM - 5:00 PM</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Active Training Partners -->
			<div class="card sidebar-card">
				<h3>Training Partners Online</h3>
				<div class="partners-list">
					<div class="partner-item">
						<div class="partner-avatar online"></div>
						<span>Mike Chen</span>
					</div>
					<div class="partner-item">
						<div class="partner-avatar online"></div>
						<span>Alex Kim</span>
					</div>
					<div class="partner-item">
						<div class="partner-avatar offline"></div>
						<span>Sarah Jones</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.sticky-header {
		position: sticky;
		top: 70px;
		z-index: 100;
		background: transparent;
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.sticky-header::before {
		content: '';
		position: absolute;
		top: 0;
		left: -2rem;
		right: -2rem;
		height: calc(100% + 4rem);
		background: linear-gradient(
			to bottom,
			var(--bg-primary) 0%,
			var(--bg-primary) 40%,
			rgba(15, 23, 42, 0.95) 60%,
			rgba(15, 23, 42, 0.7) 80%,
			transparent 100%
		);
		z-index: -1;
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}
	
	.sticky-header.scrolled::before {
		opacity: 1;
	}
	
	/* Filter Bar Container */
	.filter-bar-container {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.filter-tabs {
		display: flex;
		gap: 0.5rem;
		padding: 0.5rem;
		background: var(--card-bg);
		border-radius: 12px;
		border: 1px solid var(--border-color);
		flex-wrap: nowrap;
		overflow-x: auto;
		flex: 1;
		scrollbar-width: none;
	}
	
	.filter-tabs::-webkit-scrollbar {
		display: none;
	}

	.filter-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		background: none;
		border: none;
		color: var(--text-secondary);
		font-weight: 600;
		font-size: 0.8125rem;
		padding: 0.5rem 0.875rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.filter-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 0;
	}

	.filter-label {
		white-space: nowrap;
	}

	.filter-btn:hover {
		background: var(--hover-bg);
		color: var(--text-primary);
	}

	.filter-btn.active {
		background: linear-gradient(135deg, var(--tk-primary), var(--tk-secondary));
		color: white;
		box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
	}

	/* New Post Button */
	.new-post-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 1rem;
		background: linear-gradient(135deg, var(--tk-primary) 0%, var(--tk-secondary) 100%);
		border: none;
		border-radius: 12px;
		color: white;
		cursor: pointer;
		transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
		font-weight: 600;
		font-size: 0.8125rem;
		white-space: nowrap;
		box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
		flex-shrink: 0;
	}

	.new-post-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 0;
	}

	.new-post-text {
		white-space: nowrap;
	}

	.new-post-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.new-post-btn.active {
		background: linear-gradient(135deg, var(--tk-secondary) 0%, var(--tk-primary) 100%);
		box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
	}

	.feed-layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.feed-main {
		min-height: 100vh;
	}

	.posts-feed {
		margin-top: 2rem;
	}

	.feed-sidebar {
		position: sticky;
		top: 90px;
		max-height: calc(100vh - 110px);
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-right: 4px;
		/* Smooth scroll behavior */
		scroll-behavior: smooth;
	}

	/* Stacked card effect for sidebar cards */
	.sidebar-card {
		position: relative;
		overflow: visible;
	}

	.sidebar-card::before,
	.sidebar-card::after {
		content: '';
		position: absolute;
		left: 4px;
		right: 4px;
		height: 100%;
		border-radius: 8px;
		background: var(--card-bg);
		z-index: -1;
	}

	.sidebar-card::before {
		top: 4px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
	}

	.sidebar-card::after {
		top: 8px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		opacity: 0.5;
	}

	.profile-card {
		text-align: center;
	}

	.profile-avatar {
		width: 96px;
		height: 96px;
		border-radius: 16px;
		margin: 0 auto 1rem;
		object-fit: cover;
		border: 3px solid var(--tk-primary);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.profile-bio {
		color: var(--text-secondary);
		margin: 1rem 0;
		line-height: 1.4;
	}

	.profile-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		padding-top: 1.25rem;
		margin-top: 1.25rem;
		border-top: 2px solid var(--border-color);
	}

	.stat {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stat-number {
		display: block;
		font-weight: 800;
		font-size: 1.5rem;
		color: var(--tk-primary);
		font-family: var(--font-display);
		line-height: 1;
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--text-secondary);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 1.2;
	}

	.events-list {
		margin-top: 1rem;
	}

	.event-item {
		display: flex;
		gap: 1rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border-color);
	}

	.event-item:last-child {
		border-bottom: none;
	}

	.event-date {
		flex-shrink: 0;
		text-align: center;
		background: var(--bg-tertiary);
		border-radius: 8px;
		padding: 0.5rem;
		min-width: 50px;
	}

	.event-day {
		display: block;
		font-weight: 700;
		font-size: 1rem;
	}

	.event-month {
		display: block;
		font-size: 0.7rem;
		color: var(--text-secondary);
	}

	.event-details h4 {
		margin: 0 0 0.25rem 0;
		font-size: 0.9rem;
	}

	.event-time {
		margin: 0;
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.partners-list {
		margin-top: 1rem;
	}

	.partner-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;
	}

	.partner-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--bg-tertiary);
		position: relative;
	}

	.partner-avatar.online::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 10px;
		height: 10px;
		background: var(--tk-success);
		border-radius: 50%;
		border: 2px solid var(--bg-primary);
	}

	.partner-avatar.offline::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 10px;
		height: 10px;
		background: var(--text-muted);
		border-radius: 50%;
		border: 2px solid var(--bg-primary);
	}

	/* Mobile responsive - Material Design breakpoints */
	@media (max-width: 599px) {
		.feed-layout {
			grid-template-columns: 1fr;
			padding: 1rem 0;
			gap: 1rem;
		}

		.feed-sidebar {
			position: static;
		}

		.posts-feed {
			margin-top: 0;
		}
	}

	@media (min-width: 600px) and (max-width: 904px) {
		.feed-layout {
			grid-template-columns: 1fr;
			padding: 1.5rem 1rem;
		}

		.feed-sidebar {
			position: static;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: 1rem;
		}
	}
</style>