import {Helmet} from "react-helmet-async";
import {useQuery} from "@apollo/client/react";
import { gql } from "@apollo/client";

const GRAPHQL_ABOUT_US_QUERY =
    gql`    
        query AboutUsQuery {
          aboutUsPage(locale: "en") {
            documentId
            locale
            createdAt
            updatedAt
            publishedAt
        
            AboutUsMetadata {
              metadataTitle
              metadataDescription
            }
        
            contentHeaderTitles {
              title
              subtitle
            }
        
        
            HeroBannerPhoto {
              Photo {
                url
              }
              DarkeningControlForContrast      
            }
        
            IntroductoryText {
              id
                  Paragraph {
                    content
                  }
                }
        
        
            Statistics {
              id
              StatsCard {
                id
                StatsValue_PrimaryTitle_Bold
                StatsKey_SecondaryTitle
              }
            }
        
        
            localizations {
              documentId
              locale
            }
        
            Page_IllustratedSections {
              __typename
        
              ... on ComponentReusableComponentsSectionSeparatorPageSubtitle {
                id
                title
              }
        
              ... on ComponentReusableComponentsIllustratedSection {
                id
                Orientation
                illustrativePhoto {
                  photo_PrimaryCaption
                  photo_SecondaryCaption          
                  photo {
                    url                        
                  }
                }
                Text {
                  Paragraph {
                    content
                  }
                }
              }
            }
          }
        }
  `;



export default function AboutUs() {
  const { loading, error, data } = useQuery (GRAPHQL_ABOUT_US_QUERY);

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  console.log(data)
    const opacityPercentage: number = parseInt(data.aboutUsPage.HeroBannerPhoto.DarkeningControlForContrast.split("_")[2]);


  console.debug('opacityPercentage: ', opacityPercentage, );

  return (


    <div className="bg-[#eef6fb] rounded-xl ">

      <Helmet>
        <title>{ data.aboutUsPage.AboutUsMetadata.metadataTitle }</title>
        <meta name='description' content={data.aboutUsPage.AboutUsMetadata.metadataDescription} />
      </Helmet>


      {/* HERO */}
      <section className="relative text-white">

        <img
          src={`http://69.62.124.53:1337${data.aboutUsPage.HeroBannerPhoto.Photo.url}`}
          className="absolute inset-0 w-full h-full object-cover  rounded-t-xl "
        />


          <div className={`absolute inset-0 bg-black/${opacityPercentage} rounded-t-xl z-40`} />



        <div className="relative max-w-7xl mx-auto px-6 py-44 z-50">
          <h1 className="text-5xl font-extrabold mb-6 ">
            {data.aboutUsPage.contentHeaderTitles.title}
          </h1>

          <p className="text-lg max-w-2xl ">
            {data.aboutUsPage.contentHeaderTitles.subtitle}
          </p>

        </div>
      </section>

      {/* INTRODUCTORY TEXT */}
      <section className="max-w-7xl mx-auto px-6 py-16 ">

        <div className="space-y-5 text-gray-700">
          {
            data.aboutUsPage.IntroductoryText.Paragraph.map ( (parag, index) => (
                <p key={index}>{parag.content}</p>
            ))
          }
        </div>
      </section>

      {/* CONTENT */}
      <div>

        {
          data.aboutUsPage.Page_IllustratedSections.map ( section => (

              section.__typename === "ComponentReusableComponentsSectionSeparatorPageSubtitle" ?
                (
                  <section key={section.id}  className="max-w-7xl mx-auto px-6 py-1 ">
                    <div className="space-y-5 text-gray-700">
                      <p className="font-bold text-black">
                        {section.title}
                      </p>
                    </div>
                  </section>
                )
                  :

                  section.Orientation.split("_")[0] === "Text"
                      ?
                        (
                            <section key={section.id} className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 grid" >


                              <div className="space-y-5 text-gray-700">

                                {
                                  section.Text.Paragraph.map ( (p, index) => (
                                      <p key={index}>{p.content}</p>
                                  ))
                                }

                              </div>

                              <div className="bg-white rounded-2xl shadow overflow-hidden">
                                <img
                                    src={`http://69.62.124.53:1337${section.illustrativePhoto.photo.url}`}
                                    className="w-full h-[350px] object-cover"
                                />
                                <div className="p-6">
                                  <h3 className="font-bold text-xl">{section.illustrativePhoto.photo_PrimaryCaption}</h3>
                                  <p className="text-gray-600 mt-2">
                                    {section.illustrativePhoto.photo_SecondaryCaption}
                                  </p>
                                </div>
                              </div>

                            </section>

                        )
                      :
                        (
                            <section key={section.id} className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 grid" >

                              <div className="bg-white rounded-2xl shadow overflow-hidden">
                                <img
                                    src={`http://69.62.124.53:1337${section.illustrativePhoto.photo.url}`}
                                    className="w-full h-[350px] object-cover"
                                />
                                <div className="p-6">
                                  <h3 className="font-bold text-xl">{section.illustrativePhoto.photo_PrimaryCaption}</h3>
                                  <p className="text-gray-600 mt-2">
                                    {section.illustrativePhoto.photo_SecondaryCaption}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-5 text-gray-700">

                                {
                                  section.Text.Paragraph.map ( (p, index) => (
                                      <p key={index}>{p.content}</p>
                                  ))
                                }

                              </div>

                            </section>

                        )
          ))
        }



      </div>


      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-2 md:grid-cols-4 gap-6">

        {
          data.aboutUsPage.Statistics.StatsCard.map ( stat => (

              <div key={stat.id} className="bg-white p-6 rounded-xl text-center shadow">
                <p className="text-2xl font-bold">{stat.StatsValue_PrimaryTitle_Bold}</p>
                <p className="text-sm text-gray-600">{stat.StatsKey_SecondaryTitle}</p>
              </div>

          ))
        }

      </section>

    </div>
  );
}