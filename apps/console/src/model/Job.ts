/**
 * Temporary until proper prisma schema set
 */

export type JobStatus = "Active" | "Closed";

export interface Job {
  title: string;
  status: JobStatus;
  location: string;
  department: string;
  published: string;
  hiringManager: string;
}
