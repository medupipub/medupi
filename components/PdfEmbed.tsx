// components/PdfEmbed.tsx
type PdfEmbedProps = {
  url: string;
  title?: string;
};

export default function PdfEmbed({ url, title }: PdfEmbedProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full aspect-[3/4] border">
        <iframe
          src={`${url}#view=FitH`} // Fit to width horizontally
          className="w-full h-full"
          loading="lazy"
        />
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-sm underline text-blue-600"
      >
        Download PDF
      </a>
    </div>
  );
}
