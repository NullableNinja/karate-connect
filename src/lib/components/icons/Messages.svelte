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
	<!-- Message bubbles -->
	<path 
		d="M7 8C5.3 8 4 9.3 4 11V16C4 17.7 5.3 19 7 19H8L8 22L12 19H15C16.7 19 18 17.7 18 16V15" 
		fill="currentColor"
		opacity="0.6"
	/>
	<path 
		d="M10 3H18C19.7 3 21 4.3 21 6V11C21 12.7 19.7 14 18 14H16L13 17V14H10C8.3 14 7 12.7 7 11V6C7 4.3 8.3 3 10 3Z" 
		fill="currentColor"
		opacity="0.9"
	/>
	<!-- Message lines -->
	<line x1="10" y1="7" x2="18" y2="7" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
	<line x1="10" y1="10" x2="16" y2="10" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
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
