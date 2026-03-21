import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: string
}

const DEFAULT_IMAGE = 'https://ptchdeck.com/og-image.jpg'

export default function SEO({ title, description, image, url, type }: SEOProps) {
  const fullTitle = `${title} | PtchDeck`
  const ogImage = image ?? DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content={type ?? 'website'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
