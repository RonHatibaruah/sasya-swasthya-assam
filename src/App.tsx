import React, { useState, useMemo } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { CadastralMapViewer } from './components/CadastralMapViewer';
import { FieldVerificationPortal } from './components/FieldVerificationPortal';
import { CitizenHealthPortal } from './components/CitizenHealthPortal';
import { DroneTechnologyPage } from './components/DroneTechnologyPage';
import { AdminDashboard } from './components/AdminDashboard';
import { RecordDetailModal } from './components/RecordDetailModal';
import { TutorialModal } from './components/TutorialModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { initialCropRecords, initialScoutingTasks } from './data/mockAssamCropData';
import { CropHealthRecord, FieldScoutingTask } from './types/cropHealth';
import { AgroRuleEngineConfig, DEFAULT_AGRO_CONFIG } from './services/cropIntelligenceEngine';
import { Sprout, ShieldAlert, MapPin, ExternalLink, CheckCircle } from 'lucide-react';

export function App() {
  const [records, setRecords] = useState<CropHealthRecord[]>(initialCropRecords);
  const [tasks, setTasks] = useState<FieldScoutingTask[]>(initialScoutingTasks);
  const [ruleConfig, setRuleConfig] = useState<AgroRuleEngineConfig>(DEFAULT_AGRO_CONFIG);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [inspectingRecord, setInspectingRecord] = useState<CropHealthRecord | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);

  // Synchronize hash with activeTab for SEO, deep-linking and browser navigation
  React.useEffect(() => {
    const syncTabFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'dashboard') setActiveTab('dashboard');
      else if (hash === 'gis-viewer' || hash === 'gis-map') setActiveTab('gis-map');
      else if (hash === 'field-scouting' || hash === 'field-verification') setActiveTab('field-verification');
      else if (hash === 'farmer-advisory' || hash === 'citizen-portal') setActiveTab('citizen-portal');
      else if (hash === 'drone-tech' || hash === 'drone-technology') setActiveTab('drone-tech');
      else if (hash === 'admin-console' || hash === 'admin') setActiveTab('admin');
      else if (hash === 'tutorial') setIsTutorialOpen(true);
      else if (hash === 'disclaimer') setIsDisclaimerOpen(true);
    };

    syncTabFromHash();
    window.addEventListener('hashchange', syncTabFromHash);
    return () => window.removeEventListener('hashchange', syncTabFromHash);
  }, []);

  const handleTabSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    const hashTarget = tab === 'gis-map' ? 'gis-viewer' :
                       tab === 'field-verification' ? 'field-scouting' :
                       tab === 'citizen-portal' ? 'farmer-advisory' :
                       tab === 'drone-tech' ? 'drone-technology' :
                       tab === 'admin' ? 'admin-console' : 'dashboard';
    if (window.location.hash !== `#${hashTarget}`) {
      window.history.pushState(null, '', `#${hashTarget}`);
    }
  };

  // Filter records by selected district
  const filteredRecords = useMemo(() => {
    if (selectedDistrict === 'ALL') return records;
    return records.filter(r => r.district.toLowerCase() === selectedDistrict.toLowerCase());
  }, [records, selectedDistrict]);

  // Critical counts
  const criticalCount = useMemo(() => {
    return records.filter(r => r.grade === 'GRADE_D').length;
  }, [records]);

  // Dispatch a record to Agricultural Extension Officer for field ground scouting
  const handleDispatchScouting = (record: CropHealthRecord) => {
    const newTask: FieldScoutingTask = {
      taskId: `TASK-2026-${Math.floor(100 + Math.random() * 900)}`,
      plotId: record.plotId,
      farmerName: record.farmerName,
      district: record.district,
      block: record.block,
      village: record.village,
      assignedOfficer: 'Pranab Jyoti Sarma',
      officerRole: 'ADO (Agri Dev Officer)',
      targetPest: record.primaryPest,
      priority: record.grade === 'GRADE_D' ? 'CRITICAL' : 'HIGH',
      status: 'PENDING_VISIT',
      scheduledDate: new Date().toISOString().split('T')[0],
      trapCount: 0,
      visualDefoliationPct: 0,
      scoutingNotes: 'Urgent task dispatched from Executive Dashboard following satellite stress anomaly.',
      gpsVerified: false
    };

    setTasks([newTask, ...tasks]);
    handleTabSelect('field-verification');
  };

  // Complete field task
  const handleCompleteTask = (taskId: string, trapCount: number, notes: string, defoliationPct: number) => {
    setTasks(tasks.map(t => {
      if (t.taskId === taskId) {
        return {
          ...t,
          status: 'COMPLETED',
          trapCount,
          scoutingNotes: notes,
          visualDefoliationPct: defoliationPct,
          gpsVerified: true
        };
      }
      return t;
    }));
  };

  const handleSelectRecordByPlotId = (plotId: string) => {
    const found = records.find(r => r.plotId === plotId);
    if (found) {
      setInspectingRecord(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabSelect}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        totalRecords={records.length}
        criticalCount={criticalCount}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
      />

      {/* Main Content Pane */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <ExecutiveDashboard
            records={filteredRecords}
            onSelectRecord={(r) => setInspectingRecord(r)}
            onDispatchScouting={handleDispatchScouting}
            selectedDistrict={selectedDistrict}
          />
        )}

        {activeTab === 'gis-map' && (
          <CadastralMapViewer
            records={filteredRecords}
            selectedRecord={inspectingRecord}
            onSelectRecord={(r) => setInspectingRecord(r)}
            onDispatchScouting={handleDispatchScouting}
          />
        )}

        {activeTab === 'field-verification' && (
          <FieldVerificationPortal
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onSelectRecordByPlotId={handleSelectRecordByPlotId}
          />
        )}

        {activeTab === 'citizen-portal' && (
          <CitizenHealthPortal
            records={filteredRecords}
            onSelectRecord={(r) => setInspectingRecord(r)}
          />
        )}

        {activeTab === 'drone-tech' && (
          <DroneTechnologyPage />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            records={records}
            ruleConfig={ruleConfig}
            onUpdateRuleConfig={(cfg) => setRuleConfig(cfg)}
            onResetRuleConfig={() => setRuleConfig(DEFAULT_AGRO_CONFIG)}
          />
        )}
      </main>

      {/* Detailed Telemetry & Advisory Inspection Modal */}
      <RecordDetailModal
        record={inspectingRecord}
        onClose={() => setInspectingRecord(null)}
        onDispatchScouting={handleDispatchScouting}
      />

      {/* System Guide & Challenge Architecture Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      {/* Agricultural & Legal Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => {
          setIsDisclaimerOpen(false);
          if (window.location.hash === '#disclaimer') {
            window.history.pushState(null, '', `#${activeTab === 'gis-map' ? 'gis-viewer' : activeTab === 'field-verification' ? 'field-scouting' : activeTab === 'citizen-portal' ? 'farmer-advisory' : activeTab === 'drone-tech' ? 'drone-technology' : activeTab === 'admin' ? 'admin-console' : 'dashboard'}`);
          }
        }}
      />

      {/* Persistent Disclaimer Notice Banner */}
      <aside
        id="disclaimer"
        aria-label="Platform Disclaimer and Notice"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8"
      >
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-amber-950 shadow-2xs">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="font-bold text-amber-900 text-sm">
                Agricultural &amp; Telemetry Disclaimer (কৃষি আৰু আইনী অস্বীকৃতি)
              </p>
              <p className="text-amber-800/90 mt-0.5 leading-relaxed">
                SasyaSwasthya (শস্য স্বাস্থ্য) is an intelligent decision-support and pilot platform developed by <strong>Luitporiya Labs</strong> (Lead Applicant: <strong>Rajib Dutta</strong>) for the Department of Agriculture and ASSAC, Government of Assam (NESFIC-D-11). Automated satellite NDVI/SAR indicators and disease early-warning alerts are advisory estimates and require physical ground-truthing before chemical interventions.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="shrink-0 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            aria-label="Read complete disclaimer and legal notice"
          >
            <span>Full Disclaimer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Comprehensive SEO & GEO Friendly Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-8 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Footer Row: Branding, Lead Applicant, Partners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-100">
            {/* Col 1: Platform & Organization */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <Sprout className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-slate-900 text-sm">SasyaSwasthya (শস্য স্বাস্থ্য)</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Continuous space-to-ground crop health monitoring, epidemiological pest &amp; disease early warning, and hyper-local agro-advisory engine for Assam.
              </p>
              <div className="text-emerald-800 font-semibold text-[11px]">
                Problem Track: NESFIC-D-11 Official Government Challenge
              </div>
            </div>

            {/* Col 2: Institutional Collaboration */}
            <div className="space-y-1.5 text-slate-600 text-[11px]">
              <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">Government &amp; Knowledge Partners</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Department of Agriculture, Government of Assam</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Assam State Space Application Centre (ASSAC), Science &amp; Tech Dept.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Assam Agricultural University (AAU) Jorhat</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Lead Applicant & Geographic Target */}
            <div className="space-y-2 text-[11px]">
              <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">Project Leadership</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                <p className="text-slate-900">
                  <span className="text-slate-500">Lead Applicant:</span> <strong className="text-emerald-900">Rajib Dutta</strong>
                </p>
                <p className="text-slate-700">
                  <span className="text-slate-500">Organization:</span> <strong className="text-slate-900">Luitporiya Labs</strong>
                </p>
                <p className="text-slate-500">
                  <span>Lead Architect:</span> <span className="font-mono text-slate-700">Ron Hatibaruah</span>
                </p>
                <div className="flex items-center gap-1 text-slate-500 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Guwahati, Assam, India (IN-AS)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Row: Copyright, Nav Links & Disclaimer Trigger */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div className="flex items-center space-x-2 flex-wrap text-center md:text-left">
              <span className="font-semibold text-slate-700">
                &copy; 2026 Luitporiya Labs. All rights reserved.
              </span>
              <span className="hidden sm:inline">•</span>
              <span>NESFIC-D-11 Assam Precision Agriculture</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#dashboard"
                onClick={(e) => { e.preventDefault(); handleTabSelect('dashboard'); }}
                data-geo="Assam, India"
                className="hover:text-emerald-700 transition-colors"
                title="Executive Agro-Climatic Dashboard"
              >
                Dashboard
              </a>
              <span>•</span>
              <a
                href="#gis-viewer"
                onClick={(e) => { e.preventDefault(); handleTabSelect('gis-map'); }}
                data-geo="Assam, India"
                className="hover:text-emerald-700 transition-colors"
                title="Satellite Sentinel-2 & Drone WebGIS"
              >
                WebGIS
              </a>
              <span>•</span>
              <a
                href="#field-scouting"
                onClick={(e) => { e.preventDefault(); handleTabSelect('field-verification'); }}
                data-geo="Assam, India"
                className="hover:text-emerald-700 transition-colors"
                title="Field Scouting PWA"
              >
                Field Scouting
              </a>
              <span>•</span>
              <a
                href="#farmer-advisory"
                onClick={(e) => { e.preventDefault(); handleTabSelect('citizen-portal'); }}
                data-geo="Assam, India"
                className="hover:text-emerald-700 transition-colors"
                title="Farmer Advisory (Sasya Seva)"
              >
                Sasya Seva
              </a>
              <span>•</span>
              <button
                onClick={() => setIsDisclaimerOpen(true)}
                className="text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
                title="Read Agricultural & Legal Disclaimer"
              >
                Disclaimer
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
export default App;
