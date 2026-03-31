import React, { useState, useRef } from 'react';
import { Download, Upload, Globe, Map as MapIcon, Palette, Shield, Wind, Monitor, ChevronDown, Check, Undo, Redo } from 'lucide-react';

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
  {"mod": "#ffffff", "preset": "preset-worldmap-faction-region", "vanilla": "_originalColorTint: color, #ffffffff;"},
  {"mod": "#f5f5f0", "preset": "preset-worldmap-land", "vanilla": "_originalColorTint: color, #f5f5f0ff;"},
  {"mod": "#3F6073", "preset": "preset-worldmap-region-religion", "vanilla": "_originalColorTint: color, #3F6073ff;"},
  {"mod": "#6f7778", "preset": "preset-worldmap-overfog-sea-outline", "vanilla": "_mapSeaOutlineColor: color, #6f7778ff;"},
  {"mod": "#67866e", "preset": "preset-worldmap-faction-region-2", "vanilla": "_originalColorTint: color, #67866e;"},
  {"mod": "#802020", "preset": "preset-worldmap-restricted-area-town-2", "vanilla": "_originalColorTint: color, #802020ff;"},
  {"mod": "#802020", "preset": "preset-worldmap-restricted-area-gameplay-trigger-2", "vanilla": "_originalColorTint: color, #802020ff;"}
];

