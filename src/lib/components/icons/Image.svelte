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
	<rect
		x="3"
		y="3"
		width="18"
		height="18"
		rx="2"
		fill={color}
		opacity="0.2"
	/>
	<rect
		x="3"
		y="3"
		width="18"
		height="18"
		rx="2"
		stroke={color}
		stroke-width="2"
	/>
	<circle
		cx="8.5"
		cy="8.5"
		r="2"
		fill={color}
		opacity="0.6"
	/>
	<path
		d="M3 17.5L7 13.5L10 16.5L14 12.5L21 19.5V19C21 17.8954 20.1046 17 19 17H5C3.89543 17 3 17.8954 3 19V19.5V17.5Z"
		fill={color}
		opacity="0.4"
	/>
</svg>
