export interface TapeConfig {
  text: string;
  speed: string;
  rotate: string;
  top: string;
  reverse: boolean;
  color?: string;
  opacity?: number;
  height?: string;
  width?: string;
}

export const tapes: TapeConfig[] = [
  { text: "MARCHIVE • CREATIVE ARCHIVE • ", speed: "10s", rotate: "-15deg", top: "10%", reverse: false, color: "#e0b868" },
  { text: "RESTRICTED ACCESS • TOP SECRET • ", speed: "12s", rotate: "10deg", top: "25%", reverse: true, color: "#c5a059" },
  { text: "DO NOT DISTURB • ART IN PROGRESS • ", speed: "13s", rotate: "-5deg", top: "40%", reverse: false, color: "#d4af37" },
  { text: "LOADING MEMORIES • SYSTEM ONLINE • ", speed: "14s", rotate: "15deg", top: "55%", reverse: true, color: "#b8860b" },
  { text: "MARCHIVE • 2024 ARCHIVE • ", speed: "12s", rotate: "-12deg", top: "75%", reverse: false, color: "#c5a059" },
  { text: "CAUTION: CREATIVITY OVERLOAD • ", speed: "12s", rotate: "5deg", top: "85%", reverse: true, color: "#daa520" },
  { text: "INITIALIZING PROTOCOLS • ESTABLISHING CONNECTION • ", speed: "12s", rotate: "45deg", top: "10%", reverse: false, opacity: 0.8, height: "40px", width: "500vw" },
  { text: "MARCHIVE • PRIVATE COLLECTION • ", speed: "14s", rotate: "-45deg", top: "10%", reverse: true, opacity: 0.8, height: "40px", width: "500vw" },
];
