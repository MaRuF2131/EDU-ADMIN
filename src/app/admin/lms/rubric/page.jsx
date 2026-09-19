"use client";
import { useState } from "react";

const mockRubrics = [
  {
    id: "RUB-001",
    name: "Algorithm Assignment Rubric",
    criteria: [
      { name: "Algorithm Correctness", maxPoints: 30, levels: [
        { label: "Excellent", points: 30, description: "Algorithm is completely correct and efficient" },
        { label: "Good", points: 24, description: "Algorithm is correct with minor inefficiencies" },
        { label: "Satisfactory", points: 18, description: "Algorithm works but has significant issues" },
        { label: "Poor", points: 6, description: "Algorithm is incorrect or doesn't solve the problem" },
      ]},
      { name: "Code Quality", maxPoints: 25, levels: [
        { label: "Excellent", points: 25, description: "Clean, well-documented, follows best practices" },
        { label: "Good", points: 20, description: "Mostly clean with minor issues" },
        { label: "Satisfactory", points: 15, description: "Readable but lacks documentation" },
        { label: "Poor", points: 5, description: "Hard to read, no documentation" },
      ]},
      { name: "Time Complexity Analysis", maxPoints: 25, levels: [
        { label: "Excellent", points: 25, description: "Accurate analysis with proper justification" },
        { label: "Good", points: 20, description: "Mostly accurate with minor errors" },
        { label: "Satisfactory", points: 15, description: "Basic analysis present" },
        { label: "Poor", points: 5, description: "No or incorrect analysis" },
      ]},
      { name: "Testing & Edge Cases", maxPoints: 20, levels: [
        { label: "Excellent", points: 20, description: "Comprehensive test cases including edge cases" },
        { label: "Good", points: 16, description: "Good test coverage with some edge cases" },
        { label: "Satisfactory", points: 12, description: "Basic tests only" },
        { label: "Poor", points: 4, description: "No or minimal testing" },
      ]},
    ],
    totalPoints: 100,
    assignments: 3
  },
];

