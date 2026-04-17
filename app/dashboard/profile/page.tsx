'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { User, Mail, Shield, Bell, Building, Save } from "lucide-react";

export default function ProfilePage() {
  const user = useQuery(api.users.viewer);

  return (
    <div className="flex flex-col gap-8 max-w-3xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your institutional profile and identity credentials.</p>
      </div>

      {/* Avatar + Name */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {user?.name?.charAt(0)?.toUpperCase() || <User size={28} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-gray-900">{user?.name || "Institutional User"}</p>
          <p className="text-sm text-gray-500 truncate">{user?.email || "—"}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
              <Shield size={10} /> Verified
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              <Building size={10} /> Institutional
            </span>
          </div>
        </div>
        <button className="hidden sm:flex h-9 px-4 items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
          Edit Photo
        </button>
      </div>

      {/* Personal Info */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <User size={16} className="text-gray-400" />
          <h2 className="text-sm font-bold text-gray-900">Personal Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Full Name</label>
            <input
              className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition shadow-sm"
              defaultValue={user?.name || ""}
              placeholder="Your full name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Company / Entity</label>
            <input
              className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition shadow-sm"
              placeholder="Your company or entity name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Phone Number</label>
            <input
              className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition shadow-sm"
              placeholder="+27 00 000 0000"
              type="tel"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Country</label>
            <input
              className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition shadow-sm"
              placeholder="South Africa"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <button className="flex items-center gap-2 h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors">
            <Save size={14} /> Save Changes
          </button>
          <button className="flex items-center gap-2 h-9 px-4 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>

      {/* Email / Auth */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Mail size={16} className="text-gray-400" />
          <h2 className="text-sm font-bold text-gray-900">Email & Authentication</h2>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Verified Email</label>
            <input
              className="h-10 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed shadow-sm"
              value={user?.email || ""}
              readOnly
            />
            <p className="text-xs text-gray-400">Your email is managed by your authentication provider and cannot be changed here.</p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Bell size={16} className="text-gray-400" />
          <h2 className="text-sm font-bold text-gray-900">Notification Preferences</h2>
        </div>
        <div className="p-6 flex flex-col divide-y divide-gray-100">
          {[
            { label: "New buyer inquiries",       desc: "Get notified when a buyer contacts you about your assets." },
            { label: "Price updates",             desc: "Receive alerts when comparable assets change pricing."      },
            { label: "Market intelligence digest", desc: "Weekly summary of market trends in your sectors."          },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <button className="w-11 h-6 bg-gray-900 rounded-full relative shrink-0">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
