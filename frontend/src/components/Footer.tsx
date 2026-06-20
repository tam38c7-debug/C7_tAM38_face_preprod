import {useQuery} from "@apollo/client/react";
import React from "react";
import {gql} from "@apollo/client";


const GRAPHQL_FOOTER_QUERY =
    gql `
      query shared_FooterPageElement {
        sharedFooterPageElement (locale: "en") {
      
          documentId
      
          footerTagline
          locale
          websiteTitle
          
      
          copyright_RightsReservedTextAfterDot
          copyright_titleBeforeDot
          localizations {
            documentId
            locale
            publishedAt
          }
        }
      }    
    
    `

export default function Footer() {


  const { loading, error, data } = useQuery (GRAPHQL_FOOTER_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  console.log(data)


  return (
    <footer className="border-t border-white/10 bg-black/60 glass">
      <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>

          <div className="font-extrabold">
            { data.sharedFooterPageElement.websiteTitle}
          </div>

          <div className="text-sm text-white/60">
            { data.sharedFooterPageElement.footerTagline}
          </div>
        </div>

        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} { data.sharedFooterPageElement.copyright_titleBeforeDot} • { data.sharedFooterPageElement.copyright_RightsReservedTextAfterDot}
        </div>
      </div>
    </footer>
  );
}