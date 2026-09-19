"use client";
import { useState } from "react";

const mockQuizzes = [
  {
    id: 1,
    title: "Data Structures Quiz 5",
    course: "CSE-102",
    duration: 30,
    totalMarks: 20,
    questions: 20,
    status: "active",
    attempts: 45,
    totalStudents: 58,
    startTime: "2024-01-20 10:00",
    endTime: "2024-01-20 10:30",
    shuffleQuestions: true,
    shuffleOptions: true,
    showResult: true,
    negativeMarking: -0.5,
    questionsList: [
      {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
        marks: 1
      },
      {
        id: 2,
        question: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: 1,
        marks: 1
      },
      {
        id: 3,
        question: "What is the worst-case time complexity of quicksort?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        correctAnswer: 2,
        marks: 1
      },
    ]
  },
  {
    id: 2,
    title: "Database Midterm Quiz",
    course: "CSE-301",
    duration: 45,
    totalMarks: 30,
    questions: 30,
    status: "scheduled",
    attempts: 0,
    totalStudents: 45,
    startTime: "2024-01-25 14:00",
    endTime: "2024-01-25 14:45",
    shuffleQuestions: true,
    shuffleOptions: false,
    showResult: false,
    negativeMarking: -0.25,
    questionsList: []
  },
];

