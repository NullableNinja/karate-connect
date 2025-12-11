import { writable, derived } from 'svelte/store';
import studentsData from '$lib/data/students.json';

// Helper to get student data
const studentsMap = studentsData.students.reduce((acc, s) => {
	acc[s.id] = s;
	return acc;
}, {});

// Generate comprehensive posts from all students
const mockPosts = [
	// Achievement Posts
	{
		id: 'post-1',
		authorId: 'mason-white',
		authorName: 'Mason White',
		authorAvatar: studentsMap['mason-white'].avatar,
		authorRank: 'Brown Belt',
		authorRole: null,
		type: 'achievement',
		achievement: 'Almost There',
		achievementLevel: 'Gold',
		content: '🎉 Just earned my final stripe before black belt testing! One step closer to the dream! Thank you to all my instructors and training partners! 🥋',
		timestamp: '2024-12-07T16:30:00Z',
		fistbumps: 67,
		comments: 15,
		fistbumped: true
	},
	{
		id: 'post-2',
		authorId: 'ann-yehle',
		authorName: 'Ann Yehle',
		authorAvatar: studentsMap['ann-yehle'].avatar,
		authorRank: '3rd Degree Black Belt',
		authorRole: 'instructor',
		is3Level: 12,
		type: 'announcement',
		content: '🌟 Congratulations to everyone who tested this weekend! I am so proud of all your hard work and dedication. Remember, the belt is just the beginning of your journey at that level. Keep training hard! 💪',
		timestamp: '2024-12-07T14:00:00Z',
		fistbumps: 89,
		comments: 23,
		fistbumped: true
	},
	{
		id: 'post-3',
		authorId: 'emma-thompson',
		authorName: 'Emma Thompson',
		authorAvatar: studentsMap['emma-thompson'].avatar,
		authorRank: 'Green Belt',
		authorRole: null,
		type: 'training',
		content: 'Finally landed that roundhouse-backfist combo! 🎯 Coach Mike was right, it\'s all about the hip rotation! Thanks for the tip! 💚',
		timestamp: '2024-12-07T12:15:00Z',
		fistbumps: 34,
		comments: 8,
		fistbumped: false
	},
	{
		id: 'post-4',
		authorId: 'charlotte-davis',
		authorName: 'Charlotte Davis',
		authorAvatar: studentsMap['charlotte-davis'].avatar,
		authorRank: 'Red Belt',
		authorRole: null,
		type: 'achievement',
		achievement: 'Power & Precision',
		achievementLevel: 'Gold',
		content: 'Earned the Power & Precision badge today! 💪 Balancing force and control is what red belt is all about. Ready for black belt training!',
		timestamp: '2024-12-07T10:45:00Z',
		fistbumps: 52,
		comments: 11,
		fistbumped: true
	},
	{
		id: 'post-5',
		authorId: 'thomas-bryant',
		authorName: 'Thomas Bryant',
		authorAvatar: studentsMap['thomas-bryant'].avatar,
		authorRank: 'Black Belt',
		authorRole: 'assistant',
		is3Level: 3,
		type: 'teaching',
		content: 'Loved assisting with the kids class today! Watching the little ones learn their first kata never gets old. They bring so much energy! 🥋👦👧',
		timestamp: '2024-12-07T09:30:00Z',
		fistbumps: 41,
		comments: 7,
		fistbumped: false
	},
	{
		id: 'post-6',
		authorId: 'logan-perez',
		authorName: 'Logan Perez',
		authorAvatar: studentsMap['logan-perez'].avatar,
		authorRank: 'Brown Belt',
		authorRole: null,
		type: 'training',
		content: 'Sparring session was intense today! 🥊 Huge shoutout to Alex for pushing me to be better. Brown belt level is no joke! 💯',
		timestamp: '2024-12-06T18:20:00Z',
		fistbumps: 45,
		comments: 9,
		fistbumped: true
	},
	{
		id: 'post-7',
		authorId: 'anne-markos',
		authorName: 'Anne Markos',
		authorAvatar: studentsMap['anne-markos'].avatar,
		authorRank: '4th Degree Black Belt',
		authorRole: 'assistant',
		type: 'motivation',
		content: '🔥 Remember: Black belt is not the destination, it\'s the beginning of true mastery. Every class is an opportunity to grow. See you all on the mat!',
		timestamp: '2024-12-06T16:00:00Z',
		fistbumps: 78,
		comments: 18,
		fistbumped: true
	},
	{
		id: 'post-8',
		authorId: 'naomi-wu',
		authorName: 'Naomi Wu',
		authorAvatar: studentsMap['naomi-wu'].avatar,
		authorRank: 'Purple Belt',
		authorRole: null,
		type: 'achievement',
		achievement: 'Form Perfectionist',
		achievementLevel: 'Silver',
		content: '🎊 Just got the Form Perfectionist badge! All those hours practicing paid off. Sensei said my form was flawless today! 😊',
		timestamp: '2024-12-06T14:30:00Z',
		fistbumps: 38,
		comments: 6,
		fistbumped: false
	},
	{
		id: 'post-9',
		authorId: 'mike-chen',
		authorName: 'Mike Chen',
		authorAvatar: studentsMap['mike-chen'].avatar,
		authorRank: 'Brown Belt',
		authorRole: 'instructor',
		type: 'teaching',
		content: 'Great job to the green belt class tonight! Your combinations are getting sharper every week. Keep up the excellent work! 💪🥋',
		timestamp: '2024-12-06T13:15:00Z',
		fistbumps: 56,
		comments: 12,
		fistbumped: true
	},
	{
		id: 'post-10',
		authorId: 'alex-rivera',
		authorName: 'Alex Rivera',
		authorAvatar: studentsMap['alex-rivera'].avatar,
		authorRank: 'Red Belt',
		authorRole: null,
		type: 'training',
		content: 'Black belt pre-test next month! Nervous but excited. Been training 6 days a week to prepare. This is what we work for! 🔥',
		timestamp: '2024-12-06T11:00:00Z',
		fistbumps: 61,
		comments: 14,
		fistbumped: true
	},
	{
		id: 'post-11',
		authorId: 'joseph-mattison',
		authorName: 'Joseph Mattison',
		authorAvatar: studentsMap['joseph-mattison'].avatar,
		authorRank: '2nd Degree Black Belt',
		authorRole: null,
		is3Level: 3,
		type: 'achievement',
		achievement: 'IS3 Achiever',
		achievementLevel: 'Silver',
		content: 'Hit IS3 Level 3 today! 🌟 The instructor skills program is challenging but so rewarding. Thanks Ann for your mentorship!',
		timestamp: '2024-12-05T17:45:00Z',
		fistbumps: 49,
		comments: 10,
		fistbumped: false
	},
	{
		id: 'post-12',
		authorId: 'sarah-martinez',
		authorName: 'Sarah Martinez',
		authorAvatar: studentsMap['sarah-martinez'].avatar,
		authorRank: 'Blue Belt',
		authorRole: null,
		type: 'training',
		content: 'First time breaking a board today! 🪵💥 It was so scary but I DID IT! Blue belt is awesome! Thanks everyone for cheering me on!',
		timestamp: '2024-12-05T15:30:00Z',
		fistbumps: 42,
		comments: 13,
		fistbumped: true
	},
	{
		id: 'post-13',
		authorId: 'grace-loizzi',
		authorName: 'Grace Loizzi',
		authorAvatar: studentsMap['grace-loizzi'].avatar,
		authorRank: '2nd Degree Black Belt',
		authorRole: null,
		type: 'training',
		content: 'Incredible seminar this weekend on advanced self-defense techniques. Always more to learn even at black belt! 🥋',
		timestamp: '2024-12-05T14:00:00Z',
		fistbumps: 37,
		comments: 5,
		fistbumped: false
	},
	{
		id: 'post-14',
		authorId: 'ava-collins',
		authorName: 'Ava Collins',
		authorAvatar: studentsMap['ava-collins'].avatar,
		authorRank: 'Purple Belt',
		authorRole: null,
		type: 'achievement',
		achievement: 'Combo Master',
		achievementLevel: 'Silver',
		content: 'Got the Combo Master badge! 🎯 Those 5-technique combinations are finally clicking. Purple belt level achieved! 💜',
		timestamp: '2024-12-05T12:20:00Z',
		fistbumps: 31,
		comments: 7,
		fistbumped: true
	},
	{
		id: 'post-15',
		authorId: 'olivia-james',
		authorName: 'Olivia James',
		authorAvatar: studentsMap['olivia-james'].avatar,
		authorRank: 'Orange Belt',
		authorRole: null,
		type: 'training',
		content: 'Learned two new kicks today! 🦵 Orange belt moves are so cool! Can\'t wait for next class! 🧡',
		timestamp: '2024-12-05T10:15:00Z',
		fistbumps: 28,
		comments: 4,
		fistbumped: false
	},
	{
		id: 'post-16',
		authorId: 'liam-anderson',
		authorName: 'Liam Anderson',
		authorAvatar: studentsMap['liam-anderson'].avatar,
		authorRank: 'Gold Belt',
		authorRole: null,
		type: 'achievement',
		achievement: 'Steady Progress',
		achievementLevel: 'Silver',
		content: 'Consistency pays off! Just earned the Steady Progress badge. 🏅 Never miss a class, never stop improving! 💛',
		timestamp: '2024-12-04T18:30:00Z',
		fistbumps: 35,
		comments: 8,
		fistbumped: true
	},
	{
		id: 'post-17',
		authorId: 'isabella-kim',
		authorName: 'Isabella Kim',
		authorAvatar: studentsMap['isabella-kim'].avatar,
		authorRank: 'Blue Belt',
		authorRole: null,
		type: 'training',
		content: 'Practicing my kata in the backyard. Mom says I look like a ninja! 🥷 Blue belt for life! 💙',
		timestamp: '2024-12-04T16:00:00Z',
		fistbumps: 33,
		comments: 6,
		fistbumped: false
	},
	{
		id: 'post-18',
		authorId: 'noah-taylor',
		authorName: 'Noah Taylor',
		authorAvatar: studentsMap['noah-taylor'].avatar,
		authorRank: 'Green Belt',
		authorRole: null,
		type: 'achievement',
		achievement: 'Focus Builder',
		achievementLevel: 'Bronze',
		content: 'Coach noticed my focus is getting better! 🧘‍♂️ Earned the Focus Builder badge. Green belt mindset activated! 💚',
		timestamp: '2024-12-04T14:45:00Z',
		fistbumps: 26,
		comments: 5,
		fistbumped: true
	},
	{
		id: 'post-19',
		authorId: 'ethan-park',
		authorName: 'Ethan Park',
		authorAvatar: studentsMap['ethan-park'].avatar,
		authorRank: 'Yellow Belt',
		authorRole: null,
		type: 'training',
		content: 'Got my first stripe today! 🌟 Yellow belt with a stripe! I feel so strong! 💪',
		timestamp: '2024-12-04T13:00:00Z',
		fistbumps: 24,
		comments: 9,
		fistbumped: true
	},
	{
		id: 'post-20',
		authorId: 'sophia-nguyen',
		authorName: 'Sophia Nguyen',
		authorAvatar: studentsMap['sophia-nguyen'].avatar,
		authorRank: 'White Belt',
		authorRole: null,
		type: 'training',
		content: 'My first karate class ever! Everyone was so nice! I learned how to punch and kick! This is so fun! 🥋✨',
		timestamp: '2024-12-04T11:30:00Z',
		fistbumps: 47,
		comments: 12,
		fistbumped: true
	}
];

