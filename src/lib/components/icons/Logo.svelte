<script>
	export let size = 32;
</script>

<svg 
	width={size} 
	height={size} 
	viewBox="0 0 32 32" 
	fill="none" 
	xmlns="http://www.w3.org/2000/svg"
	class="logo"
>
	<!-- Gi/Uniform shape -->
	<path 
		d="M16 4L12 8V14L10 16V26H14V20H18V26H22V16L20 14V8L16 4Z" 
		fill="currentColor"
		opacity="0.9"
	/>
	
	<!-- Belt -->
	<rect 
		x="10" 
		y="17" 
		width="12" 
		height="2.5" 
		fill="#F59E0B"
		rx="0.5"
	/>
	
	<!-- Collar/Lapel detail -->
	<path 
		d="M16 4L14 8H18L16 4Z" 
		fill="currentColor"
		opacity="0.6"
	/>
</svg>

<style>
	.logo {
		display: inline-block;
		vertical-align: middle;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}
</style>
