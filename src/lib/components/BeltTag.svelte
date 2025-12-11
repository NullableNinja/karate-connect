<script>
	export let rank = 'White Belt';
	export let role = null; // 'instructor', 'assistant', or null for student
	export let size = 'medium'; // 'small', 'medium', 'large'
	export let is3Level = null; // IS3 student level (1, 2, or 3)
	
	// Dark, bold colors like your reference images
	const beltColors = {
		'White Belt': { bg: '#1e293b', text: '#f1f5f9', border: 'rgba(241, 245, 249, 0.2)' },
		'Gold Belt': { bg: '#92400e', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.3)' },
		'Orange Belt': { bg: '#9a3412', text: '#fb923c', border: 'rgba(251, 146, 60, 0.3)' },
		'Purple Belt': { bg: '#581c87', text: '#c084fc', border: 'rgba(192, 132, 252, 0.3)' },
		'Blue Belt': { bg: '#1e3a8a', text: '#60a5fa', border: 'rgba(96, 165, 250, 0.3)' },
		'Green Belt': { bg: '#065f46', text: '#34d399', border: 'rgba(52, 211, 153, 0.3)' },
		'Brown Belt': { bg: '#431407', text: '#fdba74', border: 'rgba(253, 186, 116, 0.3)' },
		'Red Belt': { bg: '#7f1d1d', text: '#f87171', border: 'rgba(248, 113, 113, 0.3)' },
		'Black Belt': { bg: '#0a0a0a', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.3)' }
	};
	
	const roleColors = {
		'instructor': { bg: '#7f1d1d', text: '#fca5a5', border: 'rgba(252, 165, 165, 0.3)' },
		'assistant': { bg: '#581c87', text: '#c084fc', border: 'rgba(192, 132, 252, 0.3)' }
	};

	const is3Colors = {
		bg: '#065f46',
		text: '#6ee7b7',
		border: 'rgba(110, 231, 183, 0.3)'
	};
	
	const sizeClasses = {
		'small': 'tag-small',
		'medium': 'tag-medium',
		'large': 'tag-large'
	};
	
	$: colors = beltColors[rank] || beltColors['White Belt'];
	$: displayText = rank.toUpperCase();
</script>

<div class="tags-wrapper">
	{#if role}
		<span 
			class="belt-tag {sizeClasses[size]}"
			style="
				background: {roleColors[role].bg};
				color: {roleColors[role].text};
				border-color: {roleColors[role].border};
			"
		>
			{role === 'instructor' ? 'INSTRUCTOR' : 'ASST INSTRUCTOR'}
		</span>
	{/if}

	<span 
		class="belt-tag {sizeClasses[size]}"
		style="
			background: {colors.bg};
			color: {colors.text};
			border-color: {colors.border};
		"
	>
		{displayText}
	</span>

	{#if is3Level}
		<span 
			class="belt-tag {sizeClasses[size]}"
			style="
				background: {is3Colors.bg};
				color: {is3Colors.text};
				border-color: {is3Colors.border};
			"
			title="Instructors In Training - Level {is3Level}"
		>
			IS3 L{is3Level}
		</span>
	{/if}
</div>

<style>
	.tags-wrapper {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		flex-wrap: nowrap;
	}

	.belt-tag {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
		font-weight: 600;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		border-radius: 4px;
		white-space: nowrap;
		border: 1px solid;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
		transition: transform 0.15s ease, box-shadow 0.15s ease;
		line-height: 1;
	}
	
	.belt-tag:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
	}
	
	.tag-small {
		padding: 0.15rem 0.4rem;
		font-size: 0.625rem;
	}
	
	.tag-medium {
		padding: 0.25rem 0.5rem;
		font-size: 0.7rem;
	}
	
	.tag-large {
		padding: 0.3rem 0.6rem;
		font-size: 0.75rem;
	}
</style>
