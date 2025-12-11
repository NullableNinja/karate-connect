<script>
	export let size = 24;
	export let color = 'currentColor';
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Belt -->
	<rect
		x="6"
		y="11"
		width="12"
		height="3"
		rx="0.5"
		fill={color}
		opacity="0.3"
	/>
	
	<!-- Gi Top Left -->
	<path
		d="M8 4 L8 11 L12 11 L12 4 L10 6 Z"
		fill={color}
		opacity="0.2"
	/>
	
	<!-- Gi Top Right -->
	<path
		d="M16 4 L16 11 L12 11 L12 4 L14 6 Z"
		fill={color}
		opacity="0.2"
	/>
	
	<!-- Gi Bottom -->
	<path
		d="M8 14 L8 20 L10 20 L10 14 Z"
		fill={color}
		opacity="0.15"
	/>
	<path
		d="M14 14 L14 20 L16 20 L16 14 Z"
		fill={color}
		opacity="0.15"
	/>
	
	<!-- Outline -->
	<path
		d="M8 4 L8 11 M16 4 L16 11 M6 11 H18 M6 14 H18 M8 14 V20 M10 14 V20 M14 14 V20 M16 14 V20"
		stroke={color}
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	
	<!-- Center fold -->
	<path
		d="M12 4 V11"
		stroke={color}
		stroke-width="1.5"
		stroke-linecap="round"
	/>
</svg>
