export type UniStatus = "pending" | "accepted" | "rejected";
export interface University {
  id: string;
  name: string;
  email: string;
  submittedBy: string;
  at: string;
  status: UniStatus;
  remarks:string;
  showRemarkBox:boolean;
}

// export const MOCK_UNIS: University[] = [
  // { id: 1, name: "Indian Institute of Technology, Delhi", email: "arjun00@gmail.com", submittedBy: "Arjun Sharma", at: "2025-10-12 14:20", status: "pending" },
  // { id: 2, name: "University of Mumbai", email: "priya019@gmail.com", submittedBy: "Priya Patel", at: "2025-10-18 09:15", status: "pending" },
  // { id: 3, name: "Jawaharlal Nehru University", email: "verma23@gmail.com", submittedBy: "Rahul Verma", at: "2025-10-22 18:42", status: "accepted" },
  // { id: 4, name: "Banaras Hindu University", email: "ananyagupta01@gmail.com", submittedBy: "Ananya Gupta", at: "2025-10-25 11:05", status: "rejected" },
  // { id: 5, name: "Aligarh Muslim University", email: "sana2003@gmail.com", submittedBy: "Sana Qureshi", at: "2025-11-01 12:30", status: "pending" },
// ];
