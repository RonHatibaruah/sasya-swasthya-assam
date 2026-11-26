import React, { useState } from 'react';
import { 
  X, 
  Sprout, 
  Layers, 
  Satellite, 
  Bug, 
  Radio, 
  ShieldCheck,
  Building2,
  Plane,
  Activity,
  Map,
  ClipboardCheck,
  Sliders,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Users,
  Compass,
  AlertTriangle
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: 'dashboard' | 'gis-map' | 'field-verification' | 'citizen-portal' | 'drone-tech' | 'admin') => void;
}

type TutorialTab = 'about' | 'how-to-use' | 'roles';

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose, onNavigateTab }) => {
  const [activeTab, setActiveTab] = useState<TutorialTab>('about');

  if (!isOpen) return null;

  const handleStepJump = (tab: 'dashboard' | 'gis-map' | 'field-verification' | 'citizen-portal' | 'drone-tech' | 'admin') => {
    if (onNavigateTab) {
      onNavigateTab(tab);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-5 flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 id="tutorial-modal-title" className="text-lg font-bold flex items-center gap-2">
                Application Tutorial &amp; Guide
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium">
                  ব্যৱহাৰ নিৰ্দেশিকা
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                What SasyaSwasthya is, why it was created, and how to use every part of the platform
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Tutorial"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-white text-emerald-800 border-t-2 border-x border-emerald-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>1. What is SasyaSwasthya?</span>
          </button>

          <button
            onClick={() => setActiveTab('how-to-use')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'how-to-use'
                ? 'bg-white text-emerald-800 border-t-2 border-x border-emerald-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>2. How to Use (Step-by-Step)</span>
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'roles'
                ? 'bg-white text-emerald-800 border-t-2 border-x border-emerald-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-600" />
            <span>3. Guide by User Role</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          
          {/* TAB 1: WHAT IS SASYASWASTHYA */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              
              {/* Mission Banner */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>The Challenge: Solving Assam’s ₹1,800-Crore Annual Crop Loss</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Assam supports <strong>2.7 million farm families</strong> across 2.8 million hectares, predominantly cultivating rice (Sali and Boro paddy), mustard, tea, and pulses. Every year, virulent pests and diseases—chiefly <strong>Rice Blast</strong>, <strong>Yellow Stem Borer</strong>, and <strong>Sheath Blight</strong>—destroy <strong>25% to 35%</strong> of the harvest.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                    <span className="font-bold text-rose-700 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      The Old Reactive Approach
                    </span>
                    <p className="text-slate-600 text-[11px]">
                      Government extension officers physically visit plots only <em>after</em> plants turn yellow or dry up (Grade D/E damage). By then, farmers panic and spray expensive synthetic chemicals blindly, which poisons the Brahmaputra soil and kills natural predators.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                    <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      The SasyaSwasthya Solution
                    </span>
                    <p className="text-slate-600 text-[11px]">
                      We combine European Space Agency satellites (Sentinel-1 SAR + Sentinel-2), drone camera sensors, and weather algorithms into an automated <strong>72-hour pre-symptomatic warning system</strong>. Farmers receive advice in Assamese <em>before</em> their crops are damaged!
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Pillars Overview */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-3">
                  How The 4-Tier Space-to-Ground System Works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                      <Satellite className="w-4 h-4 text-emerald-600" />
                      <span>Tier 1: All-Weather Satellite Telemetry (Macro)</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Sentinel-2 takes 10m multi-spectral photos every 5 days. When thick monsoon clouds block optical view, Sentinel-1 Synthetic Aperture Radar (SAR) shoots microwave radar through the rainclouds to measure crop biomass.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                      <Plane className="w-4 h-4 text-sky-600" />
                      <span>Tier 2: On-Demand Drone Multispectral Fleet (Meso)</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      When satellites spot an anomaly, autonomous hybrid VTOL and hexacopter drones fly at 100 meters altitude with sub-5cm resolution, capturing 5-band multispectral and thermal IR imagery.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                      <Building2 className="w-4 h-4 text-purple-600" />
                      <span>Tier 3: Field Ground-Truthing Mobile PWA (Micro)</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Local Agriculture Development Officers (ADO) receive auto-dispatched GPS tasks. Their mobile app works offline in remote riverine chars and diagnoses leaf lesions using on-device AI in 82 milliseconds.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                      <Radio className="w-4 h-4 text-amber-600" />
                      <span>Tier 4: Sasya Seva Bilingual Advisory (Delivery)</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Farmers receive automated location-specific SMS, WhatsApp, and voice IVR alerts in Assamese (অসমীয়া), Bodo, or Bengali with precise bio-control recipes calibrated to their local Bigha acreage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Institutional Backing */}
              <div className="border-t border-slate-200 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span>Developed by <strong>Luitporiya Labs</strong> (Lead Applicant: <strong>Rajib Dutta</strong>)</span>
                <span>Track: <strong>NESFIC-D-11</strong> • Department of Agriculture &amp; ASSAC, Govt. of Assam</span>
              </div>

            </div>
          )}

          {/* TAB 2: STEP-BY-STEP HOW TO USE */}
          {activeTab === 'how-to-use' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Follow this quick 6-step walkthrough to navigate and test every feature of the live application:
              </p>

              {/* Step 1 */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-emerald-300 transition-colors shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">1</span>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      Executive Agro-Dashboard
                    </h4>
                  </div>
                  <button
                    onClick={() => handleStepJump('dashboard')}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Tab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  <strong>What to do:</strong> Check state-wide crop acreage, active outbreaks, and the overall Crop Health Index (CHI). Use the <em>"District"</em> filter at the top to focus on Kamrup, Nagaon, Jorhat, or other districts. Click on any parcel card to open the detailed diagnostic modal or click <em>"Dispatch Officer"</em> to trigger ground scouting.
                </p>
              </div>

              {/* Step 2 */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-emerald-300 transition-colors shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">2</span>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Map className="w-4 h-4 text-emerald-600" />
                      Satellite &amp; Drone WebGIS
                    </h4>
                  </div>
                  <button
                    onClick={() => handleStepJump('gis-map')}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Tab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  <strong>What to do:</strong> Explore the interactive Leaflet map of Assam. Click on any green, amber, or red parcel to inspect the farmer's Dag number, crop variety, and telemetry. Use the layer toggles in the map corner to switch between <strong>Sentinel-2 NDVI (Vigor)</strong>, <strong>NDWI (Moisture)</strong>, and <strong>High-Resolution Drone Imagery</strong>.
                </p>
              </div>

              {/* Step 3 */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-emerald-300 transition-colors shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">3</span>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                      Field Scouting &amp; PWA
                    </h4>
                  </div>
                  <button
                    onClick={() => handleStepJump('field-verification')}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Tab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  <strong>What to do:</strong> Experience the mobile Progressive Web App used by field officers. Select a pending inspection task, simulate locking RTK GPS coordinates (±0.8m), adjust the pheromone trap slider, and test the <strong>AI Leaf Pathology Scanner</strong> to classify Rice Blast or Stem Borer in real time. Submit the record to see offline-sync in action.
                </p>
              </div>

              {/* Step 4 */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-emerald-300 transition-colors shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">4</span>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-600" />
                      Farmer Advisory (Sasya Seva)
                    </h4>
                  </div>
                  <button
                    onClick={() => handleStepJump('citizen-portal')}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Tab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  <strong>What to do:</strong> View the public citizen-facing portal designed for Assam's farmers. Search for your village or Dag number, read advisories formatted in <strong>Assamese (অসমীয়া)</strong> and English, review biological IPM treatments (Trichoderma, Neem), and click <em>"Download Official Advisory PDF"</em> to generate a printable bulletin.
                </p>
              </div>

              {/* Step 5 */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-emerald-300 transition-colors shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">5</span>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Plane className="w-4 h-4 text-emerald-600" />
                      Drone Technology Suite
                    </h4>
                  </div>
                  <button
                    onClick={() => handleStepJump('drone-tech')}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Tab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  <strong>What to do:</strong> Dive into the autonomous drone specifications: review the 5-band multispectral optical payload, the Long-Wave Thermal IR sensor, the Indian NavIC (IRNSS) RTK avionics, and the onboard NVIDIA Jetson Orin Nano AI edge-computing hardware tailored for Assam's monsoons.
                </p>
              </div>

              {/* Step 6 */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white hover:border-emerald-300 transition-colors shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">6</span>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-600" />
                      Command &amp; Admin Console
                    </h4>
                  </div>
                  <button
                    onClick={() => handleStepJump('admin')}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Tab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  <strong>What to do:</strong> Inspect the government command console. Adjust the live pathogen trigger sliders (Relative Humidity, Temperature, NDVI drop threshold) to observe real-time model recalculation. Check the <strong>Cryptographic SHA-256 Audit Trail</strong> to see tamper-evident records of every alert dispatched across the state.
                </p>
              </div>

            </div>
          )}

          {/* TAB 3: USER ROLES */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              
              {/* Farmer Guide */}
              <div className="border border-emerald-200 rounded-xl p-4.5 bg-emerald-50/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <Sprout className="w-4 h-4 text-emerald-700" />
                  <span>I am a Farmer / Krishi Sakhi (কৃষক আৰু কৃষি সখী)</span>
                </div>
                <p className="text-xs text-slate-700">
                  Your primary home is the <strong>Farmer Advisory (Sasya Seva)</strong> tab. Enter your village name or Dag parcel number to check your crop's health status. When an advisory appears, follow the cultural practices (clearing water drainage) and biological solutions (Trichoderma bio-fungicide) first. All dosages are calibrated per Bigha.
                </p>
              </div>

              {/* Extension Officer Guide */}
              <div className="border border-sky-200 rounded-xl p-4.5 bg-sky-50/40 space-y-2">
                <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
                  <ClipboardCheck className="w-4 h-4 text-sky-700" />
                  <span>I am an Agricultural Development Officer (ADO / AEO)</span>
                </div>
                <p className="text-xs text-slate-700">
                  Open the <strong>Field Scouting &amp; PWA</strong> tab on your smartphone. You will see prioritized red-flagged plots sorted by outbreak urgency. Navigate to the farm, verify pheromone trap counts, photograph diseased leaves for instant edge AI diagnosis, and submit ground verification with sub-meter GPS accuracy even when completely offline.
                </p>
              </div>

              {/* State Scientist & DAO Guide */}
              <div className="border border-purple-200 rounded-xl p-4.5 bg-purple-50/40 space-y-2">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  <span>I am a State Scientist / DAO / ASSAC Analyst</span>
                </div>
                <p className="text-xs text-slate-700">
                  Utilize the <strong>Executive Agro-Dashboard</strong> and <strong>WebGIS</strong> to track multi-district disease corridors along the Brahmaputra valley. Use the <strong>Command &amp; Admin Console</strong> to tune pathogen incubation thresholds with AAU entomologists, deploy drone thermal flights, and export SHA-256 verified audit reports for disaster relief and PMFBY insurance validation.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 font-medium">
            Assam State Space Application Centre (ASSAC) &amp; Dept. of Agriculture • Luitporiya Labs
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors shadow-xs cursor-pointer"
          >
            Start Exploring App
          </button>
        </div>

      </div>
    </div>
  );
};
