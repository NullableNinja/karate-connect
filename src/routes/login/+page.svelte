<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { login, isAuthenticated, getAllStudents } from '$lib/stores/auth.js';
	import LoginTile from '$lib/components/LoginTile.svelte';
	import PinModal from '$lib/components/PinModal.svelte';
	import KarateGi from '$lib/components/icons/KarateGi.svelte';
	
	let allStudents = [];
	let searchQuery = "";
	let expandedTile = null;
	let selectedStudent = null;
	let selectedAvatarIndex = 0;
	let showStudentPin = false;
	let studentPinInput = "";
	let pinError = "";
	let pinField = null;
	let instructorMode = false;
	let showInstructorPin = false;
	let instructorPinInput = "";
	let instructorError = "";
	
	const DOJO_ADMIN_PIN = "8675309";
	
	const avatarColors = [
		"#93c5fd", "#a5f3fc", "#fda4af", "#fcd34d", "#bbf7d0", "#c7d2fe"
	];
	
	function getAvatarColor(index) {
		if (index == null) return avatarColors[0];
		return avatarColors[index % avatarColors.length];
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
	
	function getLastName(s) {
		const nameStr = (s?.displayName || s?.name || "").toString();
		const parts = nameStr.trim().split(/\s+/).filter(Boolean);
		if (parts.length === 0) return "";
		return parts[parts.length - 1].toUpperCase();
	}
	
	$: filtered = allStudents.filter((s) => {
		const full = `${s?.name || ''} ${s?.displayName || ''}`;
		return full.toLowerCase().includes(searchQuery.toLowerCase());
	});
	
	$: sorted = [...filtered].sort((a, b) =>
		getLastName(a).localeCompare(getLastName(b))
	);
	
	$: grouped = sorted.reduce((acc, s) => {
		const letter = getLastName(s)[0];
		if (!acc[letter]) acc[letter] = [];
		acc[letter].push(s);
		return acc;
	}, {});
	
	function toggleExpandTile(studentId) {
		expandedTile = expandedTile === studentId ? null : studentId;
	}
	
	function handleEnterStudent(s, index) {
		selectedStudent = s;
		selectedAvatarIndex = index ?? 0;
		
		if (instructorMode) {
			// Direct login for instructor mode
			performLogin(s.id, s.pin);
		} else {
			showStudentPin = true;
			studentPinInput = "";
			pinError = "";
		}
	}
	
	async function submitStudentPin() {
		if (!selectedStudent) return;
		
		const result = await login(selectedStudent.id, studentPinInput);
		if (result.success) {
			showStudentPin = false;
			goto('/', { replaceState: true });
		} else {
			pinError = "Incorrect PIN — try again.";
		}
	}
	
	function cancelStudentPin() {
		showStudentPin = false;
		selectedStudent = null;
		studentPinInput = "";
		pinError = "";
	}
	
	function toggleInstructor() {
		if (instructorMode) {
			instructorMode = false;
			return;
		}
		
		instructorPinInput = "";
		instructorError = "";
		showInstructorPin = true;
	}
	
	function submitInstructorPin() {
		if (instructorPinInput === DOJO_ADMIN_PIN) {
			instructorMode = true;
			showInstructorPin = false;
		} else {
			instructorError = "Incorrect instructor PIN.";
		}
	}
	
	function cancelInstructorPin() {
		showInstructorPin = false;
		instructorPinInput = "";
		instructorError = "";
	}
	
	async function performLogin(studentId, pin) {
		const result = await login(studentId, pin);
		if (result.success) {
			goto('/', { replaceState: true });
		}
	}
	
	onMount(() => {
		if ($isAuthenticated) {
			goto('/', { replaceState: true });
			return;
		}
		allStudents = getAllStudents();
	});
</script>

<svelte:head>
	<title>Login - Task Karate Connect</title>
</svelte:head>

<div class="login-wrapper">
	<section class="login-card" class:instructor-active={instructorMode}>
		{#if instructorMode}
			<div class="instructor-tag">INSTRUCTOR MODE</div>
		{/if}
		
		<!-- Header -->
		<header>
			<h1 class="login-title">TASK KARATE CONNECT</h1>
			<p class="login-subtitle">Select your profile to continue</p>
		</header>
		
		<!-- Toolbar with Search and Toggle -->
		<div class="login-toolbar">
			<input
				type="text"
				class="login-search"
				placeholder="Search students..."
				bind:value={searchQuery}
			/>
			
			<div class="instructor-switch">
				<button
					type="button"
					aria-label="Toggle Instructor Login"
					class="instructor-toggle {instructorMode ? 'is-on' : ''}"
					on:click={toggleInstructor}
				>
					<span class="instructor-thumb"></span>
				</button>
				<span class="instructor-label">Instructor Login</span>
			</div>
		</div>
		
		<!-- Student Grid -->
		<div class="login-roster-scroll">
			<div class="login-grid">
				{#each Object.entries(grouped) as [letter, students]}
					<div class="letter-header">— {letter} —</div>
					{#each students as student, index}
						<LoginTile
							{student}
							index={sorted.indexOf(student)}
							expanded={expandedTile === student.id}
							on:toggle={() => toggleExpandTile(student.id)}
							on:enter={() => handleEnterStudent(student, sorted.indexOf(student))}
						/>
					{/each}
				{/each}
			</div>
		</div>
	</section>
</div>

<!-- Student PIN Modal -->
{#if showStudentPin && selectedStudent}
	<PinModal
		title="Enter PIN"
		subtitle={selectedStudent.displayName || selectedStudent.name}
		bind:value={studentPinInput}
		bind:pinField
		{pinError}
		avatarInitials={getInitials(selectedStudent.displayName || selectedStudent.name)}
		avatarColor={getAvatarColor(selectedAvatarIndex)}
		rank={selectedStudent.rank}
		is3Level={selectedStudent.is3Level}
		role={selectedStudent.role}
		on:submit={submitStudentPin}
		on:cancel={cancelStudentPin}
	/>
{/if}

<!-- Instructor PIN Modal -->
{#if showInstructorPin}
	<PinModal
		title="Instructor Access"
		subtitle="Enter Instructor PIN"
		bind:value={instructorPinInput}
		bind:pinField
		pinError={instructorError}
		avatarInitials="👨‍🏫"
		avatarColor="#3b82f6"
		rank=""
		on:submit={submitInstructorPin}
		on:cancel={cancelInstructorPin}
	/>
{/if}

<style>
	/* ROOT WRAPPER */
	.login-wrapper {
		max-width: 950px;
		margin: 3rem auto;
		padding: 1.5rem;
		color: #e5e7eb;
		font-family: var(--font-body, Inter, system-ui, sans-serif);
	}

	/* LOGIN CARD */
	.login-card {
		padding: 2rem 2.2rem;
		border-radius: 20px;
		background: rgba(15, 23, 42, 0.88);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(148, 163, 184, 0.25);
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.45);
		position: relative;
	}

	/* INSTRUCTOR MODE EFFECT */
	.login-card.instructor-active {
		border: 1px solid rgba(56, 189, 248, 0.55);
		box-shadow:
			0 0 22px rgba(56, 189, 248, 0.25),
			0 0 60px rgba(56, 189, 248, 0.18) inset;
		animation: pulseGlow 6s ease-in-out infinite;
	}

	@keyframes pulseGlow {
		0%, 100% {
			box-shadow:
				0 0 22px rgba(56, 189, 248, 0.25),
				0 0 60px rgba(56, 189, 248, 0.18) inset;
		}
		50% {
			box-shadow:
				0 0 28px rgba(56, 189, 248, 0.35),
				0 0 70px rgba(56, 189, 248, 0.25) inset;
		}
	}

	/* TAG */
	.instructor-tag {
		position: absolute;
		top: -14px;
		right: 12px;
		background: rgba(56, 189, 248, 0.25);
		backdrop-filter: blur(4px);
		padding: 4px 10px;
		border-radius: 8px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: #e0f7ff;
		border: 1px solid rgba(56, 189, 248, 0.4);
	}

	/* HEADER */
	.login-title {
		font-family: var(--font-display, "Bebas Neue", sans-serif);
		margin: 0;
		font-size: 2.6rem;
		letter-spacing: 0.05em;
	}
	
	.login-subtitle {
		margin-top: 4px;
		opacity: 0.75;
		font-size: 0.95rem;
	}

	/* TOOLBAR */
	.login-toolbar {
		display: flex;
		gap: 1rem;
		margin: 1.4rem 0 1.6rem;
		align-items: center;
	}
	
	.login-search {
		flex: 1;
		padding: 0.75rem 1rem;
		border-radius: 12px;
		border: 1px solid #334155;
		background: #020617;
		color: #e2e8f0;
	}
	
	.login-search::placeholder {
		color: #64748b;
	}

	/* INSTRUCTOR SWITCH */
	.instructor-switch {
		display: flex;
		align-items: center;
		gap: 0.55rem;
	}
	
	.instructor-toggle {
		width: 52px;
		height: 28px;
		background: #1e293b;
		border-radius: 999px;
		border: none;
		cursor: pointer;
		position: relative;
		transition: background 0.18s ease;
		padding: 0;
	}
	
	.instructor-thumb {
		position: absolute;
		width: 22px;
		height: 22px;
		top: 3px;
		left: 3px;
		border-radius: 50%;
		background: #f8fafc;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		transition: transform 0.18s ease;
	}
	
	.instructor-toggle.is-on {
		background: #38bdf8;
	}
	
	.instructor-toggle.is-on .instructor-thumb {
		transform: translateX(24px);
	}
	
	.instructor-label {
		font-size: 0.85rem;
		color: #cbd5e1;
	}

	/* ROSTER SCROLL */
	.login-roster-scroll {
		max-height: 60vh;
		overflow-y: auto;
		margin-top: 1rem;
		padding-right: 0.5rem;
	}

	.login-roster-scroll::-webkit-scrollbar {
		width: 6px;
	}

	.login-roster-scroll::-webkit-scrollbar-track {
		background: rgba(15, 23, 42, 0.5);
		border-radius: 3px;
	}

	.login-roster-scroll::-webkit-scrollbar-thumb {
		background: rgba(148, 163, 184, 0.3);
		border-radius: 3px;
	}

	.login-roster-scroll::-webkit-scrollbar-thumb:hover {
		background: rgba(148, 163, 184, 0.5);
	}

	/* GRID */
	.login-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		align-items: start;
	}

	.letter-header {
		grid-column: 1 / -1;
		text-align: center;
		color: #475569;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		margin: 0.8rem 0 0.4rem;
	}

	@media (max-width: 768px) {
		.login-wrapper {
			margin: 1rem auto;
			padding: 1rem;
		}
		
		.login-card {
			padding: 1.5rem;
		}
		
		.login-title {
			font-size: 2rem;
		}
		
		.login-toolbar {
			flex-direction: column;
			align-items: stretch;
		}
		
		.instructor-switch {
			justify-content: center;
		}
		
		.login-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
