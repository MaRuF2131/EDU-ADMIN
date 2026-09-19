"use client";

import { useState } from "react";
import ElementToolbox from "./components/ElementToolbox";
import FormCanvas from "./components/FormCanvas";
import ElementProperties from "./components/ElementProperties";
import { formTypes } from "./components/formData";

export default function FormBuilderPage() {
  const [formType, setFormType] = useState("temporary");
  const [formFields, setFormFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  // নতুন স্টেটস: প্যানেলগুলো দেখাবে নাকি লুকাবে তা নিয়ন্ত্রণ করবে
  const [showToolbox, setShowToolbox] = useState(true);
  const [showProperties, setShowProperties] = useState(true);

  const handleAddElement = (type) => {
    const newField = {
      id: `field_${Date.now()}`,
      type: type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}...`,
      required: false,
      condition: {
        dependsOn: "none",
        value: ""
      }
    };
    setFormFields([...formFields, newField]);
  };

  const handleSelectField = (id) => setSelectedFieldId(id);

  const handleDeleteField = (id) => {
    setFormFields(formFields.filter((f) => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const handleUpdateField = (updatedField) => {
    setFormFields(formFields.map((f) => (f.id === updatedField.id ? updatedField : f)));
  };

  const selectedField = formFields.find((f) => f.id === selectedFieldId) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
      
      {/* টপ বার */}
      <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 flex-shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold text-slate-800">Dynamic Form Builder</h1>
          <div className="h-6 w-px bg-slate-300"></div>
          
          {/* প্যানেল টগল বাটনগুলো এখানে যুক্ত করা হলো */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setShowToolbox(!showToolbox)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                showToolbox ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              Elements
            </button>
            
            <button
              onClick={() => setShowProperties(!showProperties)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                showProperties ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Settings
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>

          <div className="h-6 w-px bg-slate-300"></div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-500">Type:</label>
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {formTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <span className="text-xs text-slate-400">Fields: <span className="font-bold text-slate-600">{formFields.length}</span></span>
      </div>

      {/* বিল্ডার এরিয়া */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* কলাম ১: টুলবক্স (অ্যানিমেটেড হাইড/শো) */}
        <div className={`bg-slate-50 flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${showToolbox ? "w-64 border-r border-slate-200" : "w-0 border-r-0"}`}>
          {/* ভেতরে একটি ফিক্সড উইডথের ডিভ নেওয়া হয়েছে যাতে কন্টেন্ট স্কুইজ না হয় */}
          <div className="w-64 h-full">
            <ElementToolbox onAddElement={handleAddElement} />
          </div>
        </div>

        {/* কলাম ২: ক্যানভাস (এটি সবসময় পুরো জায়গা নেবে) */}
        <FormCanvas 
          fields={formFields} 
          onSelectField={handleSelectField} 
          onDeleteField={handleDeleteField}
          selectedFieldId={selectedFieldId}
        />

        {/* কলাম ৩: প্রোপার্টিজ (অ্যানিমেটেড হাইড/শো) */}
        <div className={`bg-slate-50 flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${showProperties ? "w-80 border-l border-slate-200" : "w-0 border-l-0"}`}>
          {/* ভেতরে একটি ফিক্সড উইডথের ডিভ */}
          <div className="w-80 h-full">
            <ElementProperties 
              selectedField={selectedField} 
              allFields={formFields}
              onUpdateField={handleUpdateField} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}