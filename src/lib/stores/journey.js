import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { currentUser } from './auth.js';

// Journey entries store
const createJourneyStore = () => {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		init: () => {
			if (!browser) return;
			
			// Mock journey entries
			const mockEntries = [
				{
					id: 1,
					userId: 1,
					content: "Today was my first day at Task Karate! I learned how to bow properly and practiced my first stance. It felt really cool to wear the gi for the first time. Can't wait for next class!",
					timestamp: new Date('2024-01-15').toISOString(),
					beltRank: 'White Belt',
					stripeCount: 0,
					fistbumps: 12,
					fistbumped: false,
					comments: 3
				},
				{
					id: 2,
					userId: 1,
					content: "Earned my first stripe today! 🎉 Sensei said my blocks are improving. I've been practicing at home every night. The hard work is paying off!",
					timestamp: new Date('2024-02-10').toISOString(),
					beltRank: 'White Belt',
					stripeCount: 1,
					fistbumps: 18,
					fistbumped: false,
					comments: 5
				},
				{
					id: 3,
					userId: 1,
					content: "Belt test is coming up in two weeks. Feeling nervous but excited! I've been reviewing all my forms and working on my kicks. My front kick is getting much higher now.",
					timestamp: new Date('2024-03-20').toISOString(),
					beltRank: 'White Belt',
					stripeCount: 3,
					fistbumps: 15,
					fistbumped: false,
					comments: 8
				},
				{
					id: 4,
					userId: 1,
					content: "I DID IT! Passed my test and got my Gold Belt! 🥋 All the practice was worth it. Thank you to everyone who supported me on this journey. Now on to learning new forms!",
					timestamp: new Date('2024-04-05').toISOString(),
					beltRank: 'Gold Belt',
					stripeCount: 0,
					fistbumps: 45,
					fistbumped: true,
					comments: 12
				},
				{
					id: 5,
					userId: 1,
					content: "Started learning weapons training today - nunchucks! It's harder than it looks in movies. I might have hit myself once... okay, three times. But I'm getting the hang of it!",
					timestamp: new Date('2024-05-12').toISOString(),
					beltRank: 'Gold Belt',
					stripeCount: 1,
					fistbumps: 22,
					fistbumped: false,
					comments: 6
				}
			];

			set(mockEntries);
		},
		createEntry: (content) => {
			if (!browser) return;
			
			const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
			if (!user) return;

			const newEntry = {
				id: Date.now(),
				userId: user.id,
				content,
				timestamp: new Date().toISOString(),
				beltRank: user.rank,
				stripeCount: user.stripeCount || 0,
				fistbumps: 0,
				fistbumped: false,
				comments: 0
			};

			update(entries => [newEntry, ...entries]);
		},
		toggleFistbump: (entryId) => {
			update(entries => entries.map(entry => {
				if (entry.id === entryId) {
					return {
						...entry,
						fistbumped: !entry.fistbumped,
						fistbumps: entry.fistbumped ? entry.fistbumps - 1 : entry.fistbumps + 1
					};
				}
				return entry;
			}));
		},
		addComment: (entryId) => {
			update(entries => entries.map(entry => {
				if (entry.id === entryId) {
					return {
						...entry,
						comments: entry.comments + 1
					};
				}
				return entry;
			}));
		}
	};
};

export const journeyEntries = createJourneyStore();

// Derived store for entry statistics
export const journeyStats = derived(journeyEntries, $entries => {
	if (!$entries.length) return { totalEntries: 0, totalFistbumps: 0, totalComments: 0 };
	
	return {
		totalEntries: $entries.length,
		totalFistbumps: $entries.reduce((sum, entry) => sum + entry.fistbumps, 0),
		totalComments: $entries.reduce((sum, entry) => sum + entry.comments, 0)
	};
});
