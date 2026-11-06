import { useEffect, useState } from 'react';

export default function useFont(family: string, url: string) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    const font = new FontFace(family, `url(${url})`);

    font
      .load()
      .then((f) => {
        if (cancelled) return;
        document.fonts.add(f);
        setReady(true);
      })
      .catch((err) => console.error("Couldn't load the font", err));

    return () => {
      cancelled = true;
      document.fonts.delete(font);
    };
  }, [family, url]);

  return ready;
}
