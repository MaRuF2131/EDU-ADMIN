"use client";
import { useState } from "react";

const mockGeneratedQuizzes = [
  {
    id: 1,
    title: "Data Structures - AI Generated",
    course: "CSE-102",
    topic: "Trees and Graphs",
    difficulty: "Medium",
    questionsCount: 10,
    generatedAt: "2024-01-18 14:30",
    status: "review"
  },
  {
    id: 2,
    title: "Database Systems Quiz",
    course: "CSE-301",
    topic: "SQL Queries",
    difficulty: "Easy",
    questionsCount: 15,
    generatedAt: "2024-01-17 09:15",
    status: "published"
  },
];

export default function AIQuizPage() {
  const [generatedQuizzes, setGeneratedQuizzes] = useState(mockGeneratedQuizzes);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [config, setConfig] = useState({
    course: "",
    topic: "",
    difficulty: "Medium",
    questionCount: 10,
    questionType: "mcq",
    includeExplanation: true
  });

  const generateQuiz = async () => {
    if (!config.topic) return;
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedQuestions([]);

    // Simulate AI generation progress
    const steps = [
      { progress: 20, message: "Analyzing topic..." },
      { progress: 40, message: "Generating questions..." },
      { progress: 60, message: "Creating answer options..." },
      { progress: 80, message: "Adding explanations..." },
      { progress: 100, message: "Finalizing quiz..." },
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step.progress);
    }

    // Generate mock questions
    const questions = Array.from({ length: config.questionCount }, (_, i) => ({
      id: i + 1,
      question: `${config.topic} - Question ${i + 1}: [AI Generated question about ${config.topic} concept ${i + 1}]`,
      options: [
        `Option A for question ${i + 1}`,
        `Option B for question ${i + 1}`,
        `Option C for question ${i + 1}`,
        `Option D for question ${i + 1}`
      ],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: `This is the AI-generated explanation for question ${i + 1}. The correct answer is based on the fundamental concept of ${config.topic}.`,
      marks: 1
    }));

    setGeneratedQuestions(questions);
    setIsGenerating(false);
  };

  const publishQuiz = () => {
    const newQuiz = {
      id: generatedQuizzes.length + 1,
      title: `${config.topic} - AI Generated`,
      course: config.course,
      topic: config.topic,
      difficulty: config.difficulty,
      questionsCount: config.questionCount,
      generatedAt: new Date().toLocaleString(),
      status: "review"
    };
    setGeneratedQuizzes([newQuiz, ...generatedQuizzes]);
    setGeneratedQuestions([]);
    setShowPreview(false);
  };

  const deleteQuiz = (id) => {
    setGeneratedQuizzes(generatedQuizzes.filter(q => q.id !== id));
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">AI Quiz Generator</h1>
          <p className="text-sm text-slate-500 mt-1">Generate quizzes automatically using AI</p>
        </div>
      </div>

      {/* AI Info Banner */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🤖</span>
          <div>
            <h3 className="font-bold text-cyan-800">How AI Quiz Generation Works</h3>
            <p className="text-sm text-cyan-700 mt-1">Our AI analyzes your course materials and generates relevant questions based on the topic you specify. It creates appropriate answer options and detailed explanations for each question.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 h-fit">
          <h3 className="font-bold text-slate-700 mb-4">Quiz Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Course *</label>
              <select
                value={config.course}
                onChange={(e) => setConfig({...config, course: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Course</option>
                <option value="CSE-101">CSE-101: Introduction to Programming</option>
                <option value="CSE-102">CSE-102: Data Structures</option>
                <option value="CSE-201">CSE-201: Algorithm Design</option>
                <option value="CSE-301">CSE-301: Database Systems</option>
                <option value="CSE-401">CSE-401: Machine Learning</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Topic *</label>
              <input
                type="text"
                value={config.topic}
                onChange={(e) => setConfig({...config, topic: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Binary Trees, SQL Joins, Neural Networks"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Difficulty</label>
              <select
                value={config.difficulty}
                onChange={(e) => setConfig({...config, difficulty: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Number of Questions</label>
              <input
                type="number"
                value={config.questionCount}
                onChange={(e) => setConfig({...config, questionCount: parseInt(e.target.value) || 10})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Question Type</label>
              <select
                value={config.questionType}
                onChange={(e) => setConfig({...config, questionType: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="truefalse">True/False</option>
                <option value="fillblank">Fill in the Blanks</option>
                <option value="mixed">Mixed Types</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.includeExplanation}
                onChange={(e) => setConfig({...config, includeExplanation: e.target.checked})}
                className="w-4 h-4 rounded border-slate-300 text-blue-600"
              />
              <span className="text-sm text-slate-700">Include Explanations</span>
            </label>

            <button
              onClick={generateQuiz}
              disabled={!config.topic || isGenerating}
              className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "⏳ Generating..." : "🤖 Generate Quiz"}
            </button>
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Generating...</span>
                <span>{generationProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${generationProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Generated Content */}
        <div className="lg:col-span-2">
          {/* Generated Questions */}
          {generatedQuestions.length > 0 && !showPreview && (
            <div className="bg-white rounded-lg border border-slate-200 mb-6">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-700">Generated Questions ({generatedQuestions.length})</h3>
                  <p className="text-xs text-slate-500">Review and edit before publishing</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100"
                  >
                    👁️ Preview
                  </button>
                  <button
                    onClick={publishQuiz}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                  >
                    🚀 Publish Quiz
                  </button>
                </div>
              </div>
              <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {generatedQuestions.map((q, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{q.question}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {q.options.map((opt, j) => (
                            <div
                              key={j}
                              className={`px-3 py-1.5 rounded text-xs border ${
                                j === q.correctAnswer
                                  ? "bg-green-50 border-green-300 text-green-700"
                                  : "bg-white border-slate-200 text-slate-600"
                              }`}
                            >
                              {String.fromCharCode(65 + j)}. {opt}
                            </div>
                          ))}
                        </div>
                        {config.includeExplanation && (
                          <p className="text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                            💡 {q.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preview Mode */}
          {showPreview && generatedQuestions.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 mb-6">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-700">Student Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-200"
                >
                  ✕ Close Preview
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-2">{config.topic} Quiz</h2>
                <p className="text-sm text-slate-500 mb-6">Course: {config.course} • Questions: {generatedQuestions.length} • Duration: {generatedQuestions.length * 2} minutes</p>
                <div className="space-y-6">
                  {generatedQuestions.map((q, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-4">
                      <p className="font-medium text-slate-800 mb-3">{i + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((opt, j) => (
                          <label key={j} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                            <input type="radio" name={`q${i}`} className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-slate-700">{String.fromCharCode(65 + j)}. {opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Submit Quiz
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Previously Generated Quizzes */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-700">Previously Generated</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {generatedQuizzes.map(quiz => (
                <div key={quiz.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{quiz.title}</p>
                    <p className="text-xs text-slate-500">{quiz.course} • {quiz.questionsCount} questions • {quiz.generatedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      quiz.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {quiz.status}
                    </span>
                    <button
                      onClick={() => deleteQuiz(quiz.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}