// app/projects/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import projectsData from '../../../data/projects.json';

const projects = projectsData.projects;

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

interface Props {
  params: { id: string };
}

const ProjectDetailPage = ({ params }: Props) => {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return notFound();
  }

  const { media } = project;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-16">
      {/* Header */}
      <header className="relative h-96 mb-12">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="container mx-auto px-8">
            <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-200 max-w-3xl">{project.description}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8">
        {/* Info Bar */}
        <div className="flex flex-wrap gap-6 mb-12 text-sm text-gray-300 border-b border-gray-700 pb-6">
          <span>
            <strong>Year:</strong> {project.year}
          </span>
          {project.duration && (
            <span>
              <strong>Duration:</strong> {project.duration}
            </span>
          )}
          <span>
            <strong>Category:</strong> {project.category.replace('-', ' ')}
          </span>
          <span>
            <strong>Tools:</strong> {project.tools.join(', ')}
          </span>
        </div>

        {/* Media Section */}
        <section className="mb-16">
          {media.type === 'video' ? (
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <video
                src={media.src}
                poster={media.poster}
                controls
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(media.gallery || [media.src]).map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={img}
                    alt={`${project.title} - Image ${idx + 1}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-64 transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Process / Description */}
        <section className="prose prose-lg prose-invert max-w-4xl mb-16">
          <h2>Project Overview</h2>
          <p>{project.description}</p>

          <h3>Creation Process</h3>
          <p>
            This project began with concept sketches and asset blocking in {project.tools[0]}. 
            Rigging and animation were handled with precision to ensure fluid motion. 
            Texturing was done using {project.tools.includes('Substance Painter') ? 'Substance Painter' : project.tools[2]}, 
            followed by final lighting and rendering in {project.tools.includes('Arnold') ? 'Arnold' : 'the primary renderer'}.
          </p>
          <p>
            The compositing stage brought all elements together, enhancing depth and atmosphere. 
            Special attention was paid to detail and storytelling through movement and environment.
          </p>

          {/* You can expand this section per project in the future */}
        </section>

        {/* Tools Used */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Tools & Software</h3>
          <div className="flex flex-wrap gap-3">
            {project.tools.map((tool, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-gray-800 text-gray-100 rounded-lg border border-gray-600"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* External Links */}
        {project.externalLinks && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-6">View On</h3>
            <div className="flex flex-wrap gap-4">
              {project.externalLinks.youtube && (
                <Link
                  href={project.externalLinks.youtube.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45 0 5.048 0 8.009v7.982c0 2.966.484 4.561 4.385 4.815 3.6.25 11.626.25 15.23 0C23.512 20.553 24 18.955 24 15.991V8.01C24 5.048 23.512 3.45 19.615 3.184z" />
                    <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </Link>
              )}
              {project.externalLinks.behance && (
                <Link
                  href={project.externalLinks.behance.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-black hover:bg-gray-800 rounded-lg font-medium transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.77 10.374c1.774 0 3.21-1.43 3.21-3.197 0-1.77-.67-2.607-1.804-2.607H5.824C4.05 4.57 3.38 5.408 3.38 7.177c0 1.766.67 3.196 2.446 3.196h11.044zm-5.246 6.89c2.633 0 4.36-1.41 4.36-3.16 0-1.75-.7-2.75-2.09-2.75h-2.27v5.91h2.27zm-4.39 0h2.27V9.336h-2.27v6.928zm13.99-7.61c0 2.86-2.38 5.17-5.33 5.17H5.824c-2.95 0-5.33-2.31-5.33-5.17V7.177c0-2.86 2.38-5.17 5.33-5.17h12.35c2.95 0 5.33 2.31 5.33 5.17v2.477z" />
                  </svg>
                  Behance
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
        >
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailPage;