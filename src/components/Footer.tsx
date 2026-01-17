export default function Footer() {
  return (
    <footer className="bg-[var(--background-secondary)]/30 py-12 px-6 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-secondary)] hover:text-[var(--accent-color)] transition-colors font-medium text-sm"
          >
            Instagram
          </a>
          <a
            href="https://www.artstation.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-secondary)] hover:text-[var(--accent-color)] transition-colors font-medium text-sm"
          >
            ArtStation
          </a>
          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-secondary)] hover:text-[var(--accent-color)] transition-colors font-medium text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://vimeo.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-secondary)] hover:text-[var(--accent-color)] transition-colors font-medium text-sm"
          >
            Vimeo
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[var(--color-secondary)]/60 text-xs font-light">
            © {new Date().getFullYear()} Ingrid Sayuri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
