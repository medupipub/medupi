'use client';

type PdfEmbedProps = {
  url: string;
  title?: string;
};

export default function PdfEmbed({ url, title }: PdfEmbedProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="
          relative aspect-[148/210]
          h-[60vh] md:h-[65vh]
          overflow-hidden
          bg-transparent
        "
      >
        <iframe
          src={`${url}#view=FitH&toolbar=0&navpanes=0`}
          title={title || 'PDF'}
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-sm underline"
      >
        Download PDF
      </a>
    </div>
  );
}
