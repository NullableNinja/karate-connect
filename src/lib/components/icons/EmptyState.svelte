<script>
	export let size = 20;
</script>

<svg 
	width={size} 
	height={size} 
	viewBox="0 0 24 24" 
	fill="none" 
	xmlns="http://www.w3.org/2000/svg"
	class="icon"
>
	<!-- Empty state icon - martial arts themed -->
	<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
	<path d="M8 8L12 12M12 12L16 16M12 12L8 16M12 12L16 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
	<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
		color: var(--text-muted);
	}
</style>
