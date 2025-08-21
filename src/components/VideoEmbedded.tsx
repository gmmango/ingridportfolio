export default function VideoEmbed({ src }: { src: string }) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={src}
        title="Video player"
        loading="lazy"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