export default function MCQPage() {
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    marks: 1
  });
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    course: "",
    duration: 30,
    startTime: "",
    endTime: "",
    shuffleQuestions: true,
    shuffleOptions: true,
    showResult: true,
    negativeMarking: -0.5,
    questionsList: []
  });

  const addQuestion = () => {
    if (!currentQuestion.question || currentQuestion.options.some(o => !o)) return;
    const newQuestion = {
      id: newQuiz.questionsList.length + 1,
      ...currentQuestion
    };
    setNewQuiz({
      ...newQuiz,
      questionsList: [...newQuiz.questionsList, newQuestion],
      totalMarks: newQuiz.totalMarks + newQuestion.marks,
      questions: newQuiz.questions.length + 1
    });
    setCurrentQuestion({ question: "", options: ["", "", "", ""], correctAnswer: 0, marks: 1 });
  };

  const removeQuestion = (index) => {
    const removedQuestion = newQuiz.questionsList[index];
    setNewQuiz({
      ...newQuiz,
      questionsList: newQuiz.questionsList.filter((_, i) => i !== index),
      totalMarks: newQuiz.totalMarks - removedQuestion.marks,
      questions: newQuiz.questions.length - 1
    });
  };

  const createQuiz = () => {
    if (!newQuiz.title || newQuiz.questionsList.length === 0) return;
    const quiz = {
      id: quizzes.length + 1,
      ...newQuiz,
      status: "draft",
      attempts: 0,
      totalStudents: 60
    };
    setQuizzes([quiz, ...quizzes]);
    setNewQuiz({
      title: "", course: "", duration: 30, startTime: "", endTime: "",
      shuffleQuestions: true, shuffleOptions: true, showResult: true,
      negativeMarking: -0.5, questionsList: [], totalMarks: 0, questions: 0
    });
    setShowCreateForm(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "scheduled": return "bg-blue-100 text-blue-700";
      case "draft": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-slate-100 text-slate-700";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">MCQ Quiz Management</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage multiple choice quizzes</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          {showCreateForm ? "✕ Cancel" : "+ New Quiz"}
        </button>
      </div>

      {/* Create Quiz Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Create New MCQ Quiz</h3>
          
          {/* Quiz Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Quiz Title *</label>
              <input
                type="text"
                value={newQuiz.title}
                onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Data Structures Quiz 6"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Course *</label>
              <select
                value={newQuiz.course}
                onChange={(e) => setNewQuiz({...newQuiz, course: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Course</option>
                <option value="CSE-101">CSE-101</option>
                <option value="CSE-102">CSE-102</option>
                <option value="CSE-201">CSE-201</option>
                <option value="CSE-301">CSE-301</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Duration (minutes) *</label>
              <input
                type="number"
                value={newQuiz.duration}
                onChange={(e) => setNewQuiz({...newQuiz, duration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Start Time *</label>
              <input
                type="datetime-local"
                value={newQuiz.startTime}
                onChange={(e) => setNewQuiz({...newQuiz, startTime: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">End Time *</label>
              <input
                type="datetime-local"
                value={newQuiz.endTime}
                onChange={(e) => setNewQuiz({...newQuiz, endTime: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Negative Marking</label>
              <input
                type="number"
                value={newQuiz.negativeMarking}
                onChange={(e) => setNewQuiz({...newQuiz, negativeMarking: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                step="0.25"
              />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newQuiz.shuffleQuestions}
                  onChange={(e) => setNewQuiz({...newQuiz, shuffleQuestions: e.target.checked})}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600"
                />
                <span className="text-sm text-slate-700">Shuffle Questions</span>
              </label>
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newQuiz.showResult}
                  onChange={(e) => setNewQuiz({...newQuiz, showResult: e.target.checked})}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600"
                />
                <span className="text-sm text-slate-700">Show Result After</span>
              </label>
            </div>
          </div>

          {/* Add Question */}
          <div className="border border-slate-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-slate-700 text-sm mb-3">
              Add Question {newQuiz.questionsList.length + 1}
            </h4>
            <div className="mb-3">
              <input
                type="text"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question text..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {currentQuestion.options.map((option, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuestion.correctAnswer === i}
                    onChange={() => setCurrentQuestion({...currentQuestion, correctAnswer: i})}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm font-medium text-slate-500">{String.fromCharCode(65 + i)}.</span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...currentQuestion.options];
                      newOptions[i] = e.target.value;
                      setCurrentQuestion({...currentQuestion, options: newOptions});
                    }}
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500">Marks:</label>
                <input
                  type="number"
                  value={currentQuestion.marks}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, marks: parseInt(e.target.value) || 1})}
                  className="w-16 px-2 py-1 text-sm border border-slate-200 rounded-md outline-none"
                  min="1"
                />
              </div>
              <button
                onClick={addQuestion}
                disabled={!currentQuestion.question || currentQuestion.options.some(o => !o)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
              >
                + Add Question
              </button>
            </div>
          </div>

          {/* Added Questions */}
          {newQuiz.questionsList.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-700 text-sm">
                  Added Questions ({newQuiz.questionsList.length}) • Total: {newQuiz.totalMarks} marks
                </h4>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {newQuiz.questionsList.map((q, i) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-3 flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">{q.question}</p>
                      <p className="text-xs text-green-600 mt-1">
                        Answer: {String.fromCharCode(65 + q.correctAnswer)} • {q.marks} marks
                      </p>
                    </div>
                    <button
                      onClick={() => removeQuestion(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowCreateForm(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm">
              Cancel
            </button>
            <button
              onClick={createQuiz}
              disabled={!newQuiz.title || newQuiz.questionsList.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm disabled:opacity-50"
            >
              🚀 Create Quiz
            </button>
          </div>
        </div>
      )}

      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(quiz.status)}`}>
                {quiz.status}
              </span>
              <button className="text-slate-400 hover:text-slate-600">⋯</button>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{quiz.title}</h3>
            <div className="space-y-1.5 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>📚 Course</span>
                <span className="font-medium">{quiz.course}</span>
              </div>
              <div className="flex justify-between">
                <span>⏱️ Duration</span>
                <span className="font-medium">{quiz.duration} mins</span>
              </div>
              <div className="flex justify-between">
                <span>❓ Questions</span>
                <span className="font-medium">{quiz.questions}</span>
              </div>
              <div className="flex justify-between">
                <span>💯 Total Marks</span>
                <span className="font-medium">{quiz.totalMarks}</span>
              </div>
              {quiz.negativeMarking < 0 && (
                <div className="flex justify-between text-red-600">
                  <span>⚠️ Negative</span>
                  <span className="font-medium">{quiz.negativeMarking}</span>
                </div>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Attempts: {quiz.attempts}/{quiz.totalStudents}</span>
                <span>{Math.round((quiz.attempts / quiz.totalStudents) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-blue-500"
                  style={{ width: `${(quiz.attempts / quiz.totalStudents) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setSelectedQuiz(quiz)}
                className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100"
              >
                👁️ Questions
              </button>
              <button className="flex-1 text-center px-3 py-2 bg-green-50 text-green-700 rounded-md text-xs font-medium hover:bg-green-100">
                📊 Results
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Question Preview Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-slate-800">{selectedQuiz.title} - Questions</h3>
              <button onClick={() => setSelectedQuiz(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                ✕
              </button>
            </div>
            <div className="p-4">
              {selectedQuiz.questionsList.length > 0 ? (
                <div className="space-y-4">
                  {selectedQuiz.questionsList.map((q, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{q.question}</p>
                          <p className="text-xs text-slate-500 mt-1">{q.marks} marks</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 ml-10">
                        {q.options.map((opt, j) => (
                          <div
                            key={j}
                            className={`px-3 py-2 rounded-md text-sm border ${
                              j === q.correctAnswer
                                ? "bg-green-50 border-green-300 text-green-700"
                                : "bg-white border-slate-200 text-slate-600"
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + j)}.</span> {opt}
                            {j === q.correctAnswer && <span className="ml-2">✓</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <span className="text-4xl block mb-3">❓</span>
                  <p>No questions added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}