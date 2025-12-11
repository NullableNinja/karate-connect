<script>
	export let size = 24;
	export let active = false;
</script>

<svg 
	width={size} 
	height={size} 
	viewBox="0 0 24 24" 
	fill="none" 
	xmlns="http://www.w3.org/2000/svg"
	class="icon"
	class:active
>
	<!-- Detailed fist with proper proportions -->
	<!-- Pinky finger -->
	<path d="M7 9C7 8.45 7.45 8 8 8C8.55 8 9 8.45 9 9V13C9 13.55 8.55 14 8 14C7.45 14 7 13.55 7 13V9Z" fill="currentColor" opacity="0.95"/>
	<!-- Ring finger -->
	<path d="M9 7C9 6.45 9.45 6 10 6C10.55 6 11 6.45 11 7V13C11 13.55 10.55 14 10 14C9.45 14 9 13.55 9 13V7Z" fill="currentColor"/>
	<!-- Middle finger -->
	<path d="M11 6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V13C13 13.55 12.55 14 12 14C11.45 14 11 13.55 11 13V6Z" fill="currentColor"/>
	<!-- Index finger -->
	<path d="M13 7C13 6.45 13.45 6 14 6C14.55 6 15 6.45 15 7V13C15 13.55 14.55 14 14 14C13.45 14 13 13.55 13 13V7Z" fill="currentColor" opacity="0.95"/>
	<!-- Palm base -->
	<path d="M7 13H15C15.55 13 16 13.45 16 14V16C16 17.1 15.1 18 14 18H8C6.9 18 6 17.1 6 16V14C6 13.45 6.45 13 7 13Z" fill="currentColor" opacity="0.9"/>
	<!-- Thumb -->
	<path d="M6 14C6 14 5 14.5 5 15.5C5 16.5 5.67 17 6.5 17H7V14H6Z" fill="currentColor" opacity="0.85"/>
	<!-- Wrist -->
	<rect x="7" y="18" width="8" height="2" rx="1" fill="currentColor" opacity="0.8"/>
	
	{#if active}
		<!-- Energy burst when active -->
		<circle cx="12" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3">
			<animate attributeName="r" from="6" to="12" dur="0.4s" repeatCount="1" />
			<animate attributeName="opacity" from="0.5" to="0" dur="0.4s" repeatCount="1" />
		</circle>
	{/if}
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
	
	.icon.active {
		color: var(--tk-warning);
		filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.6));
		animation: punch 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes punch {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.2); }
	}
</style>
