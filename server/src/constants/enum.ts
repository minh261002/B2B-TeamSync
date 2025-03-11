export const Provider = {
  GOOGLE: "GOOGLE",
  FACEBOOK: "FACEBOOK",
  GITHUB: "GITHUB",
  EMAIL: "EMAIL",
} as const;

export const TaskStatus = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

export const TaskPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export const Roles = {
  ADMIN: "ADMIN",
  OWNER: "OWNER",
  MEMBER: "MEMBER",
} as const;

export const Permissions = {
  CREATE_WORKSPACE: "CREATE_WORKSPACE",
  DELETE_WORKSPACE: "DELETE_WORKSPACE",
  UPDATE_WORKSPACE: "UPDATE_WORKSPACE",
  MANAGE_WORKSPACE_SETTINGS: "MANAGE_WORKSPACE_SETTINGS",

  CREATE_PROJECT: "CREATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",

  CREATE_TASK: "CREATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  UPDATE_TASK: "UPDATE_TASK",

  VIEW_ONLY: "VIEW_ONLY",

  ADD_MEMBER: "ADD_MEMBER",
  CHANGE_MEMBER_ROLE: "CHANGE_MEMBER_ROLE",
  REMOVE_MEMBER: "REMOVE_MEMBER",
}

export type PermissionsType = (typeof Permissions)[keyof typeof Permissions];
export type RolesType = (typeof Roles)[keyof typeof Roles];
export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];
export type TaskPriorityType = (typeof TaskPriority)[keyof typeof TaskPriority];
export type ProviderType = (typeof Provider)[keyof typeof Provider];