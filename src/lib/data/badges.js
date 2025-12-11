// Achievable Badge System for Task Karate Connect
// Everyone can earn these - positive reinforcement for participation and effort!

export const badgeCategories = {
	attendance: {
		name: 'Attendance',
		icon: '📅',
		badges: [
			{ id: 'first-class', name: 'First Step', level: 'Bronze', requirement: 1, description: 'Attended your first class!' },
			{ id: 'ten-classes', name: 'Getting Started', level: 'Silver', requirement: 10, description: 'Attended 10 classes' },
			{ id: 'hundred-classes', name: 'Dedicated', level: 'Gold', requirement: 100, description: 'Attended 100 classes' },
			{ id: 'thousand-classes', name: 'Legend', level: 'Platinum', requirement: 1000, description: 'Attended 1,000 classes!' }
		]
	},
	
	helping: {
		name: 'Helping & Teaching',
		icon: '🤝',
		badges: [
			{ id: 'first-assist', name: 'Helpful', level: 'Bronze', requirement: 1, description: 'Helped during class' },
			{ id: 'junior-instructor', name: 'Junior Instructor', level: 'Silver', requirement: 10, description: 'Assisted in 10 classes' },
			{ id: 'assistant-instructor', name: 'Assistant Instructor', level: 'Gold', requirement: 50, description: 'Regular teaching assistant' },
			{ id: 'senior-instructor', name: 'Senior Instructor', level: 'Platinum', requirement: 200, description: 'Lead instructor status' }
		]
	},
	
	forms: {
		name: 'Forms & Technique',
		icon: '🥋',
		badges: [
			{ id: 'first-form', name: 'Form Beginner', level: 'Bronze', requirement: 1, description: 'Learned your first form' },
			{ id: 'five-forms', name: 'Form Student', level: 'Silver', requirement: 5, description: 'Mastered 5 forms' },
			{ id: 'all-forms', name: 'Form Master', level: 'Gold', requirement: 10, description: 'Knows all required forms' },
			{ id: 'perfect-form', name: 'Form Perfectionist', level: 'Platinum', requirement: 1, description: 'Demonstrated perfect form' }
		]
	},
	
	sparring: {
		name: 'Sparring',
		icon: '🥊',
		badges: [
			{ id: 'first-spar', name: 'Courage', level: 'Bronze', requirement: 1, description: 'First sparring session' },
			{ id: 'regular-sparrer', name: 'Sparring Regular', level: 'Silver', requirement: 20, description: 'Sparred in 20 classes' },
			{ id: 'advanced-sparrer', name: 'Sparring Specialist', level: 'Gold', requirement: 50, description: 'Advanced sparring skills' },
			{ id: 'spar-master', name: 'Sparring Master', level: 'Platinum', requirement: 100, description: 'Elite sparring ability' }
		]
	},
	
	tournaments: {
		name: 'Tournament Participation',
		icon: '🏆',
		badges: [
			{ id: 'first-tournament', name: 'Competitor', level: 'Bronze', requirement: 1, description: 'First tournament!' },
			{ id: 'tournament-regular', name: 'Tournament Regular', level: 'Silver', requirement: 3, description: 'Competed in 3 tournaments' },
			{ id: 'tournament-veteran', name: 'Tournament Veteran', level: 'Gold', requirement: 10, description: 'Competed in 10 tournaments' },
			{ id: 'tournament-champion', name: 'Champion', level: 'Platinum', requirement: 1, description: 'Won a tournament!' }
		]
	},
	
	is3: {
		name: 'IS3 Program',
		icon: '📚',
		badges: [
			{ id: 'is3-start', name: 'IS3 Beginner', level: 'Bronze', requirement: 1, description: 'Started IS3 program' },
			{ id: 'is3-level3', name: 'IS3 Student', level: 'Silver', requirement: 3, description: 'Reached IS3 Level 3' },
			{ id: 'is3-level6', name: 'IS3 Advanced', level: 'Gold', requirement: 6, description: 'Reached IS3 Level 6' },
			{ id: 'is3-level12', name: 'IS3 Elite', level: 'Platinum', requirement: 12, description: 'Completed all IS3 levels!' }
		]
	},
	
	consistency: {
		name: 'Consistency',
		icon: '⭐',
		badges: [
			{ id: 'week-streak', name: 'Week Warrior', level: 'Bronze', requirement: 1, description: 'Trained 3 times in one week' },
			{ id: 'month-streak', name: 'Monthly Consistent', level: 'Silver', requirement: 1, description: 'Perfect attendance for a month' },
			{ id: 'year-streak', name: 'Yearly Dedicated', level: 'Gold', requirement: 1, description: 'Perfect attendance for a year' },
			{ id: 'never-quit', name: 'Never Quit', level: 'Platinum', requirement: 3, description: 'Multiple years perfect attendance' }
		]
	},
	
	spirit: {
		name: 'Dojo Spirit',
		icon: '❤️',
		badges: [
			{ id: 'good-attitude', name: 'Positive Spirit', level: 'Bronze', requirement: 1, description: 'Great attitude in class' },
			{ id: 'encourager', name: 'Encourager', level: 'Silver', requirement: 1, description: 'Encourages fellow students' },
			{ id: 'team-player', name: 'Team Player', level: 'Gold', requirement: 1, description: 'Outstanding teamwork' },
			{ id: 'dojo-spirit', name: 'Dojo Spirit Award', level: 'Platinum', requirement: 1, description: 'Embodies dojo values' }
		]
	}
};

