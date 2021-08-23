import Head from "next/head";
import React from "react";

export default function SEO({ title, description, image }: { title; description?; image? }) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="title" content={title} />

      {description && <>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
      </>}

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
        </>
      )}
    </Head>
  );
}
