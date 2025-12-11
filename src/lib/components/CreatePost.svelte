<script>
	import { currentUser } from '$lib/stores/auth.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Image from './icons/Image.svelte';
	import Video from './icons/Video.svelte';
	import Pin from './icons/Pin.svelte';
	import People from './icons/People.svelte';

	const dispatch = createEventDispatcher();

	export let visible = true;

	let content = '';
	let isCreating = false;
	let showLocationMenu = false;
	let selectedLocation = '';
	let randomQuote = '';

	const karateQuotes = [
		"The ultimate aim of karate lies not in victory or defeat, but in the perfection of the character of its participants.",
		"A black belt is a white belt who never gave up.",
		"The more you sweat in training, the less you bleed in battle.",
		"Fall seven times, stand up eight.",
		"The best fighter is never angry.",
		"In karate, the most important thing is not winning or losing but the character of the participant.",
		"Karate begins and ends with respect.",
		"The spirit of karate is one of humility and perseverance.",
		"Practice does not make perfect. Perfect practice makes perfect.",
		"There is no first strike in karate.",
		"The mind is the limit. Push through fear and doubt.",
		"Kata is the soul of karate.",
		"Train hard, fight easy.",
		"Respect all, fear none.",
		"The dojo is a place where we learn to overcome ourselves.",
		"Balance is not something you find, it's something you create.",
		"Every master was once a beginner.",
		"The journey of a thousand miles begins with a single step.",
		"Your body can stand almost anything. It's your mind you have to convince.",
		"Empty your mind, be formless, shapeless - like water.",
		"The greatest victory is that which requires no battle.",
		"Discipline is choosing between what you want now and what you want most.",
		"Warriors are not born and they are not made. Warriors create themselves.",
		"The way of the empty hand teaches us to face life without weapons.",
		"Strength does not come from physical capacity. It comes from indomitable will.",
		"Success is not final, failure is not fatal: it is the courage to continue that counts.",
		"Focus not on the destination, but the journey itself.",
		"Pain is temporary. Pride is forever.",
		"The harder the training, the sweeter the victory.",
		"In the dojo, we don't practice until we get it right. We practice until we can't get it wrong.",
		"True power comes from within.",
		"Humble in victory, gracious in defeat.",
		"The more you know, the more you realize you don't know.",
		"Mastery is not about perfection, but continuous improvement.",
		"Every punch, every kick is a lesson in persistence.",
		"The dojo is where champions are made when no one is watching.",
		"Sweat more in practice, bleed less in battle.",
		"Karate is not about being better than someone else, it's about being better than you used to be.",
		"The only bad workout is the one that didn't happen.",
		"Champions aren't made in the gyms. Champions are made from something deep inside.",
		"Technique conquers strength. Spirit conquers technique.",
		"You don't have to be great to start, but you have to start to be great.",
		"The belt only covers two inches of your body. The rest is up to you.",
		"Be like water: soft enough to give life, strong enough to shape stone.",
		"Karate is a lifelong journey, not a destination.",
		"The secret to success is consistency of purpose.",
		"Focus your mind, control your body, free your spirit.",
		"Before you can master others, you must master yourself.",
		"In karate, there are no shortcuts to mastery.",
		"Train like a beast, perform like an artist."
	];

	const locations = [
		'-- At Task Karate',
		'Home Training',
		'Tournament',
		'Seminar'
	];

	function selectRandomQuote() {
		randomQuote = karateQuotes[Math.floor(Math.random() * karateQuotes.length)];
	}

	onMount(() => {
		selectRandomQuote();
	});

	async function handleCreate() {
		if (!content.trim()) return;

		isCreating = true;
		try {
			dispatch('create', { content: content.trim(), location: selectedLocation });
			content = '';
			selectedLocation = '';
			selectRandomQuote(); // Get new quote after posting
		} finally {
			isCreating = false;
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' && event.ctrlKey) {
			handleCreate();
		}
	}

	function toggleLocationMenu() {
		showLocationMenu = !showLocationMenu;
	}

	function selectLocation(location) {
		selectedLocation = location;
		showLocationMenu = false;
	}
	
	function handleClose() {
		dispatch('close');
	}
</script>

