export const Provider = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  GITHUB: "github",
  EMAIL: "email",
} as const;

export const TaskStatus = {
  BACKLOG: "backlog",
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  IN_REVIEW: "in_review",
  DONE: "done",
} as const;

export const TaskPriority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];
export type TaskPriorityType = (typeof TaskPriority)[keyof typeof TaskPriority];
export type ProviderType = (typeof Provider)[keyof typeof Provider];