export default function RubricPage() {
  const [rubrics, setRubrics] = useState(mockRubrics);
  const [selectedRubric, setSelectedRubric] = useState(mockRubrics[0]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [newCriterion, setNewCriterion] = useState({
    name: "",
    maxPoints: 25,
    levels: [
      { label: "Excellent", points: 25, description: "" },
      { label: "Good", points: 20, description: "" },
      { label: "Satisfactory", points: 15, description: "" },
      { label: "Poor", points: 5, description: "" },
    ]
  });

  const addCriterion = () => {
    if (!newCriterion.name) return;
    const updatedRubric = {
      ...selectedRubric,
      criteria: [...selectedRubric.criteria, newCriterion],
      totalPoints: selectedRubric.totalPoints + newCriterion.maxPoints
    };
    setSelectedRubric(updatedRubric);
    setRubrics(rubrics.map(r => r.id === updatedRubric.id ? updatedRubric : r));
    setNewCriterion({
      name: "",
      maxPoints: 25,
      levels: [
        { label: "Excellent", points: 25, description: "" },
        { label: "Good", points: 20, description: "" },
        { label: "Satisfactory", points: 15, description: "" },
        { label: "Poor", points: 5, description: "" },
      ]
    });
  };

  const removeCriterion = (index) => {
    const criterion = selectedRubric.criteria[index];
    const updatedRubric = {
      ...selectedRubric,
      criteria: selectedRubric.criteria.filter((_, i) => i !== index),
      totalPoints: selectedRubric.totalPoints - criterion.maxPoints
    };
    setSelectedRubric(updatedRubric);
    setRubrics(rubrics.map(r => r.id === updatedRubric.id ? updatedRubric : r));
  };

  const updateLevelPoints = (criterionIndex, levelIndex, points) => {
    const updatedCriteria = [...selectedRubric.criteria];
    updatedCriteria[criterionIndex].levels[levelIndex].points = parseInt(points);
    const updatedRubric = { ...selectedRubric, criteria: updatedCriteria };
    setSelectedRubric(updatedRubric);
    setRubrics(rubrics.map(r => r.id === updatedRubric.id ? updatedRubric : r));
  };

  const createNewRubric = () => {
    const newRubric = {
      id: `RUB-${String(rubrics.length + 1).padStart(3, '0')}`,
      name: "New Rubric",
      criteria: [],
      totalPoints: 0,
      assignments: 0
    };
    setRubrics([...rubrics, newRubric]);
    setSelectedRubric(newRubric);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Rubric Builder</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage grading rubrics</p>
        </div>
        <button onClick={createNewRubric} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          + New Rubric
        </button>
      </div>

      <div className="flex gap-6">
        {/* Rubric List */}
        <div className="w-64 bg-white rounded-lg border border-slate-200 p-4 flex-shrink-0 h-fit">
          <h3 className="font-bold text-slate-700 mb-3 text-sm">Rubrics</h3>
          <div className="space-y-2">
            {rubrics.map(rubric => (
              <button
                key={rubric.id}
                onClick={() => setSelectedRubric(rubric)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedRubric?.id === rubric.id 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <p className="text-sm font-medium text-slate-800">{rubric.name}</p>
                <div className="flex gap-2 mt-1 text-xs text-slate-500">
                  <span>{rubric.criteria.length} criteria</span>
                  <span>•</span>
                  <span>{rubric.totalPoints} points</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Rubric Builder */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <input
                  type="text"
                  value={selectedRubric.name}
                  onChange={(e) => {
                    const updated = { ...selectedRubric, name: e.target.value };
                    setSelectedRubric(updated);
                    setRubrics(rubrics.map(r => r.id === updated.id ? updated : r));
                  }}
                  className="text-xl font-bold text-slate-800 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 -ml-2"
                />
                <p className="text-sm text-slate-500 mt-1">ID: {selectedRubric.id} • Total: {selectedRubric.totalPoints} points</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm">
                💾 Save Rubric
              </button>
            </div>
          </div>

          {/* Criteria Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-4">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-48">Criteria</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Max Points</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase bg-green-50">Excellent</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase bg-blue-50">Good</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase bg-yellow-50">Satisfactory</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase bg-red-50">Poor</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedRubric.criteria.map((criterion, cIndex) => (
                  <tr key={cIndex} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={criterion.name}
                        onChange={(e) => {
                          const updatedCriteria = [...selectedRubric.criteria];
                          updatedCriteria[cIndex].name = e.target.value;
                          const updated = { ...selectedRubric, criteria: updatedCriteria };
                          setSelectedRubric(updated);
                          setRubrics(rubrics.map(r => r.id === updated.id ? updated : r));
                        }}
                        className="w-full text-sm font-medium text-slate-800 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 -ml-1"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-bold text-slate-700">{criterion.maxPoints}</span>
                    </td>
                    {criterion.levels.map((level, lIndex) => (
                      <td key={lIndex} className={`px-4 py-3 ${lIndex === 0 ? "bg-green-50/50" : lIndex === 1 ? "bg-blue-50/50" : lIndex === 2 ? "bg-yellow-50/50" : "bg-red-50/50"}`}>
                        <div className="text-center">
                          <input
                            type="number"
                            value={level.points}
                            onChange={(e) => updateLevelPoints(cIndex, lIndex, e.target.value)}
                            className="w-16 text-center text-sm font-bold border border-slate-200 rounded px-1 py-0.5 outline-none focus:ring-1 focus:ring-blue-500 mx-auto"
                            min="0"
                          />
                          <p className="text-[10px] text-slate-500 mt-1 px-2">{level.description}</p>
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeCriterion(cIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-bold">
                  <td className="px-4 py-3 text-sm text-slate-700">Total</td>
                  <td className="px-4 py-3 text-center text-sm text-slate-700">{selectedRubric.totalPoints}</td>
                  <td colSpan="5"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Add New Criterion */}
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h4 className="font-bold text-slate-700 mb-3 text-sm">Add New Criterion</h4>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Criterion Name *</label>
                <input
                  type="text"
                  value={newCriterion.name}
                  onChange={(e) => setNewCriterion({...newCriterion, name: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Presentation Skills"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Max Points *</label>
                <input
                  type="number"
                  value={newCriterion.maxPoints}
                  onChange={(e) => setNewCriterion({...newCriterion, maxPoints: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {newCriterion.levels.map((level, i) => (
                <div key={i} className={`p-3 rounded-lg ${i === 0 ? "bg-green-50" : i === 1 ? "bg-blue-50" : i === 2 ? "bg-yellow-50" : "bg-red-50"}`}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{level.label}</label>
                  <input
                    type="number"
                    value={level.points}
                    onChange={(e) => {
                      const updatedLevels = [...newCriterion.levels];
                      updatedLevels[i].points = parseInt(e.target.value) || 0;
                      setNewCriterion({...newCriterion, levels: updatedLevels});
                    }}
                    className="w-full px-2 py-1 text-sm border border-slate-200 rounded outline-none mb-1"
                    min="0"
                  />
                  <input
                    type="text"
                    value={level.description}
                    onChange={(e) => {
                      const updatedLevels = [...newCriterion.levels];
                      updatedLevels[i].description = e.target.value;
                      setNewCriterion({...newCriterion, levels: updatedLevels});
                    }}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded outline-none"
                    placeholder="Description..."
                  />
                </div>
              ))}
            </div>
            <button
              onClick={addCriterion}
              disabled={!newCriterion.name}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Criterion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}