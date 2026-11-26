import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Calculator, 
  BookMarked, 
  Layers, 
  Satellite, 
  Binary, 
  Plane, 
  Search, 
  CheckCircle2, 
  Info, 
  TrendingUp,
  Droplets,
  Thermometer,
  ShieldAlert,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface TechnicalDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'formulas' | 'stack' | 'glossary';

interface GlossaryItem {
  term: string;
  regionalTerm?: string;
  category: 'Agriculture' | 'Remote Sensing' | 'AI & Tech' | 'Institutions';
  definition: string;
  laymanExample: string;
}

export const TechnicalDocsModal: React.FC<TechnicalDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('formulas');
  const [glossarySearch, setGlossarySearch] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('ALL');

  if (!isOpen) return null;

  const glossaryData: GlossaryItem[] = [
    {
      term: 'Dag Number',
      regionalTerm: 'দাগ নম্বৰ (Dag No.)',
      category: 'Agriculture',
      definition: 'A unique cadastral parcel number assigned to a specific surveyed plot of agricultural land in the revenue land records of Assam (Dharitree system).',
      laymanExample: 'Like your house door number, but for an agricultural paddy plot in a village.'
    },
    {
      term: 'Patta',
      regionalTerm: 'পাট্টা (Patta)',
      category: 'Agriculture',
      definition: 'Legal title deed or land holding document issued by the Assam Revenue and Disaster Management Department proving ownership of a parcel.',
      laymanExample: 'The government legal paper proving that a particular farmer owns the land.'
    },
    {
      term: 'Bigha',
      regionalTerm: 'বিঘা (Bigha)',
      category: 'Agriculture',
      definition: 'Traditional unit of land measurement in Assam, standardized to exactly 14,400 square feet (1,337.8 square meters). 1 Bigha = 5 Katha = 100 Lessa.',
      laymanExample: 'All official pesticide doses and fertilizer recommendations in Assam are calibrated per Bigha.'
    },
    {
      term: 'Sali Paddy',
      regionalTerm: 'শালি ধান (Sali Dhan)',
      category: 'Agriculture',
      definition: 'Winter rice planted during monsoon (July–August) and harvested in November–December, constituting over 70% of Assam’s total rice production.',
      laymanExample: 'Assam’s primary main-season rice crop, heavily prone to Rice Blast during humid monsoon months.'
    },
    {
      term: 'Boro Paddy',
      regionalTerm: 'বৰো ধান (Boro Dhan)',
      category: 'Agriculture',
      definition: 'Summer rice cultivated in low-lying, flood-receding waterlogged areas during dry winter months (November to May) with supplemental irrigation.',
      laymanExample: 'Rice grown when floods dry up, vulnerable to Yellow Stem Borer stem damage.'
    },
    {
      term: 'Rice Blast',
      regionalTerm: 'ধানৰ পাতপোৰা / ব্লাষ্ট ৰোগ (Blast Rog)',
      category: 'Agriculture',
      definition: 'A deadly fungal disease caused by Magnaporthe oryzae producing diamond-shaped foliar lesions with gray centers, capable of destroying 30–50% of yield in days.',
      laymanExample: 'A fungal disease that acts like wildfire in damp, warm weather, burning paddy leaves into dry spindles.'
    },
    {
      term: 'Yellow Stem Borer',
      regionalTerm: 'মাজখোৱা পোক (Maj-Khowa Pok)',
      category: 'Agriculture',
      definition: 'Insect pest (Scirpophaga incertulas) whose larvae bore into the central paddy stem, causing "dead-hearts" at vegetative stage and "white-heads" at heading stage.',
      laymanExample: 'A caterpillar that eats the inside of the rice stem, killing the central ear before grains can fill.'
    },
    {
      term: 'Sheath Blight',
      regionalTerm: 'খোলা পঁচা ৰোগ (Khola Poncha Rog)',
      category: 'Agriculture',
      definition: 'Soil-borne fungal pathogen (Rhizoctonia solani) that causes snake-skin irregular blotches starting at the water line and climbing up the paddy stem.',
      laymanExample: 'A rotting fungus that creeps up from muddy standing water when fields are over-fertilized with nitrogen.'
    },
    {
      term: 'ETL (Economic Threshold Level)',
      regionalTerm: 'অৰ্থনৈতিক ক্ষতিৰ মাত্ৰা (ETL)',
      category: 'Agriculture',
      definition: 'The pest population density or disease severity level at which control measures must be initiated to prevent an increasing pest population from causing economic loss.',
      laymanExample: 'The tipping point: e.g., finding more than 1 egg mass per square meter means spraying is worth the money.'
    },
    {
      term: 'NDVI (Normalized Difference Vegetation Index)',
      category: 'Remote Sensing',
      definition: 'A dimensionless numerical index (-1.0 to +1.0) measuring plant canopy greenness, photosynthetic activity, and biomass using Red and Near-Infrared bands.',
      laymanExample: 'The plant vigor score: healthy paddy reflects high NIR (score 0.7–0.85); diseased or stunted paddy drops below 0.4.'
    },
    {
      term: 'NDWI (Normalized Difference Water Index)',
      category: 'Remote Sensing',
      definition: 'Satellite index measuring liquid water content in vegetation canopies or surface water bodies using Green/NIR or NIR/SWIR spectral reflectance.',
      laymanExample: 'The moisture meter: detects whether crops are parched from drought or submerged under Brahmaputra floodwaters.'
    },
    {
      term: 'SAR (Synthetic Aperture Radar)',
      category: 'Remote Sensing',
      definition: 'Active microwave satellite imaging (e.g. Sentinel-1 C-band) that transmits its own radar pulses and measures backscatter, unaffected by clouds, fog, or darkness.',
      laymanExample: 'An all-weather X-ray vision satellite that sees through heavy Assam monsoon rainclouds when optical cameras are blind.'
    },
    {
      term: 'GSD (Ground Sampling Distance)',
      category: 'Remote Sensing',
      definition: 'The physical real-world distance between the centers of two consecutive pixels in a digital satellite or drone photograph.',
      laymanExample: 'Resolution clarity: Sentinel-2 has a 10-meter GSD (1 pixel = 1 house), while our drone has 2.5-centimeter GSD (1 pixel = a single leaf blade).'
    },
    {
      term: 'RTK GNSS (Real-Time Kinematic)',
      category: 'Remote Sensing',
      definition: 'Differential satellite navigation technique that uses carrier phase measurements and ground base stations to achieve sub-centimeter positioning accuracy.',
      laymanExample: 'Ultra-accurate GPS: regular phones are off by 5–10 meters; RTK drone positioning is accurate down to 1.5 centimeters.'
    },
    {
      term: 'NavIC (IRNSS)',
      category: 'Remote Sensing',
      definition: 'Navigation with Indian Constellation: India’s sovereign independent regional satellite navigation system developed by ISRO, covering India and 1,500 km around it.',
      laymanExample: 'India’s own GPS constellation, offering superior signal lock over Northeast India’s valleys.'
    },
    {
      term: 'Edge AI (On-Device Inference)',
      category: 'AI & Tech',
      definition: 'Running machine learning algorithms locally on end-user hardware (smartphones, drones) without requiring active internet connectivity or cloud servers.',
      laymanExample: 'The AI brain lives directly inside the phone, allowing field officers to identify plant diseases deep in remote char areas with zero cellular reception.'
    },
    {
      term: 'MobileNetV3 INT8 Quantization',
      category: 'AI & Tech',
      definition: 'An ultra-compact neural network compressed from 32-bit floating point numbers to 8-bit integers, reducing model size by 75% while maintaining 95%+ accuracy.',
      laymanExample: 'Compressing a heavy 50-megabyte AI model into a tiny 4.2-megabyte engine that runs in under 0.1 seconds on a budget smartphone.'
    },
    {
      term: 'PWA (Progressive Web App)',
      category: 'AI & Tech',
      definition: 'Web technology that installs like a native mobile app from the browser, works completely offline via service workers, and stores data in local IndexedDB/SQLite.',
      laymanExample: 'A webpage that behaves like an Android app, works without internet, and saves scouting records automatically.'
    },
    {
      term: 'Cryptographic SHA-256 Ledger',
      category: 'AI & Tech',
      definition: 'Mathematical cryptographic hashing function generating a unique 64-character digital fingerprint for every advisory, disease alert, and survey log.',
      laymanExample: 'A tamper-proof digital notary seal ensuring no government record or insurance inspection can be altered secretly.'
    },
    {
      term: 'ASSAC',
      regionalTerm: 'অসম ৰাজ্যিক মহাকাশ প্ৰয়োগ কেন্দ্ৰ (ASSAC)',
      category: 'Institutions',
      definition: 'Assam State Space Application Centre, operating under the Department of Science, Technology & Climate Change, Government of Assam; the state nodal agency for remote sensing and GIS.',
      laymanExample: 'The state space agency providing satellite mapping and cadastral GIS boundaries.'
    },
    {
      term: 'AAU Jorhat',
      regionalTerm: 'অসম কৃষি বিশ্ববিদ্যালয় (AAU Jorhat)',
      category: 'Institutions',
      definition: 'Assam Agricultural University, located in Jorhat; the premier agricultural research and education institution responsible for Assam’s official Package of Practices.',
      laymanExample: 'The scientific authority that verifies disease thresholds, IPM bio-controls, and crop varieties.'
    },
    {
      term: 'ADO / AEO',
      regionalTerm: 'কৃষি উন্নয়ন বিষয়া (ADO / AEO)',
      category: 'Institutions',
      definition: 'Agricultural Development Officer / Agricultural Extension Officer: the grassroots government officers responsible for farmer advisory, pest surveillance, and scheme execution at the block/circle level.',
      laymanExample: 'The local block-level agricultural officer who physically verifies crop damage and advises farmers.'
    }
  ];

  const filteredGlossary = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                          (item.regionalTerm && item.regionalTerm.toLowerCase().includes(glossarySearch.toLowerCase())) ||
                          item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                          item.laymanExample.toLowerCase().includes(glossarySearch.toLowerCase());
    const matchesCategory = glossaryCategory === 'ALL' || item.category === glossaryCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="technical-docs-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 id="technical-docs-title" className="text-lg font-bold flex items-center gap-2">
                Technical Stack &amp; Layman Engineering Guide
                <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-medium">
                  প্ৰযুক্তি আৰু সূত্ৰ নিৰ্দেশিকা
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Engineering Stack, Mathematical Formulas Simplified, and Comprehensive Glossary (NESFIC-D-11)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Technical Guide"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'formulas'
                ? 'bg-white text-emerald-800 border-t-2 border-x border-emerald-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Formulas for Laymen (সূত্ৰসমূহ)</span>
          </button>

          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'stack'
                ? 'bg-white text-blue-800 border-t-2 border-x border-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Technical Architecture &amp; Stack</span>
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'glossary'
                ? 'bg-white text-purple-800 border-t-2 border-x border-purple-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookMarked className="w-4 h-4 text-purple-600" />
            <span>Glossary of Terms (শব্দকোষ)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          
          {/* TAB 1: FORMULAS FOR LAYMEN */}
          {activeTab === 'formulas' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-emerald-900 mb-1">
                    Science Made Simple: How We Measure Crop Health From Space &amp; Ground
                  </p>
                  <p className="text-emerald-800 leading-relaxed">
                    You don't need a degree in satellite physics or agronomy to understand how SasyaSwasthya works. Below are the key mathematical formulas our computers calculate every day, explained with plain everyday analogies that anyone can understand.
                  </p>
                </div>
              </div>

              {/* Formula Card 1: NDVI */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">1</span>
                    <h3 className="font-bold text-slate-900 text-sm">NDVI — The Plant "Greenness &amp; Energy" Score</h3>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-semibold">
                    Range: -1.0 to +1.0
                  </span>
                </div>

                <div className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center font-bold">
                  NDVI = (Near-Infrared - Red) / (Near-Infrared + Red)
                </div>

                <div className="space-y-2 text-xs">
                  <p>
                    <strong className="text-slate-900">What it actually means for a layman:</strong> Healthy rice leaves are hungry for sunlight. They greedily swallow (absorb) visible Red light to make food through photosynthesis, but they bounce back (reflect) Near-Infrared light like a mirror. When a crop falls sick with blast or stem borer, it stops absorbing red light and reflects less infrared light.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-sans">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-center">
                      <span className="font-bold text-emerald-800 block text-xs">0.70 to 0.88</span>
                      <span className="text-[11px] text-slate-600">Thriving, lush green paddy</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-center">
                      <span className="font-bold text-amber-800 block text-xs">0.40 to 0.60</span>
                      <span className="text-[11px] text-slate-600">Early stress / nutrient lack</span>
                    </div>
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 text-center">
                      <span className="font-bold text-rose-800 block text-xs">Below 0.35</span>
                      <span className="text-[11px] text-slate-600">Severe pest defoliation / necrosis</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula Card 2: NDWI */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">2</span>
                    <h3 className="font-bold text-slate-900 text-sm">NDWI — The Crop "Thirst &amp; Flood" Meter</h3>
                  </div>
                  <span className="text-xs bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-full font-mono font-semibold">
                    Range: -1.0 to +1.0
                  </span>
                </div>

                <div className="bg-slate-900 text-sky-300 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center font-bold">
                  NDWI = (Green - Near-Infrared) / (Green + Near-Infrared)
                </div>

                <div className="space-y-2 text-xs">
                  <p>
                    <strong className="text-slate-900">What it actually means for a layman:</strong> This formula detects liquid water. It tells whether standing water is flooding the paddy field after heavy rain or whether the plants are wilting from lack of water during dry winter spell.
                  </p>
                  <p className="text-slate-600">
                    <strong>Simple rule of thumb:</strong> Values greater than 0.2 indicate submerged floodwater or excess moisture; values between -0.2 and +0.2 indicate well-hydrated rice canopy; values below -0.3 mean dry soil or parched crops.
                  </p>
                </div>
              </div>

              {/* Formula Card 3: CHI */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">3</span>
                    <h3 className="font-bold text-slate-900 text-sm">CHI (Crop Health Index) — The Master Health Checkup Score</h3>
                  </div>
                  <span className="text-xs bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-full font-mono font-semibold">
                    Score: 1 to 100
                  </span>
                </div>

                <div className="bg-slate-900 text-purple-300 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center font-bold">
                  CHI = (0.35 × NDVI_norm) + (0.25 × NDWI_norm) + (0.25 × [1 - PestRisk]) + (0.15 × WeatherFavourability)
                </div>

                <div className="space-y-2 text-xs">
                  <p>
                    <strong className="text-slate-900">What it actually means for a layman:</strong> Just like a doctor gives a patient a comprehensive physical fitness score based on blood pressure, temperature, and pulse, the <strong>Crop Health Index (CHI)</strong> combines 4 diagnostic readings into one single score out of 100:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 ml-1">
                    <li><strong>35% Weight:</strong> Foliar greenness and canopy density (NDVI).</li>
                    <li><strong>25% Weight:</strong> Moisture saturation and water stress balance (NDWI).</li>
                    <li><strong>25% Weight:</strong> Inverted pest &amp; disease probability (0% outbreak risk gives full marks).</li>
                    <li><strong>15% Weight:</strong> Weather favorability (temperature, sunshine hours, rainfall).</li>
                  </ul>
                  <p className="font-semibold text-slate-800 pt-1">
                    Score 85–100: Grade A (Thriving) • 70–84: Grade B (Good) • 50–69: Grade C (Warning) • Below 50: Grade D (Critical Emergency).
                  </p>
                </div>
              </div>

              {/* Formula Card 4: Epidemiological Rice Blast Spore Model */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">4</span>
                    <h3 className="font-bold text-slate-900 text-sm">Rice Blast Spore Forecast — The Disease Warning Incubator</h3>
                  </div>
                  <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-mono font-semibold">
                    Lead Time: 72 Hours Ahead
                  </span>
                </div>

                <div className="bg-slate-900 text-amber-300 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center font-bold">
                  Outbreak Trigger = (Temp: 20°C–28°C) AND (Relative Humidity Greater than 88% for ≥ 14 Hours) AND (Leaf Wetness Duration)
                </div>

                <div className="space-y-2 text-xs">
                  <p>
                    <strong className="text-slate-900">What it actually means for a layman:</strong> Fungal blast spores need greenhouse-like conditions to germinate: gentle warmth and damp air. If nighttime humidity stays sticky above 88% for 14 hours straight while dew sits on the leaves, the spores wake up and penetrate the leaf cuticle. Our system detects this weather pattern and warns the farmer <strong>3 days before</strong> yellow spindle burns appear on the rice plants!
                  </p>
                </div>
              </div>

              {/* Formula Card 5: Stem Borer GDD */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">5</span>
                    <h3 className="font-bold text-slate-900 text-sm">Growing Degree Days (GDD) — The Insect Biological Clock</h3>
                  </div>
                  <span className="text-xs bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full font-mono font-semibold">
                    Threshold: T_base = 10°C
                  </span>
                </div>

                <div className="bg-slate-900 text-rose-300 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center font-bold">
                  GDD = ∑ max(0, [(Max Daily Temp + Min Daily Temp) / 2] - 10°C)
                </div>

                <div className="space-y-2 text-xs">
                  <p>
                    <strong className="text-slate-900">What it actually means for a layman:</strong> Insects don't read calendars; they grow according to heat! The hotter each day is above 10°C, the faster Stem Borer eggs hatch. By adding up daily heat units (GDD), the computer knows the exact week when millions of tiny borers will hatch and crawl into the rice stems, signaling farmers to install pheromone traps at the precise moment.
                  </p>
                </div>
              </div>

              {/* Formula Card 6: CCE Yield Normalization */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">6</span>
                    <h3 className="font-bold text-slate-900 text-sm">Crop Cutting Yield — Standardizing Harvest Moisture to 14%</h3>
                  </div>
                  <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full font-mono font-semibold">
                    Plot Size: 5m × 5m (25 m²)
                  </span>
                </div>

                <div className="bg-slate-900 text-teal-300 p-3 rounded-lg font-mono text-xs overflow-x-auto text-center font-bold">
                  Yield (kg/ha) = (Harvest Weight / Plot Area) × 10,000 × [(100 - Field Moisture %) / (100 - 14%)]
                </div>

                <div className="space-y-2 text-xs">
                  <p>
                    <strong className="text-slate-900">What it actually means for a layman:</strong> Wet freshly harvested grain is heavy because of trapped water. If one farmer cuts their crop on a rainy day and another on a sunny day, raw weights are unfair. This formula mathematically dries all grain down to the government standard moisture level of 14%, ensuring crop yield figures and insurance payouts are 100% fair and scientifically comparable.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: TECHNICAL STACK & ARCHITECTURE */}
          {activeTab === 'stack' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 flex items-start gap-3">
                <Layers className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-blue-900 mb-1">
                    Production Architecture &amp; Engineering Pipeline
                  </p>
                  <p className="text-blue-800 leading-relaxed">
                    SasyaSwasthya is built as an edge-delivered, cloud-native geospatial platform engineered to handle intermittent rural connectivity, massive multi-spectral satellite GeoTIFF rasters, and on-device neural inferencing.
                  </p>
                </div>
              </div>

              {/* Stack Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Frontend */}
                <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>1. Presentation Layer (Frontend)</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>React 18 &amp; TypeScript:</strong> Type-safe interactive user interface following strict GIGW guidelines.</li>
                    <li><strong>Tailwind CSS:</strong> Highly responsive, high-contrast clean white aesthetic (`bg-slate-50`).</li>
                    <li><strong>Leaflet WebGIS Engine:</strong> Smooth vector parcel rendering with custom GeoJSON polygon layers.</li>
                    <li><strong>Vite 5:</strong> Lightning-fast compilation with tree-shaken production bundles.</li>
                  </ul>
                </div>

                {/* 2. Space & Radar Pipelines */}
                <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                    <Satellite className="w-4 h-4 text-sky-600" />
                    <span>2. Space Telemetry &amp; Radar Pipelines</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>Copernicus Sentinel-2:</strong> 10-meter optical bands (B2, B3, B4, B8, B11) refreshed every 5 days.</li>
                    <li><strong>Sentinel-1 C-Band SAR:</strong> Dual-polarization (VV/VH) microwave radar penetrating monsoon clouds.</li>
                    <li><strong>NASA Landsat 8/9:</strong> 100m Thermal Infrared sensor for regional baseline calibration.</li>
                    <li><strong>IMD Automatic Weather Stations:</strong> Hourly rainfall, humidity, and temperature ingestion.</li>
                  </ul>
                </div>

                {/* 3. Edge AI & Computer Vision */}
                <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-2 text-purple-800 font-bold text-sm">
                    <Binary className="w-4 h-4 text-purple-600" />
                    <span>3. Edge AI &amp; Machine Learning</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>MobileNetV3-Small:</strong> Convolutional neural network trained on 42,000 crop pathology samples.</li>
                    <li><strong>INT8 Quantization:</strong> Compact 4.2 MB model size for sub-100ms offline browser inference.</li>
                    <li><strong>ONNX Runtime Web / WebAssembly:</strong> Runs in-browser without server roundtrips or internet.</li>
                    <li><strong>Epidemiological Decision Trees:</strong> Multi-variate spore incubation risk predictors.</li>
                  </ul>
                </div>

                {/* 4. Drone Hardware & Avionics */}
                <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                    <Plane className="w-4 h-4 text-amber-600" />
                    <span>4. Drone Avionics &amp; Sensors</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>NavIC (IRNSS) RTK/PPK GNSS:</strong> Centimeter-precision spatial locking (sub-1.5 cm).</li>
                    <li><strong>5-Band Multispectral Camera:</strong> Coastal Blue, Green, Red, RedEdge, and NIR sensors.</li>
                    <li><strong>Long-Wave Thermal IR:</strong> Microbolometer capturing sub-canopy transpirational cooling.</li>
                    <li><strong>NVIDIA Jetson Orin Nano:</strong> 40 TOPS edge computer for real-time aerial dead-heart mapping.</li>
                  </ul>
                </div>

                {/* 5. Cloud & Edge Infrastructure */}
                <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <span>5. Cloud &amp; Edge Infrastructure</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>Cloudflare Pages &amp; Edge Workers:</strong> Global edge delivery with sub-50ms latency in Assam.</li>
                    <li><strong>Cloudflare R2 Object Storage:</strong> High-capacity storage for drone orthomosaics and rasters.</li>
                    <li><strong>PostgreSQL 16 + PostGIS:</strong> Spatial indexing of cadastral Dag polygons and parcels.</li>
                    <li><strong>Redis 7:</strong> Telemetry caching and high-frequency real-time notification queues.</li>
                  </ul>
                </div>

                {/* 6. Security & Governance */}
                <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>6. Security, Privacy &amp; Governance</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong>DPDPA 2023 Compliance:</strong> PII decoupling and AES-256 encryption for farmer phone numbers.</li>
                    <li><strong>National Geospatial Policy 2022:</strong> Sovereign hosting within domestic Indian boundaries.</li>
                    <li><strong>SHA-256 Audit Trail:</strong> Immutable cryptographic hashing of all advisory broadcasts.</li>
                    <li><strong>DGCA Drone Rules 2021:</strong> Digital Sky Green Zone compliance, geo-fencing, and RTH failsafes.</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: GLOSSARY OF TERMS */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Search terms, Assamese words (দাগ, বিঘা, ব্লাষ্ট), definitions..."
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 shrink-0 font-medium">Category:</span>
                  <select
                    value={glossaryCategory}
                    onChange={(e) => setGlossaryCategory(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium cursor-pointer"
                  >
                    <option value="ALL">All Categories ({glossaryData.length})</option>
                    <option value="Agriculture">Agriculture &amp; Local ({glossaryData.filter(i => i.category === 'Agriculture').length})</option>
                    <option value="Remote Sensing">Remote Sensing &amp; Space ({glossaryData.filter(i => i.category === 'Remote Sensing').length})</option>
                    <option value="AI & Tech">AI &amp; Tech ({glossaryData.filter(i => i.category === 'AI & Tech').length})</option>
                    <option value="Institutions">Institutions &amp; Roles ({glossaryData.filter(i => i.category === 'Institutions').length})</option>
                  </select>
                </div>
              </div>

              {/* Glossary List */}
              <div className="space-y-3">
                {filteredGlossary.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white hover:border-emerald-300 transition-colors shadow-2xs space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{item.term}</h4>
                        {item.regionalTerm && (
                          <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-medium">
                            {item.regionalTerm}
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.category === 'Agriculture' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        item.category === 'Remote Sensing' ? 'bg-sky-50 text-sky-800 border-sky-200' :
                        item.category === 'AI & Tech' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                        'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {item.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {item.definition}
                    </p>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-xs text-slate-600 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800">In Plain Words: </strong>
                        <span>{item.laymanExample}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredGlossary.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    No glossary terms found matching "{glossarySearch}". Try clearing your search.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 font-medium">
            Luitporiya Labs • Lead Applicant: Rajib Dutta • NESFIC-D-11
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors shadow-xs cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
