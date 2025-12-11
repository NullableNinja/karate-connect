<script>
	export let size = 32;
</script>

<svg 
	width={size} 
	height={size} 
	viewBox="0 0 32 32" 
	fill="none" 
	xmlns="http://www.w3.org/2000/svg"
	class="icon"
>
	<!-- Karate fighter in action pose -->
	<circle cx="16" cy="6" r="3" fill="currentColor" opacity="0.9"/>
	<path 
		d="M16 10 L12 14 L10 18 L12 22 L14 20 L16 16" 
		stroke="currentColor" 
		stroke-width="2.5" 
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	/>
	<path 
		d="M16 10 L20 14 L24 16 L22 20 L18 18" 
		stroke="currentColor" 
		stroke-width="2.5" 
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	/>
	<path 
		d="M12 22 L10 28" 
		stroke="currentColor" 
		stroke-width="2.5" 
		stroke-linecap="round"
	/>
	<path 
		d="M14 20 L16 27" 
		stroke="currentColor" 
		stroke-width="2.5" 
		stroke-linecap="round"
	/>
	<!-- Action lines -->
	<path 
		d="M24 16 L28 14" 
		stroke="currentColor" 
		stroke-width="2" 
		stroke-linecap="round"
		opacity="0.6"
	/>
	<path 
		d="M25 17 L29 17" 
		stroke="currentColor" 
		stroke-width="2" 
		stroke-linecap="round"
		opacity="0.6"
	/>
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}
</style>
