'use client';

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { 
  Building2, 
  Pickaxe, 
  BarChart4, 
  Map as MapIcon, 
  Globe, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Coins,
  Info,
  Layers,
  Image as ImageIcon,
  ChevronRight
} from "lucide-react";

const ASSET_TYPES = [
  { 
    id: "Investment", 
    label: "Looking to Invest", 
    description: "Connect with junior explorers or established mines seeking capital for expansion.",
    icon: <BarChart4 size={28} />,
    color: "emerald"
  },
  { 
    id: "Acquisition", 
    label: "Buying a Mine", 
    description: "Purchase an operational mine or advanced exploration project outright.",
    icon: <Pickaxe size={28} />,
    color: "blue"
  },
  { 
    id: "Minerals", 
    label: "Want Minerals", 
    description: "Buy or sell commodities like Coal, Copper, Gold, or Lithium directly.",
    icon: <Layers size={28} />,
    color: "amber"
  },
  { 
    id: "Land", 
    label: "Commercial Land", 
    description: "Prime commercial or industrial land ready for development or mining infrastructure.",
    icon: <Building2 size={28} />,
    color: "slate"
  },
  { 
    id: "Plots", 
    label: "Plots for Sale", 
    description: "Residential or industrial plots in strategic mining or commercial hubs.",
    icon: <MapIcon size={28} />,
    color: "indigo"
  },
];

export default function NewListingForm({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const createListing = useMutation(api.listings.createListing);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    commodity: "",
    commoditySector: "Other",
    country: "",
    continent: "Africa",
    intention: "Sell",
    stage: "Exploration",
    priceMin: 0,
    currency: "ZAR",
    highlights: ["", "", ""],
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createListing({
        ...formData,
        commodityTags: [],
        images: [], // In a real app, we'd upload images first
        highlights: formData.highlights.filter(h => h.trim() !== ""),
      });
      onComplete();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all
              ${step === i ? "bg-emerald-600 text-white ring-4 ring-emerald-100" : 
                step > i ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"}`}
            >
              {step > i ? <CheckCircle2 size={20} /> : i}
            </div>
            {i < 4 && (
              <div className={`h-1 flex-1 mx-4 rounded-full transition-all
                ${step > i ? "bg-emerald-200" : "bg-gray-100"}`} 
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Category Selection */}
      {step === 1 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Select Asset Category</h2>
            <p className="text-gray-500 text-lg">What type of opportunity are you listing today?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ASSET_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setFormData({ ...formData, category: type.id });
                  handleNext();
                }}
                className={`group flex flex-col p-8 rounded-[32px] border-2 text-left transition-all hover:scale-[1.02] active:scale-[0.98]
                  ${formData.category === type.id 
                    ? "border-emerald-500 bg-emerald-50/50 shadow-xl shadow-emerald-500/10" 
                    : "border-gray-100 bg-white hover:border-emerald-200 hover:shadow-lg"}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors
                  ${formData.category === type.id ? "bg-emerald-500 text-white" : "bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"}`}>
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{type.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{type.description}</p>
                <div className="mt-auto pt-6 flex items-center text-emerald-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Select <ChevronRight size={16} className="ml-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Basic Details */}
      {step === 2 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Asset Details</h2>
            <p className="text-gray-500 text-lg">Provide a clear and compelling title for your {formData.category}.</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Asset Title</label>
              <input
                type="text"
                placeholder="e.g. Operational Copper Mine in Central Zambia"
                className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 focus:outline-none transition-all text-lg font-medium"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Commodity / Primary Asset</label>
              <input
                type="text"
                placeholder="e.g. Copper, Coal, Commercial Land"
                className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 focus:outline-none transition-all text-lg font-medium"
                value={formData.commodity}
                onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Description</label>
              <textarea
                placeholder="Describe the opportunity, key assets, and value proposition..."
                className="w-full min-h-[200px] p-6 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 focus:outline-none transition-all text-lg leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <button onClick={handleBack} className="flex items-center gap-2 font-bold text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} /> Back
            </button>
            <button onClick={handleNext} className="h-14 px-10 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              Next Step <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Location & Logistics */}
      {step === 3 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Location & Logistics</h2>
            <p className="text-gray-500 text-lg">Where is this asset located?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Country</label>
              <input
                type="text"
                placeholder="e.g. South Africa"
                className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 focus:outline-none transition-all text-lg font-medium"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Continent</label>
              <select
                className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 focus:outline-none transition-all text-lg font-medium appearance-none bg-white"
                value={formData.continent}
                onChange={(e) => setFormData({ ...formData, continent: e.target.value })}
              >
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Australia">Australia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Transaction Intention</label>
              <select
                className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 focus:outline-none transition-all text-lg font-medium appearance-none bg-white"
                value={formData.intention}
                onChange={(e) => setFormData({ ...formData, intention: e.target.value })}
              >
                <option value="Sell">Sell (Direct Sale)</option>
                <option value="Joint Venture">Joint Venture</option>
                <option value="Investment">Investment Opportunity</option>
                <option value="Lease">Lease</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Project Stage</label>
              <select
                className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 focus:outline-none transition-all text-lg font-medium appearance-none bg-white"
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              >
                <option value="Exploration">Exploration / Greenfield</option>
                <option value="Advanced Exploration">Advanced Exploration</option>
                <option value="Development">Development / Construction</option>
                <option value="Production">Active Production</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <button onClick={handleBack} className="flex items-center gap-2 font-bold text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} /> Back
            </button>
            <button onClick={handleNext} className="h-14 px-10 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              Next Step <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Pricing & Finalize */}
      {step === 4 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Pricing & Finalize</h2>
            <p className="text-gray-500 text-lg">Set your financial expectations and highlights.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Minimum Price (ZAR)</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-lg">R</div>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full h-14 pl-14 pr-6 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 focus:outline-none transition-all text-lg font-medium"
                  value={formData.priceMin}
                  onChange={(e) => setFormData({ ...formData, priceMin: Number(e.target.value) })}
                />
              </div>
              <p className="text-xs text-gray-400 font-medium italic">Leave at 0 for "Price on Application"</p>
            </div>

            <div className="space-y-6">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Key Highlights</label>
              {formData.highlights.map((h, i) => (
                <div key={i} className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500" />
                  <input
                    type="text"
                    placeholder={`Highlight ${i + 1}`}
                    className="w-full h-12 pl-12 pr-6 rounded-xl border border-gray-100 focus:border-emerald-500 focus:outline-none transition-all text-base"
                    value={h}
                    onChange={(e) => {
                      const newH = [...formData.highlights];
                      newH[i] = e.target.value;
                      setFormData({ ...formData, highlights: newH });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <Info size={20} className="text-gray-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">Institutional Review</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Your listing will be submitted for verification by our institutional review board. 
                  Once approved, it will be visible to thousands of verified institutional buyers.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <button onClick={handleBack} className="flex items-center gap-2 font-bold text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} /> Back
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="h-16 px-12 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Publish Listing"}
              <CheckCircle2 size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
