# ADDITIONAL SUPPORTING MATERIAL & TECHNICAL FEASIBILITY STUDY
**NESFIC-D-11: Crop Health Monitoring, Pest & Disease Forecasting and Location-Specific Advisory**  
**Lead Applicant & Organization:** Rajib Dutta | Luitporiya Labs  
**Lead Solutions Architect:** Ron Hatibaruah  
**Challenge Owners:** Department of Agriculture, Government of Assam & Assam State Space Application Centre (ASSAC)  
**Academic Partner:** Assam Agricultural University (AAU), Jorhat  
**Live Production Platform:** https://sasya-swasthya.pages.dev  
**Document Purpose:** Supplemental Feasibility, Agro-Ecological Zone Mapping & Rollout Study

---

## 1. Agro-Ecological Zone Customization for Assam

Assam spans six distinct Agro-Climatic Zones, each with unique pathogen vulnerabilities, rainfall distributions, and cropping calendars:

| Agro-Climatic Zone | Key Districts | Dominant Crops | Major Pathogen Threat | Specialized SasyaSwasthya Calibration |
| :--- | :--- | :--- | :--- | :--- |
| **Upper Brahmaputra Valley** | Jorhat, Golaghat, Sivasagar, Dibrugarh | Sali Paddy, Tea, Mustard | Rice Blast & Sheath Blight | High humidity (>90% RH) spore trigger; tea mosquito bug thermal model. |
| **Central Brahmaputra Valley** | Nagaon, Morigaon | Sali/Boro Paddy, Jute, Pulses | Yellow Stem Borer & Blast | Flood-recession radar backscatter; larval emergence degree-days. |
| **Lower Brahmaputra Valley** | Kamrup, Barpeta, Nalbari, Goalpara | Sali/Ahu Paddy, Vegetables | Brown Planthopper & Blight | High cropping density hopper-burn detection; alleyway water drainage alerts. |
| **North Bank Plain** | Sonitpur, Darrang, Lakhimpur, Dhemaji | Sali/Boro Paddy, Mustard | Rice Blast & Mustard Aphids | Heavy riverine sand inundation; early aphid cloud-cover temperature model. |
| **Barak Valley** | Cachar, Karimganj, Hailakandi | Boro/Sali Paddy, Betel Vine | Sheath Blight & Bacterial Leaf Streak | Flash-flood waterlogging index (NDWI); Bengali dialect advisory templates. |
| **Hills Zone** | Karbi Anglong, Dima Hasao | Jhum/Terraced Paddy, Ginger, Maize | Blast & Stem Borer | Topographic slope shadow correction for Sentinel-2; Bodo dialect templates. |

---

## 2. Institutional Integration Framework

SasyaSwasthya is designed to operate as a sovereign component of the **Assam State Data Centre (ASDC)** and interoperate with existing departmental IT systems:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   STATE INSTITUTIONAL DATA INTERCHANGE                 │
├─────────────────────┬──────────────────┬───────────────────────────────┤
│ Institutional Node  │ Data Exchanged   │ Interoperability Protocol     │
├─────────────────────┼──────────────────┼───────────────────────────────┤
│ ASSAC Remote        │ Cadastral Dags,  │ OGC Standards: WMS / WFS      │
│ Sensing Centre      │ Drone GeoTIFFs   │ RESTful GeoJSON API (FastAPI) │
├─────────────────────┼──────────────────┼───────────────────────────────┤
│ Directorate of      │ Extension Roster,│ Secure OAuth 2.0 / JWT        │
│ Agriculture         │ Fertilizer Quotas│ Role-Based Admin Controls     │
├─────────────────────┼──────────────────┼───────────────────────────────┤
│ Assam Agricultural  │ Disease Spore    │ Scientific Calibration Portal │
│ University (AAU)    │ Thresholds, ETLs │ Pathogen Rule Builder API     │
├─────────────────────┼──────────────────┼───────────────────────────────┤
│ India Meteorological│ Hourly Automated │ JSON Weather Push Stream      │
│ Department (IMD)    │ Weather (AWS)    │ Microclimate Grid Ingestion   │
├─────────────────────┼──────────────────┼───────────────────────────────┤
│ Telecom Service     │ Vernacular SMS & │ CDAC / NIC National Mobile    │
│ Providers (TSPs)    │ WhatsApp Cards   │ Messaging Gateway             │
└─────────────────────┴──────────────────┴───────────────────────────────┘
```

---

## 3. Financial Sustainability & Scaled Cost Modeling

The platform operates on open-source frameworks (Python, PostgreSQL, PostGIS, React, Vite) and open Earth observation streams (Copernicus Sentinel-1/2), ensuring that the Government of Assam incurs **zero recurring proprietary software license fees**.

| Budget Head / Cost Driver | Initial Setup & Pilot (Months 1–9) | Scaled State Rollout (Years 2–3) | Cost Efficiency Advantage |
| :--- | :--- | :--- | :--- |
| **Earth Observation Data** | ₹0 (Copernicus Open Access) | ₹0 (Copernicus Open Access) | Saves ₹1.8 Crore vs commercial imagery |
| **Core Software Platform** | Custom Built (Open Source) | State Owned (No Per-Seat Fee) | 100% Sovereign IP with zero vendor lock-in |
| **Cloud Edge Hosting** | ₹1.2 Lakh (Cloudflare Edge) | ₹3.5 Lakh / Year (State ASDC) | Distributed edge latency <50ms statewide |
| **Drone Hardware Assets** | ₹18.0 Lakh (2 Custom RTK UAVs) | ₹45.0 Lakh (Fleet of 5 UAVs) | Sub-cadastral 5cm micro-canopy scouting |
| **Telecom Broadcast Delivery** | ₹2.5 Lakh (Pilot SMS/WhatsApp) | ₹8.0 Lakh / Year (National Gateway)| Bulk subsidized farmer advisory rates |

---

## 4. Disaster Resilience & PMFBY Crop Insurance Synergy

Under the Pradhan Mantri Fasal Bima Yojana (PMFBY), assessing localized pest damage has historically required slow, contentious crop-cutting experiments (CCEs). SasyaSwasthya transforms this by establishing:
1. **Continuous Empirical Vegetation Indices:** Historical 5-year NDVI/NDWI curves prove baseline crop vigor prior to pest or flood devastation.
2. **Cryptographic SHA-256 Audit Records:** Every satellite-flagged stress event and ground-truthed ADO photo is immutable and tamper-evident.
3. **Objective Spatial Loss Demarcation:** Cadastral Dag polygons delineate exact damaged acreage, expediting insurance claim settlements for distressed farming households.
