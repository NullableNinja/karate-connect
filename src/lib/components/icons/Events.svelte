<script>
	export let size = 24;
</script>

<svg 
	width={size} 
	height={size} 
	viewBox="0 0 24 24" 
	fill="none" 
	xmlns="http://www.w3.org/2000/svg"
	class="icon"
>
	<!-- Calendar with star -->
	<rect x="4" y="5" width="16" height="16" rx="2" fill="currentColor" opacity="0.8"/>
	<path d="M4 9H20" stroke="currentColor" stroke-width="2" opacity="0.3"/>
	<!-- Calendar binding -->
	<line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
	<line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
	<!-- Star for special event -->
	<path 
		d="M12 11L13 14H16L13.5 16L14.5 19L12 17L9.5 19L10.5 16L8 14H11L12 11Z" 
		fill="#fbbf24"
	/>
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.icon:hover {
		transform: scale(1.1);
		filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.4));
	}
</style>
