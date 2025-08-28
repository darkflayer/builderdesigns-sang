import dynamic from "next/dynamic";

const ClientApp = dynamic(() => import("@/next-adapter/ClientApp"), {
  ssr: false,
});

export default function CatchAllPage() {
  return <ClientApp />;
}
