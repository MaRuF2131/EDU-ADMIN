
const createRecord = (
  id,
  title,
  category,
  score,
  status,
  description,
  extra = {}
) => ({
  id,
  title,
  category,
  score,
  status,
  description,
  createdAt: "2026-11-01",
  ...extra,
});

export const aiAnalyticsPages = {
  gradePrediction: {
    title: "Grade Prediction",
    description: "AI-powered student grade and academic performance prediction.",
    searchPlaceholder: "Search student, ID or course...",
    records: [
      createRecord("GRD-001", "Rahim Ahmed", "Mathematics", 92, "High Confidence", "Predicted excellent academic performance.", {
        studentId: "STU-1001",
        department: "CSE",
        semester: "6th Semester",
        currentGPA: 3.65,
        predictedGPA: 3.82,
        confidence: "94%",
        model: "Grade Prediction Model v1",
      }),
      createRecord("GRD-002", "Nusrat Jahan", "Programming", 78, "Medium Confidence", "Predicted good performance.", {
        studentId: "STU-1002",
        department: "CSE",
        semester: "4th Semester",
        currentGPA: 3.20,
        predictedGPA: 3.45,
        confidence: "86%",
        model: "Grade Prediction Model v1",
      }),
      createRecord("GRD-003", "Sakib Hasan", "Database Systems", 48, "Needs Review", "Predicted academic improvement is required.", {
        studentId: "STU-1003",
        department: "BBA",
        semester: "3rd Semester",
        currentGPA: 2.40,
        predictedGPA: 2.65,
        confidence: "79%",
        model: "Grade Prediction Model v1",
      }),
    ],
  },

  riskScore: {
    title: "Student Risk Score",
    description: "Identify students who may need additional academic support.",
    searchPlaceholder: "Search student or department...",
    records: [
      createRecord("RSK-001", "Rahim Ahmed", "Academic Risk", 82, "High Risk", "Multiple academic indicators require attention.", {
        studentId: "STU-1001",
        department: "CSE",
        attendance: "58%",
        GPA: 2.10,
        failedCourses: 3,
        riskFactors: ["Low attendance", "Repeated failed courses", "Declining GPA"],
        model: "Student Risk Model v1",
      }),
      createRecord("RSK-002", "Nusrat Jahan", "Academic Risk", 35, "Medium Risk", "Some academic indicators should be monitored.", {
        studentId: "STU-1002",
        department: "EEE",
        attendance: "76%",
        GPA: 3.10,
        failedCourses: 1,
        riskFactors: ["Irregular attendance"],
        model: "Student Risk Model v1",
      }),
      createRecord("RSK-003", "Sakib Hasan", "Academic Risk", 12, "Low Risk", "No major risk indicators identified.", {
        studentId: "STU-1003",
        department: "CSE",
        attendance: "92%",
        GPA: 3.75,
        failedCourses: 0,
        riskFactors: ["No major risk factors"],
        model: "Student Risk Model v1",
      }),
    ],
  },

  dropoutPrediction: {
    title: "Dropout Prediction",
    description: "Estimate student disengagement and potential dropout risk.",
    searchPlaceholder: "Search student or department...",
    records: [
      createRecord("DRP-001", "Tanvir Hossain", "Dropout Risk", 78, "High Risk", "Student engagement indicators suggest additional support may be needed.", {
        studentId: "STU-2001",
        department: "CSE",
        attendance: "45%",
        semester: "5th Semester",
        engagement: "Low",
        predictedPeriod: "Next Academic Semester",
        factors: ["Low attendance", "Reduced course participation", "Academic difficulties"],
      }),
      createRecord("DRP-002", "Mim Akter", "Dropout Risk", 42, "Medium Risk", "Student engagement should be monitored.", {
        studentId: "STU-2002",
        department: "BBA",
        attendance: "70%",
        semester: "3rd Semester",
        engagement: "Moderate",
        predictedPeriod: "Next Academic Semester",
        factors: ["Irregular participation"],
      }),
    ],
  },

  attendancePrediction: {
    title: "Attendance Prediction",
    description: "Analyze attendance patterns and estimate future attendance.",
    searchPlaceholder: "Search student, course or department...",
    records: [
      createRecord("ATP-001", "Rahim Ahmed", "Future Attendance", 88, "Positive", "Expected attendance is likely to remain consistent.", {
        studentId: "STU-1001",
        department: "CSE",
        course: "Data Structures",
        currentAttendance: "91%",
        predictedAttendance: "88%",
        classesHeld: 32,
        model: "Attendance Forecast v1",
      }),
      createRecord("ATP-002", "Sakib Hasan", "Future Attendance", 42, "Needs Attention", "Attendance may fall below the required threshold.", {
        studentId: "STU-1003",
        department: "CSE",
        course: "Database Systems",
        currentAttendance: "52%",
        predictedAttendance: "42%",
        classesHeld: 28,
        model: "Attendance Forecast v1",
      }),
    ],
  },

  learningGap: {
    title: "Learning Gap Analysis",
    description: "Identify knowledge gaps and topics where students need support.",
    searchPlaceholder: "Search student, topic or subject...",
    records: [
      createRecord("LGP-001", "Rahim Ahmed", "JavaScript Fundamentals", 35, "Gap Identified", "Student needs additional practice with asynchronous programming.", {
        studentId: "STU-1001",
        department: "CSE",
        subject: "Web Development",
        weakTopics: ["Promises", "Async/Await", "API Integration"],
        strongTopics: ["Variables", "Functions", "DOM"],
        recommendedLevel: "Intermediate",
      }),
      createRecord("LGP-002", "Nusrat Jahan", "Database Design", 18, "Improving", "Some database concepts need reinforcement.", {
        studentId: "STU-1002",
        department: "CSE",
        subject: "Database Systems",
        weakTopics: ["Normalization", "Indexing"],
        strongTopics: ["SQL", "ER Diagram"],
        recommendedLevel: "Beginner",
      }),
    ],
  },

  teacherAnalytics: {
    title: "Teacher Analytics",
    description: "Analyze teaching performance, course outcomes and engagement.",
    searchPlaceholder: "Search teacher or department...",
    records: [
      createRecord("TCH-001", "Dr. Ahmed Karim", "Teaching Performance", 94, "Excellent", "Strong student engagement and course outcomes.", {
        teacherId: "T-1001",
        department: "CSE",
        courses: 4,
        students: 180,
        attendanceRate: "96%",
        completionRate: "98%",
        studentFeedback: "4.8/5",
      }),
      createRecord("TCH-002", "Nusrat Sultana", "Teaching Performance", 78, "Good", "Consistent performance with room for improvement.", {
        teacherId: "T-1002",
        department: "EEE",
        courses: 3,
        students: 120,
        attendanceRate: "88%",
        completionRate: "91%",
        studentFeedback: "4.2/5",
      }),
    ],
  },

  departmentAnalytics: {
    title: "Department Analytics",
    description: "Compare department performance and academic indicators.",
    searchPlaceholder: "Search department...",
    records: [
      createRecord("DPT-001", "Computer Science & Engineering", "Department Performance", 91, "Excellent", "Strong overall academic performance.", {
        departmentCode: "CSE",
        totalStudents: 1250,
        totalTeachers: 45,
        averageGPA: 3.45,
        attendanceRate: "89%",
        passRate: "94%",
      }),
      createRecord("DPT-002", "Electrical & Electronic Engineering", "Department Performance", 82, "Good", "Department performance is stable.", {
        departmentCode: "EEE",
        totalStudents: 950,
        totalTeachers: 38,
        averageGPA: 3.25,
        attendanceRate: "85%",
        passRate: "88%",
      }),
    ],
  },

  universityAnalytics: {
    title: "University Analytics",
    description: "Monitor university-wide academic and operational performance.",
    searchPlaceholder: "Search analytics or category...",
    records: [
      createRecord("UNI-001", "Overall Academic Performance", "Academic KPI", 89, "Good", "University-wide academic performance indicator.", {
        totalStudents: 12500,
        totalTeachers: 450,
        totalDepartments: 18,
        averageGPA: 3.38,
        passRate: "91%",
        attendanceRate: "87%",
      }),
      createRecord("UNI-002", "Student Retention Rate", "Retention KPI", 93, "Excellent", "Student retention indicator for the current academic year.", {
        totalStudents: 12500,
        retentionRate: "93%",
        dropoutRate: "7%",
        academicYear: "2026",
      }),
    ],
  },

  recommendation: {
    title: "AI Recommendations",
    description: "Generate personalized academic and institutional recommendations.",
    searchPlaceholder: "Search student, recommendation or category...",
    records: [
      createRecord("REC-001", "Rahim Ahmed", "Academic Support", 90, "Suggested", "Recommend additional programming practice and mentoring.", {
        studentId: "STU-1001",
        department: "CSE",
        recommendationType: "Personalized Learning",
        action: "Assign programming practice and weekly mentoring.",
        priority: "High",
        generatedBy: "Recommendation Model v1",
      }),
      createRecord("REC-002", "CSE Department", "Department Improvement", 82, "Under Review", "Recommend additional laboratory sessions.", {
        department: "CSE",
        recommendationType: "Department Strategy",
        action: "Increase practical laboratory sessions.",
        priority: "Medium",
        generatedBy: "Recommendation Model v1",
      }),
    ],
  },

  naturalLanguageQuery: {
    title: "Natural Language Query",
    description: "Ask questions about university data using natural language.",
    searchPlaceholder: "Search query or user...",
    records: [
      createRecord("NLQ-001", "Which department has the highest GPA?", "Academic Query", 95, "Answered", "CSE currently has the highest average GPA in the sample dataset.", {
        askedBy: "Admin",
        query: "Which department has the highest GPA?",
        answer: "CSE has the highest average GPA of 3.45.",
        dataSource: "Department Academic Records",
        executionTime: "1.2 seconds",
      }),
      createRecord("NLQ-002", "Show students with low attendance", "Attendance Query", 92, "Answered", "The query returned students with attendance below the configured threshold.", {
        askedBy: "Academic Officer",
        query: "Show students with attendance below 60%.",
        answer: "The sample query returned 2 students.",
        dataSource: "Attendance Records",
        executionTime: "0.8 seconds",
      }),
    ],
  },
};