// Generate buddies from all students
const mockBuddies = studentsData.students.map((s, index) => ({
	id: s.id,
	name: s.name,
	username: s.name.toLowerCase().replace(/\s+/g, '.'),
	avatar: s.avatar,
	rank: s.rank,
	role: s.role,
	is3Level: s.is3Level,
	status: index % 3 === 0 ? 'online' : 'offline',
	lastSeen: index % 3 === 0 ? null : new Date(Date.now() - Math.random() * 86400000 * 3).toISOString()
}));

// Generate messages/conversations
const mockMessages = [
	{
		id: 'msg-1',
		fromId: 'logan-perez',
		fromName: 'Logan Perez',
		fromAvatar: studentsMap['logan-perez'].avatar,
		content: 'Congrats on landing the roundhouse combo! 👊',
		timestamp: '2024-12-07T12:30:00Z',
		read: false
	},
	{
		id: 'msg-2',
		fromId: 'ann-yehle',
		fromName: 'Ann Yehle',
		fromAvatar: studentsMap['ann-yehle'].avatar,
		content: 'Great focus in class today. Keep up that excellent work! 🌟',
		timestamp: '2024-12-07T10:00:00Z',
		read: false
	},
	{
		id: 'msg-3',
		fromId: 'naomi-wu',
		fromName: 'Naomi Wu',
		fromAvatar: studentsMap['naomi-wu'].avatar,
		content: 'Nice work on the form practice today! 😊',
		timestamp: '2024-12-06T16:45:00Z',
		read: true
	},
	{
		id: 'msg-4',
		fromId: 'mike-chen',
		fromName: 'Mike Chen',
		fromAvatar: studentsMap['mike-chen'].avatar,
		content: 'Want to work on combinations before class Wednesday?',
		timestamp: '2024-12-06T14:20:00Z',
		read: true
	},
	{
		id: 'msg-5',
		fromId: 'thomas-bryant',
		fromName: 'Thomas Bryant',
		fromAvatar: studentsMap['thomas-bryant'].avatar,
		content: 'Loved your energy in the kids class! Thanks for helping!',
		timestamp: '2024-12-06T12:00:00Z',
		read: true
	}
];

