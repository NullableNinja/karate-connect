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
	<!-- Book/Journal -->
	<rect x="5" y="3" width="14" height="18" rx="1" fill="currentColor" opacity="0.9"/>
	
	<!-- Pages -->
	<line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" stroke-width="1" opacity="0.3"/>
	<line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" stroke-width="1" opacity="0.3"/>
	<line x1="8" y1="13" x2="14" y2="13" stroke="currentColor" stroke-width="1" opacity="0.3"/>
	
	<!-- Belt marker ribbon -->
	<path d="M17 3V10L19 8L21 10V3H17Z" fill="#F59E0B" opacity="0.9"/>
	
	<!-- Spine -->
	<rect x="5" y="3" width="2" height="18" fill="currentColor" opacity="0.6"/>
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
