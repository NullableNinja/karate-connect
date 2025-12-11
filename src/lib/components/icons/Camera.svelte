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
	<!-- Camera body -->
	<rect x="3" y="7" width="18" height="13" rx="2" fill="currentColor" opacity="0.9"/>
	
	<!-- Lens -->
	<circle cx="12" cy="13" r="4" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
	<circle cx="12" cy="13" r="2.5" fill="currentColor" opacity="0.7"/>
	
	<!-- Top viewfinder bump -->
	<path d="M8 7L9 4H15L16 7" fill="currentColor" opacity="0.8"/>
	
	<!-- Flash indicator -->
	<circle cx="18" cy="9" r="1" fill="currentColor" opacity="0.6"/>
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.icon:hover {
		transform: scale(1.1);
	}
</style>
