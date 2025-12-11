<script>
	import { createEventDispatcher, onMount } from "svelte";
	import BeltTag from './BeltTag.svelte';
	
	export let title = "";
	export let subtitle = "";
	export let value = "";
	export let pinField = null;
	export let pinError = "";
	export let avatarInitials = "";
	export let avatarColor = "";
	export let rank = "";
	export let is3Level = null;
	export let role = null;
	
	const dispatch = createEventDispatcher();
	
	function handleCancel() {
		dispatch("cancel");
	}
	
	function handleSubmit() {
		dispatch("submit");
	}
	
	onMount(() => {
		if (pinField) {
			pinField.focus();
			pinField.select();
		}
	});
	
	function handleKey(e) {
		if (e.key === "Enter") {
			dispatch("submit");
		}
	}
</script>

<div class="pin-backdrop">
	<div class="pin-card paper-fu">
		<!-- Avatar -->
		<div class="avatar" style="background: {avatarColor}">
			{avatarInitials}
		</div>
		
		<!-- Title -->
		<h2 class="pin-title">{title}</h2>
		
		<!-- Belt Tags -->
		<div class="tags-display">
			<BeltTag {rank} {is3Level} {role} size="medium" />
		</div>
		
		<!-- Name in handwritten style -->
		<p class="pin-subtitle handwritten">{subtitle}</p>
		
		<!-- Input -->
		<input
			id="pinInput"
			type="password"
			class="pin-input"
			bind:value={value}
			bind:this={pinField}
			placeholder="Enter PIN…"
			maxlength="8"
			on:keydown={handleKey}
		/>
		
		{#if pinError}
			<p class="pin-error">{pinError}</p>
		{/if}
		
		<!-- Buttons -->
		<div class="actions">
			<button class="btn ghost" on:click={handleCancel}>
				CANCEL
			</button>
			<button class="btn ok" on:click={handleSubmit}>
				OK
			</button>
		</div>
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap");
	
	.pin-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.65);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		animation: fadeIn 0.2s ease-out;
	}
	
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	.pin-card {
		background: #1e293b;
		border-radius: 20px;
		padding: 2rem 2rem 1.75rem;
		width: 90%;
		max-width: 440px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		animation: slideUp 0.3s ease-out;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
		border: 1px solid rgba(255, 255, 255, 0.05);
	}
	
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: 700;
		color: #1a2232;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
		margin-bottom: 0.25rem;
	}
	
	.pin-title {
		font-family: var(--font-sans);
		font-size: 1.5rem;
		font-weight: 700;
		color: #f1f5f9;
		margin: 0;
		letter-spacing: 0.02em;
	}
	
	.pin-subtitle {
		font-size: 1.75rem;
		color: #cbd5e1;
		margin: 0.5rem 0 0 0;
		text-align: center;
		line-height: 1.2;
	}
	
	.handwritten {
		font-family: 'Caveat', cursive;
		font-weight: 600;
	}
	
	.tags-display {
		margin: 0.25rem 0 0 0;
	}
	
	.pin-input {
		width: 100%;
		padding: 0.875rem 1rem;
		font-size: 1rem;
		font-family: var(--font-mono);
		border: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		text-align: center;
		letter-spacing: 0.5em;
		background: rgba(15, 23, 42, 0.6);
		color: #f1f5f9;
		transition: all 0.2s;
		margin-top: 0.5rem;
	}
	
	.pin-input::placeholder {
		color: #64748b;
		letter-spacing: 0.05em;
	}
	
	.pin-input:focus {
		outline: none;
		border-color: rgba(59, 130, 246, 0.6);
		background: rgba(15, 23, 42, 0.8);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}
	
	.pin-error {
		color: #dc2626;
		font-size: 0.875rem;
		font-weight: 600;
		margin: 0;
		animation: shake 0.4s ease-in-out;
	}
	
	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
		20%, 40%, 60%, 80% { transform: translateX(4px); }
	}
	
	.actions {
		display: flex;
		gap: 1rem;
		width: 100%;
		margin-top: 0.75rem;
	}
	
	.btn {
		flex: 1;
		padding: 0.875rem 1.5rem;
		font-weight: 700;
		font-size: 0.95rem;
		letter-spacing: 0.05em;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		border: 2px solid transparent;
		font-family: var(--font-sans);
	}
	
	.btn.ghost {
		background: rgba(15, 23, 42, 0.5);
		color: #cbd5e1;
		border-color: rgba(255, 255, 255, 0.1);
	}
	
	.btn.ghost:hover {
		background: rgba(15, 23, 42, 0.8);
		border-color: rgba(255, 255, 255, 0.2);
		color: #f1f5f9;
	}
	
	.btn.ok {
		background: linear-gradient(135deg, #3b82f6, #6366f1);
		color: white;
		box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
	}
	
	.btn.ok:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
	}
	
	.btn.ok:active {
		transform: translateY(0);
	}
</style>
