import ProjectModel from "src/models/project.model";

export const createProjectService = async (
  workspaceId: string,
  userId: string,
  body: { emoji?: string; name: string; description?: string }
) => {
  const project = await new ProjectModel({
    ...(body.emoji && { emoji: body.emoji }),
    name: body.name,
    description: body.description,
    workspace: workspaceId,
    createdBy: userId
  });
  await project.save();

  return { project };
};