// Generate notifications
const mockNotifications = [
	{
		id: 'notif-1',
		type: 'fistbump',
		from: 'Mason White',
		content: 'gave you a fistbump! 👊',
		timestamp: '2024-12-07T16:35:00Z',
		read: false
	},
	{
		id: 'notif-2',
		type: 'comment',
		from: 'Charlotte Davis',
		content: 'commented on your post',
		timestamp: '2024-12-07T14:20:00Z',
		read: false
	},
	{
		id: 'notif-3',
		type: 'achievement',
		from: 'System',
		content: 'You earned the "Perfect Form" gold star! 🌟',
		timestamp: '2024-12-07T12:00:00Z',
		read: false
	},
	{
		id: 'notif-4',
		type: 'buddy',
		from: 'Alex Rivera',
		content: 'is now your training buddy!',
		timestamp: '2024-12-06T18:00:00Z',
		read: true
	},
	{
		id: 'notif-5',
		type: 'fistbump',
		from: 'Ann Yehle',
		content: 'gave you a fistbump! 👊',
		timestamp: '2024-12-06T15:30:00Z',
		read: true
	},
	{
		id: 'notif-6',
		type: 'comment',
		from: 'Logan Perez',
		content: 'commented on your post',
		timestamp: '2024-12-06T13:15:00Z',
		read: true
	}
];

