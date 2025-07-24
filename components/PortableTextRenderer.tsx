import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock, ArbitraryTypedObject, PortableTextMarkDefinition, PortableTextSpan } from '@portabletext/types'

// More flexible type that works with Sanity
type SanityBlock = PortableTextBlock<
  PortableTextMarkDefinition,
  ArbitraryTypedObject | PortableTextSpan,
  string,
  string
> | ArbitraryTypedObject

interface PortableTextRendererProps {
  content: SanityBlock[]
}

const components: PortableTextComponents = {
  block: {
    // Normal paragraph
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed">{children}</p>
    ),
    // Headings with appropriate spacing
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-5 mt-7">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-4 mt-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mb-3 mt-5">{children}</h4>
    ),
    // Block quote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a 
        href={value?.href} 
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return (
    <div className="prose max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}