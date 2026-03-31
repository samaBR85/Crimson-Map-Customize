import React, { useState, useRef } from 'react';
import { Download, Upload, Globe, Map as MapIcon, Palette, Shield, Wind, Monitor, ChevronDown, Check } from 'lucide-react';

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
  CyberPunk: { outline: "#00f0ff", outlineAlt: "#ff003c", sea: "#051024", road: "#fcee0a", mountain: "#7000ff", region: "#39ff14", wanted: "#ff003c", fog: "#1a002a", ui: "#0b0c10", base: "#111827" },
  RomeroBritto: { outline: "#000000", sea: "#00A8FF", road: "#FF007F", mountain: "#9D00FF", region: "#85E21F", wanted: "#FF0000", fog: "#FFFFFF", ui: "#FFCC00", base: "#FFCC00" },
  Mondrian: { outline: "#000000", sea: "#FFFFFF", road: "#FFD100", mountain: "#E3000F", region: "#0055A4", wanted: "#E3000F", fog: "#111111", ui: "#F4F4F4", base: "#FFFFFF" },
  FalloutPipBoy: { outline: "#15d600", sea: "#0a2e05", road: "#15d600", mountain: "#117806", region: "#22ff00", wanted: "#15d600", fog: "#041202", ui: "#041202", base: "#051c03" },
  GameBoyClassic: { outline: "#0f380f", sea: "#306230", road: "#0f380f", mountain: "#0f380f", region: "#9bbc0f", wanted: "#306230", fog: "#8bac0f", ui: "#9bbc0f", base: "#8bac0f" },
  Persona5: { outline: "#000000", sea: "#111111", road: "#ffffff", mountain: "#880000", region: "#ffffff", wanted: "#ff0000", fog: "#000000", ui: "#ff0000", base: "#ff0000" },
  ZeldaBotw: { outline: "#3b312a", sea: "#69aeb8", road: "#dcd0a6", mountain: "#7c8e74", region: "#b6cba1", wanted: "#d04b49", fog: "#e4dec8", ui: "#e2d7b5", base: "#c1cca5" },
  Skyrim: { outline: "#2a221b", sea: "#c1bba4", road: "#544434", mountain: "#695e53", region: "#82786a", wanted: "#7a3124", fog: "#dcd3bd", ui: "#ebdcc8", base: "#d7cdba" },
  MirrorsEdge: { outline: "#000000", sea: "#0088ff", road: "#ff0000", mountain: "#cccccc", region: "#ffaa00", wanted: "#ff0000", fog: "#ffffff", ui: "#ffffff", base: "#ffffff" },
  Doom: { outline: "#ff3300", sea: "#440000", road: "#ffaa00", mountain: "#220000", region: "#cc0000", wanted: "#ff0000", fog: "#110000", ui: "#110000", base: "#551100" },
  Synthwave: { outline: "#ff00ff", sea: "#000022", road: "#00ffff", mountain: "#220044", region: "#ff00aa", wanted: "#ff0000", fog: "#110022", ui: "#0a0a1a", base: "#110033" },
  Vaporwave: { outline: "#ff77ff", sea: "#00ffff", road: "#ffff00", mountain: "#aa77ff", region: "#ff00ff", wanted: "#ff0077", fog: "#ffd1dc", ui: "#e0b0ff", base: "#ffb6c1" },
  ArtDeco: { outline: "#d4af37", sea: "#0a1f1c", road: "#d4af37", mountain: "#112e29", region: "#c5a017", wanted: "#800020", fog: "#000000", ui: "#050f0e", base: "#0a1f1c" },
  PopArt: { outline: "#000000", sea: "#00ffff", road: "#ff00ff", mountain: "#0000ff", region: "#00ff00", wanted: "#ff0000", fog: "#ffffff", ui: "#ffff00", base: "#ffff00" },
  EldenRing: { outline: "#8c7b50", sea: "#111a22", road: "#d4af37", mountain: "#2c3539", region: "#7b6a4a", wanted: "#8b0000", fog: "#0a0c10", ui: "#1c1c1c", base: "#24282a" },
  Noir: { outline: "#000000", sea: "#333333", road: "#ffffff", mountain: "#555555", region: "#888888", wanted: "#ff0000", fog: "#111111", ui: "#222222", base: "#aaaaaa" },
  WildWest: { outline: "#4a3018", sea: "#8b6b4a", road: "#d2a679", mountain: "#6b4423", region: "#b8860b", wanted: "#8b0000", fog: "#e6ccab", ui: "#d2b48c", base: "#cd853f" },
  HollowKnight: { outline: "#1a1c23", sea: "#202433", road: "#8b9bb4", mountain: "#13151f", region: "#4a5462", wanted: "#803040", fog: "#0b0c10", ui: "#12141c", base: "#2c3140" }
};

