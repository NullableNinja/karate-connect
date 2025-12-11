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
	<!-- Pin point -->
	<circle cx="12" cy="8" r="3" fill="currentColor" opacity="0.9"/>
	<circle cx="12" cy="8" r="1.5" fill="currentColor"/>
	
	<!-- Pin body -->
	<path 
		d="M12 11C12 11 9 13 9 16C9 16 9 18 12 20C15 18 15 16 15 16C15 13 12 11 12 11Z" 
		fill="currentColor" 
		opacity="0.8"
	/>
	
	<!-- Pin tail -->
	<line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.icon:hover {
		transform: scale(1.1);
		color: #EF4444;
	}
</style>