const CUSTOM_PALETTES = {
  CyberPunk: { 
    bg: "#050505", sea: "#0a1a2f", seaStr: "#00f0ff", land: "#111827", landStr: "#ff003c", 
    mountain: "#2d005d", mountainStr: "#7000ff", road: "#fcee0a", roadStr: "#ff003c", 
    faction: "#39ff14", faction2: "#00ff9f", religion: "#bc13fe", wanted: "#ff003c", 
    restricted: "#1a002a", danger: "#ff0000", fog: "#1a002a", fog2: "#2a004a", 
    abyss: "#000000", abyss2: "#050505", abyssBorder: "#7000ff", overfog: "#0a1a2f", 
    overfogStr: "#00f0ff", heightLine: "#30363d", nonePlay: "#000000", loading: "#0b0c10", ui: "#00f0ff" 
  },
  RomeroBritto: { 
    bg: "#FFCC00", sea: "#00A8FF", seaStr: "#000000", land: "#FFD700", landStr: "#000000", 
    mountain: "#9D00FF", mountainStr: "#000000", road: "#FF007F", roadStr: "#000000", 
    faction: "#85E21F", faction2: "#FF5733", religion: "#C70039", wanted: "#FF0000", 
    restricted: "#581845", danger: "#FFC300", fog: "#FFFFFF", fog2: "#F0F0F0", 
    abyss: "#000000", abyss2: "#111111", abyssBorder: "#000000", overfog: "#FFCC00", 
    overfogStr: "#000000", heightLine: "#000000", nonePlay: "#FFCC00", loading: "#FFCC00", ui: "#000000" 
  },
  Mondrian: { 
    bg: "#FFFFFF", sea: "#0055A4", seaStr: "#000000", land: "#FFFFFF", landStr: "#000000", 
    mountain: "#E3000F", mountainStr: "#000000", road: "#FFD100", roadStr: "#000000", 
    faction: "#0055A4", faction2: "#E3000F", religion: "#FFD100", wanted: "#E3000F", 
    restricted: "#000000", danger: "#E3000F", fog: "#F4F4F4", fog2: "#E0E0E0", 
    abyss: "#111111", abyss2: "#000000", abyssBorder: "#000000", overfog: "#FFFFFF", 
    overfogStr: "#000000", heightLine: "#000000", nonePlay: "#FFFFFF", loading: "#F4F4F4", ui: "#000000" 
  },
  FalloutPipBoy: { 
    bg: "#051c03", sea: "#0a2e05", seaStr: "#15d600", land: "#082504", landStr: "#15d600", 
    mountain: "#117806", mountainStr: "#15d600", road: "#15d600", roadStr: "#0a2e05", 
    faction: "#22ff00", faction2: "#15d600", religion: "#117806", wanted: "#15d600", 
    restricted: "#041202", danger: "#15d600", fog: "#041202", fog2: "#082504", 
    abyss: "#000000", abyss2: "#051c03", abyssBorder: "#15d600", overfog: "#051c03", 
    overfogStr: "#15d600", heightLine: "#15d600", nonePlay: "#051c03", loading: "#041202", ui: "#15d600" 
  },
  GameBoyClassic: { 
    bg: "#8bac0f", sea: "#306230", seaStr: "#0f380f", land: "#8bac0f", landStr: "#0f380f", 
    mountain: "#0f380f", mountainStr: "#306230", road: "#0f380f", roadStr: "#306230", 
    faction: "#9bbc0f", faction2: "#8bac0f", religion: "#306230", wanted: "#0f380f", 
    restricted: "#8bac0f", danger: "#0f380f", fog: "#8bac0f", fog2: "#9bbc0f", 
    abyss: "#0f380f", abyss2: "#306230", abyssBorder: "#0f380f", overfog: "#8bac0f", 
    overfogStr: "#0f380f", heightLine: "#0f380f", nonePlay: "#8bac0f", loading: "#9bbc0f", ui: "#0f380f" 
  },
  Persona5: { 
    bg: "#ff0000", sea: "#111111", seaStr: "#000000", land: "#ffffff", landStr: "#000000", 
    mountain: "#880000", mountainStr: "#ffffff", road: "#ffffff", roadStr: "#000000", 
    faction: "#ffffff", faction2: "#000000", religion: "#ff0000", wanted: "#ff0000", 
    restricted: "#000000", danger: "#ffffff", fog: "#000000", fog2: "#111111", 
    abyss: "#000000", abyss2: "#111111", abyssBorder: "#ff0000", overfog: "#ff0000", 
    overfogStr: "#ffffff", heightLine: "#000000", nonePlay: "#ff0000", loading: "#ff0000", ui: "#ffffff" 
  },
  ZeldaBotw: { 
    bg: "#c1cca5", sea: "#69aeb8", seaStr: "#3b312a", land: "#f5f5f0", landStr: "#3b312a", 
    mountain: "#7c8e74", mountainStr: "#3b312a", road: "#dcd0a6", roadStr: "#3b312a", 
    faction: "#b6cba1", faction2: "#7c8e74", religion: "#69aeb8", wanted: "#d04b49", 
    restricted: "#3b312a", danger: "#d04b49", fog: "#e4dec8", fog2: "#f5f5f0", 
    abyss: "#1a1a1a", abyss2: "#3b312a", abyssBorder: "#69aeb8", overfog: "#c1cca5", 
    overfogStr: "#3b312a", heightLine: "#3b312a", nonePlay: "#c1cca5", loading: "#e2d7b5", ui: "#3b312a" 
  },
  Skyrim: { 
    bg: "#d7cdba", sea: "#c1bba4", seaStr: "#2a221b", land: "#f5f5f0", landStr: "#2a221b", 
    mountain: "#695e53", mountainStr: "#2a221b", road: "#544434", roadStr: "#2a221b", 
    faction: "#82786a", faction2: "#695e53", religion: "#c1bba4", wanted: "#7a3124", 
    restricted: "#2a221b", danger: "#7a3124", fog: "#dcd3bd", fog2: "#f5f5f0", 
    abyss: "#000000", abyss2: "#2a221b", abyssBorder: "#695e53", overfog: "#d7cdba", 
    overfogStr: "#2a221b", heightLine: "#2a221b", nonePlay: "#d7cdba", loading: "#ebdcc8", ui: "#2a221b" 
  },
  MirrorsEdge: { 
    bg: "#ffffff", sea: "#0088ff", seaStr: "#000000", land: "#ffffff", landStr: "#000000", 
    mountain: "#cccccc", mountainStr: "#000000", road: "#ff0000", roadStr: "#000000", 
    faction: "#ffaa00", faction2: "#0088ff", religion: "#ff0000", wanted: "#ff0000", 
    restricted: "#000000", danger: "#ff0000", fog: "#ffffff", fog2: "#f0f0f0", 
    abyss: "#000000", abyss2: "#111111", abyssBorder: "#ff0000", overfog: "#ffffff", 
    overfogStr: "#000000", heightLine: "#000000", nonePlay: "#ffffff", loading: "#ffffff", ui: "#000000" 
  },
  Doom: { 
    bg: "#551100", sea: "#440000", seaStr: "#ff3300", land: "#220000", landStr: "#ff3300", 
    mountain: "#110000", mountainStr: "#ff3300", road: "#ffaa00", roadStr: "#ff3300", 
    faction: "#cc0000", faction2: "#ff0000", religion: "#440000", wanted: "#ff0000", 
    restricted: "#110000", danger: "#ff3300", fog: "#110000", fog2: "#220000", 
    abyss: "#000000", abyss2: "#110000", abyssBorder: "#ff3300", overfog: "#551100", 
    overfogStr: "#ff3300", heightLine: "#ff3300", nonePlay: "#551100", loading: "#110000", ui: "#ff3300" 
  },
  Synthwave: { 
    bg: "#110033", sea: "#000022", seaStr: "#ff00ff", land: "#0a0a1a", landStr: "#00ffff", 
    mountain: "#220044", mountainStr: "#ff00ff", road: "#00ffff", roadStr: "#ff00ff", 
    faction: "#ff00aa", faction2: "#ff00ff", religion: "#00ffff", wanted: "#ff0000", 
    restricted: "#110022", danger: "#ff00ff", fog: "#110022", fog2: "#220044", 
    abyss: "#000000", abyss2: "#110033", abyssBorder: "#ff00ff", overfog: "#110033", 
    overfogStr: "#00ffff", heightLine: "#00ffff", nonePlay: "#110033", loading: "#0a0a1a", ui: "#00ffff" 
  },
  Vaporwave: { 
    bg: "#ffb6c1", sea: "#00ffff", seaStr: "#ff77ff", land: "#ffd1dc", landStr: "#ff77ff", 
    mountain: "#aa77ff", mountainStr: "#ff77ff", road: "#ffff00", roadStr: "#ff77ff", 
    faction: "#ff00ff", faction2: "#00ffff", religion: "#ffff00", wanted: "#ff0077", 
    restricted: "#ffd1dc", danger: "#ff77ff", fog: "#ffd1dc", fog2: "#ffb6c1", 
    abyss: "#e0b0ff", abyss2: "#ffb6c1", abyssBorder: "#ff77ff", overfog: "#ffb6c1", 
    overfogStr: "#ff77ff", heightLine: "#ff77ff", nonePlay: "#ffb6c1", loading: "#e0b0ff", ui: "#ff77ff" 
  },
  ArtDeco: { 
    bg: "#0a1f1c", sea: "#050f0e", seaStr: "#d4af37", land: "#112e29", landStr: "#d4af37", 
    mountain: "#0a1f1c", mountainStr: "#d4af37", road: "#d4af37", roadStr: "#0a1f1c", 
    faction: "#c5a017", faction2: "#d4af37", religion: "#050f0e", wanted: "#800020", 
    restricted: "#000000", danger: "#800020", fog: "#000000", fog2: "#050f0e", 
    abyss: "#000000", abyss2: "#050f0e", abyssBorder: "#d4af37", overfog: "#0a1f1c", 
    overfogStr: "#d4af37", heightLine: "#d4af37", nonePlay: "#0a1f1c", loading: "#050f0e", ui: "#d4af37" 
  },
  PopArt: { 
    bg: "#ffff00", sea: "#00ffff", seaStr: "#000000", land: "#ff00ff", landStr: "#000000", 
    mountain: "#0000ff", mountainStr: "#000000", road: "#ff00ff", roadStr: "#000000", 
    faction: "#00ff00", faction2: "#ff0000", religion: "#00ffff", wanted: "#ff0000", 
    restricted: "#ffffff", danger: "#ff0000", fog: "#ffffff", fog2: "#ffff00", 
    abyss: "#000000", abyss2: "#111111", abyssBorder: "#000000", overfog: "#ffff00", 
    overfogStr: "#000000", heightLine: "#000000", nonePlay: "#ffff00", loading: "#ffff00", ui: "#000000" 
  },
  EldenRing: { 
    bg: "#24282a", sea: "#111a22", seaStr: "#8c7b50", land: "#1c1c1c", landStr: "#d4af37", 
    mountain: "#2c3539", mountainStr: "#8c7b50", road: "#d4af37", roadStr: "#111a22", 
    faction: "#7b6a4a", faction2: "#8c7b50", religion: "#111a22", wanted: "#8b0000", 
    restricted: "#0a0c10", danger: "#8b0000", fog: "#0a0c10", fog2: "#1c1c1c", 
    abyss: "#000000", abyss2: "#24282a", abyssBorder: "#d4af37", overfog: "#24282a", 
    overfogStr: "#d4af37", heightLine: "#d4af37", nonePlay: "#24282a", loading: "#1c1c1c", ui: "#d4af37" 
  },
  Noir: { 
    bg: "#aaaaaa", sea: "#333333", seaStr: "#000000", land: "#555555", landStr: "#000000", 
    mountain: "#222222", mountainStr: "#ffffff", road: "#ffffff", roadStr: "#000000", 
    faction: "#888888", faction2: "#333333", religion: "#ffffff", wanted: "#ff0000", 
    restricted: "#000000", danger: "#ff0000", fog: "#111111", fog2: "#222222", 
    abyss: "#000000", abyss2: "#111111", abyssBorder: "#ffffff", overfog: "#aaaaaa", 
    overfogStr: "#000000", heightLine: "#000000", nonePlay: "#aaaaaa", loading: "#222222", ui: "#ffffff" 
  },
  WildWest: { 
    bg: "#cd853f", sea: "#8b6b4a", seaStr: "#4a3018", land: "#d2b48c", landStr: "#4a3018", 
    mountain: "#6b4423", mountainStr: "#4a3018", road: "#d2a679", roadStr: "#4a3018", 
    faction: "#b8860b", faction2: "#8b6b4a", religion: "#d2a679", wanted: "#8b0000", 
    restricted: "#4a3018", danger: "#8b0000", fog: "#e6ccab", fog2: "#d2b48c", 
    abyss: "#2a1a0a", abyss2: "#4a3018", abyssBorder: "#4a3018", overfog: "#cd853f", 
    overfogStr: "#4a3018", heightLine: "#4a3018", nonePlay: "#cd853f", loading: "#d2b48c", ui: "#4a3018" 
  },
  HollowKnight: { 
    bg: "#2c3140", sea: "#202433", seaStr: "#1a1c23", land: "#12141c", landStr: "#8b9bb4", 
    mountain: "#13151f", mountainStr: "#1a1c23", road: "#8b9bb4", roadStr: "#1a1c23", 
    faction: "#4a5462", faction2: "#202433", religion: "#8b9bb4", wanted: "#803040", 
    restricted: "#0b0c10", danger: "#803040", fog: "#0b0c10", fog2: "#12141c", 
    abyss: "#000000", abyss2: "#1a1c23", abyssBorder: "#8b9bb4", overfog: "#2c3140", 
    overfogStr: "#8b9bb4", heightLine: "#8b9bb4", nonePlay: "#2c3140", loading: "#12141c", ui: "#8b9bb4" 
  }
};