// --- GRUPOS LÓGICOS DE CORES ---
const GROUPS = [
  {
    title: "Environment (Base)",
    icon: <Globe className="w-4 h-4" />,
    indices: [0, 3, 4, 5, 9, 10, 11]
  },
  {
    title: "Terrain & Relief",
    icon: <MapIcon className="w-4 h-4" />,
    indices: [14, 15, 17, 18, 19]
  },
  {
    title: "Zones & Factions",
    icon: <Shield className="w-4 h-4" />,
    indices: [13, 20, 21, 28, 29, 30, 31]
  },
  {
    title: "Fog & Abyss",
    icon: <Wind className="w-4 h-4" />,
    indices: [6, 7, 8, 12, 16, 22, 26, 27]
  },
  {
    title: "Interface & Loading",
    icon: <Monitor className="w-4 h-4" />,
    indices: [1, 2, 23, 24, 25]
  }
];

// --- UTILITÁRIOS ---
const extractHex = (str: string) => {
  const match = str.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})/i);
  return match ? (match[0].length === 9 ? match[0].substring(0, 7) : match[0]) : "#000000";
};

const getLabel = (item: any, index: number) => {
  if (!item.preset) return `Interface Color ${index + 1}`;
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
    const isOutline = item.vanilla.includes('Outline');
    const vanillaHex = extractHex(item.vanilla).toLowerCase();
    const presetStr = item.preset || "ui";
    
    presets.Vanilla.push(vanillaHex);
    presets.DarkMode.push(item.mod.toLowerCase());

    let type: keyof typeof CUSTOM_PALETTES.CyberPunk = "base";
    if (isOutline) type = "outline";
    else if (presetStr.includes('sea')) type = "sea";
    else if (presetStr.includes('road')) type = "road";
    else if (presetStr.includes('mountain')) type = "mountain";
    else if (presetStr.includes('region') || presetStr.includes('faction')) type = "region";
    else if (presetStr.includes('wanted') || presetStr.includes('restricted')) type = "wanted";
    else if (presetStr.includes('fog') || presetStr.includes('abyss') || presetStr.includes('loading')) type = "fog";
    else if (presetStr === "ui") type = "ui";

    Object.entries(CUSTOM_PALETTES).forEach(([name, palette]) => {
      let color = (palette as any)[type] || (palette as any).base;
      if (type === "outline" && (palette as any).outlineAlt && i % 2 !== 0) color = (palette as any).outlineAlt;
      presets[name].push(color);
    });
  });
  return presets;
};

const presetsMap = generatePresets(RAW_DATA);

