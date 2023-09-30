import ClientCache from "@/components/ClientCache";
import ServerCache from "@/components/ServerCache";
export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <ServerCache />
      <ClientCache />
    </div>
  );
}
