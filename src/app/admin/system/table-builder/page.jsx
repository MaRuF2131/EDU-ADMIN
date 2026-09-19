"use client";
import { useState } from "react";
import ColumnRow from "./components/ColumnRow";

// নতুন কলাম যোগ করার জন্য ডিফল্ট টেমপ্লেট
const createNewColumn = () => ({
  id: `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  name: "",
  label: "",
  type: "String",
  isPrimaryKey: false,
  isForeignKey: false,
  fkTable: "",
  fkColumn: "",
  relation: "none",
  validation: { required: false },
  isSearchable: false,
  isSortable: false,
  isFilterable: false,
  isVisible: true, // Visible Column
});

export default function TableBuilderPage() {
  const [tableName, setTableName] = useState("");
  const [tableSlug, setTableSlug] = useState("");
  const [isExportable, setIsExportable] = useState(true);
  const [columns, setColumns] = useState([createNewColumn()]);

  // টেবিলের নাম থেকে অটোমেটিক স্লাগ জেনারেট করা
  const handleTableNameChange = (e) => {
    const val = e.target.value;
    setTableName(val);
    setTableSlug(val.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''));
  };

  const handleAddColumn = () => {
    setColumns([...columns, createNewColumn()]);
  };

  const handleRemoveColumn = (indexToRemove) => {
    setColumns(columns.filter((_, index) => index !== indexToRemove));
  };

  const handleUpdateColumn = (indexToUpdate, newColumnData) => {
    setColumns(columns.map((col, index) => (index === indexToUpdate ? newColumnData : col)));
  };

  // ব্যাকএন্ডে মেটাডাটা পাঠানোর লজিক
  const handleSaveSchema = () => {
    // খালি কলাম নাম আছে কিনা চেক করা
    const isValid = columns.every(col => col.name.trim() !== "");
    if (!tableName.trim() || !isValid) {
      alert("Table name and all column names are required!");
      return;
    }

    const payload = {
      tableName,
      slug: tableSlug,
      isExportable,
      schema: columns.map(col => {
        // ব্যাকএন্ডে অপ্রয়োজনীয় ডাটা না পাঠানোর জন্য ক্লিন আপ
        const { id, ...cleanCol } = col;
        return cleanCol;
      })
    };

    console.log("Sending Table Schema to Backend:", JSON.stringify(payload, null, 2));
    alert("Table Schema JSON logged to console! Backend will create actual DB table & Auto CRUD APIs based on this.");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dynamic Table Builder</h1>
          <p className="text-sm text-slate-500 mt-1">Define schema to auto-generate database tables and CRUD APIs.</p>
        </div>
        <button
          onClick={handleSaveSchema}
          className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          Save & Generate CRUD
        </button>
      </div>

      {/* Table Meta Data Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 mb-6 shadow-sm">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Table Name</label>
            <input
              type="text"
              value={tableName}
              onChange={handleTableNameChange}
              placeholder="e.g. Student Profiles"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">System Slug (API Endpoint)</label>
            <input
              type="text"
              value={tableSlug}
              readOnly
              className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-md text-slate-500 font-mono text-sm"
              placeholder="auto_generated_slug"
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isExportable}
                onChange={(e) => setIsExportable(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-slate-700 block">Exportable</span>
                <span className="text-xs text-slate-400">Allow Excel/CSV export</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Columns Builder Area */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-700">Columns & Relations</h2>
        <button
          onClick={handleAddColumn}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add Column
        </button>
      </div>

      {/* Rendering Columns */}
      <div>
        {columns.map((col, index) => (
          <ColumnRow
            key={col.id}
            index={index}
            column={col}
            onUpdate={handleUpdateColumn}
            onRemove={handleRemoveColumn}
          />
        ))}
      </div>

      {columns.length === 0 && (
        <div className="text-center py-16 bg-white border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-slate-400">No columns added yet. Click "Add Column" to start building.</p>
        </div>
      )}

    </div>
  );
}