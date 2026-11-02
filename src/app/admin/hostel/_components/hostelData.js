
export const makeHostel = (
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
  ...extra,
});

export const hostelPages = {
  rooms: {
    title: "Room Management",
    subtitle: "Manage hostel buildings, floors and rooms.",
    type: "rooms",
    records: [
      makeHostel("ROM-001", "Room 101", "Boys Hostel", "2026-10-01", "Available", "First floor room.", {
        building: "A Block",
        floor: "1st Floor",
        capacity: 4,
        occupied: 2,
        facilities: "Attached bathroom, Fan, Wi-Fi",
      }),
      makeHostel("ROM-002", "Room 102", "Boys Hostel", "2026-10-02", "Occupied", "Room currently occupied.", {
        building: "A Block",
        floor: "1st Floor",
        capacity: 4,
        occupied: 4,
        facilities: "Attached bathroom, Fan",
      }),
      makeHostel("ROM-003", "Room 201", "Girls Hostel", "2026-10-03", "Maintenance", "Room under maintenance.", {
        building: "B Block",
        floor: "2nd Floor",
        capacity: 3,
        occupied: 1,
        facilities: "Attached bathroom, AC, Wi-Fi",
      }),
    ],
  },

  seats: {
    title: "Seat Management",
    subtitle: "Track hostel seat availability and status.",
    type: "seats",
    records: [
      makeHostel("SET-001", "Seat A-101-1", "Room 101", "2026-10-01", "Available", "Available hostel seat.", {
        building: "A Block",
        room: "101",
        seatNumber: "1",
        monthlyFee: 3500,
      }),
      makeHostel("SET-002", "Seat A-101-2", "Room 101", "2026-10-01", "Occupied", "Assigned to a student.", {
        building: "A Block",
        room: "101",
        seatNumber: "2",
        student: "Rahim Ahmed",
        monthlyFee: 3500,
      }),
      makeHostel("SET-003", "Seat A-102-1", "Room 102", "2026-10-02", "Reserved", "Reserved for a new student.", {
        building: "A Block",
        room: "102",
        seatNumber: "1",
        monthlyFee: 4000,
      }),
    ],
  },

  allocation: {
    title: "Student Allocation",
    subtitle: "Manage student hostel applications and seat assignments.",
    type: "allocation",
    records: [
      makeHostel("ALC-001", "Rahim Ahmed", "CSE - 3rd Year", "2026-10-10", "Allocated", "Student allocated to a hostel seat.", {
        studentId: "STU-2024-001",
        hostel: "Boys Hostel",
        room: "101",
        seat: "A-101-2",
        allocationDate: "2026-10-10",
        guardianPhone: "01700000001",
      }),
      makeHostel("ALC-002", "Nusrat Jahan", "BBA - 2nd Year", "2026-10-12", "Pending", "Waiting for allocation approval.", {
        studentId: "STU-2024-018",
        hostel: "Girls Hostel",
        room: "201",
        seat: "B-201-2",
        guardianPhone: "01700000002",
      }),
      makeHostel("ALC-003", "Sakib Hasan", "EEE - 1st Year", "2026-10-15", "Rejected", "Application does not meet current allocation criteria.", {
        studentId: "STU-2026-009",
        hostel: "Boys Hostel",
        room: "102",
        seat: "A-102-1",
        guardianPhone: "01700000003",
      }),
    ],
  },

  meals: {
    title: "Meal Management",
    subtitle: "Manage daily meal schedules, menus and student meal records.",
    type: "meals",
    records: [
      makeHostel("MEA-001", "Breakfast - Monday", "Breakfast", "2026-11-01", "Published", "Breakfast menu for hostel residents.", {
        menu: "Bread, Egg, Banana, Milk",
        servingTime: "07:00 AM - 08:30 AM",
        mealType: "Breakfast",
        cost: 50,
      }),
      makeHostel("MEA-002", "Lunch - Monday", "Lunch", "2026-11-01", "Published", "Lunch menu for hostel residents.", {
        menu: "Rice, Chicken, Dal, Vegetables",
        servingTime: "01:00 PM - 02:30 PM",
        mealType: "Lunch",
        cost: 100,
      }),
      makeHostel("MEA-003", "Dinner - Monday", "Dinner", "2026-11-01", "Draft", "Dinner menu awaiting publication.", {
        menu: "Rice, Fish, Dal, Salad",
        servingTime: "08:00 PM - 09:30 PM",
        mealType: "Dinner",
        cost: 90,
      }),
    ],
  },

  visitors: {
    title: "Visitor Management",
    subtitle: "Monitor hostel visitors and visit records.",
    type: "visitors",
    records: [
      makeHostel("VIS-001", "Abdul Karim", "Parent", "2026-10-28", "Checked Out", "Student guardian visit.", {
        student: "Rahim Ahmed",
        studentId: "STU-2024-001",
        phone: "01800000001",
        checkIn: "10:00 AM",
        checkOut: "11:15 AM",
        relation: "Father",
      }),
      makeHostel("VIS-002", "Fatema Begum", "Parent", "2026-10-29", "Checked In", "Student guardian currently visiting.", {
        student: "Nusrat Jahan",
        studentId: "STU-2024-018",
        phone: "01800000002",
        checkIn: "02:30 PM",
        checkOut: "Not checked out",
        relation: "Mother",
      }),
      makeHostel("VIS-003", "Mahmud Hasan", "Guest", "2026-10-29", "Pending", "Visitor waiting for approval.", {
        student: "Sakib Hasan",
        studentId: "STU-2026-009",
        phone: "01800000003",
        checkIn: "Not checked in",
        checkOut: "Not checked out",
        relation: "Uncle",
      }),
    ],
  },

  fees: {
    title: "Hostel Fee Management",
    subtitle: "Track hostel payments, dues and payment records.",
    type: "fees",
    records: [
      makeHostel("FEE-001", "Rahim Ahmed", "Monthly Hostel Fee", "2026-10-05", "Paid", "October hostel fee received.", {
        studentId: "STU-2024-001",
        month: "October 2026",
        amount: 4500,
        paidAmount: 4500,
        dueAmount: 0,
        paymentMethod: "Bank",
        transactionId: "TXN-10001",
      }),
      makeHostel("FEE-002", "Nusrat Jahan", "Monthly Hostel Fee", "2026-10-10", "Due", "October hostel fee is outstanding.", {
        studentId: "STU-2024-018",
        month: "October 2026",
        amount: 5000,
        paidAmount: 2000,
        dueAmount: 3000,
        paymentMethod: "Mobile Banking",
        transactionId: "TXN-10002",
      }),
      makeHostel("FEE-003", "Sakib Hasan", "Admission Fee", "2026-10-15", "Pending", "Admission fee payment is pending.", {
        studentId: "STU-2026-009",
        month: "Admission",
        amount: 3000,
        paidAmount: 0,
        dueAmount: 3000,
        paymentMethod: "Not Paid",
        transactionId: "N/A",
      }),
    ],
  },
};
