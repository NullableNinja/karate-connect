<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { currentUser, isAuthenticated } from '$lib/stores/auth.js';
	import BeltTag from '$lib/components/BeltTag.svelte';
	import TrainingCalendar from '$lib/components/TrainingCalendar.svelte';
	import GoldStarWall from '$lib/components/GoldStarWall.svelte';
	import BreakBoards from '$lib/components/BreakBoards.svelte';
	import { calculateEarnedBadges } from '$lib/data/badges.js';
	
	// Calculate progress to next rank
	function calculateProgress(user) {
		if (!user) return { percent: 0, text: '', classes: 0, required: 0 };
		
		const isBlackBelt = (user.rank || '').toLowerCase().includes('black') || 
		                    (user.rank || '').toLowerCase().includes('degree');
		
		if (user.rankType === 'degree' || isBlackBelt) {
			// Degrees: time-based
			const yearsAtRank = user.yearsAtRank || 0;
			const yearsRequired = user.yearsRequired || 1;
			const percent = Math.min(100, (yearsAtRank / yearsRequired) * 100);
			const remaining = Math.max(0, yearsRequired - yearsAtRank).toFixed(1);
			
			// Extract current degree number to show next goal
			const rankLower = (user.rank || '').toLowerCase();
			let currentDegree = 1;
			if (rankLower.includes('2nd')) currentDegree = 2;
			else if (rankLower.includes('3rd')) currentDegree = 3;
			else if (rankLower.includes('4th')) currentDegree = 4;
			else if (rankLower.includes('5th')) currentDegree = 5;
			
			const nextDegree = currentDegree + 1;
			const ordinal = nextDegree === 2 ? '2nd' : nextDegree === 3 ? '3rd' : `${nextDegree}th`;
			
			return {
				percent,
				text: remaining > 0 ? `${remaining} years until ${ordinal} degree` : `Eligible for ${ordinal} degree!`,
				classes: 0,
				required: 0,
				isTimeBased: true
			};
		} else {
			// Colored belts: class-based
			const isBrown = (user.rank || '').toLowerCase().includes('brown');
			const classesPerStripe = isBrown ? 12 : 8;
			const classesSinceStripe = user.classesSinceStripe || 0;
			const percent = Math.min(100, (classesSinceStripe / classesPerStripe) * 100);
			const remaining = Math.max(0, classesPerStripe - classesSinceStripe);
			
			return {
				percent,
				text: remaining > 0 ? `${remaining} classes until next stripe` : 'Ready for stripe test!',
				classes: classesSinceStripe,
				required: classesPerStripe,
				isTimeBased: false
			};
		}
	}
	
	$: progress = calculateProgress($currentUser);
	
	// Generate attendance dates for the current user
	function generateAttendanceDates(user) {
		if (!user || !user.totalClasses) return [];
		
		const dates = [];
		const today = new Date();
		const classesPerWeek = user.attendance >= 95 ? 3 : user.attendance >= 88 ? 2 : 1.5;
		
		// Generate dates going back based on total classes
		const weeksBack = Math.ceil(user.totalClasses / classesPerWeek);
		const startDate = new Date(today);
		startDate.setDate(today.getDate() - (weeksBack * 7));
		
		let classCount = 0;
		const targetClasses = user.totalClasses;
		
		// Typical class days: Monday, Wednesday, Friday
		const classDays = [1, 3, 5];
		
		for (let d = new Date(startDate); d <= today && classCount < targetClasses; d.setDate(d.getDate() + 1)) {
			const dayOfWeek = d.getDay();
			
			// Check if it's a typical class day
			if (classDays.includes(dayOfWeek)) {
				// Add some randomness based on attendance rate
				const shouldAttend = Math.random() < (user.attendance / 100);
				
				if (shouldAttend) {
					const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
					dates.push(dateStr);
					classCount++;
				}
			}
		}
		
		return dates;
	}
	
	$: attendanceDates = generateAttendanceDates($currentUser);
	$: earnedBadges = $currentUser ? calculateEarnedBadges($currentUser) : [];

	onMount(() => {
		if (!$isAuthenticated) {
			goto(`${base}/login`);
		}
	});
</script>

