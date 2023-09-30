import { getClient } from "@/lib/client";
import { CompanyInfo } from "./CompanyInfo";
import { companyInfo as query } from "@/lib/queries";

export default async function ServerNoCache() {
  const { data, loading, error } = await getClient().query({
    query,
    context: { fetchOptions: { cache: "no-store" } },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return <CompanyInfo data={data} />;
}
