export interface Report {
  id: number;
  title: string;
  type: 'Incident' | 'Monthly' | 'Summary';
  barangay: string;
  createdBy: string;
  dateCreated: string;
  status: 'Draft' | 'Finalized';
  content: string;
}