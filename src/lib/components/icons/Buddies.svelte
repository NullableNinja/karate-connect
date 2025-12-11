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
	<!-- Two people training together -->
	<circle cx="9" cy="6" r="3" fill="currentColor" opacity="0.9"/>
	<circle cx="16" cy="6" r="3" fill="currentColor" opacity="0.9"/>
	<path 
		d="M5 22V18C5 16.3 6.3 15 8 15H10C10.8 15 11.5 15.3 12 15.8C12.5 15.3 13.2 15 14 15H16C17.7 15 19 16.3 19 18V22" 
		fill="currentColor"
		opacity="0.7"
	/>
	<!-- Connecting line showing partnership -->
	<path 
		d="M9 9C9 9 10.5 10 12 10C13.5 10 15 9 15 9" 
		stroke="currentColor" 
		stroke-width="1.5" 
		stroke-linecap="round"
		opacity="0.5"
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