// --- GRUPOS LÓGICOS DE CORES ---
const GROUPS = [
  {
    title: "Environment (Base)",
    icon: <Globe className="w-4 h-4" />,
    indices: [0, 3, 4, 5, 9, 10, 11, 38, 40]
  },
  {
    title: "Terrain & Relief",
    icon: <MapIcon className="w-4 h-4" />,
    indices: [14, 15, 17, 18, 19, 25]
  },
  {
    title: "Zones & Factions",
    icon: <Shield className="w-4 h-4" />,
    indices: [13, 20, 21, 28, 29, 30, 31, 34, 35, 36, 37, 39, 41, 42, 43]
  },
  {
    title: "Fog & Abyss",
    icon: <Wind className="w-4 h-4" />,
    indices: [6, 7, 8, 12, 16, 22, 26, 27, 32, 33]
  },
  {
    title: "Interface & Loading",
    icon: <Monitor className="w-4 h-4" />,
    indices: [1, 2, 23, 24]
  }
];

// --- UTILITÁRIOS ---
const extractHex = (str: string) => {
  const match = str.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})/i);
  return match ? (match[0].length === 9 ? match[0].substring(0, 7) : match[0]) : "#000000";
};

const getLabel = (item: any, index: number) => {
  if (!item || !item.preset) return `Interface Color ${index + 1}`;
  let type = item.vanilla.includes('Outline') ? '(Outline)' : '(Fill)';
  let name = item.preset.replace('preset-worldmap-', '');
  if (name === 'preset-worldmap') name = 'base';
  const formattedName = name.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return `${formattedName} ${type}`;
};

