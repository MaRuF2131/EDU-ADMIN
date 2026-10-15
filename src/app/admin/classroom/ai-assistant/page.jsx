"use client";
import { useState } from "react";

const aiFeatures = [
  { id: "video_summary", title: "AI Video Summary", icon: "🎬", desc: "Generate summary from video content", color: "from-purple-500 to-purple-600" },
  { id: "practice_gen", title: "Practice Question Generator", icon: "📝", desc: "Generate practice questions from content", color: "from-blue-500 to-blue-600" },
  { id: "doubt_solver", title: "AI Doubt Solver", icon: "❓", desc: "Answer student doubts instantly", color: "from-green-500 to-green-600" },
  { id: "recommendation", title: "Study Recommendation", icon: "📚", desc: "Suggest next topics to study", color: "from-orange-500 to-orange-600" },
  { id: "subtitle", title: "AI Subtitle & Translation", icon: "🌐", desc: "Auto-generate subtitles in multiple languages", color: "from-cyan-500 to-cyan-600" },
];

const mockQueries = [
  { id: 1, student: "Imran Ahmed", query: "What is the difference between supervised and unsupervised learning?", response: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data. Examples: Supervised - classification, regression. Unsupervised - clustering, dimensionality reduction.", timestamp: "2024-01-20 14:30", type: "doubt_solver" },
  { id: 2, student: "Susmita Das", query: "Generate 5 practice questions on binary trees", response: "1. What is the height of a complete binary tree with n nodes?\n2. Write a function to check if a tree is balanced.\n3. Explain in-order traversal with an example.\n4. What is the time complexity of searching in BST?\n5. How to convert a BST to a balanced BST?", timestamp: "2024-01-20 13:00", type: "practice_gen" },
  { id: 3, student: "Rahim Uddin", query: "Summarize the video 'Neural Networks Basics'", response: "This video covers: 1) Introduction to neural networks inspired by human brain, 2) Structure of a neuron - inputs, weights, bias, activation function, 3) Types of activation functions (ReLU, Sigmoid, Tanh), 4) Forward propagation process, 5) Loss functions and backpropagation basics.", timestamp: "2024-01-20 11:00", type: "video_summary" },
];

export default function AIAssistantPage() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [queryHistory, setQueryHistory] = useState(mockQueries);
  const [inputQuery, setInputQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Bangla");

  const handleGenerate = async () => {
    if (!inputQuery) return;
    setIsGenerating(true);
    setGeneratedResponse("");

    const responses = {
      video_summary: "📝 **Video Summary:**\n\nThis content covers the following key topics:\n\n1. **Introduction** - Overview of the main concept\n2. **Core Concepts** - Detailed explanation with examples\n3. **Practical Application** - Real-world use cases\n4. **Summary** - Key takeaways and next steps\n\n**Key Points:**\n• Point 1: Important definition\n• Point 2: Core principle\n• Point 3: Best practice\n\n**Recommended Follow-up:** Continue to next chapter for advanced concepts.",
      practice_gen: "📝 **Generated Practice Questions:**\n\n**MCQ:**\n1. What is the correct answer?\n   a) Option A  b) Option B ✓  c) Option C  d) Option D\n\n2. Which statement is true?\n   a) Statement A  b) Statement B ✓  c) Statement C\n\n**Short Answer:**\n3. Explain [concept] in your own words.\n4. What are the advantages of [topic]?\n\n**Coding:**\n5. Write a function to implement [algorithm].\n\n**Difficulty:** Mixed (Easy to Hard)",
      doubt_solver: "💡 **Answer:**\n\nBased on your question, here's a detailed explanation:\n\n**Direct Answer:** [Clear, concise answer to the question]\n\n**Explanation:**\n[Detailed explanation with examples]\n\n**Example:**\n```\n[Code example if applicable]\n```\n\n**Related Concepts:**\n• Concept 1\n• Concept 2\n\n**Further Reading:** Check Chapter X for more details.",
      recommendation: "📚 **Study Recommendations:**\n\nBased on your learning progress, I recommend:\n\n**Next Topic:** [Topic Name]\n**Reason:** You've completed 75% of current chapter\n\n**Weak Areas to Focus:**\n1. [Topic 1] - Watch video again\n2. [Topic 2] - Practice more questions\n\n**Suggested Resources:**\n• Video: [Recommended video]\n• Notes: [Related notes]\n• Practice: [Practice set link]\n\n**Study Schedule:**\n• Today: Review weak areas (30 min)\n• Tomorrow: Start next chapter (45 min)",
      subtitle: "🌐 **Subtitle Generated:**\n\n```\n00:00:00 - [English] Welcome to this lecture\n00:00:15 - [Bangla] আজ আমরা শিখবো...\n00:01:30 - [English] Let's start with the basics\n00:02:45 - [Bangla] মূল ধারণাটি হলো...\n```\n\n**Languages Available:**\n• English (Original)\n• Bangla ✓\n• Hindi\n• Urdu\n\n**Accuracy:** 95%",
    };

    // Simulate typing effect
    const fullResponse = responses[selectedFeature] || "Generating response...";
    for (let i = 0; i <= fullResponse.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      setGeneratedResponse(fullResponse.slice(0, i));
    }

    const newQuery = {
      id: Date.now(),
      student: "Current User",
      query: inputQuery,
      response: fullResponse,
      timestamp: new Date().toLocaleString(),
      type: selectedFeature
    };
    setQueryHistory([newQuery, ...queryHistory]);
    setIsGenerating(false);
  };

  const stats = {
    totalQueries: queryHistory.length,
    todayQueries: 89,
    avgResponseTime: "2.3s",
    satisfaction: "94%",
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">AI Learning Assistant</h1>
          <p className="text-sm text-slate-500 mt-1">AI-powered tools for enhanced learning experience</p>
        </div>
      </div>

      {/* AI Info Banner */}
      <div className="bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🤖</span>
          <div>
            <h3 className="font-bold text-cyan-800">AI-Powered Learning Enhancement</h3>
            <p className="text-sm text-cyan-700 mt-1">Our AI assistant helps students with video summaries, practice questions, doubt solving, and personalized study recommendations.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Queries", value: stats.totalQueries, icon: "📊", color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Today's Queries", value: stats.todayQueries, icon: "📈", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Avg Response", value: stats.avgResponseTime, icon: "⏱️", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Satisfaction", value: stats.satisfaction, icon: "😊", color: "bg-purple-50 border-purple-200 text-purple-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feature Selection */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 h-fit">
          <h3 className="font-bold text-slate-700 mb-3 text-sm">AI Features</h3>
          <div className="space-y-2">
            {aiFeatures.map(feature => (
              <button
                key={feature.id}
                onClick={() => { setSelectedFeature(feature.id); setGeneratedResponse(""); }}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedFeature === feature.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{feature.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{feature.title}</p>
                    <p className="text-xs text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Interaction Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Input Area */}
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            {!selectedFeature ? (
              <div className="text-center py-8 text-slate-400">
                <span className="text-4xl block mb-3">🤖</span>
                <p className="text-sm">Select an AI feature to get started</p>
              </div>
            ) : (
              <>
                {/* Feature-specific inputs */}
                {selectedFeature === "video_summary" && (
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Select Video</label>
                    <select
                      value={selectedVideo}
                      onChange={(e) => setSelectedVideo(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a video...</option>
                      <option value="v1">Lecture 1: Introduction</option>
                      <option value="v2">Lecture 2: Basics</option>
                      <option value="v3">Lecture 3: Advanced</option>
                    </select>
                  </div>
                )}

                {selectedFeature === "subtitle" && (
                  <div className="mb-3 flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Video</label>
                      <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select video...</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Target Language</label>
                      <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Bangla">Bangla</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Urdu">Urdu</option>
                        <option value="Arabic">Arabic</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {selectedFeature === "video_summary" ? "Additional Instructions (Optional)" :
                     selectedFeature === "practice_gen" ? "Topic for Questions" :
                     selectedFeature === "doubt_solver" ? "Your Question" :
                     selectedFeature === "recommendation" ? "Student ID or Name" :
                     "Instructions"}
                  </label>
                  <textarea
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={
                      selectedFeature === "video_summary" ? "Any specific points to focus on..." :
                      selectedFeature === "practice_gen" ? "e.g., Binary Trees, SQL Joins, Neural Networks..." :
                      selectedFeature === "doubt_solver" ? "Ask your doubt here..." :
                      selectedFeature === "recommendation" ? "Enter student ID or name..." :
                      "Enter instructions..."
                    }
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!inputQuery && selectedFeature !== "video_summary")}
                  className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Generating...
                    </>
                  ) : (
                    "🤖 Generate"
                  )}
                </button>
              </>
            )}
          </div>

          {/* Generated Response */}
          {generatedResponse && (
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-700 text-sm">Generated Response</h3>
                <div className="flex gap-2">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 rounded">📋 Copy</button>
                  <button className="text-xs text-green-600 hover:text-green-700 font-medium px-2 py-1 bg-green-50 rounded">📥 Download</button>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap font-mono">
                {generatedResponse}
                {isGenerating && <span className="animate-pulse">|</span>}
              </div>
            </div>
          )}

          {/* Query History */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-700 text-sm">Recent AI Queries</h3>
            </div>
            <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
              {queryHistory.map(query => (
                <div key={query.id} className="p-4 hover:bg-slate-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
                      {aiFeatures.find(f => f.id === query.type)?.icon} {aiFeatures.find(f => f.id === query.type)?.title}
                    </span>
                    <span className="text-xs text-slate-400">{query.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-700">{query.query}</p>
                  <p className="text-xs text-slate-500 mt-1">by {query.student}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}