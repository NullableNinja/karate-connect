<script>
	import { breakBoards } from '$lib/data/badges.js';
	
	export let highestBoard = 'yellow-coyote'; // default example
	
	$: currentBoard = breakBoards.find(b => b.id === highestBoard) || breakBoards[0];
	$: boardIndex = breakBoards.findIndex(b => b.id === highestBoard);
</script>

<div class="break-boards-display">
	<div class="display-header">
		<h3>🥋 Highest Break Board</h3>
	</div>
	
	<div class="current-board-showcase">
		<div class="board-card" style="background: {currentBoard.color}; border-color: {currentBoard.borderColor};">
			<div class="board-name">{currentBoard.name}</div>
			{#if currentBoard.stars}
				<div class="board-stars">
					{#each Array(currentBoard.stars) as _, i}
						<span class="star">⭐</span>
					{/each}
				</div>
			{/if}
			{#if currentBoard.special}
				<div class="special-badge">💎 SPECIAL</div>
			{/if}
		</div>
		<div class="board-level">Level {currentBoard.level}</div>
	</div>
	
	<div class="progression-track">
		<div class="track-label">Your Progress</div>
		<div class="boards-row">
			{#each breakBoards as board, index}
				<div 
					class="mini-board" 
					class:achieved={index <= boardIndex}
					class:current={board.id === highestBoard}
					style="background: {board.color}; border-color: {board.borderColor};"
					title={board.name}
				>
					{#if index <= boardIndex}
						<span class="check">✓</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	
	{#if boardIndex < breakBoards.length - 1}
		<div class="next-goal">
			<span class="goal-label">Next Goal:</span>
			<span class="goal-board">{breakBoards[boardIndex + 1].name}</span>
		</div>
	{:else}
		<div class="max-achieved">
			🏆 Maximum Level Achieved! 🏆
		</div>
	{/if}
</div>

<style>
	.break-boards-display {
		width: 100%;
	}
	
	.display-header h3 {
		font-family: var(--font-display);
		font-size: 1.5rem;
		margin: 0 0 1.5rem 0;
		color: var(--tk-primary);
		text-align: center;
	}
	
	.current-board-showcase {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2rem;
	}
	
	.board-card {
		width: 200px;
		height: 120px;
		border-radius: 12px;
		border: 4px solid;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
		position: relative;
		transition: all 0.3s ease;
	}
	
	.board-card:hover {
		transform: translateY(-4px) scale(1.05);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
	}
	
	.board-name {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 700;
		color: #1F2937;
		text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
		text-align: center;
	}
	
	.board-stars {
		display: flex;
		gap: 0.25rem;
		margin-top: 0.5rem;
	}
	
	.star {
		font-size: 1.25rem;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}
	
	.special-badge {
		position: absolute;
		top: -12px;
		right: -12px;
		background: linear-gradient(135deg, #B9F3FC, #67E8F9);
		color: #1F2937;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.25rem 0.5rem;
		border-radius: 8px;
		border: 2px solid #67E8F9;
		box-shadow: 0 4px 12px rgba(103, 232, 249, 0.4);
	}
	
	.board-level {
		margin-top: 0.75rem;
		font-family: var(--font-display);
		font-size: 1.125rem;
		color: var(--text-secondary);
	}
	
	.progression-track {
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}
	
	.track-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
		text-align: center;
	}
	
	.boards-row {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.mini-board {
		width: 40px;
		height: 40px;
		border-radius: 6px;
		border: 2px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.3;
		transition: all 0.2s ease;
		position: relative;
	}
	
	.mini-board.achieved {
		opacity: 1;
	}
	
	.mini-board.current {
		transform: scale(1.2);
		box-shadow: 0 0 16px currentColor;
	}
	
	.check {
		color: #1F2937;
		font-size: 1.25rem;
		font-weight: 700;
		text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
	}
	
	.next-goal {
		text-align: center;
		padding: 1rem;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
		border: 2px solid rgba(59, 130, 246, 0.3);
		border-radius: 12px;
	}
	
	.goal-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-right: 0.5rem;
	}
	
	.goal-board {
		font-family: var(--font-display);
		font-size: 1.125rem;
		color: var(--tk-primary);
		font-weight: 600;
	}
	
	.max-achieved {
		text-align: center;
		font-family: var(--font-display);
		font-size: 1.5rem;
		color: #FFD700;
		padding: 1rem;
		background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.1));
		border: 2px solid rgba(255, 215, 0, 0.4);
		border-radius: 12px;
		animation: glow 2s ease-in-out infinite;
	}
	
	@keyframes glow {
		0%, 100% {
			box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
		}
		50% {
			box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
		}
	}
</style>
