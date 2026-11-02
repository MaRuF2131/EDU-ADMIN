
"use client";

export default function RunAnalysisButton() {
  const handleClick = () => {
    alert("AI model execution will be connected with the backend.");
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
    >
      + Run AI Analysis
    </button>
  );
}
