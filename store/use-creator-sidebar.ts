import { create } from 'zustand'

interface CreatorSidebarStory {
	collapsed: boolean
	onExpand: () => void
	onCollapse: () => void
}

export const useCreatorSidebar = create<CreatorSidebarStory>((set) => ({
	collapsed: false,
	onExpand: () => set(() => ({ collapsed: false })),
	onCollapse: () => set(() => ({ collapsed: true }))
}))
