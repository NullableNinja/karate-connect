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
	<circle cx="12" cy="6" r="2" fill="currentColor"/>
	<circle cx="12" cy="12" r="2" fill="currentColor"/>
	<circle cx="12" cy="18" r="2" fill="currentColor"/>
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