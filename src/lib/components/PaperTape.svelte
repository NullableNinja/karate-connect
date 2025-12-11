<script>
	export let position = 'top-left'; // top-left, top-right, bottom-left, bottom-right
	export let size = 'medium'; // small, medium, large
</script>

<div class="tape {position} {size}" aria-hidden="true"></div>

<style>
	.tape {
		position: absolute;
		background: linear-gradient(135deg, 
			#e8dcc4 0%, 
			#f5ebd9 20%, 
			#e8dcc4 40%, 
			#f5ebd9 60%, 
			#e8dcc4 80%, 
			#f5ebd9 100%
		);
		box-shadow: 
			0 1px 3px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.3),
			inset 0 -1px 0 rgba(0, 0, 0, 0.1);
		z-index: 10;
		pointer-events: none;
	}

	/* Size variants */
	.tape.small {
		width: 60px;
		height: 20px;
	}

	.tape.medium {
		width: 80px;
		height: 24px;
	}

	.tape.large {
		width: 100px;
		height: 28px;
	}

	/* Position variants */
	.tape.top-left {
		top: -8px;
		left: 20px;
		transform: rotate(-3deg);
	}

	.tape.top-right {
		top: -8px;
		right: 20px;
		transform: rotate(3deg);
	}

	.tape.bottom-left {
		bottom: -8px;
		left: 20px;
		transform: rotate(2deg);
	}

	.tape.bottom-right {
		bottom: -8px;
		right: 20px;
		transform: rotate(-2deg);
	}

	/* Add texture pattern */
	.tape::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: repeating-linear-gradient(
			90deg,
			transparent,
			transparent 2px,
			rgba(0, 0, 0, 0.02) 2px,
			rgba(0, 0, 0, 0.02) 4px
		);
		border-radius: inherit;
	}

	/* Responsive - smaller tape on mobile */
	@media (max-width: 599px) {
		.tape.large {
			width: 80px;
			height: 24px;
		}
		
		.tape.medium {
			width: 60px;
			height: 20px;
		}
		
		.tape.small {
			width: 50px;
			height: 18px;
		}
	}
</style>
