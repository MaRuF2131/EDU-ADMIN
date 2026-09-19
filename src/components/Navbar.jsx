// src/components/Navbar.jsx

export default function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 lg:px-6">
      
      {/* Left Side: Hamburger Menu & Welcome Text */}
      <div className="flex items-center gap-4">
        {/* Hamburger Button - শুধু মোবাইলে (lg স্ক্রিনের নিচে) দেখাবে */}
        <button
          onClick={onMenuClick}
          className="text-slate-600 hover:text-slate-900 focus:outline-none "
          aria-label="Open Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Welcome Text (ছোট স্ক্রিনে হাইড থাকবে) */}
        <div className="hidden sm:block">
          <h2 className="text-sm font-semibold text-slate-700">Welcome back, Super Admin</h2>
          <p className="text-xs text-slate-400">Here&apos;s what&apos;s happening with your institution today.</p>
        </div>
      </div>

      {/* Right Side: Links, Notifications & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Navbar Links - মিডিয়াম স্ক্রিনের উপরে দেখাবে */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-lg">
          <a href="/" className="px-3 py-1.5 text-xs font-medium text-slate-600 rounded-md hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all">
            Main Website
          </a>
          <a href="/support" className="px-3 py-1.5 text-xs font-medium text-slate-600 rounded-md hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all">
            Support
          </a>
          <a href="/docs" className="px-3 py-1.5 text-xs font-medium text-slate-600 rounded-md hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all">
            Docs
          </a>
        </nav>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Red Dot Indicator */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-slate-200"></div>

        {/* Admin Profile Area */}
        <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
          {/* Avatar */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            SA
          </div>
          
          {/* Name & Email (ছোট স্ক্রিনে হাইড থাকবে) */}
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-700 leading-tight">Super Admin</p>
            <p className="text-[11px] text-slate-400 leading-tight">admin@institution.edu</p>
          </div>
          
          {/* Dropdown Arrow */}
          <svg className="hidden sm:block w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}