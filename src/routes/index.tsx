import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";
import OrigamiJourney from "@/components/portfolio/OrigamiJourney";

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
  return <>
        <Portfolio/>
  </>;
}
