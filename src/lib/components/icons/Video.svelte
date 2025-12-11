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
	<rect x="2" y="6" width="14" height="12" rx="1.5" fill="currentColor" opacity="0.9"/>
	
	<!-- Lens -->
	<circle cx="9" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
	
	<!-- Recording indicator -->
	<circle cx="5" cy="8" r="1" fill="#EF4444"/>
	
	<!-- Play triangle overlay -->
	<path d="M8 10L8 14L12 12L8 10Z" fill="currentColor" opacity="0.6"/>
	
	<!-- Side grip lines -->
	<line x1="15" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="1" opacity="0.4"/>
	<line x1="17" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
	
	<!-- Viewfinder -->
	<path d="M17 10L20 8V16L17 14" fill="currentColor" opacity="0.7"/>
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
