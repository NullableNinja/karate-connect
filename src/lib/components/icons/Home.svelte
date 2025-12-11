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
	<!-- House/Home icon -->
	<path 
		d="M12 3L4 9V21H9V15C9 14.4 9.4 14 10 14H14C14.6 14 15 14.4 15 15V21H20V9L12 3Z" 
		fill="currentColor"
		opacity="0.9"
	/>
	<path 
		d="M12 3L20 9V21" 
		stroke="currentColor" 
		stroke-width="1.5" 
		stroke-linecap="round"
		stroke-linejoin="round"
		opacity="0.3"
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
