import { writable } from 'svelte/store';
import { base } from '$app/paths';
import { browser } from '$app/environment';
import studentsData from '$lib/data/students.json';

// Transform student data into user accounts
const mockUsers = studentsData.students.map(student => ({
	...student,
	username: student.name.toLowerCase().replace(/\s+/g, '.'),
	email: `${student.name.toLowerCase().replace(/\s+/g, '.')}@taskkarate.com`,
	followers: Math.floor(Math.random() * 100) + 20,
	following: Math.floor(Math.random() * 80) + 15,
	posts: Math.floor(Math.random() * 50) + 5,
	trainingPartners: student.totalClasses > 100 ? Math.floor(Math.random() * 60) + 40 : Math.floor(Math.random() * 30) + 10,
	fistbumps: Math.floor((student.totalClasses || 0) * 2.3),
	attendance: student.totalClasses > 200 ? 95 : student.totalClasses > 100 ? 88 : 85,
	memberSince: student.joinDate,
	trainingDays: 'Monday, Wednesday, Friday'
}));

export const currentUser = writable(null);
export const isAuthenticated = writable(false);

// Login with student selection and PIN
export async function login(studentId, pin) {
	// Simulate API call
	await new Promise(resolve => setTimeout(resolve, 500));
	
	const user = mockUsers.find(u => u.id === studentId);
	if (user && pin === user.pin) {
		currentUser.set(user);
		isAuthenticated.set(true);
		if (browser) {
			localStorage.setItem('tk-social-user', JSON.stringify(user));
		}
		return { success: true };
	}
	
	return { success: false, error: 'Invalid PIN' };
}

// Get all students for login selection
export function getAllStudents() {
	return mockUsers;
}

// Logout function
export function logout() {
	currentUser.set(null);
	isAuthenticated.set(false);
	if (browser) {
		localStorage.removeItem('tk-social-user');
		window.location.href = `${base}/login`;
	}
}

// Check for existing session
export function checkSession() {
	if (!browser) return false;
	
	const savedUser = localStorage.getItem('tk-social-user');
	if (savedUser) {
		try {
			const user = JSON.parse(savedUser);
			currentUser.set(user);
			isAuthenticated.set(true);
			return true;
		} catch {
			logout();
		}
	}
	return false;
}

// Initialize session on app load (only in browser)
if (browser) {
	checkSession();
}