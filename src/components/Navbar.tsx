import React from 'react';
import { 
  Sprout, 
  Map, 
  ClipboardCheck, 
  Radio, 
  Activity, 
  Sliders, 
  AlertTriangle, 
  Plane, 
  ShieldAlert, 
  HelpCircle, 
  Cpu 
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'gis-map' | 'field-verification' | 'citizen-portal' | 'drone-tech' | 'admin';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  totalRecords: number;
  criticalCount: number;
  onOpenTutorial: () => void;
  onOpenTechnicalDocs?: () => void;
  onOpenDisclaimer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedDistrict,
  setSelectedDistrict,
  totalRecords,
  criticalCount,
  onOpenTutorial,
  onOpenTechnicalDocs,
  onOpenDisclaimer
}) => {
  return (
    <header className="bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Top Government Official & Lead Applicant Banner */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-100">Government of Assam</span>
          <span className="text-slate-500">•</span>
          <span>Dept. of Agriculture &amp; ASSAC</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 font-semibold">NESFIC-D-11 Track</span>
          <span className="text-slate-500 hidden md:inline">•</span>
          <span className="text-slate-300 hidden md:inline">
            Lead Applicant: <strong className="text-white">Rajib Dutta</strong> (Luitporiya Labs)
          </span>
        </div>
        <div className="flex items-center space-x-3 mt-1 sm:mt-0">
          <span className="text-slate-400 hidden lg:inline">Sentinel-2 &amp; Drone Space-to-Ground Telemetry</span>
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[11px] font-mono">
            {totalRecords} Plots Monitored
          </span>
          {criticalCount > 0 && (
            <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 animate-pulse">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              {criticalCount} Outbreaks
            </span>
          )}
        </div>
      </div>

      {/* Main App Navigation - Clean White Theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-700/20">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <a
                  href="#dashboard"
                  onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
                  className="text-xl font-extrabold tracking-tight text-slate-900 hover:text-emerald-700 transition-colors flex items-center gap-2"
                  title="SasyaSwasthya Home - Assam Crop Health Monitoring"
                  data-geo="Guwahati, Assam, India"
                >
                  SasyaSwasthya <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-semibold">শস্য স্বাস্থ্য</span>
                </a>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Crop Health Monitoring, Pest Forecasting &amp; Location-Specific Agro-Advisory Engine
              </p>
            </div>
          </div>

          {/* Quick Filter & Actions */}
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <label htmlFor="district-select" className="text-slate-500 font-medium">District:</label>
              <select
                id="district-select"
                aria-label="Filter crop records by Assam District"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-emerald-800 font-bold focus:outline-none cursor-pointer"
                data-geo="Assam, India"
              >
                <option value="ALL">All Assam Agro-Zones</option>
                <option value="Kamrup Rural">Kamrup Rural (Azara/Rani)</option>
                <option value="Nagaon">Nagaon (Raha/Kaliabor)</option>
                <option value="Jorhat">Jorhat (Titabor AAU Hub)</option>
                <option value="Barpeta">Barpeta (Howly/Mandia)</option>
                <option value="Sonitpur">Sonitpur (Dhekiajuli)</option>
                <option value="Cachar">Cachar (Silchar/Barak Valley)</option>
                <option value="Dhubri">Dhubri (Bilasipara Chars)</option>
                <option value="Golaghat">Golaghat (Bokakhat)</option>
              </select>
            </div>

            {/* Tutorial & How to Use Button */}
            <button
              onClick={onOpenTutorial}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="Tutorial: What is SasyaSwasthya and How to Use It"
              aria-label="Open Application Tutorial and Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tutorial &amp; Guide</span>
            </button>

            {/* Technical Stack, Formulas for Laymen & Glossary Button */}
            {onOpenTechnicalDocs && (
              <button
                onClick={onOpenTechnicalDocs}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 text-xs font-semibold transition-all shadow-xs cursor-pointer"
                title="View Technical Stack, Formulas for Laymen & Glossary"
                aria-label="Open Technical Architecture, Layman Formulas and Glossary"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-700" />
                <span>Tech &amp; Formulas</span>
              </button>
            )}

            {/* Disclaimer Button */}
            {onOpenDisclaimer && (
              <button
                onClick={onOpenDisclaimer}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-all shadow-xs cursor-pointer"
                title="View Agricultural &amp; Legal Disclaimer"
                aria-label="View Agricultural and Legal Disclaimer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Disclaimer</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher - SEO & GEO Friendly Semantic Anchors */}
        <nav
          aria-label="SasyaSwasthya Platform Modules"
          className="flex space-x-1 mt-3.5 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none"
        >
          <a
            href="#dashboard"
            onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
            data-geo="Assam, India"
            title="Executive Agro-Climatic Dashboard for Assam"
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Executive Agro-Dashboard</span>
          </a>

          <a
            href="#gis-viewer"
            onClick={(e) => { e.preventDefault(); setActiveTab('gis-map'); }}
            data-geo="Assam, India"
            title="Satellite Sentinel-2 & Drone Multispectral WebGIS Viewer"
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'gis-map'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Map className="w-4 h-4 text-emerald-600" />
            <span>Satellite &amp; Drone WebGIS</span>
          </a>

          <a
            href="#field-scouting"
            onClick={(e) => { e.preventDefault(); setActiveTab('field-verification'); }}
            data-geo="Assam, India"
            title="Agricultural Extension Field Scouting & Mobile Ground-Truthing PWA"
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'field-verification'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ClipboardCheck className="w-4 h-4 text-emerald-600" />
            <span>Field Scouting &amp; PWA</span>
          </a>

          <a
            href="#farmer-advisory"
            onClick={(e) => { e.preventDefault(); setActiveTab('citizen-portal'); }}
            data-geo="Assam, India"
            title="Farmer Hyper-Local Advisory and Outbreak Warning Portal (Sasya Seva)"
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'citizen-portal'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-600" />
            <span>Farmer Advisory (Sasya Seva)</span>
          </a>

          <a
            href="#drone-technology"
            onClick={(e) => { e.preventDefault(); setActiveTab('drone-tech'); }}
            data-geo="Assam, India"
            title="Drone Fleet Operations & Sub-Decimeter Multispectral Telemetry"
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'drone-tech'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Plane className="w-4 h-4 text-emerald-600" />
            <span>Drone Technology</span>
          </a>

          <a
            href="#admin-console"
            onClick={(e) => { e.preventDefault(); setActiveTab('admin'); }}
            data-geo="Assam, India"
            title="Agro-Command Center and Automated Meteorological Rule Engine Console"
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'admin'
                ? 'bg-slate-100 text-amber-800 border-b-2 border-amber-600 shadow-xs'
                : 'text-slate-600 hover:text-amber-700 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>Command &amp; Admin Console</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
