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
	<!-- Bulb -->
	<path d="M12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2Z" fill="currentColor" opacity="0.9"/>
	<!-- Base -->
	<rect x="9" y="18" width="6" height="2" rx="1" fill="currentColor" opacity="0.8"/>
	<rect x="10" y="20" width="4" height="1.5" rx="0.75" fill="currentColor" opacity="0.7"/>
	<!-- Light rays -->
	<line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
	<line x1="4" y1="9" x2="6" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
	<line x1="18" y1="9" x2="20" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
	<line x1="6.34" y1="4.34" x2="7.76" y2="5.76" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
	<line x1="17.66" y1="4.34" x2="16.24" y2="5.76" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
		color: #F59E0B;
	}
</style>