<script>
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Confetti from '$lib/components/Confetti.svelte';
	import TapRipple from '$lib/components/TapRipple.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { currentUser } from '$lib/stores/auth.js';

	let showConfetti = false;
	// Set to true to enable tap ripple effect - test it and see if you like it!
	let rippleEnabled = true;

	// Client-side guard for protected routes
	onMount(() => {
		const pathname = $page.url?.pathname || '';
		
		// Check if accessing protected routes without authentication
		const isProtected = !['/login'].includes(pathname);
		const hasUser = !!$currentUser;

		if (isProtected && !hasUser) {
			goto(`${base}/login`);
		}

		// Check for birthday
		if ($currentUser && $currentUser.birthday) {
			const today = new Date();
			const birthday = new Date($currentUser.birthday);
			if (today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate()) {
				const hasShownToday = sessionStorage.getItem('birthdayConfettiShown');
				if (!hasShownToday) {
					showConfetti = true;
					sessionStorage.setItem('birthdayConfettiShown', 'true');
				}
			}
		}
	});
</script>

{#if showConfetti}
	<Confetti />
{/if}

<TapRipple enabled={rippleEnabled} />

<Navigation />

<div class="app-background" aria-hidden="true">
	<!-- Geometric circle pattern like main site -->
	<div class="geometric-layer">
		<!-- Extra large background circles -->
		<div class="geo-circle geo-xlarge geo-xl1"></div>
		<div class="geo-circle geo-xlarge geo-xl2"></div>
		
		<!-- Large structural circles -->
		<div class="geo-circle geo-large geo-1"></div>
		<div class="geo-circle geo-large geo-2"></div>
		<div class="geo-circle geo-large geo-3"></div>
		
		<!-- Medium circles for depth -->
		<div class="geo-circle geo-medium geo-4"></div>
		<div class="geo-circle geo-medium geo-5"></div>
		<div class="geo-circle geo-medium geo-6"></div>
		<div class="geo-circle geo-medium geo-7"></div>
		
		<!-- Small accent circles -->
		<div class="geo-circle geo-small geo-8"></div>
		<div class="geo-circle geo-small geo-9"></div>
		<div class="geo-circle geo-small geo-10"></div>
		<div class="geo-circle geo-small geo-11"></div>
		
		<!-- Tiny floating circles -->
		<div class="geo-circle geo-tiny geo-12"></div>
		<div class="geo-circle geo-tiny geo-13"></div>
		<div class="geo-circle geo-tiny geo-14"></div>
		<div class="geo-circle geo-tiny geo-15"></div>
	</div>
	
	<!-- Subtle overlay pattern -->
	<div class="pattern-overlay"></div>
</div>

<main>
	<slot />
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: var(--font-sans);
		background: #0f172a;
		color: #e5e7eb;
		min-height: 100vh;
	}

	main {
		position: relative;
		z-index: 1;
	}

	.app-background {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(180deg, #0a0f1e 0%, #0f172a 50%, #1a1f35 100%);
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	.geometric-layer {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.geo-circle {
		position: absolute;
		border-radius: 50%;
		border: 2px solid transparent;
	}

	/* Extra large background circles */
	.geo-xlarge {
		width: 800px;
		height: 800px;
		opacity: 0.2;
		border-width: 3px;
	}

	.geo-xl1 {
		top: -300px;
		left: -200px;
		background: radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 65%);
		border-color: rgba(59, 130, 246, 0.2);
		animation: geo-mega-drift-1 35s infinite ease-in-out alternate;
	}

	.geo-xl2 {
		bottom: -250px;
		right: -250px;
		background: radial-gradient(circle at 60% 60%, rgba(168, 85, 247, 0.25) 0%, transparent 65%);
		border-color: rgba(168, 85, 247, 0.15);
		animation: geo-mega-drift-2 40s infinite ease-in-out alternate;
	}

	/* Large structural circles - like main site's geometric shapes */
	.geo-large {
		width: 600px;
		height: 600px;
		opacity: 0.25;
	}

	.geo-1 {
		top: -150px;
		right: -100px;
		background: radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 60%);
		border-color: rgba(59, 130, 246, 0.3);
		animation: geo-pulse-1 25s infinite ease-in-out;
	}

	.geo-2 {
		bottom: -200px;
		left: -150px;
		background: radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.35) 0%, transparent 60%);
		border-color: rgba(168, 85, 247, 0.25);
		animation: geo-pulse-2 30s infinite ease-in-out;
	}

	.geo-3 {
		top: 10%;
		right: 30%;
		background: radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 60%);
		border-color: rgba(220, 38, 38, 0.2);
		animation: geo-bounce-1 28s infinite ease-in-out;
	}

	/* Medium circles for depth */
	.geo-medium {
		width: 350px;
		height: 350px;
		opacity: 0.2;
		border-width: 1.5px;
	}

	.geo-4 {
		top: 20%;
		left: 15%;
		background: radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
		border-color: rgba(34, 197, 94, 0.2);
		animation: geo-drift-1 20s infinite ease-in-out alternate;
	}

	.geo-5 {
		bottom: 25%;
		right: 20%;
		background: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 70%);
		border-color: rgba(245, 158, 11, 0.2);
		animation: geo-drift-2 22s infinite ease-in-out alternate;
	}

	.geo-6 {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.25) 0%, transparent 70%);
		border-color: rgba(236, 72, 153, 0.15);
		animation: geo-rotate 40s infinite linear;
	}

	.geo-7 {
		top: 35%;
		right: 10%;
		background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.28) 0%, transparent 70%);
		border-color: rgba(139, 92, 246, 0.18);
		animation: geo-bounce-2 24s infinite ease-in-out;
	}

	/* Small accent circles */
	.geo-small {
		width: 180px;
		height: 180px;
		opacity: 0.15;
		border-width: 1px;
	}

	.geo-8 {
		top: 15%;
		right: 25%;
		background: radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 80%);
		animation: geo-drift-3 15s infinite ease-in-out alternate;
	}

	.geo-9 {
		bottom: 40%;
		left: 30%;
		background: radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 80%);
		animation: geo-drift-1 18s infinite ease-in-out alternate-reverse;
	}

	.geo-10 {
		top: 60%;
		right: 15%;
		background: radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, transparent 80%);
		animation: geo-drift-2 16s infinite ease-in-out alternate-reverse;
	}

	.geo-11 {
		bottom: 15%;
		left: 45%;
		background: radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 80%);
		animation: geo-drift-4 19s infinite ease-in-out alternate;
	}

	/* Tiny floating circles */
	.geo-tiny {
		width: 100px;
		height: 100px;
		opacity: 0.12;
		border-width: 1px;
	}

	.geo-12 {
		top: 25%;
		left: 40%;
		background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 85%);
		animation: geo-float-1 12s infinite ease-in-out;
	}

	.geo-13 {
		bottom: 30%;
		right: 35%;
		background: radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 85%);
		animation: geo-float-2 14s infinite ease-in-out;
	}

	.geo-14 {
		top: 70%;
		left: 20%;
		background: radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 85%);
		animation: geo-float-3 13s infinite ease-in-out;
	}

	.geo-15 {
		top: 45%;
		right: 40%;
		background: radial-gradient(circle, rgba(220, 38, 38, 0.2) 0%, transparent 85%);
		animation: geo-float-4 11s infinite ease-in-out;
	}

	/* Subtle overlay pattern like main site */
	.pattern-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: 
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 2px,
				rgba(255, 255, 255, 0.01) 2px,
				rgba(255, 255, 255, 0.01) 4px
			),
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 2px,
				rgba(255, 255, 255, 0.01) 2px,
				rgba(255, 255, 255, 0.01) 4px
			);
		opacity: 0.5;
	}

	/* Animations - subtle and professional */
	@keyframes geo-pulse-1 {
		0%, 100% { 
			transform: scale(1);
			opacity: 0.25;
		}
		50% { 
			transform: scale(1.05);
			opacity: 0.35;
		}
	}

	@keyframes geo-pulse-2 {
		0%, 100% { 
			transform: scale(1);
			opacity: 0.25;
		}
		50% { 
			transform: scale(1.08);
			opacity: 0.3;
		}
	}

	@keyframes geo-drift-1 {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(20px, -15px); }
	}

	@keyframes geo-drift-2 {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(-20px, 20px); }
	}

	@keyframes geo-drift-3 {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(15px, 15px); }
	}

	@keyframes geo-drift-4 {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(-25px, 10px); }
	}

	@keyframes geo-bounce-1 {
		0%, 100% { transform: translate(0, 0); }
		25% { transform: translate(30px, -20px); }
		50% { transform: translate(10px, -30px); }
		75% { transform: translate(-15px, -10px); }
	}

	@keyframes geo-bounce-2 {
		0%, 100% { transform: translate(0, 0); }
		25% { transform: translate(-25px, 15px); }
		50% { transform: translate(-10px, 25px); }
		75% { transform: translate(20px, 10px); }
	}

	@keyframes geo-mega-drift-1 {
		0%, 100% { transform: translate(0, 0) scale(1); }
		50% { transform: translate(40px, -30px) scale(1.05); }
	}

	@keyframes geo-mega-drift-2 {
		0%, 100% { transform: translate(0, 0) scale(1); }
		50% { transform: translate(-35px, 40px) scale(1.03); }
	}

	@keyframes geo-float-1 {
		0%, 100% { transform: translate(0, 0); }
		33% { transform: translate(25px, -20px); }
		66% { transform: translate(-15px, -25px); }
	}

	@keyframes geo-float-2 {
		0%, 100% { transform: translate(0, 0); }
		33% { transform: translate(-20px, 25px); }
		66% { transform: translate(15px, 20px); }
	}

	@keyframes geo-float-3 {
		0%, 100% { transform: translate(0, 0); }
		33% { transform: translate(20px, 15px); }
		66% { transform: translate(-25px, 10px); }
	}

	@keyframes geo-float-4 {
		0%, 100% { transform: translate(0, 0); }
		33% { transform: translate(-15px, -20px); }
		66% { transform: translate(20px, -15px); }
	}

	@keyframes geo-rotate {
		from { transform: translate(-50%, -50%) rotate(0deg); }
		to { transform: translate(-50%, -50%) rotate(360deg); }
	}

	main {
		padding-top: 70px;
		min-height: 100vh;
		position: relative;
		z-index: 1;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		main {
			padding-top: 60px;
		}
	}
</style>