<div class="container">
	<div class="profile-page">
		{#if $currentUser}
			<div class="card profile-header">
				<div class="profile-cover"></div>
				<div class="profile-main">
					<img src={$currentUser.avatar} alt={$currentUser.name} class="profile-avatar-large" />
					<div class="profile-info">
						<h1>{$currentUser.name}</h1>
						<div class="tags-row">
							<BeltTag rank={$currentUser.rank} role={$currentUser.role} size="large" is3Level={$currentUser.is3Level} />
						</div>
						<p class="profile-username">@{$currentUser.username}</p>
						<p class="profile-bio">{$currentUser.bio}</p>
					</div>
				</div>
			</div>

			<div class="profile-content">
				<div class="card profile-stats-card">
					<h2>Statistics</h2>
					<div class="stats-grid">
						<div class="stat-item">
							<span class="stat-number">{$currentUser.totalClasses || 0}</span>
							<span class="stat-label">Total Classes</span>
						</div>
						<div class="stat-item">
							<span class="stat-number">{$currentUser.trainingPartners || 0}</span>
							<span class="stat-label">Training Partners</span>
						</div>
						<div class="stat-item">
							<span class="stat-number">{$currentUser.fistbumps || 0}</span>
							<span class="stat-label">Fistbumps</span>
						</div>
						<div class="stat-item">
							<span class="stat-number">{$currentUser.attendance || 0}%</span>
							<span class="stat-label">Attendance</span>
						</div>
					</div>
				</div>
				
				<div class="card profile-progress-card">
					<h2>🎯 Progress to Next Rank</h2>
					<div class="progress-section">
						<div class="progress-header">
							<span class="progress-label">Current: <strong>{$currentUser.rank}</strong></span>
							<span class="progress-value">{progress.percent.toFixed(0)}%</span>
						</div>
						<div class="progress-bar-large">
							<div class="progress-fill-large" style="width: {progress.percent}%"></div>
						</div>
						<div class="progress-info">
							<p class="progress-text">{progress.text}</p>
							{#if !progress.isTimeBased}
								<p class="progress-detail">{progress.classes} / {progress.required} classes completed</p>
							{/if}
						</div>
					</div>
				</div>
				
				<div class="card profile-break-boards-card">
					<BreakBoards highestBoard={$currentUser.highestBoard || 'yellow-coyote'} />
				</div>

				<div class="card profile-achievements-card">
					<h2>🏆 Achievements & Badges</h2>
					
					{#if earnedBadges.length > 0}
						<div class="achievements-section">
							<div class="badges-grid">
								{#each earnedBadges as badge}
									<div class="badge-item {badge.level?.toLowerCase()}">
										<div class="badge-icon">
											{#if badge.level === 'Platinum'}
												💎
											{:else if badge.level === 'Gold'}
												🥇
											{:else if badge.level === 'Silver'}
												🥈
											{:else}
												🥉
											{/if}
										</div>
										<div class="badge-info">
											<div class="badge-name">{badge.name}</div>
											<div class="badge-level">{badge.level}</div>
											{#if badge.description}
												<div class="badge-description">{badge.description}</div>
											{/if}
											<div class="badge-category-tag">{badge.category}</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{:else}
						<p class="empty-state">Start earning badges by training consistently!</p>
					{/if}
				</div>
				
			<div class="card profile-gold-stars-card">
				<GoldStarWall goldStars={$currentUser.goldStars || []} />
			</div>

			<div class="card profile-calendar-card">
				<h2>📅 Training Calendar</h2>
				<TrainingCalendar attendanceDates={attendanceDates} />
			</div>				<div class="card profile-details-card">
					<h2>Details</h2>
					<div class="detail-row">
						<strong>Member Since:</strong>
						<span>{new Date($currentUser.memberSince || Date.now()).toLocaleDateString()}</span>
					</div>
					<div class="detail-row">
						<strong>Current Belt:</strong>
						<div class="belt-tags-display">
							<BeltTag rank={$currentUser.rank} role={$currentUser.role} />
							{#if $currentUser.is3Level}
								<BeltTag rank="is3" is3Level={$currentUser.is3Level} size="medium" />
							{/if}
						</div>
					</div>
					<div class="detail-row">
						<strong>Training Days:</strong>
						<span>{$currentUser.trainingDays || 'Monday, Wednesday, Friday'}</span>
					</div>
					{#if $currentUser.is3Level}
						<div class="detail-row">
							<strong>IS3 Responsibilities:</strong>
							<span>Level {$currentUser.is3Level} Instructor Student</span>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.profile-page {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.profile-header {
		position: relative;
		overflow: visible;
		margin-bottom: 2rem;
		padding: 0;
	}

	.profile-cover {
		height: 200px;
		background: linear-gradient(135deg, var(--tk-primary) 0%, var(--tk-secondary) 100%);
		border-radius: 12px 12px 0 0;
	}

	.profile-main {
		padding: 0 2rem 2rem 2rem;
		text-align: center;
		position: relative;
	}

	.profile-avatar-large {
		width: 150px;
		height: 150px;
		border-radius: 24px;
		border: 5px solid var(--card-bg);
		margin-top: -75px;
		object-fit: cover;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
	}

	.profile-info {
		margin-top: 1rem;
	}

	.profile-info h1 {
		margin: 0 0 0.75rem 0;
		font-family: var(--font-display);
		font-size: 2rem;
		color: var(--text-primary);
	}

	.tags-row {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.profile-username {
		color: var(--tk-primary);
		font-size: 1.1rem;
		margin: 0 0 1rem 0;
	}

	.profile-bio {
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.profile-content {
		display: grid;
		gap: 1.5rem;
	}

	.profile-stats-card,
	.profile-details-card {
		position: relative;
	}

	/* Paper-fu layering effect */
	.profile-stats-card::before,
	.profile-stats-card::after,
	.profile-details-card::before,
	.profile-details-card::after {
		content: '';
		position: absolute;
		pointer-events: none;
		background: var(--card-bg);
		border-radius: 12px;
		z-index: -1;
		opacity: 0.85;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.profile-stats-card::before,
	.profile-details-card::before {
		top: 6px;
		left: 6px;
		right: -6px;
		bottom: 0;
		transform: rotate(0.5deg);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		opacity: 0.85;
	}

	.profile-stats-card::after,
	.profile-details-card::after {
		top: 12px;
		left: 12px;
		right: -12px;
		bottom: 0;
		transform: rotate(1deg);
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
	}

	.profile-stats-card:hover::before,
	.profile-details-card:hover::before {
		top: 8px;
		left: 8px;
		right: -8px;
	}

	.profile-stats-card:hover::after,
	.profile-details-card:hover::after {
		top: 16px;
		left: 16px;
		right: -16px;
	}

	.profile-stats-card h2,
	.profile-details-card h2,
	.profile-progress-card h2 {
		font-family: var(--font-display);
		font-size: 1.5rem;
		margin: 0 0 1.5rem 0;
		color: var(--tk-primary);
	}
	
	.progress-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.progress-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	
	.progress-label {
		font-size: 1rem;
		color: var(--text-secondary);
	}
	
	.progress-label strong {
		color: var(--text-primary);
		font-weight: 600;
	}
	
	.progress-value {
		font-family: var(--font-display);
		font-size: 1.5rem;
		color: var(--tk-primary);
	}
	
	.progress-bar-large {
		height: 24px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		overflow: hidden;
		border: 2px solid rgba(59, 130, 246, 0.2);
	}
	
	.progress-fill-large {
		height: 100%;
		background: linear-gradient(90deg, var(--tk-primary), var(--tk-secondary));
		border-radius: 10px;
		transition: width 0.6s ease;
		box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
	}
	
	.progress-info {
		text-align: center;
		padding-top: 0.5rem;
	}
	
	.progress-text {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 0.25rem 0;
	}
	
	.progress-detail {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1.5rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-number {
		display: block;
		font-family: var(--font-display);
		font-size: 2rem;
		color: var(--tk-primary);
		margin-bottom: 0.25rem;
	}

	.stat-label {
		display: block;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		color: var(--text-secondary);
	}

	.detail-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border-color);
	}

	.detail-row:last-child {
		border-bottom: none;
	}

	.detail-row strong {
		color: var(--text-primary);
	}

	.detail-row span {
		color: var(--text-secondary);
	}

	.belt-tags-display {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	
	.profile-achievements-card {
		position: relative;
		z-index: 1;
	}
	
	.profile-achievements-card::before,
	.profile-achievements-card::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 12px;
		background: var(--card-bg);
		z-index: -1;
	}
	
	.profile-achievements-card::before {
		top: 6px;
		left: 6px;
		right: -6px;
		bottom: 0;
		transform: rotate(0.5deg);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		opacity: 0.85;
	}
	
	.profile-achievements-card::after {
		top: 12px;
		left: 12px;
		right: -12px;
		bottom: 0;
		transform: rotate(1deg);
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
	}
	
	.profile-achievements-card h2 {
		font-family: var(--font-display);
		font-size: 1.5rem;
		margin: 0 0 1.5rem 0;
		color: var(--tk-primary);
	}
	
	.profile-achievements-card,
	.profile-calendar-card,
	.profile-gold-stars-card,
	.profile-break-boards-card {
		position: relative;
		overflow: visible;
	}

	.profile-achievements-card::before,
	.profile-achievements-card::after,
	.profile-calendar-card::before,
	.profile-calendar-card::after,
	.profile-gold-stars-card::before,
	.profile-gold-stars-card::after,
	.profile-break-boards-card::before,
	.profile-break-boards-card::after {
		content: '';
		position: absolute;
		background: var(--card-bg);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		pointer-events: none;
		transition: all 0.3s ease;
	}

	.profile-achievements-card::before,
	.profile-calendar-card::before,
	.profile-gold-stars-card::before,
	.profile-break-boards-card::before {
		top: 4px;
		left: 4px;
		right: -4px;
		bottom: -4px;
		z-index: -1;
		opacity: 0.6;
	}

	.profile-achievements-card::after,
	.profile-calendar-card::after,
	.profile-gold-stars-card::after,
	.profile-break-boards-card::after {
		top: 8px;
		left: 8px;
		right: -8px;
		bottom: -8px;
		z-index: -2;
		opacity: 0.3;
	}

	.profile-achievements-card:hover::before,
	.profile-calendar-card:hover::before,
	.profile-gold-stars-card:hover::before,
	.profile-break-boards-card:hover::before {
		top: 8px;
		left: 8px;
		right: -8px;
	}

	.profile-achievements-card:hover::after,
	.profile-calendar-card:hover::after,
	.profile-gold-stars-card:hover::after,
	.profile-break-boards-card:hover::after {
		top: 12px;
		left: 12px;
		right: -12px;
	}

	.badge-category-tag {
		font-size: 0.75rem;
		color: var(--text-secondary);
		background: rgba(255, 255, 255, 0.05);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		margin-top: 0.5rem;
		display: inline-block;
	}

	.achievements-section {
		margin-bottom: 2rem;
	}
	
	.achievements-section:last-child {
		margin-bottom: 0;
	}
	
	.achievements-section h3 {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 1rem 0;
	}
	
	.badges-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}
	
	.badge-item {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background: rgba(59, 130, 246, 0.05);
		border: 2px solid rgba(59, 130, 246, 0.15);
		border-radius: 12px;
		transition: all 0.2s;
	}
	
	.badge-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
	
	.badge-item.platinum {
		background: rgba(185, 243, 252, 0.1);
		border-color: rgba(185, 243, 252, 0.3);
	}
	
	.badge-item.diamond {
		background: rgba(185, 243, 252, 0.1);
		border-color: rgba(185, 243, 252, 0.3);
	}
	
	.badge-item.gold {
		background: rgba(255, 215, 0, 0.1);
		border-color: rgba(255, 215, 0, 0.3);
	}
	
	.badge-item.silver {
		background: rgba(192, 192, 192, 0.1);
		border-color: rgba(192, 192, 192, 0.3);
	}
	
	.badge-item.bronze {
		background: rgba(184, 125, 59, 0.1);
		border-color: rgba(184, 125, 59, 0.3);
	}
	
	.badge-icon {
		font-size: 2.5rem;
		line-height: 1;
		flex-shrink: 0;
	}
	
	.badge-info {
		flex: 1;
	}
	
	.badge-name {
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}
	
	.badge-level {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--tk-primary);
		margin-bottom: 0.5rem;
	}
	
	.badge-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.4;
	}
	
	.badge-progress {
		margin-top: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.progress-bar {
		flex: 1;
		height: 8px;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		overflow: hidden;
	}
	
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--tk-primary), var(--tk-secondary));
		transition: width 0.3s ease;
	}
	
	.progress-text {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-secondary);
		white-space: nowrap;
	}
	
	.gold-stars-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	
	.gold-star-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.875rem 1rem;
		background: rgba(255, 215, 0, 0.1);
		border: 2px solid rgba(255, 215, 0, 0.2);
		border-radius: 8px;
		transition: all 0.2s;
	}
	
	.gold-star-item:hover {
		transform: translateX(4px);
		border-color: rgba(255, 215, 0, 0.4);
	}
	
	.star-icon {
		font-size: 1.75rem;
		line-height: 1;
	}
	
	.star-info {
		flex: 1;
	}
	
	.star-name {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}
	
	.star-date {
		font-size: 0.8125rem;
		color: var(--text-secondary);
	}
	
	.empty-state {
		text-align: center;
		color: var(--text-secondary);
		padding: 2rem;
		font-style: italic;
	}

	@media (max-width: 768px) {
		.profile-avatar-large {
			width: 120px;
			height: 120px;
			margin-top: -60px;
		}

		.profile-info h1 {
			font-size: 1.5rem;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
