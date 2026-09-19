import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// src/app/admin/layout.jsx
import AdminLayoutClient from "@/components/AdminLayoutClient";

export const metadata = {
  title: "Institution Admin Panel",
  description: "Super Admin Dashboard",
};

// এখানে searchParams প্রপস টি যুক্ত করা হলো
export default async function AdminLayout({ children, searchParams }) {
  // URL থেকে সার্চ কোয়েরি নিচ্ছি
  const query = searchParams?.q || "";

    return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AdminLayoutClient searchQuery={query}>{children}</AdminLayoutClient>
      </body>
    </html>
  );

}


