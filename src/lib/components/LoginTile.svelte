<script>
	export let student;
	export let index;
	export let expanded = false;
	
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	
	const tileColors = [
		"#1a2232", "#1c2638", "#1d293d", "#202c42", "#1b2635", "#1e2b44"
	];
	
	const avatarColors = [
		"#93c5fd", "#a5f3fc", "#fda4af", "#fcd34d", "#bbf7d0", "#c7d2fe"
	];
	
	function getTileColor(i) {
		return tileColors[i % tileColors.length];
	}
	
	function getAvatarColor(i) {
		return avatarColors[i % avatarColors.length];
	}
	
	function getBeltColor(rank) {
		const r = rank.toLowerCase();
		if (r.includes("white")) return "#e5e7eb";
		if (r.includes("yellow")) return "#facc15";
		if (r.includes("orange")) return "#fb923c";
		if (r.includes("green")) return "#22c55e";
		if (r.includes("blue")) return "#3b82f6";
		if (r.includes("purple")) return "#a855f7";
		if (r.includes("brown")) return "#92400e";
		if (r.includes("red")) return "#dc2626";
		if (r.includes("black")) return "#111827";
		return "#334155";
	}
	
	function getBeltTextColor(rank) {
		const bg = getBeltColor(rank);
		const darkSet = new Set(["#111827", "#92400e", "#dc2626", "#334155"]);
		return darkSet.has(bg) ? "#f9fafb" : "#111827";
	}
	
	function getInitials(fullname) {
		if (!fullname) return "";
		return fullname
			.replace(/^(Mr\.?|Ms\.?|Mrs\.?|Miss|Dr\.?)\s+/i, "")
			.trim()
			.split(/\s+/)
			.map((n) => n[0])
			.join("")
			.slice(0, 2)
			.toUpperCase();
	}
	
	function getDisplayName(student) {
		return (student?.displayName || student?.name || "Unknown").toString();
	}
</script>

<div class="tile-wrapper">
	<button
		class="login-tile"
		style="background:{getTileColor(index)};border-color:{getTileColor(index)};"
		on:click={() => dispatch('toggle')}
	>
		<div class="login-tile-avatar" style="background:{getAvatarColor(index)};">
			<span class="avatar-initials">{getInitials(getDisplayName(student))}</span>
		</div>
		
		<div class="login-tile-info">
			<div class="login-tile-name">{getDisplayName(student)}</div>
			
			<div class="belt-pill" style="background:{getBeltColor(student.rank)};color:{getBeltTextColor(student.rank)};">
				{student.rank}
			</div>
		</div>
	</button>
	
	{#if expanded}
		<div class="expanded-actions">
			<button class="enter-btn" on:click={() => dispatch('enter')}>
				<span class="enter-text">ENTER DOJO</span>
				<svg class="enter-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="5" y1="12" x2="19" y2="12"></line>
					<polyline points="12 5 19 12 12 19"></polyline>
				</svg>
			</button>
		</div>
	{/if}
</div>

<style>
	.tile-wrapper {
		position: relative;
		width: 100%;
	}
	
	.login-tile {
		width: 100%;
		padding: 1rem;
		background: #1a2232;
		border: 2px solid rgba(148, 163, 184, 0.2);
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}
	
	.login-tile::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
		opacity: 0;
		transition: opacity 0.3s;
	}
	
	.login-tile:hover {
		border-color: rgba(59, 130, 246, 0.5);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}
	
	.login-tile:hover::before {
		opacity: 1;
	}
	
	.login-tile-avatar {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}
	
	.avatar-initials {
		font-size: 1.25rem;
		font-weight: 700;
		color: #1a2232;
		font-family: var(--font-sans);
	}
	
	.login-tile-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: flex-start;
		position: relative;
		z-index: 1;
	}
	
	.login-tile-name {
		font-size: 1.125rem;
		font-weight: 600;
		color: #e5e7eb;
		font-family: var(--font-sans);
	}
	
	.belt-pill {
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
	
	.expanded-actions {
		margin-top: 0.75rem;
		padding: 0 1rem;
		animation: slideDown 0.3s ease-out;
	}
	
	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.enter-btn {
		width: 100%;
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, #3b82f6, #8b5cf6);
		border: none;
		border-radius: 8px;
		color: white;
		font-weight: 700;
		font-size: 0.95rem;
		letter-spacing: 0.05em;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: all 0.2s;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}
	
	.enter-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
	}
	
	.enter-btn:active {
		transform: translateY(0);
	}
	
	.enter-arrow {
		transition: transform 0.2s;
	}
	
	.enter-btn:hover .enter-arrow {
		transform: translateX(4px);
	}
</style>
