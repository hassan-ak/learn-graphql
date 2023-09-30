import { getClient } from "@/lib/client";
import { CompanyInfo } from "./CompanyInfo";
import { companyInfo as query } from "@/lib/queries";

export const revalidate = 5;

export default async function ServerRevalidate() {
  const { data, loading, error } = await getClient().query({
    query,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return <CompanyInfo data={data} />;
}
