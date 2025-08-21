import Link from "next/link";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="block bg-gray-900 p-4 rounded-xl hover:scale-105 transition-transform">
      <img src={project.thumbnail} alt={project.title} className="rounded-md" />
      <h3 className="mt-2 text-xl text-white">{project.title}</h3>
    </Link>
  );
}
