"use client";
import { inputElements } from "./formData";

export default function ElementToolbox({ onAddElement }) {
  return (
    <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto h-full">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Drag & Drop Elements</h3>
      <div className="grid grid-cols-2 gap-2">
        {inputElements.map((el) => (
          <button
            key={el.type}
            onClick={() => onAddElement(el.type)}
            className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group cursor-grab active:scale-95"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">{el.icon}</span>
            <span className="text-[11px] font-medium text-slate-600 group-hover:text-blue-600">{el.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}