'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { Settings, Shield, CreditCard, Trash2, AlertTriangle, LogOut, Key, Globe } from "lucide-react";

export default function SettingsPage() {
  const user = useQuery(api.users.viewer);
  const { signOut } = useAuthActions();

  return (
    <div className="flex flex-col gap-8 max-w-3xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account settings and platform preferences.</p>
      </div>

      {/* Account Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Settings size={16} className="text-gray-400" />
          <h2 className="text-sm font-bold text-gray-900">Account</h2>
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Account Name</p>
              <p className="text-xs text-gray-500 mt-0.5">{user?.name || "Not set"}</p>
            </div>
            <button className="h-8 px-3 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              Edit
            </button>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Email Address</p>
              <p className="text-xs text-gray-500 mt-0.5">{user?.email || "—"}</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">Verified</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Account Type</p>
              <p className="text-xs text-gray-500 mt-0.5">Institutional Seller</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 rounded-full">Active</span>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Shield size={16} className="text-gray-400" />
          <h2 className="text-sm font-bold text-gray-900">Security</h2>
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                <Key size={15} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Password</p>
                <p className="text-xs text-gray-500 mt-0.5">Managed via your auth provider (Google / Email)</p>
              </div>
            </div>
            <button className="h-8 px-3 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              Update
            </button>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                <Shield size={15} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <button className="h-8 px-3 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Globe size={16} className="text-gray-400" />
          <h2 className="text-sm font-bold text-gray-900">Preferences</h2>
        </div>
        <div className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Default Currency</label>
            <select className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition shadow-sm">
              <option>ZAR – South African Rand</option>
              <option>USD – US Dollar</option>
              <option>EUR – Euro</option>
              <option>GBP – British Pound</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Time Zone</label>
            <select className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition shadow-sm">
              <option>Africa/Johannesburg (GMT+2)</option>
              <option>UTC</option>
              <option>America/New_York (GMT-5)</option>
              <option>Europe/London (GMT+0)</option>
            </select>
          </div>
          <div className="pt-2 flex items-center gap-3 border-t border-gray-100">
            <button className="flex items-center gap-2 h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Billing placeholder */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <CreditCard size={16} className="text-gray-400" />
          <h2 className="text-sm font-bold text-gray-900">Billing</h2>
        </div>
        <div className="p-6 flex flex-col items-center gap-3 text-center py-10">
          <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
            <CreditCard size={20} className="text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">No payment method on file</p>
            <p className="text-xs text-gray-500 mt-0.5">Add a payment method to access premium listing tiers.</p>
          </div>
          <button className="mt-1 flex items-center gap-2 h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors">
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border border-red-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-400" />
          <h2 className="text-sm font-bold text-red-700">Danger Zone</h2>
        </div>
        <div className="flex flex-col divide-y divide-red-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center">
                <LogOut size={15} className="text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Sign Out</p>
                <p className="text-xs text-gray-500 mt-0.5">Sign out of your current session on this device.</p>
              </div>
            </div>
            <button
              onClick={() => void signOut()}
              className="h-8 px-3 text-xs font-semibold text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center">
                <Trash2 size={15} className="text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Delete Account</p>
                <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all associated data.</p>
              </div>
            </div>
            <button className="h-8 px-3 text-xs font-semibold text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
