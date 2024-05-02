/**
 * Temporary until proper prisma schema set
 */

export type JobStatus = "Open" | "Closed";

export interface Job {
  title: string;
  status: JobStatus;
  location: string;
  department: string;
  published: string;
  hiringManager: string;
}
