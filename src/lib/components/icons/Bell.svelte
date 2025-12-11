<script>
	export let size = 24;
	export let count = 0;
</script>

<svg 
	width={size} 
	height={size} 
	viewBox="0 0 24 24" 
	fill="none" 
	xmlns="http://www.w3.org/2000/svg"
	class="icon"
	class:has-notifications={count > 0}
>
	<!-- Bell shape -->
	<path 
		d="M12 2C11.4 2 11 2.4 11 3V3.3C8.2 4 6 6.6 6 9.7V15L4 17V18H20V17L18 15V9.7C18 6.6 15.8 4 13 3.3V3C13 2.4 12.6 2 12 2Z" 
		fill="currentColor"
		opacity="0.9"
	/>
	<!-- Bell clapper -->
	<circle cx="12" cy="19" r="0.8" fill="currentColor"/>
	<!-- Bottom of bell -->
	<path 
		d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20" 
		stroke="currentColor" 
		stroke-width="2" 
		stroke-linecap="round"
	/>
	
	{#if count > 0}
		<!-- Notification dot -->
		<circle cx="18" cy="6" r="4" fill="#ef4444">
			<animate attributeName="r" values="3.5;4.5;3.5" dur="2s" repeatCount="indefinite" />
		</circle>
		<circle cx="18" cy="6" r="3" fill="#fee2e2"/>
	{/if}
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.icon:hover {
		transform: rotate(15deg) scale(1.1);
		filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.4));
	}

	.icon.has-notifications {
		animation: ring 2s ease-in-out infinite;
	}

	@keyframes ring {
		0%, 100% { transform: rotate(0deg); }
		10%, 30% { transform: rotate(-10deg); }
		20%, 40% { transform: rotate(10deg); }
		50%, 100% { transform: rotate(0deg); }
	}
</style>
