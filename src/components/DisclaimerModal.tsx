import React from 'react';
import { ShieldAlert, X, AlertTriangle, FileText, CheckCircle2, Building, Scale, MapPin } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-5 flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 id="disclaimer-title" className="text-lg font-bold flex items-center gap-2">
                Agricultural & Legal Disclaimer
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
                  আইনী আৰু কৃষি অস্বীকৃতি
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                SasyaSwasthya (শস্য স্বাস্থ্য) • NESFIC-D-11 Official Government Track
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Disclaimer Modal"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700 leading-relaxed">
          
          {/* Key Entity Notice Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Building className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900">Developed by Luitporiya Labs</p>
                <p className="text-emerald-700">Lead Applicant: <span className="font-semibold text-slate-900">Rajib Dutta</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shadow-2xs">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Guwahati, Assam, India (IN-AS)</span>
            </div>
          </div>

          {/* Section 1: Advisory & Decision-Support Nature */}
          <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              1. Decision-Support & Research Demonstration
            </h3>
            <p className="text-xs text-slate-600 mb-2">
              <strong>SasyaSwasthya (শস্য স্বাস্থ্য)</strong> is an advanced agricultural intelligence prototype designed for the Department of Agriculture and the Assam State Space Application Centre (ASSAC), Department of Science &amp; Technology, Government of Assam under challenge track <strong>NESFIC-D-11</strong>.
            </p>
            <p className="text-xs text-slate-600">
              The vegetation indices (NDVI, NDWI, NDRE, Sentinel-1 SAR), epidemiological disease forecasts (Rice Blast, Yellow Stem Borer, Bacterial Leaf Blight), and yield simulations provided by this platform are automated predictive estimates. They are intended solely for agro-climatic situational awareness, research demonstration, and administrative decision support.
            </p>
          </div>

          {/* Section 2: Mandatory Physical Ground-Truthing */}
          <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Requirement for Physical Ground-Truthing &amp; Extension Corroboration
            </h3>
            <p className="text-xs text-slate-600 mb-2">
              Automated spectral anomalies do not replace mandatory on-ground agronomic diagnosis. Before initiating any chemical spraying, systemic fungicide application, or chemical pest treatment:
            </p>
            <ul className="text-xs text-slate-600 list-disc list-inside space-y-1 ml-1">
              <li>Farmers and extension agents must inspect physical crop plots and pheromone/light trap counts.</li>
              <li>Prescriptions must be corroborated by local Agricultural Development Officers (ADO) or Krishi Vigyan Kendra (KVK) scientists.</li>
              <li>Dosages must strictly adhere to the Package of Practices recommended by Assam Agricultural University (AAU) Jorhat.</li>
            </ul>
          </div>

          {/* Section 3: Limitation of Liability */}
          <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-slate-700" />
              3. Limitation of Liability
            </h3>
            <p className="text-xs text-slate-600 mb-2">
              While every effort has been made to incorporate high-resolution spatial models, Copernicus Sentinel telemetry, and Assam meteorological feeds, <strong>Luitporiya Labs</strong>, Lead Applicant <strong>Rajib Dutta</strong>, technical architects, and government collaborators shall not be held liable for:
            </p>
            <ul className="text-xs text-slate-600 list-disc list-inside space-y-1 ml-1">
              <li>Unforeseen crop yield variances, localized micro-climatic flash floods, or erratic weather events.</li>
              <li>Direct, indirect, or consequential agronomic or financial losses resulting from actions taken based on platform telemetry.</li>
              <li>Third-party satellite or weather API latency or intermittent service disruptions.</li>
            </ul>
          </div>

          {/* Section 4: Non-Statutory Notice */}
          <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              4. Non-Statutory Insurance &amp; Loss Assessment
            </h3>
            <p className="text-xs text-slate-600">
              Platform telemetry scores (CHI 1–100) and cryptographic yield certificates are technological demonstrations for administrative appraisal. They do not constitute statutory compensation certifications under PMFBY unless validated through gazetted state crop-cutting experiments (CCE) protocols.
            </p>
          </div>

          {/* Assamese Summary */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950">
            <p className="font-bold mb-1">অস্বীকৃতি (সংক্ষিপ্ত সাৰাংশ):</p>
            <p className="leading-relaxed">
              শস্য স্বাস্থ্য (SasyaSwasthya) হৈছে অসম চৰকাৰৰ কৃষি বিভাগ আৰু অসম ৰাজ্যিক মহাকাশ প্ৰয়োগ কেন্দ্ৰ (ASSAC)ৰ বাবে লুইতপৰীয়া লেব্‌ছ (Luitporiya Labs, মুখ্য আবেদনকাৰী: ৰাজীৱ দত্ত) দ্বাৰা বিকশিত এক উপগ্ৰহ আৰু এআই-ভিত্তিক পাইলট প্ৰকল্প। ইয়াত প্ৰদৰ্শিত সকলো তথ্য আৰু আগতীয়া সতৰ্কবাণী কেৱল পৰামৰ্শমূলক। কোনো ৰাসায়নিক কীটনাশক প্ৰয়োগৰ পূৰ্বে স্থানীয় কৃষি বিষয়া (ADO) বা কৃষি বিজ্ঞান কেন্দ্ৰ (KVK)ৰ সৈতে পৰামৰ্শ লোৱাটো বাধ্যতামূলক।
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 font-medium">
            &copy; 2026 Luitporiya Labs. All rights reserved.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors shadow-xs"
          >
            I Understand &amp; Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
};
