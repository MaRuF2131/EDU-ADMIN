
"use client";

import Link from "next/link";
import {
  Phone, Bot, ShieldAlert, CalendarClock, Activity,
  ArrowUpRight, ArrowDownRight, PhoneCall, Users,
  Globe, Settings, MessageSquareText, Clock3,
} from "lucide-react";

import {
  voiceAIStats,
  voiceAIActivity,
  voiceAIComplaints,
  voiceAIStaff,
  voiceAIMenu,
} from "./voiceAIData";

const quickActions = [
  { title: "Configure Phone", desc: "Connect your institution phone number", href: "/admin/voice-ai/channels/phone-numbers", icon: Phone },
  { title: "Train AI Assistant", desc: "Update institution FAQs and rules", href: "/admin/voice-ai/engine/knowledge-base", icon: Bot },
  { title: "Review Complaints", desc: "Check AI-detected complaints", href: "/admin/voice-ai/objection-detect/complaint-tickets", icon: ShieldAlert },
  { title: "Manage Staff", desc: "Configure call routing", href: "/admin/voice-ai/routing/staff-directory", icon: Users },
];

const iconMap = { Phone, Bot, ShieldAlert, CalendarClock };

function Status({ value }) {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700",
    Connected: "bg-emerald-50 text-emerald-700",
    Active: "bg-emerald-50 text-emerald-700",
    Available: "bg-emerald-50 text-emerald-700",
    "Complaint Detected": "bg-rose-50 text-rose-700",
    Pending: "bg-amber-50 text-amber-700",
    Busy: "bg-amber-50 text-amber-700",
    Transferred: "bg-blue-50 text-blue-700",
    "In Progress": "bg-blue-50 text-blue-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[value] || "bg-slate-100 text-slate-600"}`}>
      {value}
    </span>
  );
}

export default function VoiceAIDashboard() {
  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-900 p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              AI VOICE COMMAND CENTER
            </div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              AI Voice Call & Message Assistant
            </h1>
            <p className="mt-3 text-sm leading-6 text-blue-100 md:text-base">
              One intelligent communication platform for student support,
              institutional inquiries, complaint detection and staff routing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/admin/voice-ai/logs/call-history"
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-blue-50">
                <span className="inline-flex items-center gap-2"><PhoneCall size={16} /> View Call History</span>
              </Link>
              <Link href="/admin/voice-ai/engine"
                className="rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/20">
                <span className="inline-flex items-center gap-2"><Settings size={16} /> AI Configuration</span>
              </Link>
            </div>
          </div>

          <div className="grid min-w-52 grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/15 bg-white/10 p-4">
              <Activity className="mb-3 text-emerald-300" size={22} />
              <p className="text-xs text-blue-100">System Status</p>
              <p className="mt-1 text-lg font-bold">Demo Mode</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-4">
              <Globe className="mb-3 text-blue-200" size={22} />
              <p className="text-xs text-blue-100">Channels</p>
              <p className="mt-1 text-lg font-bold">2 Configured</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {voiceAIStats.map((item) => {
          const Icon = iconMap[item.icon] || Activity;
          return (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Icon size={22} />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={14} /> {item.change}
                </span>
              </div>
              <p className="mt-5 text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{item.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Channel and system overview */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Communication Channels</h2>
              <p className="mt-1 text-xs text-slate-500">Configured voice communication services</p>
            </div>
            <Link href="/admin/voice-ai/channels" className="text-sm font-semibold text-blue-600">Manage</Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700"><Phone size={22} /></div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">Institution Phone</p>
                <p className="mt-1 text-xs text-slate-500">SIP / Telephony Provider</p>
              </div>
              <Status value="Connected" />
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <div className="rounded-xl bg-violet-50 p-3 text-violet-700"><Globe size={22} /></div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">Website Voice Widget</p>
                <p className="mt-1 text-xs text-slate-500">WebRTC Click-to-Call</p>
              </div>
              <Status value="Active" />
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">AI Service Health</h3>
              <span className="text-xs text-amber-600">Sample status</span>
            </div>
            {[
              ["Speech Recognition", "Ready", 92],
              ["AI Conversation Engine", "Ready", 88],
              ["Text-to-Speech", "Ready", 95],
              ["Complaint Detection", "Ready", 90],
            ].map(([name, status, value]) => (
              <div key={name} className="mb-4">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{name}</span>
                  <span className="text-slate-500">{status}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-900">Complaint Overview</h2>
          <p className="mt-1 text-xs text-slate-500">AI-detected complaint tickets</p>
          <div className="my-6 flex items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-amber-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">348</p>
                <p className="text-[10px] text-slate-500">Total</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-500" />High Priority: 28</p>
              <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400" />Medium: 105</p>
              <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500" />Low: 215</p>
            </div>
          </div>
          <Link href="/admin/voice-ai/objection-detect/complaint-tickets"
            className="block rounded-lg border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Review All Tickets
          </Link>
        </div>
      </div>

      {/* Activity */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-slate-900">Recent Call Activity</h2>
            <p className="mt-1 text-xs text-slate-500">Latest institutional voice interactions</p>
          </div>
          <Link href="/admin/voice-ai/logs/call-history" className="text-sm font-semibold text-blue-600">View All Calls →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {["Call ID", "Caller", "Channel", "Purpose", "Duration", "Status", "Time"].map(x =>
                  <th key={x} className="px-5 py-3 font-semibold">{x}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {voiceAIActivity.map(call => (
                <tr key={call.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-blue-700">{call.id}</td>
                  <td className="px-5 py-4 text-slate-700">{call.caller}</td>
                  <td className="px-5 py-4 text-slate-600">{call.channel}</td>
                  <td className="px-5 py-4 text-slate-600">{call.purpose}</td>
                  <td className="px-5 py-4 text-slate-600">{call.duration}</td>
                  <td className="px-5 py-4"><Status value={call.status} /></td>
                  <td className="px-5 py-4 text-slate-500">{call.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 font-bold text-slate-900">Quick Management</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map(({ title, desc, href, icon: Icon }) => (
            <Link key={title} href={href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-slate-100 p-3 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700">
                  <Icon size={22} />
                </div>
                <ArrowUpRight size={18} className="text-slate-400 group-hover:text-blue-600" />
              </div>
              <h3 className="mt-4 font-bold text-slate-800">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        AI Voice Command Center · Sample dashboard data · Backend connection pending
      </p>
    </div>
  );
}
