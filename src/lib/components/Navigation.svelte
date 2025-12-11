<script>
	import { page } from '$app/stores';
	import { currentUser, isAuthenticated, logout } from '$lib/stores/auth.js';
	import { unreadMessages, unreadNotifications } from '$lib/stores/social.js';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Home from '$lib/components/icons/Home.svelte';
	import Messages from '$lib/components/icons/Messages.svelte';
	import Buddies from '$lib/components/icons/Buddies.svelte';
	import Events from '$lib/components/icons/Events.svelte';
	import Bell from '$lib/components/icons/Bell.svelte';
	import Logout from '$lib/components/icons/Logout.svelte';
	import Logo from '$lib/components/icons/Logo.svelte';
	import Journal from '$lib/components/icons/Journal.svelte';
	import NotificationsDropdown from './NotificationsDropdown.svelte';
	
	let showNotifications = false;
	
	function toggleNotifications() {
		showNotifications = !showNotifications;
	}
	
	function closeNotifications() {
		showNotifications = false;
	}
</script>

<nav class="navbar">
	<div class="nav-container">
		<div class="nav-brand">
			<a href="{`${base}/`}" class="brand-link">
				<img src="{`${base}/images/logo/TASK_Logo.png`}" alt="TASK Logo" class="brand-logo" />
				<div class="brand-divider"></div>
				<span class="brand-text">Task Karate Connect</span>
			</a>
		</div>

		{#if $isAuthenticated}
			<div class="nav-menu">
				<a href="{`${base}/`}" class="nav-link {$page.url.pathname === '/' ? 'active' : ''}" data-color="blue">
					<Home size={18} />
					<span class="link-text">Dojo Wall</span>
				</a>
				<a href="{`${base}/messages`}" class="nav-link {$page.url.pathname === '/messages' ? 'active' : ''}" data-color="green">
					<Messages size={18} />
					<span class="link-text">Messages</span>
					{#if $unreadMessages > 0}
						<span class="badge">{$unreadMessages}</span>
					{/if}
				</a>
			<a href="{`${base}/buddies`}" class="nav-link {$page.url.pathname === '/buddies' ? 'active' : ''}" data-color="purple">
				<Buddies size={18} />
				<span class="link-text">Buddies</span>
			</a>
			<a href="{`${base}/journey`}" class="nav-link {$page.url.pathname === '/journey' ? 'active' : ''}" data-color="gold">
				<Journal size={18} />
				<span class="link-text">My Journey</span>
			</a>
			<a href="{`${base}/events`}" class="nav-link {$page.url.pathname === '/events' ? 'active' : ''}" data-color="red">
				<Events size={18} />
				<span class="link-text">Events</span>
			</a>
				<div class="nav-divider"></div>
				<div class="nav-user">
					<button 
						class="user-info" 
						on:click={() => goto(`${base}/profile`)}
						aria-label="Go to profile"
					>
						<img src={$currentUser.avatar} alt={$currentUser.name} class="user-avatar" />
						<div class="user-details">
							<div class="user-name">{$currentUser.name}</div>
							<div class="user-rank">{$currentUser.rank}</div>
						</div>
					</button>
				<div class="nav-actions">
					<div class="notification-wrapper">
						<button 
							class="notification-btn" 
							on:click={toggleNotifications}
							class:active={showNotifications}
						>
							<Bell size={20} count={$unreadNotifications} />
						</button>
						{#if showNotifications}
							<NotificationsDropdown on:close={closeNotifications} />
						{/if}
					</div>
					<button class="logout-btn" on:click={logout} title="Logout">
						<Logout size={20} />
						<span class="logout-text">Logout</span>
					</button>
				</div>
				</div>
			</div>
		{:else}
			<div class="nav-menu">
				<a href="{`${base}/login`}" class="nav-link btn btn-primary">Login</a>
			</div>
		{/if}
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: rgba(15, 23, 42, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border-color);
		z-index: 1000;
	}

	.nav-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px;
		gap: 2rem;
	}

	.nav-brand {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.brand-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: var(--text-primary);
		transition: color 0.2s ease;
		gap: 0.75rem;
	}

	.brand-link:hover {
		color: var(--tk-primary);
	}

	.brand-logo {
		height: 40px;
		width: auto;
	}

	.brand-divider {
		width: 2px;
		height: 32px;
		background: linear-gradient(180deg, transparent, var(--tk-primary), transparent);
		opacity: 0.5;
	}

	.brand-text {
		font-family: var(--font-display);
		font-weight: 900;
		font-size: 1.35rem;
		letter-spacing: -0.02em;
		white-space: nowrap;
	}

	.nav-menu {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
		justify-content: flex-end;
	}

	.nav-link {
		color: white;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.85rem;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		transition: all 0.2s ease;
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		white-space: nowrap;
		opacity: 0.7;
	}

	/* Always colored backgrounds based on data-color */
	.nav-link[data-color="blue"] {
		background: rgba(59, 130, 246, 0.3);
	}

	.nav-link[data-color="green"] {
		background: rgba(16, 185, 129, 0.3);
	}

	.nav-link[data-color="purple"] {
		background: rgba(139, 92, 246, 0.3);
	}

	.nav-link[data-color="gold"] {
		background: rgba(245, 158, 11, 0.3);
	}

	.nav-link[data-color="red"] {
		background: rgba(220, 38, 38, 0.3);
	}

	.nav-link:hover {
		opacity: 1;
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	/* Active states - full color */
	.nav-link[data-color="blue"].active {
		background: #3B82F6;
		opacity: 1;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
	}

	.nav-link[data-color="green"].active {
		background: #10B981;
		opacity: 1;
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
	}

	.nav-link[data-color="purple"].active {
		background: #8B5CF6;
		opacity: 1;
		box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
	}

	.nav-link[data-color="gold"].active {
		background: #F59E0B;
		opacity: 1;
		box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
	}

	.nav-link[data-color="red"].active {
		background: #DC2626;
		opacity: 1;
		box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
	}

	.nav-link.btn {
		background: var(--tk-primary);
		color: white;
	}

	.nav-link.btn:hover {
		background: var(--tk-primary-dark);
	}

	.badge {
		background: var(--tk-danger);
		color: white;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		font-weight: 600;
	}

	.nav-divider {
		width: 1px;
		height: 30px;
		background: var(--border-color);
		margin: 0 1rem;
	}

	.nav-user {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 8px;
		transition: background 0.2s ease;
		background: none;
		border: none;
		color: var(--text-primary);
	}

	.user-info:hover {
		background: var(--hover-bg);
	}

	.user-avatar {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		object-fit: cover;
		border: 2px solid var(--tk-primary);
	}

	.user-details {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.user-name {
		font-weight: 600;
		font-size: 0.9rem;
		line-height: 1.2;
	}

	.user-rank {
		font-size: 0.8rem;
		color: var(--text-secondary);
		line-height: 1.2;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.notification-wrapper {
		position: relative;
	}

	.notification-btn,
	.logout-btn {
		background: none;
		border: none;
		color: var(--text-secondary);
		font-size: 1.2rem;
		padding: 0.5rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.logout-text {
		font-size: 0.85rem;
		font-weight: 600;
		opacity: 0;
		max-width: 0;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.notification-btn:hover,
	.notification-btn.active,
	.logout-btn:hover {
		color: var(--text-primary);
		background: var(--hover-bg);
	}
	
	.notification-btn.active {
		background: rgba(59, 130, 246, 0.2);
		color: var(--tk-primary);
	}

	.logout-btn:hover .logout-text {
		opacity: 1;
		max-width: 100px;
		margin-left: 0.25rem;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.nav-container {
			padding: 0 0.75rem;
			height: 60px;
		}

		.brand-content {
			display: none;
		}

		.nav-menu {
			gap: 0.5rem;
		}

		.nav-link {
			padding: 0.5rem;
		}

		.link-text {
			display: none;
		}

		.user-details {
			display: none;
		}

		.nav-divider {
			display: none;
		}
	}
</style>