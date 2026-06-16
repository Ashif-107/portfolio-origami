import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Portfolio } from "@/components/portfolio/Portfolio";
import OrigamiPreloader from "@/components/actions/OrigamiPreloader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashif Portfolio" },
      { name: "description", content: "An origami inspired portfolio of Ashif, A full-stack developer and systems engineer." },
      { property: "og:title", content: "Ashif Portfolio" },
      { property: "og:description", content: "An origami inspired portfolio " },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);

  return <>
    <AnimatePresence mode="wait">
      {loading && (
        <OrigamiPreloader
          key="preloader"
          onComplete={() => setLoading(false)}
        />
      )}
    </AnimatePresence>

    <Portfolio />
  </>;
}
