<script>
	import { onMount } from 'svelte';
	
	let ripples = [];
	let nextId = 0;
	
	// Set to false by default - user can enable if they like it
	export let enabled = false;
	
	function createRipple(x, y) {
		if (!enabled) return;
		
		const id = nextId++;
		ripples = [...ripples, { id, x, y }];
		
		// Remove ripple after animation completes
		setTimeout(() => {
			ripples = ripples.filter(r => r.id !== id);
		}, 600);
	}
	
	function handleClick(event) {
		// Only create ripple for direct clicks on the body or main containers
		const target = event.target;
		const isInteractive = target.closest('button, a, input, textarea, select');
		
		// Skip ripple for interactive elements (they have their own feedback)
		if (!isInteractive) {
			createRipple(event.clientX, event.clientY);
		}
	}
	
	onMount(() => {
		if (enabled) {
			document.addEventListener('click', handleClick);
			return () => {
				document.removeEventListener('click', handleClick);
			};
		}
	});
</script>

{#if enabled}
	{#each ripples as ripple (ripple.id)}
		<div 
			class="tap-ripple" 
			style="left: {ripple.x}px; top: {ripple.y}px;"
		/>
	{/each}
{/if}

<style>
	.tap-ripple {
		position: fixed;
		pointer-events: none;
		width: 20px;
		height: 20px;
		margin-left: -10px;
		margin-top: -10px;
		border-radius: 50%;
		background: radial-gradient(
			circle, 
			rgba(59, 130, 246, 0.25) 0%, 
			rgba(139, 92, 246, 0.15) 40%, 
			transparent 70%
		);
		animation: ripple 0.6s ease-out;
		z-index: 9999;
	}
	
	@keyframes ripple {
		0% {
			transform: scale(0);
			opacity: 0.5;
		}
		100% {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>
