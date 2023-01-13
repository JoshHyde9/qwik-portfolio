import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.ico" />

      <meta name="og:site_name" content="Josh Hyde | Full Stack Developer" />
      <meta name="author" content="Josh Hyde" />
      <meta name="og:author" content="Josh Hyde" />
      <meta property="type" content="website" />
      <meta property="og:type" content="website" />
      <meta name="twitter:site" content="@JoshHyde9" />
      <meta
        name="twitter:image"
        content="https://avatars.githubusercontent.com/u/40751087?v=4"
      />
      <meta name="twitter:card" content="app" />
      <meta
        property="image"
        content="https://avatars.githubusercontent.com/u/40751087?v=4"
      />
      <meta
        property="og:image"
        content="https://avatars.githubusercontent.com/u/40751087?v=4"
      />
      <meta property="image:alt" content="Josh Hyde" />
      <meta property="og:image:alt" content="Josh Hyde" />

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
