import { Code2, Globe, Smartphone, Cpu, Layers, Database, Server, Terminal } from 'lucide-react';

export const CODE_TOKENS = [
  { text: "const", color: "text-pink-500 font-bold" }, { text: " ", color: "text-white" },
  { text: "Dev", color: "text-yellow-300" }, { text: " = {\n", color: "text-zinc-100" },
  { text: "  name", color: "text-cyan-400" }, { text: ": ", color: "text-zinc-100" },
  { text: "\"Seu Nome\"", color: "text-emerald-400" }, { text: ",\n", color: "text-zinc-100" },
  { text: "  role", color: "text-cyan-400" }, { text: ": ", color: "text-zinc-100" },
  { text: "\"Full Stack\"", color: "text-emerald-400" }, { text: ",\n", color: "text-zinc-100" },
  { text: "  exp", color: "text-cyan-400" }, { text: ": ", color: "text-zinc-100" },
  { text: "99", color: "text-orange-400" }, { text: ",\n", color: "text-zinc-100" },
  { text: "  stack", color: "text-cyan-400" }, { text: ": [", color: "text-zinc-100" },
  { text: "\"React\"", color: "text-emerald-400" }, { text: ", ", color: "text-zinc-100" },
  { text: "\"Node\"", color: "text-emerald-400" }, { text: "]\n", color: "text-zinc-100" },
  { text: "};", color: "text-zinc-100" },
];

export const TECH_STACK = [
  { icon: <Code2 size={28} />, name: "React", cat: "FRONT" },
  { icon: <Globe size={28} />, name: "Next.js", cat: "FRONT" },
  { icon: <Smartphone size={28} />, name: "React Native", cat: "FRONT" },
  { icon: <Cpu size={28} />, name: "GSAP", cat: "FRONT" },
  { icon: <Layers size={28} />, name: "Tailwind", cat: "FRONT" },
  { icon: <Database size={28} />, name: "Node.js", cat: "BACK" },
  { icon: <Server size={28} />, name: "PostgreSQL", cat: "BACK" },
  { icon: <Server size={28} />, name: "Docker", cat: "BACK" },
  { icon: <Terminal size={28} />, name: "TypeScript", cat: "LANG" },
  { icon: <Terminal size={28} />, name: "Python", cat: "LANG" },
  { icon: <Terminal size={28} />, name: "Java", cat: "LANG" },
];