const generatePresets = (baseData: any[]) => {
  const presets: Record<string, string[]> = { Vanilla: [], DarkMode: [] };
  Object.keys(CUSTOM_PALETTES).forEach(k => presets[k] = []);

  baseData.forEach((item, i) => {
    const isOutline = item.vanilla.includes('Outline') || item.vanilla.includes('str');
    const vanillaHex = extractHex(item.vanilla).toLowerCase();
    const presetStr = item.preset || "ui";
    
    presets.Vanilla.push(vanillaHex);
    presets.DarkMode.push(item.mod.toLowerCase());

    Object.entries(CUSTOM_PALETTES).forEach(([name, palette]) => {
      const p = palette as any;
      let color = p.bg;

      if (i === 0) color = p.bg;
      else if (i === 1) color = p.ui;
      else if (i === 2) color = p.danger;
      else if (presetStr === "preset-worldmap-land") color = p.land;
      else if (presetStr === "preset-worldmap") {
        color = isOutline ? p.landStr : p.sea;
      }
      else if (presetStr === "preset-worldmap-overfog") {
        if (isOutline) color = p.overfogStr;
        else color = p.overfog;
      }
      else if (presetStr === "preset-worldmap-overfog-sea-outline") color = p.overfogStr;
      else if (presetStr === "preset-worldmap-2") {
        color = isOutline ? p.landStr : p.sea;
      }
      else if (presetStr === "preset-worldmap-sea") color = p.sea;
      else if (presetStr === "preset-worldmap-fog") color = p.fog;
      else if (presetStr === "preset-worldmap-none-play-region") color = p.nonePlay;
      else if (presetStr.includes('road')) color = isOutline ? p.roadStr : p.road;
      else if (presetStr.includes('mountain')) color = isOutline ? p.mountainStr : p.mountain;
      else if (presetStr === "preset-worldmap-height-line") color = p.heightLine;
      else if (presetStr.includes('faction')) {
        color = presetStr.includes('2') ? p.faction2 : p.faction;
      }
      else if (presetStr.includes('religion')) color = p.religion;
      else if (presetStr.includes('wanted')) color = p.wanted;
      else if (presetStr.includes('restricted')) {
        color = presetStr.includes('2') ? p.danger : p.restricted;
      }
      else if (presetStr.includes('abyss')) {
        if (presetStr.includes('bg')) {
            color = isOutline ? p.abyssBorder : p.abyss;
        } else if (presetStr.includes('loading')) {
            color = p.loading;
        } else if (presetStr.includes('border')) {
            color = p.abyssBorder;
        } else if (presetStr.includes('fog')) {
            color = presetStr.includes('2') ? p.fog2 : p.fog;
        } else if (presetStr.includes('2')) {
            color = p.abyss2;
        } else {
            color = p.abyss;
        }
      }
      else if (presetStr.includes('loading')) {
        color = presetStr.includes('2') ? p.ui : p.loading;
      }
      else if (presetStr === "ui") color = p.ui;
      else if (isOutline) color = p.landStr;

      presets[name].push(color);
    });
  });
  return presets;
};

