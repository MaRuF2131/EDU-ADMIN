import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  // স্টেট: সার্চ ইনপুটের বর্তমান ভ্যালু (ডিফল্ট খালি স্ট্রিং)
  searchQuery: "",
  
  // অ্যাকশন: সার্চ কোয়েরি আপডেট করার জন্য
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // অ্যাকশন: সার্চ ক্লিয়ার করার জন্য (অপশনাল, তবে ভালো প্র্যাকটিস)
  clearSearch: () => set({ searchQuery: "" }),
}));