{#if visible}
	<div class="card create-post" transition:fly="{{ y: -100, duration: 400 }}">
		<div class="create-post-header">
			<img src={$currentUser.avatar} alt={$currentUser.name} class="user-avatar" />
			<div class="post-input-container">
				<!-- Inspirational Quote -->
				<div class="karate-quote">
					<span class="quote-icon">💭</span>
					<span class="quote-text">{randomQuote}</span>
				</div>
				
				<textarea
					bind:value={content}
					placeholder="Share something cool you learned today!"
					class="post-input"
					on:keydown={handleKeydown}
					disabled={isCreating}
				></textarea>
				
				<!-- Icons below textarea -->
				<div class="post-options">
					<button class="option-btn" title="Add photo">
						<Image size={20} />
					</button>
					<button class="option-btn" title="Add video">
						<Video size={20} />
					</button>
					<button class="option-btn" title="Tag buddies">
						<People size={20} />
					</button>
					<div class="location-dropdown">
						<button class="option-btn" title="Add location" on:click={toggleLocationMenu}>
							<Pin size={20} />
						</button>
						{#if showLocationMenu}
							<div class="location-menu">
								{#each locations as location}
									<button class="location-option" on:click={() => selectLocation(location)}>
										{location}
									</button>
								{/each}
							</div>
						{/if}
					</div>
					{#if selectedLocation}
						<span class="selected-location">{selectedLocation}</span>
					{/if}
				</div>
				
				<div class="post-button-wrapper">
					<button 
						class="btn btn-post" 
						on:click={handleCreate}
						disabled={!content.trim() || isCreating}
					>
						<span class="btn-post-icon">🥋</span>
						<span>{isCreating ? 'Posting...' : 'HI-YAH!'}</span>
					</button>
				</div>
			</div>
			<button class="close-panel-btn" on:click={handleClose} title="Close">×</button>
		</div>
	</div>
{/if}<style>
	.create-post {
		margin-bottom: 1.5rem;
		position: relative;
		overflow: visible;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Stacked paper effect */
	.create-post::before,
	.create-post::after {
		content: '';
		position: absolute;
		left: 4px;
		right: 4px;
		height: 100%;
		border-radius: 8px;
		background: var(--card-bg);
		z-index: -1;
	}

	.create-post::before {
		top: 4px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
		opacity: 0.7;
	}

	.create-post::after {
		top: 8px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		opacity: 0.5;
	}

	.create-post-header {
		display: flex;
		gap: 0.75rem;
	}

	.user-avatar {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		object-fit: cover;
		flex-shrink: 0;
		border: 2px solid var(--border-color);
	}

	.post-input-container {
		flex: 1;
		position: relative;
	}
	
	.karate-quote {
		display: flex;
		align-items: flex-start;
		gap: 0.625rem;
		padding: 0.75rem 1rem;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08));
		border-left: 3px solid var(--tk-primary);
		border-radius: 8px;
		margin-bottom: 0.75rem;
	}
	
	.quote-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}
	
	.quote-text {
		font-size: 0.8125rem;
		line-height: 1.5;
		color: #94a3b8;
		font-style: italic;
	}
	
	.close-panel-btn {
		position: absolute;
		top: -0.5rem;
		right: -0.5rem;
		background: rgba(15, 23, 42, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #cbd5e1;
		font-size: 1.5rem;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
		line-height: 1;
		padding: 0;
		z-index: 10;
	}
	
	.close-panel-btn:hover {
		background: rgba(239, 68, 68, 0.2);
		border-color: rgba(239, 68, 68, 0.4);
		color: #fca5a5;
		transform: scale(1.05);
	}

	.post-options {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		margin-top: 0.75rem;
	}

	.post-input {
		width: 100%;
		min-height: 80px;
		background: var(--bg-primary);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 0.75rem;
		color: var(--text-primary);
		font-family: inherit;
		resize: vertical;
		transition: border-color 0.2s ease;
		margin-bottom: 0.75rem;
	}

	.post-input:focus {
		outline: none;
		border-color: var(--tk-primary);
	}

	.post-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.post-button-wrapper {
		display: flex;
		justify-content: flex-end;
	}

	.option-btn {
		background: none;
		border: none;
		font-size: 1.2rem;
		padding: 0.5rem;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.2s ease;
		color: var(--text-secondary);
	}

	.option-btn:hover {
		background: var(--hover-bg);
		color: var(--tk-primary);
	}

	.location-dropdown {
		position: relative;
	}

	.location-menu {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 0.5rem;
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 100;
		min-width: 200px;
		overflow: hidden;
	}

	.location-option {
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

	.location-option:hover {
		background: var(--hover-bg);
	}

	.selected-location {
		color: var(--tk-primary);
		font-size: 0.85rem;
		margin-left: 0.5rem;
		font-weight: 600;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.create-post-header {
			gap: 0.5rem;
		}

		.user-avatar {
			width: 40px;
			height: 40px;
		}

		.post-input {
			min-height: 50px;
			padding: 0.6rem;
		}

		.post-options {
			justify-content: center;
		}

		.btn {
			width: 100%;
		}
	}

	.btn-post {
		background: linear-gradient(135deg, var(--tk-primary), var(--tk-secondary)) !important;
		color: white !important;
		font-weight: 700;
		padding: 0.875rem 2rem;
		border: none;
		box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.btn-post:not(:disabled):hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
	}

	.btn-post:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	.btn-post-icon {
		display: flex;
		align-items: center;
		font-size: 1.25rem;
	}
</style>