
const makeVote = (id, title, category, startDate, endDate, status, votes, description, extra = {}) => ({
  id,
  title,
  category,
  startDate,
  endDate,
  status,
  votes,
  description,
  extra,
});

export const votingPages = {
  "student-election": {
    title: "Student Election",
    description: "Manage student council elections, candidates and voting activities.",
    listTitle: "Student Election List",
    items: [
      makeVote("SE-001", "Student Council President 2026", "President", "2026-11-01", "2026-11-10", "Active", 428, "Election for the student council president.", {
        candidates: "4 Candidates",
        department: "All Departments",
        eligibility: "All Active Students",
      }),
      makeVote("SE-002", "General Secretary Election", "Secretary", "2026-10-20", "2026-10-30", "Completed", 615, "General secretary election for the academic year.", {
        candidates: "5 Candidates",
        department: "All Departments",
        eligibility: "All Active Students",
      }),
      makeVote("SE-003", "Sports Secretary Election", "Secretary", "2026-11-05", "2026-11-15", "Upcoming", 0, "Election for the sports secretary position.", {
        candidates: "3 Candidates",
        department: "All Departments",
        eligibility: "All Active Students",
      }),
    ],
  },

  "teacher-election": {
    title: "Teacher Election",
    description: "Manage teacher elections, nominations and voting schedules.",
    listTitle: "Teacher Election List",
    items: [
      makeVote("TE-001", "Best Teacher Award 2026", "Award", "2026-11-01", "2026-11-12", "Active", 86, "Annual best teacher selection.", {
        candidates: "8 Teachers",
        department: "All Departments",
        eligibility: "Registered Teachers",
      }),
      makeVote("TE-002", "Department Coordinator Election", "Coordinator", "2026-10-10", "2026-10-20", "Completed", 54, "Selection of department coordinator.", {
        candidates: "3 Teachers",
        department: "CSE",
        eligibility: "Eligible Faculty Members",
      }),
      makeVote("TE-003", "Academic Committee Election", "Committee", "2026-11-15", "2026-11-25", "Upcoming", 0, "Election for academic committee members.", {
        candidates: "6 Teachers",
        department: "All Departments",
        eligibility: "Registered Teachers",
      }),
    ],
  },

  survey: {
    title: "Survey Management",
    description: "Create and manage student, teacher and institutional surveys.",
    listTitle: "Survey List",
    items: [
      makeVote("SV-001", "Student Campus Experience Survey", "Student Survey", "2026-10-25", "2026-11-05", "Active", 752, "Collect feedback about campus facilities and services.", {
        audience: "All Students",
        questions: "15 Questions",
        responseType: "Multiple Choice",
      }),
      makeVote("SV-002", "Online Class Feedback", "Academic Survey", "2026-10-01", "2026-10-15", "Completed", 480, "Feedback about online learning experience.", {
        audience: "All Students",
        questions: "10 Questions",
        responseType: "Rating & Text",
      }),
      makeVote("SV-003", "Library Service Improvement", "Service Survey", "2026-11-08", "2026-11-18", "Upcoming", 0, "Survey to improve library services.", {
        audience: "Students & Teachers",
        questions: "12 Questions",
        responseType: "Multiple Choice",
      }),
    ],
  },

  referendum: {
    title: "Referendum Management",
    description: "Manage institutional referendums and important decision voting.",
    listTitle: "Referendum List",
    items: [
      makeVote("RF-001", "Campus Timing Change Proposal", "Institutional", "2026-11-01", "2026-11-08", "Active", 920, "Vote on the proposed campus schedule change.", {
        options: "Yes / No",
        audience: "All Students",
        decisionType: "Institutional Decision",
      }),
      makeVote("RF-002", "New Library Policy", "Policy", "2026-10-01", "2026-10-12", "Completed", 680, "Referendum on the proposed library policy.", {
        options: "Approve / Reject",
        audience: "Students & Teachers",
        decisionType: "Policy Approval",
      }),
      makeVote("RF-003", "Campus Event Budget Proposal", "Budget", "2026-11-12", "2026-11-20", "Upcoming", 0, "Voting on the annual campus event budget.", {
        options: "Option A / Option B",
        audience: "Student Representatives",
        decisionType: "Budget Decision",
      }),
    ],
  },

  "anonymous-vote": {
    title: "Anonymous Voting",
    description: "Manage confidential voting activities without exposing voter identities.",
    listTitle: "Anonymous Voting List",
    items: [
      makeVote("AV-001", "Preferred Class Schedule", "Student Poll", "2026-10-28", "2026-11-04", "Active", 345, "Anonymous voting about preferred class schedules.", {
        privacy: "Anonymous",
        audience: "CSE Students",
        options: "Morning / Afternoon / Evening",
      }),
      makeVote("AV-002", "Campus Food Quality Poll", "Campus Poll", "2026-10-10", "2026-10-18", "Completed", 520, "Anonymous feedback about campus food quality.", {
        privacy: "Anonymous",
        audience: "All Students",
        options: "Excellent / Good / Average / Poor",
      }),
      makeVote("AV-003", "Student Club Preference", "Club Poll", "2026-11-10", "2026-11-17", "Upcoming", 0, "Anonymous poll to identify student club preferences.", {
        privacy: "Anonymous",
        audience: "All Students",
        options: "Technology / Cultural / Sports",
      }),
    ],
  },

  "result-analytics": {
    title: "Result Analytics",
    description: "Review voting statistics, participation and election results.",
    listTitle: "Voting Result Records",
    items: [
      makeVote("RA-001", "General Secretary Election", "Student Election", "2026-10-20", "2026-10-30", "Completed", 615, "Final result published for general secretary election.", {
        winner: "Candidate A",
        winnerVotes: "280",
        participation: "82%",
      }),
      makeVote("RA-002", "Department Coordinator Election", "Teacher Election", "2026-10-10", "2026-10-20", "Completed", 54, "Department coordinator election results.", {
        winner: "Teacher B",
        winnerVotes: "32",
        participation: "90%",
      }),
      makeVote("RA-003", "Online Class Feedback", "Survey", "2026-10-01", "2026-10-15", "Completed", 480, "Survey response statistics and feedback summary.", {
        winner: "Positive Feedback",
        winnerVotes: "360",
        participation: "76%",
      }),
    ],
  },
};
