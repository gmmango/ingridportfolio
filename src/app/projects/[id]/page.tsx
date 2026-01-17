// app/projects/[id]/page.tsx
import { notFound } from "next/navigation";
import { getAllProjects, getProjectById } from "@/utils/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({
    id: project.id,
  }));
}

interface Props {
  params: Promise<{ id: string }>;
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const project = getProjectById(id);
  const allProjects = getAllProjects();

  if (!project) {
    return notFound();
  }

  // Find project index for the counter
  const projectIndex = allProjects.findIndex(p => p.id === id) + 1;
  const totalProjects = allProjects.length;

  return (
    <ProjectDetailClient
      project={project}
      projectIndex={projectIndex}
      totalProjects={totalProjects}
    />
  );
};

export default ProjectDetailPage;
