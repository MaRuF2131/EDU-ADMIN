"use client";
import { useState } from "react";

export default function FormCanvas({ fields, onSelectField, onDeleteField, selectedFieldId }) {
  
  // যেসব ফিল্ড কোলাপ্স আছে তাদের আইডি এখানে রাখা হবে
  const [collapsedFields, setCollapsedFields] = useState([]);

  // কোলাপ্স টগল করার ফাংশন
  const toggleCollapse = (id) => {
    setCollapsedFields(prev => 
      prev.includes(id) ? prev.filter(fieldId => fieldId !== id) : [...prev, id]
    );
  };

  const handleSaveForm = () => {
    console.log("Saving Metadata to Backend:", JSON.stringify(fields, null, 2));
    alert("Form Metadata logged to console!");
  };

  // হেডারে ছোট ছোট আইকন দেখানোর জন্য
  const getTypeIcon = (type) => {
    const icons = {
      text: "Aa", number: "#", email: "@", password: "🔒",
      select: "▼", multiselect: "☑", radio: "◉", checkbox: "☐",
      date: "📅", file: "📎", signature: "✍️", richtext: "📝"
    };
    return icons[type] || "📄";
  };

  const renderFieldPreview = (field) => {
    const baseClass = "w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-slate-50 text-slate-500";
    
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "password":
        return <input type={field.type} placeholder={field.placeholder} className={baseClass} readOnly />;
      case "date":
        return <input type="date" className={baseClass} readOnly />;
      case "select":
        return <select className={baseClass} disabled><option>Select an option...</option></select>;
      case "multiselect":
        return (
          <div className="border border-slate-300 rounded-md p-2 min-h-[38px] bg-slate-50 text-xs text-slate-400 flex flex-wrap gap-1">
            <span className="bg-slate-200 px-2 py-0.5 rounded">Option 1</span>
            <span className="bg-slate-200 px-2 py-0.5 rounded">Option 2</span>
          </div>
        );
      case "radio":
        return (
          <div className="flex gap-6 mt-1">
            <label className="flex items-center text-sm text-slate-600"><input type="radio" name={field.id} className="mr-2" disabled/> Option 1</label>
            <label className="flex items-center text-sm text-slate-600"><input type="radio" name={field.id} className="mr-2" disabled/> Option 2</label>
          </div>
        );
      case "checkbox":
        return <label className="flex items-center text-sm text-slate-600 mt-1"><input type="checkbox" className="mr-2 w-4 h-4" disabled/> Check this box</label>;
      case "file":
        return (
          <div className="border-2 border-dashed border-slate-300 rounded-md p-4 text-center bg-slate-50">
            <p className="text-sm text-slate-500">📎 Drag & Drop files here or <span className="text-blue-500 font-medium">Browse</span></p>
          </div>
        );
      case "signature":
        return (
          <div className="border border-slate-300 rounded-md bg-white h-24 flex flex-col items-center justify-center relative">
            <p className="text-slate-400 text-sm mb-2">✍️ Draw Signature Here</p>
            <div className="w-3/4 border-t border-slate-300"></div>
            <button className="absolute top-2 right-2 text-xs text-red-500 border border-red-200 px-2 py-1 rounded">Clear</button>
          </div>
        );
      case "richtext":
        return (
          <div className="border border-slate-300 rounded-md bg-white overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-1">
              {["B", "I", "U", "S", "|", "List", "Img", "Link"].map(btn => (
                <button key={btn} className="w-7 h-7 text-xs flex items-center justify-center rounded hover:bg-slate-200 text-slate-600 font-medium">{btn}</button>
              ))}
            </div>
            <div className="p-3 h-16 text-sm text-slate-400">Start typing your rich text here...</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-slate-100 p-8 overflow-y-auto h-full flex flex-col">
      <div className="max-w-2xl mx-auto w-full bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Form Elements</h2>
        
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
            <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4" /></svg>
            <p className="font-medium">Empty Form</p>
            <p className="text-sm mt-1">Click on elements from the left toolbox to add them here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field) => {
              // যদি ফিল্ডটি সিলেক্টেড থাকে, তাহলে জোর করে এক্সপ্যান্ড করে রাখবে
              const isCollapsed = collapsedFields.includes(field.id) && selectedFieldId !== field.id;
              const isSelected = selectedFieldId === field.id;

              return (
                <div
                  key={field.id}
                  className={`border-2 rounded-lg transition-all duration-300 overflow-hidden ${
                    isSelected ? "border-blue-500 shadow-md" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* ক্লিকযোগ্য হেডার (Show/Hide করার জন্য) */}
                  <div 
                    className="flex items-center justify-between p-3 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => toggleCollapse(field.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm bg-white border border-slate-200 w-8 h-8 rounded flex items-center justify-center shadow-sm">
                        {getTypeIcon(field.type)}
                      </span>
                      <span className="text-sm font-semibold text-slate-700">
                        {field.label} 
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Conditional Badge */}
                      {field.condition?.dependsOn && field.condition.dependsOn !== "none" && (
                        <span className="text-[10px] font-bold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full shadow-sm">
                          CONDITIONAL
                        </span>
                      )}
                      
                      {/* Delete Button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteField(field.id); }}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>

                      {/* Collapse Arrow */}
                      <svg 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* কোলাপ্সযোগ্য বডি (প্রিভিউ এলিমেন্ট) */}
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
                    }`}
                  >
                    <div 
                      className="p-4 border-t border-slate-100 cursor-pointer"
                      onClick={() => onSelectField(field.id)}
                    >
                      {renderFieldPreview(field)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Save Button */}
      {fields.length > 0 && (
        <div className="max-w-2xl mx-auto w-full mt-6 flex justify-end gap-3">
          <button className="px-5 py-2.5 border border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm">
            Preview Form
          </button>
          <button
            onClick={handleSaveForm}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm transition-colors text-sm"
          >
            Save Form Metadata
          </button>
        </div>
      )}
    </div>
  );
}