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
	<path 
		d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" 
		fill="currentColor"
	/>
	<path 
		d="M7 9H17V11H7V9Z" 
		fill="currentColor"
		fill-opacity="0.3"
	/>
	<path 
		d="M7 13H14V15H7V13Z" 
		fill="currentColor"
		fill-opacity="0.3"
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
	}
</style>
