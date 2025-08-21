export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-700 py-6 text-center text-sm text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} Your Name. All rights reserved.
      </p>
      <p className="mt-2">
        <a
          href="mailto:your@email.com"
          className="hover:underline text-gray-300"
        >
          your@email.com
        </a>
        {" • "}
        <a
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-gray-300"
        >
          LinkedIn
        </a>
        {" • "}
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-gray-300"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
