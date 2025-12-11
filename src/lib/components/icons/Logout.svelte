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
	<!-- Door frame -->
	<path 
		d="M6 4C5.4 4 5 4.4 5 5V20H8V5C8 4.4 7.6 4 7 4H6Z" 
		fill="currentColor"
		opacity="0.3"
	/>
	<!-- Door -->
	<rect x="8" y="4" width="10" height="16" rx="1" fill="currentColor" opacity="0.9"/>
	<!-- Door handle -->
	<circle cx="15" cy="12" r="1" fill="currentColor" opacity="0.5"/>
	<!-- Door bottom -->
	<rect x="5" y="20" width="14" height="1" fill="currentColor"/>
	<!-- Exit arrow -->
	<path 
		d="M14 12H19M19 12L17 10M19 12L17 14" 
		stroke="white" 
		stroke-width="1.5" 
		stroke-linecap="round"
		stroke-linejoin="round"
		opacity="0.7"
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
		filter: drop-shadow(0 2px 4px rgba(239, 68, 68, 0.4));
	}
</style>
