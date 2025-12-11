<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { currentUser, isAuthenticated } from '$lib/stores/auth.js';
	import { journeyEntries, journeyStats } from '$lib/stores/journey.js';
	import JourneyEntry from '$lib/components/JourneyEntry.svelte';
	import Journal from '$lib/components/icons/Journal.svelte';
	import Lightbulb from '$lib/components/icons/Lightbulb.svelte';

	let newEntry = '';
	let isCreating = false;

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/login');
		}
		journeyEntries.init();
	});

	async function handleCreateEntry() {
		if (!newEntry.trim()) return;

		isCreating = true;
		try {
			journeyEntries.createEntry(newEntry.trim());
			newEntry = '';
		} finally {
			isCreating = false;
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' && event.ctrlKey) {
			handleCreateEntry();
		}
	}
</script>

<div class="container">
	<div class="journey-layout">
		<!-- Main Journey Content -->
		<div class="journey-main">
			<!-- Page Header -->
			<div class="page-header">
				<div class="header-icon">
					<Journal size={40} />
				</div>
				<div class="header-content">
					<h1>My Karate Journey</h1>
					<p class="header-subtitle">Track your progress, reflect on your training, and share your martial arts story</p>
				</div>
			</div>

			<!-- Create New Entry -->
			{#if $currentUser}
				<div class="card create-entry">
					<div class="create-entry-header">
						<h3>Add to Your Journey</h3>
						<div class="current-rank">
							<span class="rank-badge">{$currentUser.rank}</span>
							{#if $currentUser.stripeCount}
								<span class="stripe-info">{$currentUser.stripeCount} {$currentUser.stripeCount === 1 ? 'stripe' : 'stripes'}</span>
							{/if}
						</div>
					</div>
					<textarea
						bind:value={newEntry}
						placeholder="What did you learn or achieve today? Share a milestone, challenge, or reflection from your training..."
						class="entry-input"
						rows="4"
						on:keydown={handleKeydown}
						disabled={isCreating}
					></textarea>
				<div class="create-entry-footer">
					<div class="entry-tips">
						<Lightbulb size={18} />
						<span class="tip-text">Your belt rank and stripe count will be recorded automatically</span>
					</div>
						<button 
							class="btn btn-primary" 
							on:click={handleCreateEntry}
							disabled={!newEntry.trim() || isCreating}
						>
							{isCreating ? 'Saving...' : 'Add Entry'}
						</button>
					</div>
				</div>
			{/if}
			
			<!-- Training History Section -->
			<div class="card training-history-card">
				<h2>📋 Training History</h2>
				<p class="section-subtitle">Your recent classes and what you worked on</p>
				
			{#if $currentUser}
				<div class="training-list">
					{#each Array(5) as _, i}
						{@const daysAgo = i * 2}
						{@const date = new Date()}
						{@const updated = date.setDate(date.getDate() - daysAgo)}
						<div class="training-item">
								<div class="training-date">
									<div class="date-day">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
									<div class="date-number">{date.getDate()}</div>
								</div>
								<div class="training-content">
									<div class="training-title">Karate Class</div>
									<div class="training-focus">
										{#if i === 0}
											Worked on forms - White Lamb & Yellow Coyote patterns
										{:else if i === 1}
											Sparring techniques and footwork drills
										{:else if i === 2}
											Self-defense applications and partner work
										{:else if i === 3}
											Breaking techniques and power generation
										{:else}
											Kata practice and board breaking
										{/if}
									</div>
									<div class="training-meta">
										<span class="instructor-name">Instructor: Ann Yehle</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			
			<!-- Assignments Section -->
			<div class="card assignments-card">
				<h2>📝 Assignments & Practice</h2>
				<p class="section-subtitle">What to work on before your next class</p>
				
				<div class="assignments-list">
					<div class="assignment-item">
						<div class="assignment-checkbox">
							<input type="checkbox" id="assign1" />
							<label for="assign1"></label>
						</div>
						<div class="assignment-content">
							<div class="assignment-title">Practice White Lamb form 10 times</div>
							<div class="assignment-notes">Focus on stances and breathing</div>
							<div class="assignment-due">Due: Next class</div>
						</div>
					</div>
					
					<div class="assignment-item">
						<div class="assignment-checkbox">
							<input type="checkbox" id="assign2" />
							<label for="assign2"></label>
						</div>
						<div class="assignment-content">
							<div class="assignment-title">Review self-defense techniques</div>
							<div class="assignment-notes">Watch the technique videos in the member portal</div>
							<div class="assignment-due">Due: Friday</div>
						</div>
					</div>
					
					<div class="assignment-item">
						<div class="assignment-checkbox">
							<input type="checkbox" id="assign3" />
							<label for="assign3"></label>
						</div>
						<div class="assignment-content">
							<div class="assignment-title">Memorize basic terminology</div>
							<div class="assignment-notes">Study Korean counting and basic commands</div>
							<div class="assignment-due">Due: Next week</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Journey Entries Timeline -->
			<div class="journey-timeline">
				<h2>Journey Timeline</h2>
				{#if $journeyEntries.length > 0}
					{#each $journeyEntries as entry (entry.id)}
						<JourneyEntry {entry} />
					{/each}
				{:else}
					<div class="empty-state">
						<Journal size={64} />
						<h3>Start Your Journey</h3>
						<p>Begin documenting your martial arts progress by creating your first journal entry!</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Sidebar Stats -->
		<div class="journey-sidebar">
			<!-- Journey Stats Card -->
			<div class="card sidebar-card">
				<h3>Journey Stats</h3>
				<div class="stats-grid">
					<div class="stat-item">
						<div class="stat-number">{$journeyStats.totalEntries}</div>
						<div class="stat-label">Entries</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">{$journeyStats.totalFistbumps}</div>
						<div class="stat-label">Fistbumps</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">{$journeyStats.totalComments}</div>
						<div class="stat-label">Comments</div>
					</div>
				</div>
			</div>

			<!-- Motivation Card -->
			<div class="card sidebar-card motivation-card">
				<h3>Keep Going!</h3>
				<blockquote>
					"The ultimate aim of karate lies not in victory or defeat, but in the perfection of the character of its participants."
					<cite>— Gichin Funakoshi</cite>
				</blockquote>
			</div>

			<!-- Tips Card -->
			<div class="card sidebar-card tips-card">
				<h3>Journey Tips</h3>
				<ul class="tips-list">
					<li>Write after every class while it's fresh</li>
					<li>Note what you struggled with and improved</li>
					<li>Record your belt promotions and tests</li>
					<li>Share your achievements and challenges</li>
					<li>Look back when you need motivation</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.journey-layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.journey-main {
		min-height: 100vh;
	}

	.page-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
		padding: 2rem;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%);
		border-radius: 12px;
		border: 2px solid var(--border-color);
	}

	.header-icon {
		color: var(--tk-primary);
		filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
	}

	.header-content h1 {
		margin: 0 0 0.5rem 0;
		font-size: 2rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--tk-primary) 0%, var(--tk-secondary) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.header-subtitle {
		margin: 0;
		color: var(--text-secondary);
		font-size: 1rem;
		line-height: 1.5;
	}

	.create-entry {
		margin-bottom: 2rem;
		position: relative;
		overflow: visible;
	}

	/* Stacked effect */
	.create-entry::before,
	.create-entry::after {
		content: '';
		position: absolute;
		left: 4px;
		right: 4px;
		height: 100%;
		border-radius: 8px;
		background: var(--card-bg);
		z-index: -1;
	}

	.create-entry::before {
		top: 4px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
	}

	.create-entry::after {
		top: 8px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		opacity: 0.5;
	}

	.create-entry-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.create-entry-header h3 {
		margin: 0;
		font-size: 1.2rem;
	}

	.current-rank {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.rank-badge {
		background: var(--tk-primary);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 600;
	}

	.stripe-info {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.entry-input {
		width: 100%;
		min-height: 120px;
		padding: 1rem;
		background: var(--input-bg);
		border: 2px solid var(--border-color);
		border-radius: 8px;
		color: var(--text-primary);
		font-family: inherit;
		font-size: 1rem;
		line-height: 1.6;
		resize: vertical;
		transition: border-color 0.2s ease;
	}

	.entry-input:focus {
		outline: none;
		border-color: var(--tk-primary);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.entry-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.create-entry-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
	}

	.entry-tips {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-secondary);
		font-size: 0.85rem;
	}

	.journey-timeline h2 {
		margin: 0 0 1.5rem 0;
		font-size: 1.5rem;
		color: var(--text-primary);
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-secondary);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		opacity: 0.6;
	}

	.empty-state h3 {
		margin: 1rem 0 0.5rem 0;
		color: var(--text-primary);
	}

	.journey-sidebar {
		position: sticky;
		top: 90px;
		height: fit-content;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.sidebar-card {
		position: relative;
		overflow: visible;
	}

	/* Stacked effect for sidebar cards */
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

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-number {
		display: block;
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--tk-primary);
		margin-bottom: 0.25rem;
	}

	.stat-label {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.motivation-card blockquote {
		margin: 1rem 0 0 0;
		padding: 1rem;
		background: rgba(59, 130, 246, 0.05);
		border-left: 4px solid var(--tk-primary);
		border-radius: 4px;
		font-style: italic;
		color: var(--text-secondary);
		line-height: 1.6;
	}
	
	/* Training History Styles */
	.training-history-card,
	.assignments-card {
		margin-bottom: 2rem;
	}
	
	.section-subtitle {
		color: var(--text-secondary);
		margin: -0.5rem 0 1.5rem 0;
		font-size: 0.95rem;
	}
	
	.training-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.training-item {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		transition: all 0.2s ease;
	}
	
	.training-item:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--tk-primary);
		transform: translateX(4px);
	}
	
	.training-date {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 60px;
		padding: 0.5rem;
		background: linear-gradient(135deg, var(--tk-primary), var(--tk-secondary));
		border-radius: 8px;
		color: white;
	}
	
	.date-day {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		opacity: 0.9;
	}
	
	.date-number {
		font-size: 1.5rem;
		font-weight: 700;
		font-family: var(--font-display);
	}
	
	.training-content {
		flex: 1;
	}
	
	.training-title {
		font-weight: 600;
		font-size: 1rem;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}
	
	.training-focus {
		font-size: 0.9rem;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
		line-height: 1.4;
	}
	
	.training-meta {
		display: flex;
		gap: 1rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}
	
	.instructor-name {
		font-weight: 500;
	}
	
	/* Assignments Styles */
	.assignments-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.assignment-item {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		transition: all 0.2s ease;
	}
	
	.assignment-item:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--tk-primary);
	}
	
	.assignment-checkbox {
		display: flex;
		align-items: flex-start;
		padding-top: 0.25rem;
	}
	
	.assignment-checkbox input[type="checkbox"] {
		width: 20px;
		height: 20px;
		cursor: pointer;
		accent-color: var(--tk-primary);
	}
	
	.assignment-content {
		flex: 1;
	}
	
	.assignment-title {
		font-weight: 600;
		font-size: 1rem;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}
	
	.assignment-notes {
		font-size: 0.9rem;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
		line-height: 1.4;
	}
	
	.assignment-due {
		font-size: 0.85rem;
		color: var(--tk-secondary);
		font-weight: 500;
	}

	/* Rest of existing styles */
	.motivation-card cite {
		display: block;
		margin-top: 0.75rem;
		font-style: normal;
		font-size: 0.9rem;
		color: var(--text-secondary);
		opacity: 0.8;
	}

	.tips-list {
		margin: 1rem 0 0 0;
		padding-left: 1.25rem;
		color: var(--text-secondary);
		line-height: 1.8;
	}

	.tips-list li {
		margin-bottom: 0.5rem;
	}

	/* Mobile responsive */
	@media (max-width: 905px) {
		.journey-layout {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.journey-sidebar {
			position: static;
		}

		.page-header {
			padding: 1.5rem;
		}

		.header-content h1 {
			font-size: 1.5rem;
		}

		.create-entry-footer {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}

		.entry-tips {
			justify-content: center;
		}

		.stats-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 599px) {
		.page-header {
			flex-direction: column;
			text-align: center;
		}

		.header-content h1 {
			font-size: 1.25rem;
		}

		.header-subtitle {
			font-size: 0.9rem;
		}

		.create-entry-header {
			flex-direction: column;
			gap: 0.75rem;
			align-items: flex-start;
		}

		.stats-grid {
			gap: 0.5rem;
		}

		.stat-number {
			font-size: 1.5rem;
		}
	}
</style>
