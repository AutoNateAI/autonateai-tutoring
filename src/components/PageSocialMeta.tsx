import React from 'react';
import Head from '@docusaurus/Head';

type PageSocialMetaProps = {
  title: string;
  description: string;
  image: string;
  path: string;
};

export default function PageSocialMeta({title, description, image, path}: PageSocialMetaProps): React.JSX.Element {
  const fullImage = image.startsWith('http') ? image : `https://autonateai.com${image}`;
  const fullUrl = `https://autonateai.com${path}`;

  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:secure_url" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Head>
  );
}
