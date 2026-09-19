"use client";

export default function ElementProperties({ selectedField, allFields, onUpdateField }) {
  if (!selectedField) {
    return (
      <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 flex items-center justify-center h-full">
        <p className="text-sm text-slate-400 text-center leading-relaxed">Select an element from the canvas to edit its properties.</p>
      </div>
    );
  }

  const handleChange = (key, value) => {
    onUpdateField({ ...selectedField, [key]: value });
  };

  // ক্যানভাসে থাকা অন্য ফিল্ডগুলো বের করা (যার উপর ভিত্তি করে কন্ডিশন বসাবে)
  const otherFields = allFields.filter(f => f.id !== selectedField.id);
  
  // বর্তমান ফিল্ডের কন্ডিশনগুলোর অ্যারে (অ্যারে না থাকলে খালি অ্যারে ধরে নেবো)
  const conditions = selectedField.conditions || [];

  // নতুন কন্ডিশন যোগ করার ফাংশন
  const handleAddCondition = () => {
    const newCondition = {
      id: `cond_${Date.now()}`,
      dependsOn: "none",
      operator: "equals",
      value: ""
    };
    onUpdateField({ ...selectedField, conditions: [...conditions, newCondition] });
  };

  // নির্দিষ্ট কন্ডিশন আপডেট করার ফাংশন
  const handleUpdateCondition = (condId, key, value) => {
    const updatedConditions = conditions.map(cond => 
      cond.id === condId ? { ...cond, [key]: value } : cond
    );
    onUpdateField({ ...selectedField, conditions: updatedConditions });
  };

  // কন্ডিশন ডিলিট করার ফাংশন
  const handleRemoveCondition = (condId) => {
    const updatedConditions = conditions.filter(cond => cond.id !== condId);
    onUpdateField({ ...selectedField, conditions: updatedConditions });
  };

  return (
    <div className="w-80 bg-slate-50 border-l border-slate-200 p-4 overflow-y-auto h-full">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Properties</h3>
      
      <div className="space-y-5">
        {/* Label & Placeholder */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
          <input type="text" value={selectedField.label} onChange={(e) => handleChange("label", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Placeholder</label>
          <input type="text" value={selectedField.placeholder || ""} onChange={(e) => handleChange("placeholder", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <hr className="border-slate-200"/>

        {/* Required Validation */}
        <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
          <div>
            <label className="text-sm font-medium text-slate-700">Required Validation</label>
            <p className="text-xs text-slate-400">User must fill this</p>
          </div>
          <button
            onClick={() => handleChange("required", !selectedField.required)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${selectedField.required ? "bg-blue-600" : "bg-slate-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${selectedField.required ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <hr className="border-slate-200"/>

        {/* Conditional Field Logic (Updated) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Conditional Logic</label>
              <p className="text-xs text-slate-400">Show if rules match</p>
            </div>
            <button
              onClick={handleAddCondition}
              className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded-md font-medium hover:bg-blue-100 transition-colors flex items-center gap-1 border border-blue-200"
            >
              <span className="text-base leading-none">+</span> Add Rule
            </button>
          </div>
          
          <div className="space-y-2">
            {conditions.length === 0 ? (
              <div className="text-center py-4 bg-white border border-dashed border-slate-200 rounded-lg">
                <p className="text-xs text-slate-400">No conditions applied.</p>
                <p className="text-[10px] text-slate-400 mt-1">Click "+ Add Rule" to hide this field dynamically.</p>
              </div>
            ) : (
              conditions.map((cond, index) => (
                <div key={cond.id} className="bg-white border border-slate-200 p-3 rounded-lg relative group">
                  {/* Delete Rule Button */}
                  <button
                    onClick={() => handleRemoveCondition(cond.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    ✕
                  </button>

                  <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Rule {index + 1}</p>
                  
                  <div className="space-y-2">
                    {/* Field Select */}
                    <select 
                      className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white focus:ring-1 focus:ring-blue-500"
                      value={cond.dependsOn}
                      onChange={(e) => handleUpdateCondition(cond.id, "dependsOn", e.target.value)}
                    >
                      <option value="none">Select a field...</option>
                      {otherFields.length === 0 && <option disabled>No other fields added yet</option>}
                      {otherFields.map(f => (
                        <option key={f.id} value={f.id}>{f.label}</option>
                      ))}
                    </select>

                    {/* Operator & Value Row */}
                    <div className="flex gap-2">
                      <select 
                        className="w-24 px-2 py-1.5 border border-slate-300 rounded text-xs bg-white focus:ring-1 focus:ring-blue-500"
                        value={cond.operator}
                        onChange={(e) => handleUpdateCondition(cond.id, "operator", e.target.value)}
                      >
                        <option value="equals">Equals</option>
                        <option value="not_equals">Not Equals</option>
                        <option value="contains">Contains</option>
                        <option value="is_empty">Is Empty</option>
                      </select>
                      
                      <input 
                        type="text" 
                        placeholder="Value (e.g. Yes)" 
                        className="flex-1 px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                        value={cond.value}
                        onChange={(e) => handleUpdateCondition(cond.id, "value", e.target.value)}
                        disabled={cond.operator === "is_empty"}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}