// Helper function to calculate which badges a student has earned
export function calculateEarnedBadges(student) {
	const earned = [];
	
	// Attendance badges
	const totalClasses = student.totalClasses || 0;
	badgeCategories.attendance.badges.forEach(badge => {
		if (totalClasses >= badge.requirement) {
			earned.push({ ...badge, category: 'Attendance' });
		}
	});
	
	// IS3 badges
	const is3Level = student.is3Level || 0;
	badgeCategories.is3.badges.forEach(badge => {
		if (is3Level >= badge.requirement) {
			earned.push({ ...badge, category: 'IS3 Program' });
		}
	});
	
	// Form badges - estimate based on rank
	const rankOrder = ['White', 'Yellow', 'Orange', 'Gold', 'Green', 'Blue', 'Purple', 'Brown', 'Red', 'Black'];
	const currentRankIndex = rankOrder.findIndex(r => (student.rank || '').includes(r));
	const formsKnown = currentRankIndex >= 0 ? currentRankIndex + 1 : 0;
	
	badgeCategories.forms.badges.forEach(badge => {
		if (badge.id === 'perfect-form') return; // Special award
		if (formsKnown >= badge.requirement) {
			earned.push({ ...badge, category: 'Forms & Technique' });
		}
	});
	
	return earned;
}

// Event types for Gold Stars
export const goldStarEvents = [
	{ id: 'polar-plunge', name: 'Polar Plunge', icon: '🥶', description: 'Participated in the annual polar plunge' },
	{ id: 'food-drive', name: 'Food Drive', icon: '🥫', description: 'Contributed to November food drive' },
	{ id: 'tunnel-hike', name: 'Tunnel Hike', icon: '🚶', description: 'Completed the tunnel hike adventure' },
	{ id: 'snow-hike', name: 'Snow Hike', icon: '⛷️', description: 'Braved the winter snow hike' },
	{ id: 'riverfest', name: 'Riverfest Demo', icon: '🌊', description: 'Performed at Riverfest demonstration' },
	{ id: 'demo-team', name: 'Demo Team', icon: '🎭', description: 'Member of demonstration team' },
	{ id: 'special-event', name: 'Special Event', icon: '✨', description: 'Studio special event participation' },
	{ id: 'tournament', name: 'Tournament', icon: '🏆', description: 'Competed in tournament' },
	{ id: 'testing', name: 'Belt Testing', icon: '🥋', description: 'Successfully tested for next rank' },
	{ id: 'workshop', name: 'Workshop', icon: '📖', description: 'Attended special workshop' }
];

// Break board levels (teeth boards and slide boards)
export const breakBoards = [
	{ id: 'white-lamb', name: 'White Lamb', level: 1, color: '#FFFFFF', borderColor: '#E5E7EB' },
	{ id: 'yellow-coyote', name: 'Yellow Coyote', level: 2, color: '#FDE047', borderColor: '#FACC15' },
	{ id: 'orange-tiger', name: 'Orange Tiger', level: 3, color: '#FB923C', borderColor: '#F97316' },
	{ id: 'green-dragon', name: 'Green Dragon', level: 4, color: '#4ADE80', borderColor: '#22C55E' },
	{ id: 'blue-panther', name: 'Blue Panther', level: 5, color: '#60A5FA', borderColor: '#3B82F6' },
	{ id: 'purple-eagle', name: 'Purple Eagle', level: 6, color: '#C084FC', borderColor: '#A855F7' },
	{ id: 'brown-bear', name: 'Brown Bear', level: 7, color: '#A16207', borderColor: '#92400E' },
	{ id: 'red-phoenix', name: 'Red Phoenix', level: 8, color: '#F87171', borderColor: '#EF4444' },
	{ id: 'black-board', name: 'Black Board', level: 9, color: '#1F2937', borderColor: '#111827' },
	{ id: 'black-2nd', name: 'Black Board (2nd Degree)', level: 10, color: '#1F2937', borderColor: '#111827', stars: 2 },
	{ id: 'diamond', name: 'Diamond Board', level: 11, color: '#B9F3FC', borderColor: '#67E8F9', special: true }
];