export default function App() {
  const [colors, setColors] = useState(presetsMap.Vanilla);
  const [activePreset, setActivePreset] = useState('Vanilla');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
    setActivePreset('Custom');
  };

  const applyPreset = (presetName: string) => {
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
    "--c-land": colors[3],        
    "--c-land-str": colors[4],    
    "--c-sea": colors[11],        
    "--c-sea-str": colors[5],     
    "--c-road": colors[14],       
    "--c-mountain": colors[17],   
    "--c-mountain-str": colors[18], 
    "--c-faction": colors[20],    
    "--c-religion": colors[21],   
    "--c-danger": colors[28],     
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
                            {colors[idx]}
                          </span>
                          
                          {/* Botão de Cor (Estilizado) */}
                          <div className="relative w-8 h-8 rounded-md shadow-inner border border-[#30363d] cursor-pointer overflow-hidden group-hover:ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#161b22] transition-all">
                            <div className="absolute inset-0" style={{ backgroundColor: colors[idx] }}></div>
                            <input
                              type="color"
                              value={colors[idx]}
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
              className="absolute inset-0 w-full h-full drop-shadow-2xl"
              preserveAspectRatio="xMidYMid slice"
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
                {/* Paper texture pattern */}
                <pattern id="paper-texture" width="400" height="400" patternUnits="userSpaceOnUse">
                  <rect width="400" height="400" fill="var(--c-bg)" />
                  <circle cx="100" cy="100" r="1" fill="black" opacity="0.03" />
                  <circle cx="300" cy="250" r="1.5" fill="black" opacity="0.02" />
                  <path d="M 0 0 L 400 400 M 400 0 L 0 400" stroke="black" strokeWidth="0.5" opacity="0.01" />
                </pattern>
                {/* Hatching for mountains */}
                <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="var(--c-mountain-str)" strokeWidth="1" opacity="0.3" />
                </pattern>
              </defs>

              {/* Background Terrain */}
              <rect width="100%" height="100%" fill="url(#paper-texture)" className="transition-colors duration-700" />
              
              {/* === WATER (SEA & COASTLINE) === */}
              <g className="transition-colors duration-700">
                {/* Deep Sea */}
                <path 
                  d="M 0,0 L 420,0 C 380,150 480,300 350,450 C 250,600 400,750 280,900 C 180,1000 300,1080 0,1080 Z" 
                  fill="var(--c-sea)" opacity="0.3"
                />
                {/* Coastline Depth & Wave Lines */}
                <path 
                  d="M 15,0 C 390,160 490,310 360,460 C 260,610 410,760 290,910 C 190,1010 310,1080 15,1080" 
                  fill="none" stroke="var(--c-sea-str)" strokeWidth="2" opacity="0.2"
                />
                <path 
                  d="M 25,0 C 400,170 500,320 370,470 C 270,620 420,770 300,920 C 200,1020 320,1080 25,1080" 
                  fill="none" stroke="var(--c-sea-str)" strokeWidth="1" opacity="0.1" strokeDasharray="20,10"
                />
                {/* Main Jagged Coastline */}
                <path 
                  d="M 0,0 L 400,0 C 360,150 460,300 330,450 C 230,600 380,750 260,900 C 160,1000 280,1080 0,1080 Z" 
                  fill="var(--c-sea)" stroke="var(--c-sea-str)" strokeWidth="4"
                />
                
                {/* Coastal Islands & Ripples */}
                <path d="M 450,200 C 470,180 500,210 480,230 C 460,250 430,220 450,200 Z" fill="var(--c-sea)" stroke="var(--c-sea-str)" strokeWidth="2" />
                <path d="M 440,190 C 470,160 520,210 490,240" fill="none" stroke="var(--c-sea-str)" strokeWidth="1" opacity="0.2" />
                
                <path d="M 380,700 C 400,680 430,710 410,730 C 390,750 360,720 380,700 Z" fill="var(--c-sea)" stroke="var(--c-sea-str)" strokeWidth="2" />
                <path d="M 370,690 C 400,660 450,710 420,740" fill="none" stroke="var(--c-sea-str)" strokeWidth="1" opacity="0.2" />
                
                {/* Inland Lake & Complex River System */}
                <path 
                  d="M 1450,750 C 1500,700 1650,700 1700,780 C 1750,860 1650,980 1500,950 C 1400,920 1350,820 1450,750 Z" 
                  fill="var(--c-sea)" stroke="var(--c-sea-str)" strokeWidth="3"
                />
                <path d="M 1470,770 C 1520,740 1620,740 1660,800" fill="none" stroke="var(--c-sea-str)" strokeWidth="1" opacity="0.3" />
                
                <path 
                  d="M 1450,750 C 1350,730 1250,800 1150,770 C 1050,740 950,830 850,800 C 750,770 650,850 550,820" 
                  fill="none" stroke="var(--c-sea)" strokeWidth="10" strokeLinecap="round" opacity="0.5"
                />
                {/* River Ripples */}
                <path d="M 1100,760 L 1130,765 M 1000,780 L 1030,785 M 900,800 L 930,805" stroke="var(--c-sea-str)" strokeWidth="1" opacity="0.3" />
              </g>

              {/* === TERRAIN CONTOUR LINES (TOPOGRAPHY) === */}
              <g fill="none" stroke="var(--c-land-str)" strokeWidth="1" opacity="0.05" className="transition-colors duration-700">
                <path d="M 500,300 C 700,250 1000,250 1200,400 C 1400,550 1300,800 1100,900 C 900,1000 600,950 500,800" />
                <path d="M 550,350 C 750,300 1050,300 1250,450 C 1450,600 1350,850 1150,950 C 950,1050 650,1000 550,850" />
              </g>

              {/* === MOUNTAINS (HIGHLY DETAILED RIDGES & CRAGS) === */}
              <g className="transition-colors duration-700">
                {/* North Range Peaks */}
                <g transform="translate(650, 80)">
                  {/* Peak 1 with Ridges */}
                  <path d="M 0,120 L 60,20 L 120,120 Z" fill="var(--c-mountain)" stroke="var(--c-mountain-str)" strokeWidth="2" />
                  <path d="M 60,20 L 50,60 L 65,80 L 45,120" fill="none" stroke="var(--c-mountain-str)" strokeWidth="1" opacity="0.4" />
                  <path d="M 60,20 L 70,50 L 55,70 L 65,90" fill="none" stroke="var(--c-mountain-str)" strokeWidth="0.5" opacity="0.3" />
                  <path d="M 60,20 L 80,60 L 60,80 L 40,60 Z" fill="white" opacity="0.3" />
                  <path d="M 60,20 L 120,120 L 60,120 Z" fill="black" opacity="0.15" />
                  
                  {/* Peak 2 with Ridges */}
                  <path d="M 100,140 L 180,40 L 260,140 Z" fill="var(--c-mountain)" stroke="var(--c-mountain-str)" strokeWidth="2" />
                  <path d="M 180,40 L 170,80 L 190,100 L 175,140" fill="none" stroke="var(--c-mountain-str)" strokeWidth="1" opacity="0.4" />
                  <path d="M 180,40 L 260,140 L 180,140 Z" fill="black" opacity="0.15" />
                  
                  {/* Peak 3 with Ridges */}
                  <path d="M 240,120 L 320,20 L 400,120 Z" fill="var(--c-mountain)" stroke="var(--c-mountain-str)" strokeWidth="2" />
                  <path d="M 320,20 L 310,60 L 330,80 L 315,120" fill="none" stroke="var(--c-mountain-str)" strokeWidth="1" opacity="0.4" />
                  <path d="M 320,20 L 400,120 L 320,120 Z" fill="black" opacity="0.15" />
                </g>

                {/* East Range Peaks */}
                <g transform="translate(1550, 250)">
                  <path d="M 0,180 L 80,30 L 160,180 Z" fill="var(--c-mountain)" stroke="var(--c-mountain-str)" strokeWidth="2" />
                  <path d="M 80,30 L 70,80 L 90,120 L 75,180" fill="none" stroke="var(--c-mountain-str)" strokeWidth="1" opacity="0.4" />
                  <path d="M 80,30 L 160,180 L 80,180 Z" fill="black" opacity="0.15" />
                </g>
              </g>

              {/* === TERRAIN & BIOMES (ORGANIC TEXTURES) === */}
              <g className="transition-colors duration-700">
                {/* Swamp Area with Reeds */}
                <g transform="translate(1200, 200)" opacity="0.2">
                  <path d="M 0,0 C 50,-20 100,20 150,0 C 200,-20 250,20 300,0" fill="none" stroke="var(--c-land-str)" strokeWidth="2" />
                  <path d="M 10,20 C 60,0 110,40 160,20 C 210,0 260,40 310,20" fill="none" stroke="var(--c-land-str)" strokeWidth="2" />
                  {/* Reeds */}
                  <line x1="50" y1="-10" x2="55" y2="-25" stroke="var(--c-land-str)" strokeWidth="1" />
                  <line x1="150" y1="10" x2="155" y2="-5" stroke="var(--c-land-str)" strokeWidth="1" />
                  <line x1="250" y1="-10" x2="255" y2="-25" stroke="var(--c-land-str)" strokeWidth="1" />
                </g>
                
                {/* Organic Forest Blobs */}
                <g fill="var(--c-land-str)" opacity="0.25">
                  {/* West Forest Blob */}
                  <path d="M 620,450 C 600,430 580,460 590,490 C 600,520 640,530 670,510 C 700,490 680,440 650,430 C 630,420 620,450 620,450 Z" />
                  {/* Internal detail */}
                  <path d="M 620,460 L 630,470 M 650,480 L 660,490" stroke="var(--c-bg)" strokeWidth="1" opacity="0.5" />
                  
                  {/* East Forest Blob */}
                  <path d="M 1120,600 C 1100,580 1080,610 1090,640 C 1100,670 1140,680 1170,660 C 1200,640 1180,590 1150,580 C 1130,570 1120,600 1120,600 Z" />
                </g>

                {/* Grass Clusters */}
                <g stroke="var(--c-land-str)" strokeWidth="1" opacity="0.15" fill="none">
                  <path d="M 800,300 L 805,290 M 805,290 L 810,300" />
                  <path d="M 820,310 L 825,300 M 825,300 L 830,310" />
                  <path d="M 1000,700 L 1005,690 M 1005,690 L 1010,700" />
                </g>

                {/* Settlement Clusters (Towns) */}
                <g fill="var(--c-danger)" opacity="0.6" stroke="var(--c-bg)" strokeWidth="1">
                  {/* Town 1 */}
                  <rect x="980" y="430" width="12" height="12" rx="1" />
                  <rect x="995" y="435" width="8" height="8" rx="1" />
                  <rect x="985" y="445" width="10" height="10" rx="1" />
                  <path d="M 980,430 L 986,424 L 992,430 Z" /> {/* Roof */}
                  
                  {/* Castle / Keep */}
                  <g transform="translate(1480, 720)">
                    <rect x="0" y="0" width="20" height="20" rx="1" />
                    <rect x="-5" y="-10" width="10" height="30" rx="1" />
                    <rect x="15" y="-10" width="10" height="30" rx="1" />
                    <path d="M -5,-10 L 0,-15 L 5,-10 Z" />
                    <path d="M 15,-10 L 20,-15 L 25,-10 Z" />
                  </g>
                </g>
              </g>

              {/* === ROADS & TRAILS === */}
              <g stroke="var(--c-road)" fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-700">
                {/* Main Arteries */}
                <path 
                  d="M 400,350 C 600,400 800,370 1000,500 C 1200,630 1400,600 1600,700" 
                  strokeWidth="10" opacity="0.8"
                />
                <path 
                  d="M 850,150 C 870,300 830,450 900,600 C 970,750 900,900 950,1050" 
                  strokeWidth="6" opacity="0.7"
                />
                
                {/* Mountain Trails (Dashed) */}
                <path d="M 750,150 L 700,100" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
                <path d="M 1650,400 L 1700,350" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
              </g>

              {/* === DECORATIVE ELEMENTS === */}
              <g transform="translate(1750, 150)" opacity="0.4" stroke="var(--c-land-str)" fill="none">
                <circle r="60" strokeWidth="2" />
                <circle r="50" strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 0,-70 L 10,-50 L 0,-55 L -10,-50 Z" fill="var(--c-land-str)" /> {/* North */}
                <path d="M 0,70 L 10,50 L 0,55 L -10,50 Z" /> {/* South */}
                <path d="M 70,0 L 50,10 L 55,0 L 50,-10 Z" /> {/* East */}
                <path d="M -70,0 L -50,10 L -55,0 L -50,-10 Z" /> {/* West */}
                <text x="0" y="-80" textAnchor="middle" fontSize="20" fill="var(--c-land-str)" stroke="none">N</text>
              </g>

              {/* === TEXT (CURVED & STYLIZED) === */}
              <g fill="var(--c-land-str)" fontFamily="'Georgia', serif" letterSpacing="10" fontWeight="bold" opacity="0.6" className="transition-colors duration-700">
                <defs>
                  <path id="textPath" d="M 850,150 Q 1010,100 1170,150" />
                </defs>
                <text fontSize="36" textAnchor="middle">
                  <textPath href="#textPath" startOffset="50%">HERNAND HIGHLANDS</textPath>
                </text>
              </g>

              {/* === PLAYER CURSOR (STYLIZED) === */}
              <g transform="translate(950, 650) rotate(-15)" filter="url(#glow)">
                <path d="M 0,-24 L -16,16 L 0,8 L 16,16 Z" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
                <circle cx="0" cy="0" r="4" fill="white" opacity="0.5" />
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
