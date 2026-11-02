
const makeResearch = (
  id,
  title,
  category,
  date,
  status,
  description,
  extra = {}
) => ({
  id,
  title,
  category,
  date,
  status,
  description,
  extra,
});

export const researchPages = {
  publication: {
    title: "Publication Management",
    description: "Manage academic papers, journals, articles and research publications.",
    listTitle: "Publication Records",
    items: [
      makeResearch(
        "PUB-001",
        "Artificial Intelligence in Education",
        "Journal Article",
        "2026-10-15",
        "Published",
        "Research on the application of AI in modern education systems.",
        {
          authors: "Dr. Rahman, Md. Hasan",
          journal: "International Journal of Educational Technology",
          doi: "10.1234/ijed.2026.001",
          department: "CSE",
        }
      ),
      makeResearch(
        "PUB-002",
        "Cloud Computing for Smart Campus",
        "Conference Paper",
        "2026-10-20",
        "Under Review",
        "A study on cloud-based infrastructure for smart campuses.",
        {
          authors: "S. Ahmed, M. Karim",
          journal: "Smart Campus Research Conference",
          doi: "Pending",
          department: "CSE",
        }
      ),
      makeResearch(
        "PUB-003",
        "Sustainable Energy Management",
        "Research Article",
        "2026-11-01",
        "Draft",
        "Research on sustainable energy management solutions.",
        {
          authors: "A. Hossain",
          journal: "Not Assigned",
          doi: "Not Assigned",
          department: "EEE",
        }
      ),
    ],
  },

  conference: {
    title: "Conference Management",
    description: "Manage academic conferences, submissions and participation.",
    listTitle: "Conference Records",
    items: [
      makeResearch(
        "CON-001",
        "International AI Research Conference 2026",
        "International",
        "2026-11-15",
        "Upcoming",
        "International conference focused on AI and emerging technologies.",
        {
          location: "Dhaka, Bangladesh",
          organizer: "Research Department",
          participants: "250",
          submissionDeadline: "2026-11-05",
        }
      ),
      makeResearch(
        "CON-002",
        "National Engineering Symposium",
        "National",
        "2026-09-20",
        "Completed",
        "National symposium for engineering research and innovation.",
        {
          location: "Daffodil Institute of IT",
          organizer: "Engineering Faculty",
          participants: "180",
          submissionDeadline: "2026-09-01",
        }
      ),
      makeResearch(
        "CON-003",
        "Cyber Security Research Workshop",
        "Workshop",
        "2026-12-10",
        "Planning",
        "Workshop on cybersecurity research and practical applications.",
        {
          location: "Main Campus",
          organizer: "CSE Department",
          participants: "100",
          submissionDeadline: "2026-11-25",
        }
      ),
    ],
  },

  patent: {
    title: "Patent Management",
    description: "Track intellectual property, patent applications and approvals.",
    listTitle: "Patent Records",
    items: [
      makeResearch(
        "PAT-001",
        "Smart Attendance Verification System",
        "Software Patent",
        "2026-08-10",
        "Filed",
        "An intelligent system for verifying student attendance.",
        {
          inventors: "Md. Hasan, Dr. Rahman",
          applicationNo: "PAT-BD-2026-001",
          jurisdiction: "Bangladesh",
          department: "CSE",
        }
      ),
      makeResearch(
        "PAT-002",
        "IoT Based Energy Monitoring Device",
        "Device Patent",
        "2026-07-15",
        "Under Review",
        "An IoT-based device for monitoring energy consumption.",
        {
          inventors: "A. Hossain, S. Karim",
          applicationNo: "PAT-BD-2026-002",
          jurisdiction: "Bangladesh",
          department: "EEE",
        }
      ),
      makeResearch(
        "PAT-003",
        "Automated Research Data Analyzer",
        "Software Patent",
        "2026-10-01",
        "Draft",
        "A proposed automated platform for research data analysis.",
        {
          inventors: "Research Team Alpha",
          applicationNo: "Not Assigned",
          jurisdiction: "Bangladesh",
          department: "CSE",
        }
      ),
    ],
  },

  "research-grant": {
    title: "Research Grant Management",
    description: "Manage research funding, grant applications and financial progress.",
    listTitle: "Research Grant Records",
    items: [
      makeResearch(
        "GR-001",
        "AI Based Learning Analytics Project",
        "Institutional Grant",
        "2026-09-10",
        "Approved",
        "Funding for developing AI-based learning analytics.",
        {
          principalInvestigator: "Dr. Rahman",
          requestedAmount: "৳ 500,000",
          approvedAmount: "৳ 450,000",
          fundingAgency: "Institutional Research Fund",
        }
      ),
      makeResearch(
        "GR-002",
        "Renewable Energy Research",
        "External Grant",
        "2026-10-05",
        "Under Review",
        "Research project focused on renewable energy solutions.",
        {
          principalInvestigator: "Prof. Karim",
          requestedAmount: "৳ 800,000",
          approvedAmount: "Pending",
          fundingAgency: "National Research Council",
        }
      ),
      makeResearch(
        "GR-003",
        "Smart Agriculture Innovation",
        "Innovation Grant",
        "2026-10-22",
        "Submitted",
        "Funding request for smart agriculture research.",
        {
          principalInvestigator: "A. Hossain",
          requestedAmount: "৳ 300,000",
          approvedAmount: "Pending",
          fundingAgency: "Innovation Development Fund",
        }
      ),
    ],
  },

  "research-group": {
    title: "Research Group Management",
    description: "Manage research teams, members, supervisors and research activities.",
    listTitle: "Research Group Records",
    items: [
      makeResearch(
        "RG-001",
        "Artificial Intelligence Research Lab",
        "Technology",
        "2026-08-01",
        "Active",
        "Research group focused on machine learning and AI applications.",
        {
          leader: "Dr. Rahman",
          members: "12",
          department: "CSE",
          focusArea: "Machine Learning, NLP, Computer Vision",
        }
      ),
      makeResearch(
        "RG-002",
        "Renewable Energy Research Team",
        "Engineering",
        "2026-07-15",
        "Active",
        "Research team working on sustainable energy solutions.",
        {
          leader: "Prof. Karim",
          members: "8",
          department: "EEE",
          focusArea: "Solar Energy, Smart Grid",
        }
      ),
      makeResearch(
        "RG-003",
        "Data Science Research Group",
        "Technology",
        "2026-10-01",
        "Pending",
        "New research group proposal for data science projects.",
        {
          leader: "Md. Hasan",
          members: "6",
          department: "CSE",
          focusArea: "Big Data, Data Analytics",
        }
      ),
    ],
  },

  citation: {
    title: "Citation Management",
    description: "Track research citations, references, DOI records and academic impact.",
    listTitle: "Citation Records",
    items: [
      makeResearch(
        "CIT-001",
        "AI in Modern Education",
        "Google Scholar",
        "2026-10-10",
        "Verified",
        "Citation record for published research on AI in education.",
        {
          authors: "Dr. Rahman et al.",
          citationCount: "125",
          doi: "10.1234/edu.ai.2026",
          publicationYear: "2026",
        }
      ),
      makeResearch(
        "CIT-002",
        "Cloud Infrastructure for Smart Campus",
        "Crossref",
        "2026-10-18",
        "Pending",
        "Citation data awaiting verification.",
        {
          authors: "S. Ahmed et al.",
          citationCount: "42",
          doi: "10.5678/cloud.2026",
          publicationYear: "2026",
        }
      ),
      makeResearch(
        "CIT-003",
        "Renewable Energy Solutions",
        "Research Database",
        "2026-10-25",
        "Verified",
        "Citation and reference information for renewable energy research.",
        {
          authors: "A. Hossain et al.",
          citationCount: "78",
          doi: "10.9876/energy.2025",
          publicationYear: "2025",
        }
      ),
    ],
  },
};
