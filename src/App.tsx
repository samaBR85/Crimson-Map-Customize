import React, { useState, useRef } from 'react';
import { Download, Upload, Globe, Palette, Shield, Wind, Monitor, ChevronDown, Check, Undo, Redo, Layers, Mountain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- DADOS INICIAIS ---
const RAW_DATA = [
  {"mod": "#030405", "vanilla": "background-color: #dae1e3;"},
  {"mod": "#c3cfe6", "vanilla": "background-color: #352a27bf;"},
  {"mod": "#e27b74", "vanilla": "background-color: #d14d45;"},
  {"mod": "#021424", "preset": "preset-worldmap", "vanilla": "_originalColorTint: color, #10314bff;"},
  {"mod": "#55513C", "preset": "preset-worldmap", "vanilla": "_mapLandOutlineColor: color, #53553cff;"},
  {"mod": "#5a6d80", "preset": "preset-worldmap", "vanilla": "_mapSeaOutlineColor: color, #6f7778ff;"},
  {"mod": "#01060C", "preset": "preset-worldmap-overfog", "vanilla": "_originalColorTint: color, #10314bff;"},
  {"mod": "#53553c", "preset": "preset-worldmap-overfog", "vanilla": "_mapLandOutlineColor: color, #53553cff;"},
  {"mod": "#6f7778", "preset": "preset-worldmap-overfog", "vanilla": "_mapSeaOutlineColor: color, #6f7778ff;"},
  {"mod": "#030405", "preset": "preset-worldmap-2", "vanilla": "_originalColorTint: color, #c3cfe6ff;"},
  {"mod": "#554D3C", "preset": "preset-worldmap-2", "vanilla": "_mapLandOutlineColor: color, #7c7f5bff;"},
  {"mod": "#060708", "preset": "preset-worldmap-sea", "vanilla": "_originalColorTint: color, #afbcd3ff;"},
  {"mod": "#010102", "preset": "preset-worldmap-fog", "vanilla": "_originalColorTint: color, #7b8391ff;"},
  {"mod": "#010101", "preset": "preset-worldmap-none-play-region", "vanilla": "_originalColorTint: color, #7b8391ff;"},
  {"mod": "#766d56", "preset": "preset-worldmap-road", "vanilla": "_originalColorTint: color, #5c6475ff;"},
  {"mod": "#685f4b", "preset": "preset-worldmap-road", "vanilla": "_mapLandOutlineColor: color, #a2987fff;"},
  {"mod": "#a2987f", "preset": "preset-worldmap-abyss-background-hex", "vanilla": "_mapLandOutlineColor: color, #a2987fff;"},
  {"mod": "#131C13", "preset": "preset-worldmap-mountain", "vanilla": "_originalColorTint: color, #707e6fff;"},
  {"mod": "#394534", "preset": "preset-worldmap-mountain", "vanilla": "_mapLandOutlineColor: color, #7f8d79ff;"},
  {"mod": "#252523", "preset": "preset-worldmap-height-line", "vanilla": "_originalColorTint: color, #252523ff;"},
  {"mod": "#67866e", "preset": "preset-worldmap-region-domain-faction", "vanilla": "_originalColorTint: color, #67866e;"},
  {"mod": "#3F6073", "preset": "preset-worldmap-region-religion-area", "vanilla": "_originalColorTint: color, #8fd6ff;"},
  {"mod": "#030405", "preset": "preset-worldmap-abyss-background-hex", "vanilla": "_originalColorTint: color, #7d9cd2;"},
  {"mod": "#030405", "preset": "preset-worldmap-abyss-loading", "vanilla": "_originalColorTint: color, #494b4eff;"},
  {"mod": "#030405", "preset": "preset-worldmap-loading", "vanilla": "_originalColorTint: color, #494b4eff;"},
  {"mod": "#030405", "preset": "preset-worldmap-loading-2", "vanilla": "_originalColorTint: color, #949dacff;"},
  {"mod": "#010102", "preset": "preset-worldmap-abyss-fog", "vanilla": "_originalColorTint: color, #535758ff;"},
  {"mod": "#060608", "preset": "preset-worldmap-abyss-border-fog", "vanilla": "_originalColorTint: color, #717779ff;"},
  {"mod": "#802020", "preset": "preset-worldmap-wanted-region", "vanilla": "_originalColorTint: color, #290303ff;"},
  {"mod": "#290303", "preset": "preset-worldmap-restricted-area-town", "vanilla": "_originalColorTint: color, #802020ff;"},
  {"mod": "#802020", "preset": "preset-worldmap-restricted-area-gameplay-trigger", "vanilla": "_originalColorTint: color, #802020ff;"},
  {"mod": "#ffffff", "preset": "preset-worldmap-faction-region", "vanilla": "_originalColorTint: color, #ffffffff;"}
];

const CUSTOM_PALETTES = {
  CyberPunk: { bg: "#020202", sea: "#1b2b1b", seaStr: "#00f0ff", land: "#3d2b1f", land2: "#4a3728", landStr: "#ff003c", mountain: "#2a2a2a", mountainStr: "#7000ff", road: "#fcee0a", roadStr: "#ff003c", river: "#00ffff", riverStr: "#39ff14", riverDepth: "#006666", faction: "#39ff14", faction2: "#00ff9f", religion: "#bc13fe", wanted: "#ff003c", restricted: "#1a002a", danger: "#ff0000", fog: "#1a002a", fog2: "#2a004a", abyss: "#000000", abyss2: "#050505", abyssBorder: "#7000ff", overfog: "#0a1a2f", overfogStr: "#00f0ff", heightLine: "#30363d", nonePlay: "#000000", loading: "#0b0c10", ui: "#00f0ff" },
  RomeroBritto: { bg: "#FFCC00", sea: "#85E21F", seaStr: "#000000", land: "#A0522D", land2: "#8B4513", landStr: "#000000", mountain: "#9D00FF", mountainStr: "#000000", road: "#FF007F", roadStr: "#000000", river: "#00A8FF", riverStr: "#000000", riverDepth: "#005580", faction: "#FF3399", faction2: "#FFCC00", religion: "#C70039", wanted: "#FF0000", restricted: "#581845", danger: "#FFC300", fog: "#FFFFFF", fog2: "#F0F0F0", abyss: "#000000", abyss2: "#111111", abyssBorder: "#000000", overfog: "#FFCC00", overfogStr: "#000000", heightLine: "#000000", nonePlay: "#FFCC00", loading: "#FFCC00", ui: "#000000" },
  Mondrian: { bg: "#f5f5f5", sea: "#228B22", seaStr: "#000000", land: "#D2B48C", land2: "#C19A6B", landStr: "#000000", mountain: "#E3000F", mountainStr: "#000000", road: "#FFD100", roadStr: "#000000", river: "#0055A4", riverStr: "#000000", riverDepth: "#003366", faction: "#0055A4", faction2: "#E3000F", religion: "#FFD100", wanted: "#E3000F", restricted: "#000000", danger: "#E3000F", fog: "#F4F4F4", fog2: "#E0E0E0", abyss: "#111111", abyss2: "#000000", abyssBorder: "#000000", overfog: "#FFFFFF", overfogStr: "#000000", heightLine: "#000000", nonePlay: "#FFFFFF", loading: "#F4F4F4", ui: "#000000" },
  FalloutPipBoy: { bg: "#020d01", sea: "#1a4d1a", seaStr: "#15d600", land: "#3d2b1f", land2: "#2a1a0a", landStr: "#15d600", mountain: "#228b22", mountainStr: "#15d600", road: "#15d600", roadStr: "#0a2e05", river: "#00ffff", riverStr: "#22ff00", riverDepth: "#006666", faction: "#22ff00", faction2: "#15d600", religion: "#117806", wanted: "#15d600", restricted: "#041202", danger: "#15d600", fog: "#041202", fog2: "#082504", abyss: "#000000", abyss2: "#051c03", abyssBorder: "#15d600", overfog: "#051c03", overfogStr: "#15d600", heightLine: "#15d600", nonePlay: "#051c03", loading: "#041202", ui: "#15d600" },
  GameBoyClassic: { bg: "#9bbc0f", sea: "#306230", seaStr: "#0f380f", land: "#8bac0f", land2: "#0f380f", landStr: "#0f380f", mountain: "#0f380f", mountainStr: "#306230", road: "#306230", roadStr: "#0f380f", river: "#0f380f", riverStr: "#306230", riverDepth: "#0f380f", faction: "#9bbc0f", faction2: "#8bac0f", religion: "#306230", wanted: "#0f380f", restricted: "#8bac0f", danger: "#0f380f", fog: "#8bac0f", fog2: "#9bbc0f", abyss: "#0f380f", abyss2: "#306230", abyssBorder: "#0f380f", overfog: "#8bac0f", overfogStr: "#0f380f", heightLine: "#0f380f", nonePlay: "#8bac0f", loading: "#9bbc0f", ui: "#0f380f" },
  Persona5: { bg: "#ff0000", sea: "#228B22", seaStr: "#000000", land: "#8B4513", land2: "#5D2906", landStr: "#000000", mountain: "#111111", mountainStr: "#ffffff", road: "#000000", roadStr: "#ffffff", river: "#0088ff", riverStr: "#ff0000", riverDepth: "#004488", faction: "#ffffff", faction2: "#000000", religion: "#ff0000", wanted: "#ff0000", restricted: "#000000", danger: "#ffffff", fog: "#000000", fog2: "#111111", abyss: "#000000", abyss2: "#111111", abyssBorder: "#ff0000", overfog: "#ff0000", overfogStr: "#ffffff", heightLine: "#000000", nonePlay: "#ff0000", loading: "#ff0000", ui: "#ffffff" },
  ZeldaBotw: { bg: "#c1cca5", sea: "#4a5d23", seaStr: "#2c3e50", land: "#8b5a2b", land2: "#5d3a1a", landStr: "#3b312a", mountain: "#7c8e74", mountainStr: "#3b312a", road: "#dcd0a6", roadStr: "#3b312a", river: "#3498db", riverStr: "#1c3d5a", riverDepth: "#152c3e", faction: "#b6cba1", faction2: "#7c8e74", religion: "#69aeb8", wanted: "#d04b49", restricted: "#3b312a", danger: "#d04b49", fog: "#e4dec8", fog2: "#f5f5f0", abyss: "#1a1a1a", abyss2: "#3b312a", abyssBorder: "#5da9b3", overfog: "#c1cca5", overfogStr: "#3b312a", heightLine: "#3b312a", nonePlay: "#c1cca5", loading: "#e2d7b5", ui: "#00f3ff" },
  Skyrim: { bg: "#d7cdba", sea: "#3d4a2a", seaStr: "#2a221b", land: "#5d4a37", land2: "#3d2b1f", landStr: "#2a221b", mountain: "#695e53", mountainStr: "#2a221b", road: "#544434", roadStr: "#2a221b", river: "#4facfe", riverStr: "#2a221b", riverDepth: "#1c2329", faction: "#82786a", faction2: "#695e53", religion: "#c1bba4", wanted: "#7a3124", restricted: "#2a221b", danger: "#7a3124", fog: "#dcd3bd", fog2: "#f5f5f0", abyss: "#000000", abyss2: "#2a221b", abyssBorder: "#695e53", overfog: "#d7cdba", overfogStr: "#2a221b", heightLine: "#2a221b", nonePlay: "#d7cdba", loading: "#ebdcc8", ui: "#2a221b" },
  MirrorsEdge: { bg: "#f0f0f0", sea: "#228B22", seaStr: "#000000", land: "#8B4513", land2: "#A0522D", landStr: "#000000", mountain: "#cccccc", mountainStr: "#000000", road: "#ff0000", roadStr: "#000000", river: "#0088ff", riverStr: "#000000", riverDepth: "#004488", faction: "#ffaa00", faction2: "#0088ff", religion: "#ff0000", wanted: "#ff0000", restricted: "#000000", danger: "#ff0000", fog: "#ffffff", fog2: "#f0f0f0", abyss: "#000000", abyss2: "#111111", abyssBorder: "#ff0000", overfog: "#ffffff", overfogStr: "#000000", heightLine: "#000000", nonePlay: "#ffffff", loading: "#ffffff", ui: "#000000" },
  Doom: { bg: "#551100", sea: "#221100", seaStr: "#ff3300", land: "#442200", land2: "#331100", landStr: "#ff3300", mountain: "#110000", mountainStr: "#ff3300", road: "#ffaa00", roadStr: "#ff3300", river: "#00ffff", riverStr: "#ffcc00", riverDepth: "#006666", faction: "#cc0000", faction2: "#ff0000", religion: "#440000", wanted: "#ff0000", restricted: "#110000", danger: "#ff3300", fog: "#110000", fog2: "#220000", abyss: "#000000", abyss2: "#110000", abyssBorder: "#ff3300", overfog: "#551100", overfogStr: "#ff3300", heightLine: "#ff3300", nonePlay: "#551100", loading: "#110000", ui: "#ff3300" },
  Synthwave: { bg: "#0a051a", sea: "#1a3a1a", seaStr: "#ff00ff", land: "#3d1f0d", land2: "#2a150a", landStr: "#00ffff", mountain: "#440066", mountainStr: "#ff00ff", road: "#00ffff", roadStr: "#ff00ff", river: "#00ffff", riverStr: "#ff00ff", riverDepth: "#006666", faction: "#ff00aa", faction2: "#ff00ff", religion: "#00ffff", wanted: "#ff0000", restricted: "#110022", danger: "#ff00ff", fog: "#110022", fog2: "#220044", abyss: "#000000", abyss2: "#110033", abyssBorder: "#ff00ff", overfog: "#110033", overfogStr: "#00ffff", heightLine: "#00ffff", nonePlay: "#110033", loading: "#0a0a1a", ui: "#00ffff" },
  Vaporwave: { bg: "#ffb6c1", sea: "#90ee90", seaStr: "#ff77ff", land: "#d2b48c", land2: "#c19a6b", landStr: "#ff77ff", mountain: "#aa77ff", mountainStr: "#ff77ff", road: "#ffff00", roadStr: "#ff77ff", river: "#00ffff", riverStr: "#00ffff", riverDepth: "#006666", faction: "#ff00ff", faction2: "#00ffff", religion: "#ffff00", wanted: "#ff0077", restricted: "#ffd1dc", danger: "#ff77ff", fog: "#ffd1dc", fog2: "#ffb6c1", abyss: "#e0b0ff", abyss2: "#ffb6c1", abyssBorder: "#ff77ff", overfog: "#ffb6c1", overfogStr: "#ff77ff", heightLine: "#ff77ff", nonePlay: "#ffb6c1", loading: "#e0b0ff", ui: "#ff77ff" },
  ArtDeco: { bg: "#0a1f1c", sea: "#1a3c34", seaStr: "#d4af37", land: "#3d2b1f", land2: "#2a1a0a", landStr: "#d4af37", mountain: "#2a4d47", mountainStr: "#d4af37", road: "#d4af37", roadStr: "#0a1f1c", river: "#00ffff", riverStr: "#d4af37", riverDepth: "#006666", faction: "#c5a017", faction2: "#d4af37", religion: "#050f0e", wanted: "#800020", restricted: "#000000", danger: "#800020", fog: "#000000", fog2: "#050f0e", abyss: "#000000", abyss2: "#050f0e", abyssBorder: "#d4af37", overfog: "#0a1f1c", overfogStr: "#d4af37", heightLine: "#d4af37", nonePlay: "#0a1f1c", loading: "#050f0e", ui: "#d4af37" },
  PopArt: { bg: "#ffff00", sea: "#00ff00", seaStr: "#000000", land: "#8B4513", land2: "#A0522D", landStr: "#000000", mountain: "#0000ff", mountainStr: "#000000", road: "#00ff00", roadStr: "#000000", river: "#00ffff", riverStr: "#000000", riverDepth: "#004488", faction: "#00ff00", faction2: "#ff0000", religion: "#00ffff", wanted: "#ff0000", restricted: "#ffffff", danger: "#ff0000", fog: "#ffffff", fog2: "#ffff00", abyss: "#000000", abyss2: "#111111", abyssBorder: "#000000", overfog: "#ffff00", overfogStr: "#000000", heightLine: "#000000", nonePlay: "#ffff00", loading: "#ffff00", ui: "#000000" },
  EldenRing: { bg: "#24282a", sea: "#2d362d", seaStr: "#8c7b50", land: "#4a3728", land2: "#3d2b1f", landStr: "#d4af37", mountain: "#4a4a4a", mountainStr: "#8c7b50", road: "#d4af37", roadStr: "#111a22", river: "#4facfe", riverStr: "#1a1a1a", riverDepth: "#1a2418", faction: "#7b6a4a", faction2: "#8c7b50", religion: "#111a22", wanted: "#8b0000", restricted: "#0a0c10", danger: "#8b0000", fog: "#0a0c10", fog2: "#1c1c1c", abyss: "#000000", abyss2: "#24282a", abyssBorder: "#d4af37", overfog: "#24282a", overfogStr: "#d4af37", heightLine: "#d4af37", nonePlay: "#24282a", loading: "#1c1c1c", ui: "#d4af37" },
  Noir: { bg: "#aaaaaa", sea: "#444444", seaStr: "#000000", land: "#222222", land2: "#111111", landStr: "#000000", mountain: "#333333", mountainStr: "#ffffff", road: "#ffffff", roadStr: "#000000", river: "#00ffff", riverStr: "#000000", riverDepth: "#006666", faction: "#888888", faction2: "#333333", religion: "#ffffff", wanted: "#ff0000", restricted: "#000000", danger: "#ff0000", fog: "#111111", fog2: "#222222", abyss: "#000000", abyss2: "#111111", abyssBorder: "#ffffff", overfog: "#aaaaaa", overfogStr: "#000000", heightLine: "#000000", nonePlay: "#aaaaaa", loading: "#222222", ui: "#ffffff" },
  WildWest: { bg: "#cd853f", sea: "#4a5d23", seaStr: "#4a3018", land: "#8b5a2b", land2: "#5d3a1a", landStr: "#4a3018", mountain: "#6b4423", mountainStr: "#4a3018", road: "#f4a460", roadStr: "#4a3018", river: "#3498db", riverStr: "#2f4f4f", riverDepth: "#1a2a2a", faction: "#b8860b", faction2: "#8b6b4a", religion: "#d2a679", wanted: "#8b0000", restricted: "#4a3018", danger: "#8b0000", fog: "#e6ccab", fog2: "#d2b48c", abyss: "#2a1a0a", abyss2: "#4a3018", abyssBorder: "#4a3018", overfog: "#cd853f", overfogStr: "#4a3018", heightLine: "#4a3018", nonePlay: "#cd853f", loading: "#d2b48c", ui: "#4a3018" },
  HollowKnight: { bg: "#2c3140", sea: "#1a2a1a", seaStr: "#1a1c23", land: "#3d2b1f", land2: "#2a1a0a", landStr: "#8b9bb4", mountain: "#3d3d3d", mountainStr: "#1a1c23", road: "#8b9bb4", roadStr: "#1a1c23", river: "#00ffff", riverStr: "#7289da", riverDepth: "#16171d", faction: "#4a5462", faction2: "#202433", religion: "#8b9bb4", wanted: "#803040", restricted: "#0b0c10", danger: "#803040", fog: "#0b0c10", fog2: "#12141c", abyss: "#000000", abyss2: "#1a1c23", abyssBorder: "#8b9bb4", overfog: "#2c3140", overfogStr: "#8b9bb4", heightLine: "#8b9bb4", nonePlay: "#2c3140", loading: "#12141c", ui: "#8b9bb4" }
};

const FloatingIsland = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3L4 12h16L12 3z" fill="currentColor" fillOpacity="0.2" />
    <path d="M2 12h20" strokeWidth="3" stroke="currentColor" />
    <path d="M4 12l4 7 4-3 4 5 4-9" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

// --- GRUPOS LÓGICOS DE CORES ---
const GROUPS = [
  {
    title: "Unkown Outcomes",
    icon: <Globe className="w-4 h-4" />,
    indices: [7, 8, 19, 25, 16]
  },
  {
    title: "Factions Menu",
    icon: <Shield className="w-4 h-4" />,
    indices: [31, 20, 21, 28, 30, 29]
  },
  {
    title: "Interface",
    icon: <Monitor className="w-4 h-4" />,
    indices: [2, 1, 24, 23]
  },
  {
    title: "Abyss",
    icon: <FloatingIsland className="w-4 h-4" />,
    indices: [27, 26, 22, 0]
  },
  {
    title: "Fog",
    icon: <Wind className="w-4 h-4" />,
    indices: [6, 12]
  },
  {
    title: "PYWEL",
    icon: <Globe className="w-4 h-4" />,
    indices: [13, 10, 9, 18, 17, 15, 14, 4, 5, 3, 11]
  }
];

// --- UTILS ---
const hex = (s: string) => s.match(/#[0-9a-fA-F]{6}/)?.[0] || "#000";
const T_MAP = ['bg','ui','danger','river','riverStr','riverDepth',p=>p.overfog||p.river,p=>p.overfogStr||p.riverStr,p=>p.overfogStr||p.riverDepth,p=>p.land2||p.land,'landStr','sea','fog',p=>p.nonePlay||p.fog,'road','roadStr',p=>p.abyssBorder||p.roadStr,'mountain','mountainStr','heightLine','faction','religion','abyss','loading','loading','ui','fog',p=>p.fog2||p.abyssBorder,'wanted','restricted','restricted','faction'];
const LBLS = ["Abyss (Tint)","Map Crosshair (Normal)","Map Crosshair (Hover)","Water (Fill)","Water (Outline)","Water (Depth)","Fog of War (Water)","_mapLandOutlineColor","_mapSeaOutlineColor","High Ground (Fill)","High Ground (Outline)","Ground (Fill)","Fog of War (Ground)","Map Boundary","Road (Fill)","Road (Outline)","-worldmap-abyss-fog","Slopes and Farmland (Fill)","Slopes and Farmland (Outline)","-worldmap-height-line","Faction Zone Overlay","Religious Zone Overlay","Abyss (Hexagons)","Abyss Transition","Map Menu Transition","-worldmap-loading-2","Abyss Fog (Inner)","Abyss Fog (Outer)","Wanted Area","Restricted (Town)","Restricted (Trigger)","Faction Region Brightness"];
const VARS = ["bg","ui-1","ui-2","river-water","river-outline","river-depth","overfog","overfog-land-outline","overfog-sea-outline","land","land-outline","sea","fog","none-play","road","road-outline","abyss-outline","mountain","mountain-outline","height-line","faction","religion","abyss","abyss-loading","loading","loading-2","abyss-fog","abyss-border-fog","wanted","restricted-town","restricted-trigger","faction-region"];
const PRESETS = (() => {
  const r: any = { Vanilla: RAW_DATA.map(d => hex(d.vanilla).toLowerCase()), DarkMode: RAW_DATA.map(d => d.mod.toLowerCase()) };
  Object.entries(CUSTOM_PALETTES).forEach(([n, p]) => r[n] = T_MAP.map(k => typeof k === 'function' ? k(p) : p[k] || p.bg));
  return r;
})();

export default function App() {
  const [colors, setColors] = useState(PRESETS.Vanilla), [preset, setPreset] = useState('Vanilla'), [hist, setHist] = useState<string[][]>([]), [redo, setRedo] = useState<string[][]>([]);
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>(GROUPS.reduce((acc, _, i) => ({ ...acc, [i]: true }), {}));
  const isChg = useRef(false), fIn = useRef<HTMLInputElement>(null);

  const upd = (c: string[], push = 1) => { if (push) { setHist(h => [...h.slice(-9), colors]); setRedo([]); } setColors(c); setPreset('Custom'); };
  const step = (f: any, t: any, sf: any, st: any) => { if (!f.length) return; st(s => [...s.slice(-9), colors]); sf(s => s.slice(0, -1)); setColors(f[f.length-1]); setPreset('Custom'); };

  const handleC = (i: number, c: string) => {
    if (!isChg.current) { setHist(h => [...h.slice(-9), colors]); setRedo([]); isChg.current = true; setTimeout(() => isChg.current = false, 400); }
    const n = [...colors]; n[i] = c; setColors(n); setPreset('Custom');
  };

  const imp = (e: any) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader(); r.onload = (ev) => {
      try {
        const j = JSON.parse(ev.target?.result as string);
        if (Array.isArray(j)) upd(j.map((it, i) => typeof it === 'string' ? it : it.mod || colors[i]));
      } catch {}
    };
    r.readAsText(f); e.target.value = "";
  };

  const exp = () => {
    const l = RAW_DATA.map((it, i) => `  {"mod": "${colors[i]}", ${it.preset ? `"preset": "${it.preset}", ` : ''}"vanilla": "${it.vanilla}"}`);
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([`[\n${l.join(",\n")}\n]`], { type: 'application/json' })); a.download = "colors.json"; a.click();
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-gray-300 font-sans overflow-hidden" style={VARS.reduce((a, v, i) => ({ ...a, [`--c-${v}`]: colors[i] }), {}) as any}>
      <header className="flex flex-wrap items-center justify-between gap-6 px-8 py-6 bg-[#161b22] border-b border-[#30363d] z-20 min-h-fit">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-lg"><Palette className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-2xl font-bold text-white leading-tight">Crimson Map Color Customizer</h1><p className="text-sm text-gray-500 uppercase tracking-widest">Visual Editor</p></div>
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div className="hidden xl:block text-lg text-gray-400 mr-6 italic text-right leading-tight">
            to use with <a href="https://www.nexusmods.com/crimsondesert/mods/411" target="_blank" className="text-indigo-400 hover:underline">Dark Mode Map</a><br/>by <a href="https://www.nexusmods.com/profile/TheLastGunslinger9" target="_blank" className="text-indigo-400 hover:underline">TheLastGunslinger9</a>
          </div>
          <div className="flex gap-2">
            <button onClick={() => step(hist, redo, setHist, setRedo)} disabled={!hist.length} className="p-3 hover:bg-[#30363d] rounded-lg disabled:opacity-20"><Undo className="w-6 h-6" /></button>
            <button onClick={() => step(redo, hist, setRedo, setHist)} disabled={!redo.length} className="p-3 hover:bg-[#30363d] rounded-lg disabled:opacity-20"><Redo className="w-6 h-6" /></button>
          </div>
          <select value={preset} onChange={(e) => { upd([...PRESETS[e.target.value]]); setPreset(e.target.value); }} className="bg-[#21262d] border border-[#30363d] text-base rounded-lg px-4 py-2.5 outline-none cursor-pointer">
            <option value="Custom" disabled hidden>Custom</option>
            {['Vanilla', 'DarkMode'].map(p => <option key={p} value={p}>{p}</option>)}
            <optgroup label="Games">{['FalloutPipBoy', 'Skyrim', 'EldenRing', 'ZeldaBotw', 'Persona5', 'Doom', 'HollowKnight', 'MirrorsEdge', 'GameBoyClassic'].map(p => <option key={p} value={p}>{p}</option>)}</optgroup>
            <optgroup label="Styles">{['CyberPunk', 'Synthwave', 'Vaporwave', 'Noir', 'WildWest', 'ArtDeco', 'RomeroBritto', 'Mondrian', 'PopArt'].map(p => <option key={p} value={p}>{p}</option>)}</optgroup>
          </select>
          <button onClick={() => fIn.current?.click()} className="p-3 hover:bg-[#30363d] rounded-lg border border-[#30363d]" title="Import"><Download className="w-6 h-6" /></button>
          <input type="file" ref={fIn} onChange={imp} accept=".json" className="hidden" />
          <button onClick={exp} className="flex items-center gap-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-base font-bold rounded-xl shadow-lg transition-all active:scale-95"><Upload className="w-6 h-6" />Export "colors.json"</button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[780px] flex-shrink-0 flex flex-col border-r border-[#30363d] overflow-y-auto custom-scrollbar p-5 bg-[#0d1117]">
          <div className="grid grid-cols-2 gap-5">
            {/* Left Column: ABYSS, FOG, PYWEL */}
            <div className="flex flex-col gap-8">
              {[3, 4, 5].map(gi => {
                const g = GROUPS[gi];
                const grouped: { label: string, items: { idx: number, sub: string }[] }[] = [];
                const seen = new Set<string>();
                
                g.indices.forEach(idx => {
                  const fullLabel = LBLS[idx];
                  const match = fullLabel.match(/^(.*?)\s*\((.*)\)$/);
                  const groupLabel = match ? match[1] : fullLabel;
                  
                  if (seen.has(groupLabel)) return;
                  seen.add(groupLabel);
                  
                  const items = g.indices.filter(i => {
                    const l = LBLS[i];
                    const m = l.match(/^(.*?)\s*\((.*)\)$/);
                    return (m ? m[1] : l) === groupLabel;
                  }).map(i => {
                    const l = LBLS[i];
                    const m = l.match(/^(.*?)\s*\((.*)\)$/);
                    return { idx: i, sub: m ? m[2] : "" };
                  }).reverse();
                  
                  grouped.push({ label: groupLabel, items });
                });

                return (
                  <div key={gi} className="flex-shrink-0 bg-[#161b22] border border-[#30363d] rounded-xl shadow-sm overflow-hidden">
                    <button 
                      onClick={() => setCollapsed(prev => ({ ...prev, [gi]: !prev[gi] }))}
                      className="w-full bg-[#21262d] px-5 py-4 border-b border-[#30363d] flex items-center justify-between group transition-colors hover:bg-[#30363d]"
                    >
                      <div className="flex items-center gap-4 text-indigo-400">
                        {React.cloneElement(g.icon as React.ReactElement, { className: "w-5 h-5" })}
                        <h2 className="text-sm font-black text-gray-300 uppercase tracking-widest">{g.title}</h2>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${collapsed[gi] ? '-rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {!collapsed[gi] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="divide-y divide-[#30363d]">
                            {grouped.map((group, gridx) => (
                              <div key={gridx} className="flex flex-col p-4 hover:bg-[#21262d]/50 transition-colors gap-4">
                                <div className="flex-shrink-0">
                                  <span className="text-sm font-black text-gray-100 leading-tight block">{group.label}</span>
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-4 flex-1">
                                  {group.items.map(item => (
                                    <div key={item.idx} className="flex items-center gap-4 group/item">
                                      <div className="relative w-14 h-14 rounded-2xl border-2 border-[#30363d] overflow-hidden shadow-xl flex-shrink-0" style={{ backgroundColor: colors[item.idx] }}>
                                        <input 
                                          type="color" 
                                          value={colors[item.idx]} 
                                          onChange={(e) => {
                                            let val = e.target.value;
                                            if (item.idx === 31) {
                                              const r = parseInt(val.substring(1, 3), 16);
                                              const g = parseInt(val.substring(3, 5), 16);
                                              const b = parseInt(val.substring(5, 7), 16);
                                              const avg = Math.round((r + g + b) / 3).toString(16).padStart(2, '0');
                                              val = `#${avg}${avg}${avg}`;
                                            }
                                            handleC(item.idx, val);
                                          }} 
                                          className="absolute inset-0 opacity-0 cursor-pointer scale-[5]" 
                                        />
                                      </div>
                                      <div className="flex flex-col min-w-0">
                                        <span className="text-xs text-gray-500 font-mono uppercase tracking-tight leading-none mb-1.5">{colors[item.idx]}</span>
                                        <span className="text-sm font-bold text-gray-200 leading-none truncate">
                                          {item.sub || "Color"} <span className="text-gray-500 font-normal ml-1 text-xs">#{(item.idx + 1).toString().padStart(2, '0')}</span>
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Column: INTERFACE, FACTIONS MENU, UNKNOWN EFFECTS */}
            <div className="flex flex-col gap-8">
              {[2, 1, 0].map(gi => {
                const g = GROUPS[gi];
                const grouped: { label: string, items: { idx: number, sub: string }[] }[] = [];
                const seen = new Set<string>();
                
                g.indices.forEach(idx => {
                  const fullLabel = LBLS[idx];
                  const match = fullLabel.match(/^(.*?)\s*\((.*)\)$/);
                  const groupLabel = match ? match[1] : fullLabel;
                  
                  if (seen.has(groupLabel)) return;
                  seen.add(groupLabel);
                  
                  const items = g.indices.filter(i => {
                    const l = LBLS[i];
                    const m = l.match(/^(.*?)\s*\((.*)\)$/);
                    return (m ? m[1] : l) === groupLabel;
                  }).map(i => {
                    const l = LBLS[i];
                    const m = l.match(/^(.*?)\s*\((.*)\)$/);
                    return { idx: i, sub: m ? m[2] : "" };
                  }).reverse();
                  
                  grouped.push({ label: groupLabel, items });
                });

                return (
                  <div key={gi} className="flex-shrink-0 bg-[#161b22] border border-[#30363d] rounded-xl shadow-sm overflow-hidden">
                    <button 
                      onClick={() => setCollapsed(prev => ({ ...prev, [gi]: !prev[gi] }))}
                      className="w-full bg-[#21262d] px-5 py-4 border-b border-[#30363d] flex items-center justify-between group transition-colors hover:bg-[#30363d]"
                    >
                      <div className="flex items-center gap-4 text-indigo-400">
                        {React.cloneElement(g.icon as React.ReactElement, { className: "w-5 h-5" })}
                        <h2 className="text-sm font-black text-gray-300 uppercase tracking-widest">{g.title}</h2>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${collapsed[gi] ? '-rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {!collapsed[gi] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="divide-y divide-[#30363d]">
                            {grouped.map((group, gridx) => (
                              <div key={gridx} className="flex flex-col p-4 hover:bg-[#21262d]/50 transition-colors gap-4">
                                <div className="flex-shrink-0">
                                  <span className="text-sm font-black text-gray-100 leading-tight block">{group.label}</span>
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-4 flex-1">
                                  {group.items.map(item => (
                                    <div key={item.idx} className="flex items-center gap-4 group/item">
                                      <div className="relative w-14 h-14 rounded-2xl border-2 border-[#30363d] overflow-hidden shadow-xl flex-shrink-0" style={{ backgroundColor: colors[item.idx] }}>
                                        <input 
                                          type="color" 
                                          value={colors[item.idx]} 
                                          onChange={(e) => {
                                            let val = e.target.value;
                                            if (item.idx === 31) {
                                              const r = parseInt(val.substring(1, 3), 16);
                                              const g = parseInt(val.substring(3, 5), 16);
                                              const b = parseInt(val.substring(5, 7), 16);
                                              const avg = Math.round((r + g + b) / 3).toString(16).padStart(2, '0');
                                              val = `#${avg}${avg}${avg}`;
                                            }
                                            handleC(item.idx, val);
                                          }} 
                                          className="absolute inset-0 opacity-0 cursor-pointer scale-[5]" 
                                        />
                                      </div>
                                      <div className="flex flex-col min-w-0">
                                        <span className="text-xs text-gray-500 font-mono uppercase tracking-tight leading-none mb-1.5">{colors[item.idx]}</span>
                                        <span className="text-sm font-bold text-gray-200 leading-none truncate">
                                          {item.sub || "Color"} <span className="text-gray-500 font-normal ml-1 text-xs">#{(item.idx + 1).toString().padStart(2, '0')}</span>
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>


        <main className="flex-1 relative bg-[#090c10] overflow-hidden" style={{ backgroundColor: colors[0] }}>
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#161b22]/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#30363d] text-[9px] font-bold uppercase tracking-widest">
            <span className="flex h-2 w-2"><span className="animate-ping absolute h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span><span className="h-2 w-2 rounded-full bg-emerald-500"></span></span>
            Live Preview
          </div>
          <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--c-height-line)" strokeWidth="0.5" /></pattern>
              <pattern id="grid-over-land" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--c-overfog-land-outline)" strokeWidth="0.3" /></pattern>
              <pattern id="grid-over-sea" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--c-overfog-sea-outline)" strokeWidth="0.3" /></pattern>
              <clipPath id="land"><path d="M150,150 C250,100 400,50 600,100 C800,150 900,300 850,500 C800,700 600,850 400,800 C200,750 50,600 100,400 C120,250 100,180 150,150 Z" /></clipPath>
              <clipPath id="overfog-clip"><rect x="500" y="0" width="500" height="1000" /></clipPath>
            </defs>
            <rect width="1000" height="1000" fill="var(--c-sea)" />
            <path d="M150,150 C250,100 400,50 600,100 C800,150 900,300 850,500 C800,700 600,850 400,800 C200,750 50,600 100,400 C120,250 100,180 150,150 Z" fill="var(--c-land)" stroke="var(--c-land-outline)" strokeWidth="6" />
            <rect width="1000" height="1000" fill="url(#grid)" clipPath="url(#land)" opacity="0.15" />
            
            {/* Overfog Area */}
            <rect x="500" y="0" width="500" height="1000" fill="var(--c-overfog)" opacity="0.4" />
            <rect x="500" y="0" width="500" height="1000" fill="url(#grid-over-sea)" opacity="0.3" />
            <rect x="500" y="0" width="500" height="1000" fill="url(#grid-over-land)" clipPath="url(#land)" opacity="0.5" />

            <rect width="1000" height="1000" fill="none" stroke="var(--c-none-play)" strokeWidth="100" opacity="0.3" />
            <rect width="1000" height="1000" fill="var(--c-fog)" opacity="0.08" />
            
            {/* Roads */}
            <path d="M150,400 L400,350 L600,450 L850,400" fill="none" stroke="var(--c-road-outline)" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
            <path d="M150,400 L400,350 L600,450 L850,400" fill="none" stroke="var(--c-road)" strokeWidth="6" strokeLinecap="round" />

            <g transform="translate(100, 30)">
              <rect width="800" height="50" fill="var(--c-loading)" rx="25" />
              <rect x="10" y="10" width="780" height="30" fill="var(--c-loading-2)" opacity="0.3" rx="15" />
              <rect x="10" y="10" width="400" height="30" fill="var(--c-ui-1)" opacity="0.5" rx="15" />
              <circle cx="410" cy="25" r="12" fill="var(--c-ui-2)" />
            </g>

            <g transform="translate(300, 200)">
              <path d="M0 60 L30 0 L60 60 Z" fill="var(--c-mountain)" stroke="var(--c-mountain-outline)" strokeWidth="2" />
              <path d="M40 70 L80 10 L120 70 Z" fill="var(--c-mountain)" stroke="var(--c-mountain-outline)" strokeWidth="2" />
            </g>

            <g transform="translate(0, 0)">
              <path d="M100,400 Q300,350 500,500 T900,450" fill="none" stroke="var(--c-river-outline)" strokeWidth="40" strokeLinecap="round" />
              <path d="M100,400 Q300,350 500,500 T900,450" fill="none" stroke="var(--c-river-water)" strokeWidth="30" strokeLinecap="round" />
              <path d="M100,400 Q300,350 500,500 T900,450" fill="none" stroke="var(--c-river-depth)" strokeWidth="10" strokeLinecap="round" opacity="0.4" />
            </g>

            <g transform="translate(200, 500)">
              <circle cx="50" cy="50" r="60" fill="var(--c-faction)" opacity="0.8" />
              <circle cx="250" cy="150" r="70" fill="var(--c-religion)" opacity="0.8" />
              <circle cx="450" cy="50" r="50" fill="var(--c-wanted)" opacity="0.8" />
              <circle cx="250" cy="100" r="300" fill="none" stroke="var(--c-faction-region)" strokeWidth="2" strokeDasharray="10,10" opacity="0.4" />
              <g transform="translate(550, 150)">
                <rect width="120" height="80" fill="var(--c-restricted-town)" rx="40" />
                <circle cx="60" cy="40" r="15" fill="var(--c-restricted-trigger)" />
              </g>
            </g>

            <g transform="translate(150, 850)">
              <circle r="100" fill="none" stroke="var(--c-abyss-border-fog)" strokeWidth="20" opacity="0.3" />
              <circle r="80" fill="var(--c-abyss)" stroke="var(--c-abyss-outline)" strokeWidth="4" />
              <circle r="50" fill="var(--c-abyss-fog)" opacity="0.6" />
              <circle r="15" fill="var(--c-abyss-loading)" />
            </g>
          </svg>
        </main>
      </div>
      <style dangerouslySetInnerHTML={{__html: `.custom-scrollbar::-webkit-scrollbar{width:6px}.custom-scrollbar::-webkit-scrollbar-track{background:#0d1117}.custom-scrollbar::-webkit-scrollbar-thumb{background:#30363d;border-radius:10px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:#484f58}`}} />
    </div>
  );
}
