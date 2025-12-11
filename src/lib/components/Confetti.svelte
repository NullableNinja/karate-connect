<script>
	import { onMount } from 'svelte';
	
	export let duration = 3000;
	export let count = 100;
	
	let confetti = [];
	let container;
	
	onMount(() => {
		// Create confetti particles
		for (let i = 0; i < count; i++) {
			confetti.push({
				id: i,
				x: Math.random() * 100,
				delay: Math.random() * 500,
				duration: 2000 + Math.random() * 2000,
				rotation: Math.random() * 360,
				color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#F7B731', '#5F27CD'][Math.floor(Math.random() * 6)]
			});
		}
		
		confetti = confetti;
		
		// Clean up after animation
		setTimeout(() => {
			if (container) {
				container.remove();
			}
		}, duration + 4000);
	});
</script>

<div class="confetti-container" bind:this={container}>
	{#each confetti as particle (particle.id)}
		<div 
			class="confetti-particle"
			style="
				left: {particle.x}%;
				animation-delay: {particle.delay}ms;
				animation-duration: {particle.duration}ms;
				background-color: {particle.color};
				transform: rotate({particle.rotation}deg);
			"
		></div>
	{/each}
</div>

<style>
	.confetti-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
		overflow: hidden;
	}
	
	.confetti-particle {
		position: absolute;
		width: 10px;
		height: 10px;
		top: -10px;
		opacity: 1;
		animation: confetti-fall linear forwards;
	}
	
	@keyframes confetti-fall {
		0% {
			transform: translateY(0) rotateZ(0deg);
			opacity: 1;
		}
		100% {
			transform: translateY(100vh) rotateZ(720deg);
			opacity: 0;
		}
	}
</style>