// Stores
export const posts = writable(mockPosts);
export const buddies = writable(mockBuddies);
export const messages = writable(mockMessages);
export const notifications = writable(mockNotifications);

// Derived stores
export const unreadMessages = derived(messages, ($messages) => 
	$messages.filter(m => !m.read).length
);

export const unreadNotifications = derived(notifications, ($notifications) => 
	$notifications.filter(n => !n.read).length
);

// Functions
export function createPost(content, image = null, type = 'training') {
	const newPost = {
		id: `post-${Date.now()}`,
		authorId: 'emma-thompson', // Would be current user
		authorName: 'Emma Thompson',
		authorAvatar: studentsMap['emma-thompson'].avatar,
		authorRank: 'Green Belt',
		authorRole: null,
		type,
		content,
		image,
		timestamp: new Date().toISOString(),
		fistbumps: 0,
		comments: 0,
		fistbumped: false
	};
	
	posts.update($posts => [newPost, ...$posts]);
}

export function toggleFistbump(postId) {
	posts.update($posts => $posts.map(post => {
		if (post.id === postId) {
			return {
				...post,
				fistbumped: !post.fistbumped,
				fistbumps: post.fistbumped ? post.fistbumps - 1 : post.fistbumps + 1
			};
		}
		return post;
	}));
}

export function addComment(postId, content) {
	posts.update($posts => $posts.map(post => {
		if (post.id === postId) {
			return { ...post, comments: post.comments + 1 };
		}
		return post;
	}));
}

export function markMessageAsRead(messageId) {
	messages.update($messages => $messages.map(msg => 
		msg.id === messageId ? { ...msg, read: true } : msg
	));
}

export function markNotificationAsRead(notificationId) {
	notifications.update($notifications => $notifications.map(notif => 
		notif.id === notificationId ? { ...notif, read: true } : notif
	));
}