const presetsMap = generatePresets(RAW_DATA);

export default function App() {
  const [colors, setColors] = useState(presetsMap.Vanilla);
  const [activePreset, setActivePreset] = useState('Vanilla');
  const [history, setHistory] = useState<string[][]>([]);
  const [redoStack, setRedoStack] = useState<string[][]>([]);
  const isChangingRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pushToHistory = (oldColors: string[]) => {
    setHistory(prev => {
      const newHistory = [...prev, [...oldColors]];
      if (newHistory.length > 5) return newHistory.slice(1);
      return newHistory;
    });
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    
    const previous = history[history.length - 1];
    const current = [...colors];
    
    setRedoStack(prev => {
      const newRedo = [...prev, current];
      if (newRedo.length > 5) return newRedo.slice(1);
      return newRedo;
    });
    
    setHistory(prev => prev.slice(0, -1));
    setColors([...previous]);
    setActivePreset('Custom');
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    
    const next = redoStack[redoStack.length - 1];
    const current = [...colors];
    
    setHistory(prev => {
      const newHistory = [...prev, current];
      if (newHistory.length > 5) return newHistory.slice(1);
      return newHistory;
    });
    
    setRedoStack(prev => prev.slice(0, -1));
    setColors([...next]);
    setActivePreset('Custom');
  };

  const handleColorChange = (index: number, newColor: string) => {
    // Only push to history once per "session" of rapid changes (like dragging a slider)
    if (!isChangingRef.current) {
      pushToHistory(colors);
      isChangingRef.current = true;
      // Reset the flag after a short delay of inactivity
      setTimeout(() => { isChangingRef.current = false; }, 500);
    }
    
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
    setActivePreset('Custom');
  };

  const applyPreset = (presetName: string) => {
    pushToHistory(colors);
    setColors([...presetsMap[presetName]]);
    setActivePreset(presetName);
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          const newColors = json.map((item: any) => {
            if (typeof item === 'string') return item;
            return item.mod || "#000000";
          });
          
          const finalColors = [...colors];
          newColors.forEach((c, i) => {
            if (i < finalColors.length) finalColors[i] = c;
          });
          
          pushToHistory(colors);
          setColors(finalColors);
          setActivePreset('Custom');
        }
      } catch (err) {
        console.error("Import error:", err);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const exportJson = () => {
    const finalData = RAW_DATA.map((item, idx) => {
      const exportObj: any = { mod: colors[idx] };
      if (item.preset) exportObj.preset = item.preset;
      exportObj.vanilla = item.vanilla;
      return exportObj;
    });

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "colors.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const mapStyles = {
    "--c-bg": colors[0],
    "--c-ui-1": colors[1],
    "--c-ui-2": colors[2],
    "--c-land": colors[3],
    "--c-land-str": colors[4],
    "--c-sea-str": colors[5],
    "--c-overfog": colors[6],
    "--c-overfog-land-str": colors[7],
    "--c-overfog-sea-str": colors[8],
    "--c-worldmap-2": colors[9],
    "--c-worldmap-2-land-str": colors[10],
    "--c-sea": colors[11],
    "--c-fog": colors[12],
    "--c-none-play": colors[13],
    "--c-road": colors[14],
    "--c-road-land-str": colors[15],
    "--c-abyss-bg-hex-land-str": colors[16],
    "--c-mountain": colors[17],
    "--c-mountain-str": colors[18],
    "--c-height-line": colors[19],
    "--c-faction": colors[20],
    "--c-religion": colors[21],
    "--c-abyss-bg-hex": colors[22],
    "--c-abyss-loading": colors[23],
    "--c-loading": colors[24],
    "--c-loading-2": colors[25],
    "--c-abyss-fog": colors[26],
    "--c-abyss-border-fog": colors[27],
    "--c-danger": colors[28],
    "--c-restricted-town": colors[29],
    "--c-restricted-trigger": colors[30],
    "--c-faction-region": colors[31],
    "--c-abyss-fog-2": colors[32],
    "--c-abyss-border-fog-2": colors[33],
    "--c-wanted": colors[34],
    "--c-restricted-town-2": colors[35],
    "--c-restricted-trigger-2": colors[36],
    "--c-faction-region-2": colors[37],
  } as React.CSSProperties;

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-gray-300 font-sans overflow-hidden">
      
      {/* CABEÇALHO */}
      <header className="flex items-center justify-between px-6 py-3 bg-[#161b22] border-b border-[#30363d] shadow-md z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide leading-tight">Crimson Map Customizer</h1>
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Visual Color Editor</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center text-xs text-gray-400 mr-4 whitespace-nowrap italic">
            <span>
              to use with{" "}
              <a 
                href="https://www.nexusmods.com/crimsondesert/mods/411" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
              >
                Dark Mode Map
              </a>{" "}
              made by{" "}
              <a 
                href="https://www.nexusmods.com/profile/TheLastGunslinger9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
              >
                TheLastGunslinger9
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2 mr-2">
            <button
              onClick={undo}
              disabled={history.length === 0}
              className="p-2.5 bg-[#21262d] hover:bg-[#30363d] text-gray-200 rounded-md border border-[#30363d] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Undo (Max 5)"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={redoStack.length === 0}
              className="p-2.5 bg-[#21262d] hover:bg-[#30363d] text-gray-200 rounded-md border border-[#30363d] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Redo (Max 5)"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <select
              value={activePreset}
              onChange={(e) => applyPreset(e.target.value)}
              className="appearance-none bg-[#21262d] border border-[#30363d] text-gray-200 text-sm font-semibold rounded-md pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:bg-[#30363d] transition-colors shadow-sm"
            >
              <option value="Custom" disabled hidden>Custom Colors</option>
              <optgroup label="Originals">
                <option value="Vanilla">Vanilla (Base Colors)</option>
                <option value="DarkMode">Dark Mode</option>
              </optgroup>
              <optgroup label="Games">
                <option value="FalloutPipBoy">Fallout Pip-Boy</option>
                <option value="Skyrim">Skyrim</option>
                <option value="EldenRing">Elden Ring</option>
                <option value="ZeldaBotw">Zelda BOTW</option>
                <option value="Persona5">Persona 5</option>
                <option value="Doom">Doom</option>
                <option value="HollowKnight">Hollow Knight</option>
                <option value="MirrorsEdge">Mirror's Edge</option>
                <option value="GameBoyClassic">Game Boy Classic</option>
              </optgroup>
              <optgroup label="Styles & Art">
                <option value="CyberPunk">CyberPunk</option>
                <option value="Synthwave">Synthwave</option>
                <option value="Vaporwave">Vaporwave</option>
                <option value="Noir">Noir</option>
                <option value="WildWest">Wild West</option>
                <option value="ArtDeco">Art Deco</option>
                <option value="RomeroBritto">Romero Britto</option>
                <option value="Mondrian">Mondrian</option>
                <option value="PopArt">Pop Art</option>
              </optgroup>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#21262d] hover:bg-[#30363d] text-gray-200 text-sm font-bold rounded-md border border-[#30363d] transition-all"
          >
            <Upload className="w-4 h-4" />
            Import JSON
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={importJson} 
            accept=".json" 
            className="hidden" 
          />
          
          <button 
            onClick={exportJson}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-md shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] transition-all"
          >
            <Download className="w-4 h-4" />
            Export colors.json
          </button>
        </div>
      </header>

      {/* ÁREA DE TRABALHO PRINCIPAL */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* BARRA LATERAL (Categorias de Cores) */}
        <div className="w-[420px] flex flex-col bg-[#0d1117] border-r border-[#30363d] overflow-y-auto custom-scrollbar z-10">
          <div className="p-5 flex flex-col gap-6">
            {GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm">
                
                {/* Cabeçalho do Grupo */}
                <div className="bg-[#21262d] px-4 py-3 border-b border-[#30363d] flex items-center gap-3">
                  <span className="text-indigo-400">{group.icon}</span>
                  <h2 className="text-xs font-bold text-gray-200 uppercase tracking-wider">{group.title}</h2>
                </div>
                
                {/* Linhas de Cores */}
                <div className="p-2 flex flex-col gap-1">
                  {group.indices.map(idx => {
                    const item = RAW_DATA[idx];
                    const color = colors[idx] || "#000000";
                    return (
                      <div key={idx} className="flex items-center justify-between px-3 py-2 hover:bg-[#21262d] rounded-lg transition-colors group">
                        
                        <div className="flex flex-col overflow-hidden pr-3">
                          <span className="text-xs font-semibold text-gray-300 truncate" title={getLabel(item, idx)}>
                            {getLabel(item, idx)}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono mt-0.5">Index: {idx}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] text-gray-400 font-mono uppercase w-16 text-right">
                            {color}
                          </span>
                          
                          {/* Botão de Cor (Estilizado) */}
                          <div className="relative w-8 h-8 rounded-md shadow-inner border border-[#30363d] cursor-pointer overflow-hidden group-hover:ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#161b22] transition-all">
                            <div className="absolute inset-0" style={{ backgroundColor: color }}></div>
                            <input
                              type="color"
                              value={color}
                              onChange={(e) => handleColorChange(idx, e.target.value)}
                              className="absolute -top-4 -left-4 w-16 h-16 opacity-0 cursor-pointer"
                              title="Change Color"
                            />
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAINEL DIREITO (Mapa "Live Preview") */}
        <div className="flex-1 relative bg-[#090c10] flex flex-col" style={mapStyles}>
          
          {/* Indicador Flutuante "Live Rendering" */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-[#161b22]/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#30363d] shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-gray-200 uppercase tracking-widest">Live Rendering</span>
          </div>

          <div className="flex-1 w-full h-full relative overflow-hidden bg-[var(--c-bg)] transition-colors duration-700 ease-in-out">
            
            <svg 
              viewBox="0 0 1920 1080" 
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.25" />
                </filter>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* 1. BACKGROUND BASE */}
              <rect width="100%" height="100%" fill="var(--c-bg)" className="transition-colors duration-700" />
              
              {/* 2. SEA AREA (Fill & Outline) */}
              <g className="transition-colors duration-700">
                <path 
                  d="M 0,0 L 1920,0 L 1920,1080 L 0,1080 Z M 400,200 C 600,100 1300,100 1500,300 C 1700,500 1600,800 1300,900 C 1000,1000 500,900 400,700 C 300,500 200,300 400,200 Z" 
                  fill="var(--c-sea)" fillRule="evenodd" opacity="0.8"
                />
                <path 
                  d="M 400,200 C 600,100 1300,100 1500,300 C 1700,500 1600,800 1300,900 C 1000,1000 500,900 400,700 C 300,500 200,300 400,200 Z" 
                  fill="none" stroke="var(--c-sea-str)" strokeWidth="8"
                />
                {/* Secondary Sea Area (Worldmap 2) */}
                <path 
                  d="M 1600,700 C 1750,750 1850,900 1800,1000 L 1500,1000 C 1550,900 1550,750 1600,700 Z" 
                  fill="var(--c-worldmap-2)" stroke="var(--c-worldmap-2-land-str)" strokeWidth="4"
                />
              </g>

              {/* 3. MAIN LAND MASS (Fill & Outline) */}
              <g className="transition-colors duration-700">
                <path 
                  d="M 400,200 C 600,100 1300,100 1500,300 C 1700,500 1600,800 1300,900 C 1000,1000 500,900 400,700 C 300,500 200,300 400,200 Z" 
                  fill="var(--c-land)"
                />
                <path 
                  d="M 400,200 C 600,100 1300,100 1500,300 C 1700,500 1600,800 1300,900 C 1000,1000 500,900 400,700 C 300,500 200,300 400,200 Z" 
                  fill="none" stroke="var(--c-land-str)" strokeWidth="4"
                />
                {/* Topography Detail */}
                <path d="M 600,400 Q 950,300 1300,400" fill="none" stroke="var(--c-height-line)" strokeWidth="2" opacity="0.3" />
              </g>

              {/* 4. MOUNTAIN RANGE (Fill & Outline) */}
              <g transform="translate(850, 350)" className="transition-colors duration-700">
                <path d="M 0,150 L 100,0 L 200,150 Z" fill="var(--c-mountain)" stroke="var(--c-mountain-str)" strokeWidth="4" />
                <path d="M 150,150 L 250,50 L 350,150 Z" fill="var(--c-mountain)" stroke="var(--c-mountain-str)" strokeWidth="4" />
                <path d="M 100,0 L 120,60 L 80,100" fill="none" stroke="var(--c-mountain-str)" strokeWidth="2" opacity="0.5" />
              </g>

              {/* 5. ROADS & TRAILS (Fill & Outline) */}
              <g className="transition-colors duration-700">
                <path 
                  d="M 500,400 C 700,500 1100,500 1300,700" 
                  fill="none" stroke="var(--c-road)" strokeWidth="12" strokeLinecap="round"
                />
                <path 
                  d="M 500,400 C 700,500 1100,500 1300,700" 
                  fill="none" stroke="var(--c-road-land-str)" strokeWidth="2" strokeDasharray="10,10"
                />
              </g>

              {/* 6. REGIONS & ZONES (Fill & Outline) */}
              <g className="transition-colors duration-700">
                {/* Faction Region */}
                <path d="M 1100,200 L 1400,200 L 1450,400 L 1150,450 Z" fill="var(--c-faction-region)" stroke="var(--c-faction)" strokeWidth="4" opacity="0.7" />
                <path d="M 1150,250 L 1350,250 L 1380,380 L 1180,400 Z" fill="var(--c-faction-region-2)" opacity="0.4" />
                
                {/* Religion Region */}
                <circle cx="600" cy="600" r="80" fill="var(--c-religion)" stroke="var(--c-ui-1)" strokeWidth="2" opacity="0.6" />
                
                {/* Wanted Region */}
                <path d="M 450,750 Q 600,650 750,750" fill="none" stroke="var(--c-wanted)" strokeWidth="30" strokeLinecap="round" opacity="0.8" />
                
                {/* Restricted Areas */}
                <g transform="translate(1300, 750)">
                  <rect width="120" height="120" fill="var(--c-restricted-town)" stroke="var(--c-restricted-town-2)" strokeWidth="4" />
                  <circle cx="60" cy="60" r="30" fill="var(--c-restricted-trigger)" stroke="var(--c-restricted-trigger-2)" strokeWidth="2" />
                </g>

                {/* Danger Zone */}
                <rect x="900" y="750" width="40" height="40" fill="var(--c-danger)" stroke="var(--c-bg)" strokeWidth="2" rx="4" />
              </g>

              {/* 7. FOG & ABYSS (Peripheral Layers) */}
              <g className="transition-colors duration-700">
                {/* General Fog */}
                <rect width="1920" height="1080" fill="var(--c-fog)" opacity="0.15" pointerEvents="none" />
                
                {/* Overfog (Top Corner) */}
                <path d="M 1500,0 L 1920,0 L 1920,300 Z" fill="var(--c-overfog)" />
                <path d="M 1500,0 L 1920,300" fill="none" stroke="var(--c-overfog-land-str)" strokeWidth="4" />
                <path d="M 1920,0 L 1500,0" fill="none" stroke="var(--c-overfog-sea-str)" strokeWidth="2" />

                {/* Abyss (Bottom Left) */}
                <g transform="translate(150, 750)">
                  <path d="M 0,50 L 100,0 L 200,50 L 200,150 L 100,200 L 0,150 Z" fill="var(--c-abyss-bg-hex)" stroke="var(--c-abyss-bg-hex-land-str)" strokeWidth="4" />
                  <circle cx="100" cy="100" r="60" fill="var(--c-abyss-fog)" stroke="var(--c-abyss-border-fog)" strokeWidth="2" />
                  <circle cx="100" cy="100" r="40" fill="var(--c-abyss-fog-2)" stroke="var(--c-abyss-border-fog-2)" strokeWidth="1" />
                </g>

                {/* None Play Region (Borders) */}
                <rect width="1920" height="40" fill="var(--c-none-play)" opacity="0.6" />
                <rect y="1040" width="1920" height="40" fill="var(--c-none-play)" opacity="0.6" />
              </g>

              {/* 8. INTERFACE & LOADING (Corner Widgets) */}
              <g transform="translate(1550, 850)" className="transition-colors duration-700">
                <rect width="280" height="180" fill="var(--c-loading)" rx="12" stroke="var(--c-ui-1)" strokeWidth="4" />
                <rect x="30" y="140" width="220" height="12" fill="var(--c-loading-2)" rx="6" />
                <rect x="30" y="30" width="50" height="50" fill="var(--c-abyss-loading)" rx="8" />
                <text x="140" y="100" textAnchor="middle" fill="var(--c-ui-2)" fontSize="24" fontWeight="bold" fontFamily="sans-serif">PREVIEW</text>
              </g>

            </svg>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0d1117; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #30363d; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #484f58; 
        }
      `}} />
    </div>
  );
}
