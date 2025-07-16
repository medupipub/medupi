'use client'

import { marked } from 'marked'
import { useEffect, useState, ElementType } from 'react'

type Props = {
  title: string
  as?: ElementType
  className?: string
}

export default function PublicationTitle({ title, as: Tag = 'span', className = '' }: Props) {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    async function convert() {
      // Step 1: Convert escaped newlines (\n) into real newline characters
      const normalised = title.replace(/\\n/g, '\n')

      // Step 2: Use marked to convert markdown (e.g., ~~strike~~) to HTML
      const parsed = await marked.parseInline(normalised)

      // Step 3: Convert real newline characters to <br /> for HTML rendering
      const withLineBreaks = parsed.replace(/\n/g, '<br />')

      setHtml(withLineBreaks)
    }

    convert()
  }, [title])

  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
