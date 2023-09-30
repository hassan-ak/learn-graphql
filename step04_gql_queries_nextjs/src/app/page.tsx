import ClientCache from "@/components/ClientCache";
import ClientNoCache from "@/components/ClientNoCache";
import ServerCache from "@/components/ServerCache";
import ServerNoCache from "@/components/ServerNoCache";
import ServerRevalidate from "@/components/ServerRevalidate";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <ServerCache />
      <ServerNoCache />
      <ServerRevalidate />
      <ClientCache />
      <ClientNoCache />
    </div>
  );
}
