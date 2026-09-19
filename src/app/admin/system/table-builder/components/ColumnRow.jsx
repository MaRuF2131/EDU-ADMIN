
export default function ColumnRow({ column, index, onUpdate, onRemove }) {
  const handleChange = (key, value) => {
    onUpdate(index, { ...column, [key]: value });
  };

  const handleValidationChange = (key, value) => {
    onUpdate(index, { 
      ...column, 
      validation: { ...column.validation, [key]: value } 
    });
  };

  // ডাটাবেসের সাধারণ ডাটা টাইপগুলো
  const dbTypes = ["String", "Text", "Integer", "Float", "Boolean", "Date", "DateTime", "JSON", "UUID"];

  return (
    <div className={`border border-slate-200 rounded-lg p-4 mb-3 bg-white transition-all ${column.isPrimaryKey ? 'border-yellow-400 bg-yellow-50/30 shadow-sm' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
          {column.isPrimaryKey && <span className="text-[10px] font-bold bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">PRIMARY KEY</span>}
          {column.isForeignKey && <span className="text-[10px] font-bold bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">FOREIGN KEY</span>}
        </div>
        <button
          onClick={() => onRemove(index)}
          className="text-slate-400 hover:text-red-500 transition-colors"
          title="Remove Column"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-3">
        {/* Column Name (DB Field) */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Column Name (DB)</label>
          <input
            type="text"
            value={column.name}
            onChange={(e) => handleChange("name", e.target.value.replace(/\s/g, '_').toLowerCase())}
            placeholder="e.g. student_name"
            className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>

        {/* Display Label */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Display Label</label>
          <input
            type="text"
            value={column.label}
            onChange={(e) => handleChange("label", e.target.value)}
            placeholder="e.g. Student Name"
            className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Column Type */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Data Type</label>
          <select
            value={column.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
          >
            {dbTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Relation (Conditional) */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Relation</label>
          <select
            value={column.relation}
            onChange={(e) => handleChange("relation", e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
            disabled={!column.isForeignKey}
          >
            <option value="none">None</option>
            <option value="one-to-one">One to One</option>
            <option value="one-to-many">One to Many</option>
            <option value="many-to-many">Many to Many</option>
          </select>
        </div>
      </div>

      {/* Foreign Key Reference (শুধুমাত্র FK চেক করলে দেখাবে) */}
      {column.isForeignKey && (
        <div className="grid grid-cols-2 gap-3 mb-3 p-2 bg-blue-50 rounded border border-blue-100">
          <div>
            <label className="block text-xs font-medium text-blue-600 mb-1">Reference Table</label>
            <input type="text" placeholder="e.g. users" className="w-full px-2 py-1.5 text-sm border border-blue-300 rounded bg-white font-mono" 
              value={column.fkTable} onChange={(e) => handleChange("fkTable", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-blue-600 mb-1">Reference Column</label>
            <input type="text" placeholder="e.g. id" className="w-full px-2 py-1.5 text-sm border border-blue-300 rounded bg-white font-mono" 
              value={column.fkColumn} onChange={(e) => handleChange("fkColumn", e.target.value)} />
          </div>
        </div>
      )}

      {/* Bottom Toggles & Validation */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        {/* Checkboxes */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" checked={column.isPrimaryKey} onChange={(e) => handleChange("isPrimaryKey", e.target.checked)} className="w-3.5 h-3.5 text-yellow-500 rounded border-slate-300 focus:ring-yellow-500" /> PK
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" checked={column.isForeignKey} onChange={(e) => handleChange("isForeignKey", e.target.checked)} className="w-3.5 h-3.5 text-blue-500 rounded border-slate-300 focus:ring-blue-500" /> FK
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" checked={column.validation?.required} onChange={(e) => handleValidationChange("required", e.target.checked)} className="w-3.5 h-3.5 text-red-500 rounded border-slate-300 focus:ring-red-500" /> Required
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" checked={column.isVisible} onChange={(e) => handleChange("isVisible", e.target.checked)} className="w-3.5 h-3.5 text-green-500 rounded border-slate-300 focus:ring-green-500" /> Visible
          </label>
        </div>

        {/* UI Behaviors */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase text-slate-400 font-bold">UI:</span>
          {["Searchable", "Sortable", "Filterable"].map(action => (
            <label key={action} className="flex items-center gap-1 text-xs text-slate-500 cursor-pointer">
              <input 
                type="checkbox" 
                checked={column[action.toLowerCase()]} 
                onChange={(e) => handleChange(action.toLowerCase(), e.target.checked)} 
                className="w-3.5 h-3.5 text-slate-600 rounded border-slate-300" 
              /> 
              {action}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}