import React, { useState } from 'react';
import { Download, Globe, Map as MapIcon, Palette, Shield, Wind, Monitor, ChevronDown, Check } from 'lucide-react';

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
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <pattern id="farm-pattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
                  <rect width="60" height="60" fill="var(--c-bg)" opacity="0.3" />
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--c-road)" strokeWidth="1.5" opacity="0.5"/>
                </pattern>
              </defs>

              <rect width="100%" height="100%" fill="var(--c-bg)" className="transition-colors duration-700" />
              
              <g className="transition-colors duration-700">
                <path d="M -100,1200 L 900,1200 Q 850,950 650,850 Q 450,800 350,600 Q 200,450 -100,550 Z" fill="var(--c-sea)" stroke="var(--c-sea-str)" strokeWidth="6" strokeLinejoin="round" />
                <path d="M 850,-100 Q 900,150 750,250 Q 600,350 800,500 T 600,650 T 550,800 Q 600,850 650,850" fill="none" stroke="var(--c-sea-str)" strokeWidth="48" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 850,-100 Q 900,150 750,250 Q 600,350 800,500 T 600,650 T 550,800 Q 600,850 650,850" fill="none" stroke="var(--c-sea)" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 600,650 Q 750,700 900,750 T 1100,900" fill="none" stroke="var(--c-sea)" strokeWidth="18" strokeLinecap="round" />
                <path d="M 350,600 Q 250,650 150,750" fill="none" stroke="var(--c-sea)" strokeWidth="14" strokeLinecap="round" />
                <path d="M 150,800 Q 180,750 250,850 T 150,950 Z" fill="var(--c-land)" stroke="var(--c-land-str)" strokeWidth="3" />
                <path d="M 800,900 Q 850,850 900,1050 T 750,1100 Z" fill="var(--c-land)" stroke="var(--c-land-str)" strokeWidth="3" />
              </g>

              <g fill="var(--c-mountain)" stroke="var(--c-mountain-str)" strokeWidth="3" opacity="0.4" className="transition-colors duration-700">
                <path d="M 650,-100 Q 700,50 650,180 T 600,350 T 680,450 T 550,550 L 420,500 T 450,250 Z" />
                <path d="M 200,600 Q 250,550 350,600 T 300,750 Z" />
                <path d="M 1300,-100 Q 1200,150 1350,300 T 1200,450 T 1400,600 L 1550,500 T 1600,150 Z" />
                <path d="M 1700,300 Q 1750,500 1900,550 L 2000,500 L 2000,200 Z" />
                <path d="M 1600,700 Q 1550,850 1700,950 T 1900,900 T 2000,1050 L 2000,650 Z" />
              </g>

              <g className="transition-colors duration-700" transform="translate(1200, 550)">
                <path d="M 50,250 L 180,100 L 400,180 L 500,300 L 350,450 L 100,380 Z" fill="var(--c-land)" stroke="var(--c-road)" strokeWidth="8" strokeLinejoin="round" />
                <path d="M 50,250 L 180,100 L 400,180 L 500,300 L 350,450 L 100,380 Z" fill="url(#farm-pattern)" />
                <path d="M 130,170 L 350,350 M 250,130 L 300,400 M 320,150 L 450,250 M 150,300 L 400,220 M 100,270 L 300,220" stroke="var(--c-road)" strokeWidth="5" />
              </g>

              <g stroke="var(--c-road)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" className="transition-colors duration-700">
                <path d="M 1250,800 Q 1100,850 1050,950 T 900,900" />
                <path d="M 1250,930 Q 1150,930 1100,1050 T 900,1100" />
                <path d="M 1700,850 Q 1850,900 2000,850" />
                <path d="M 1400,650 Q 1300,500 1250,450 T 1200,250 T 1000,200" />
                <path d="M 850,50 Q 1050,150 1200,50" />
                <path d="M 300,550 Q 380,500 500,530 T 650,480" />
                <path d="M 50,650 Q 200,750 350,650 T 450,800" />
              </g>

              <g fill="var(--c-land-str)" fontFamily="Georgia, serif" letterSpacing="14" fontWeight="bold" opacity="0.8" className="transition-colors duration-700">
                <text x="350" y="250" fontSize="38" transform="rotate(-28 350 250)">THE</text>
                <text x="350" y="300" fontSize="38" transform="rotate(-28 350 300)">WITCHWOODS</text>
                <text x="1450" y="320" fontSize="34" letterSpacing="18">HERNAND</text>
                <text x="1420" y="370" fontSize="34" letterSpacing="18">HIGHLANDS</text>
              </g>

              <g className="transition-colors duration-700">
                <g transform="translate(480, 320)" filter="url(#shadow)">
                  <circle cx="0" cy="0" r="40" fill="var(--c-bg)" stroke="var(--c-land-str)" strokeWidth="3" />
                  <g fill="var(--c-religion)">
                    <path d="M 0,-18 Q 12,-6 18,0 Q 12,6 0,18 Q -12,6 -18,0 Q -12,-6 0,-18 Z" />
                    <path d="M 0,-18 Q 12,-6 18,0 Q 12,6 0,18 Q -12,6 -18,0 Q -12,-6 0,-18 Z" transform="rotate(45)" />
                    <path d="M 0,-18 Q 12,-6 18,0 Q 12,6 0,18 Q -12,6 -18,0 Q -12,-6 0,-18 Z" transform="rotate(90)" />
                    <path d="M 0,-18 Q 12,-6 18,0 Q 12,6 0,18 Q -12,6 -18,0 Q -12,-6 0,-18 Z" transform="rotate(135)" />
                  </g>
                </g>
                <g transform="translate(1550, 800) rotate(-40)" filter="url(#glow)">
                  <polygon points="0,-20 -14,14 0,7 14,14" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2.5" />
                </g>
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
