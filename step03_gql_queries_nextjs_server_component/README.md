# GraphQL queries in Next.js 13 (server Components)

1. Create a next app.

   ```
   npx create-next-app@latest
   ```

2. We are going to use graphql api created by space x. The said api is assessable at `https://main--spacex-l4uc6p.apollographos.net/graphql`

3. Install apollo client in the app

   ```
   npm install @apollo/client@rc
   npm install @apollo/experimental-nextjs-app-support
   ```

4. Create `src/lib/client.tsx` to define apollo client and gql provider

   ```tsx
   import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
   import {
     NextSSRInMemoryCache,
     NextSSRApolloClient,
   } from "@apollo/experimental-nextjs-app-support/ssr";
   import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

   export const { getClient } = registerApolloClient(() => {
     return new NextSSRApolloClient({
       cache: new NextSSRInMemoryCache(),
       link: new HttpLink({
         uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
       }),
     });
   });
   ```

5. Update `src/app/page.tsx`

   ```tsx
   import { getClient } from "@/lib/client";
   import { gql } from "@apollo/client";
   import Link from "next/link";
   const query = gql`
     query Company {
       company {
         ceo
         coo
         cto
         cto_propulsion
         employees
         founded
         founder
         headquarters {
           address
           city
           state
         }
         launch_sites
         links {
           elon_twitter
           flickr
           twitter
           website
         }
         name
         summary
         test_sites
         valuation
         vehicles
       }
     }
   `;
   export default async function Page() {
     const client = getClient();
     const { data, loading, error } = await client.query({ query });

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error :</p>;
     return (
       <div className="p-4 max-w-xl mx-auto bg-white rounded-lg shadow-lg text-gray-700">
         <h1 className="text-2xl font-semibold mb-4">SpaceX Information</h1>
         <p>
           <strong>Name:</strong> {data.company.name}
         </p>
         <p>
           <strong>CEO:</strong> {data.company.ceo}
         </p>
         <p>
           <strong>COO:</strong> {data.company.coo}
         </p>
         <p>
           <strong>Founded:</strong> {data.company.founded}
         </p>
         <p>
           <strong>Employees:</strong> {data.company.employees}
         </p>
         <p>
           <strong>Headquarters:</strong> {data.company.headquarters.address},{" "}
           {data.company.headquarters.city}, {data.company.headquarters.state}
         </p>
         <p>
           <strong>Summary:</strong> {data.company.summary}
         </p>
         <p>
           <strong>Valuation:</strong> ${data.company.valuation}
         </p>
         <p>
           <strong>Number of Launch Sites:</strong> {data.company.launch_sites}
         </p>
         <p>
           <strong>Number of Test Sites:</strong> {data.company.test_sites}
         </p>
         <p>
           <strong>Number of Vehicles:</strong> {data.company.vehicles}
         </p>
         <p>
           <strong>Links:</strong>
         </p>
         <ul>
           <li>
             <Link
               href={data.company.links.elon_twitter}
               className="text-blue-500 hover:underline"
               target="_blank"
               rel="noopener noreferrer"
             >
               Elon Musk&#39;s Twitter
             </Link>
           </li>
           <li>
             <Link
               href={data.company.links.flickr}
               className="text-blue-500 hover:underline"
               target="_blank"
               rel="noopener noreferrer"
             >
               SpaceX Flickr
             </Link>
           </li>
           <li>
             <Link
               href={data.company.links.twitter}
               className="text-blue-500 hover:underline"
               target="_blank"
               rel="noopener noreferrer"
             >
               SpaceX Twitter
             </Link>
           </li>
           <li>
             <Link
               href={data.company.links.website}
               className="text-blue-500 hover:underline"
               target="_blank"
               rel="noopener noreferrer"
             >
               SpaceX Website
             </Link>
           </li>
         </ul>
       </div>
     );
   }
   ```

6. Run the app locally and visit the page at `http://localhost:3000`
   ```
   npm run dev
   ```
