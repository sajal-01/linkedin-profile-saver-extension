import { useEffect, useState } from 'react';
import defaultImg from './assets/defaultProfile.jpg';
import sanitizeHtml from 'sanitize-html';
function App() {
  const [profileDetails, setProfileDetails] = useState({
    fullname: '',
    title: '',
    location: '',
    photo: '',
    about: '',
    experience: '',
    education: '',
    skills: '',
    volunteering: '',
  });
  const [url, setUrl] = useState('');

  useEffect(() => {
    window.chrome?.tabs &&
      window?.chrome?.tabs?.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          setUrl(tabs[0]?.url);
          window?.chrome?.tabs.sendMessage(
            tabs[0].id || 0,
            { type: 'GET_DOM' },
            (response) => {
              setProfileDetails({
                fullname:
                  response === null || response === undefined
                    ? 'Not Available'
                    : response?.fullname,
                title:
                  response === null || response === undefined
                    ? 'Not Available'
                    : response?.title,
                location:
                  response === null || response === undefined
                    ? 'Not Available'
                    : response?.location,
                photo:
                  response === null || response === undefined
                    ? 'Not Available'
                    : response?.photo,
                about:
                  response === null || response === undefined
                    ? 'Not Available'
                    : response?.about,

                education:
                  response === null || response === undefined
                    ? 'Not Available'
                    : response?.education,
                experience:
                  response === null || response === undefined
                    ? 'Not Available'
                    : response?.experience,

                skills:
                  response === null || response === undefined
                    ? 'Not Available'
                    : response?.skills,

                volunteering:
                  response === null || response === undefined
                    ? 'Not Available'
                    : response?.volunteering,
              });
            }
          );
        }
      );
  }, [url]);

  const sanitizeHTMLHandler = (html) => {
    let cleanHTML = sanitizeHtml(html, {
      allowedTags: [
        'address',
        'article',
        'aside',
        'footer',
        'header',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hgroup',
        'main',
        'nav',
        'section',
        'blockquote',
        'dd',
        'div',
        'dl',
        'dt',
        'figcaption',
        'figure',
        'hr',
        'li',
        'main',
        'ol',
        'p',
        'pre',
        'ul',
        'a',
        'abbr',
        'b',
        'bdi',
        'bdo',
        'br',
        'cite',
        'code',
        'data',
        'dfn',
        'em',
        'i',
        'kbd',
        'mark',
        'q',
        'rb',
        'rp',
        'rt',
        'rtc',
        'ruby',
        's',
        'samp',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'time',
        'u',
        'var',
        'wbr',
        'caption',
        'col',
        'colgroup',
        'table',
        'tbody',
        'td',
        'tfoot',
        'th',
        'thead',
        'tr',
      ],
      allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
      },
      selfClosing: [
        'img',
        'br',
        'hr',
        'area',
        'base',
        'basefont',
        'input',
        'link',
        'meta',
      ],
      // URL schemes we permit
      allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
      allowedSchemesByTag: {},
      allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
      allowProtocolRelative: true,
      enforceHtmlBoundary: false,
    });
    return cleanHTML;
  };
  let cleanHTMLSkills = sanitizeHTMLHandler(profileDetails?.skills);
  let cleanHTMLEdu = sanitizeHTMLHandler(profileDetails?.education);
  let cleanHTMLAbout = sanitizeHTMLHandler(profileDetails?.about);
  let cleanHTMLExp = sanitizeHTMLHandler(profileDetails?.experience);
  let cleanHTMLVol = sanitizeHTMLHandler(profileDetails?.volunteering);

  useEffect(() => {
    if (profileDetails) {
      setProfileDetails({
        ...profileDetails,
        skills:
          profileDetails?.skills === null ? 'Not Available' : cleanHTMLSkills,
        education:
          profileDetails?.education === null ? 'Not Available' : cleanHTMLEdu,
        about:
          profileDetails?.about === null ? 'Not Available' : cleanHTMLAbout,
        experience:
          profileDetails?.experience === null ? 'Not Available' : cleanHTMLExp,
        volunteering:
          profileDetails?.volunteering === null
            ? 'Not Available'
            : cleanHTMLVol,
      });
    }
    // console.log(profileDetails);
  }, [
    profileDetails?.education,
    profileDetails?.experience,
    profileDetails?.volunteering,
    profileDetails?.about,
    profileDetails?.skills,
  ]);

  return (
    <>
      <section className="pt-4 bg-gray-100 ">
        <div className="  w-96 rounded-xl ">
          <div className="text-[#0A66C2] font-semibold text-center text-xl">
            LinkedIn Profile Saver
          </div>
          <div className="flex  justify-between items-center px-10  py-4">
            <button class="px-5 py-2.5 relative rounded group  text-white font-medium inline-block">
              <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
              <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
              <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
              <span class="relative">Save Profile ⚡</span>
            </button>
            <button class="px-5 py-2.5 relative rounded group  text-white font-medium inline-block">
              <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
              <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
              <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
              <span class="relative">Dashboard 🎯</span>
            </button>
          </div>

          <div className="relative flex flex-col  break-words  w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="w-full px-4 flex justify-center items-center">
                <img
                  alt={profileDetails?.fullname || '<--Name Not Available-->'}
                  src={profileDetails?.photo || defaultImg}
                  className="shadow-xl rounded-full h-auto align-middle border-none  max-w-150-px"
                />
              </div>
              <div className="text-center mt-5">
                <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                  {profileDetails?.fullname || '<--Name Not Available-->'}
                </h3>
                {/* JOB TITLE | LOCATION*/}
                <div className="mb-2 font-medium text-md text-blueGray-600 flex items-center justify-start ">
                  <span className="mr-2">
                    🏢
                    {profileDetails?.title ||
                      '<--Title Not Available-->'} 📍{' '}
                    {profileDetails?.location || '<--Location Not Available-->'}{' '}
                  </span>
                </div>

                <div className="mb-2 text-gray-600 text-left rounded-xl shadow-sm  shadow-black flex flex-row justify-start items-center">
                  <span className="p-2 ">
                    {profileDetails?.about ? (
                      <div
                        className="text-left text-gray-700 text-sm font-light leading-relaxed tracking-wide"
                        dangerouslySetInnerHTML={{
                          __html: cleanHTMLAbout,
                        }}
                      />
                    ) : (
                      '<--About Section Not Available-->'
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-10 py-10 border-t border-blueGray-200 text-left">
                <div className="text-center font-bold text-blueGray-700 text-xl">
                  Experience
                </div>
                <div className="flex flex-wrap justify-start">
                  <div className="w-full  px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {profileDetails?.experience ? (
                        <div
                          className="text-left text-gray-700 text-sm font-light leading-relaxed tracking-wide"
                          dangerouslySetInnerHTML={{
                            __html: cleanHTMLExp,
                          }}
                        />
                      ) : (
                        '<--Experience Section Not Available-->'
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-left">
                <div className="text-center font-bold text-blueGray-700 text-xl">
                  Skills
                </div>
                <div className="flex flex-wrap justify-start">
                  <div className="w-full  px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {profileDetails?.skills ? (
                        <div
                          className="text-left text-gray-700 text-sm font-light leading-relaxed tracking-wide"
                          dangerouslySetInnerHTML={{
                            __html: cleanHTMLSkills,
                          }}
                        />
                      ) : (
                        '<--Skills Section Not Available-->'
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-left">
                <div className="text-center font-bold text-blueGray-700 text-xl">
                  Education
                </div>
                <div className="flex flex-wrap justify-start">
                  <div className="w-full  px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {profileDetails?.education ? (
                        <div
                          className="text-left text-gray-700 text-sm font-light leading-relaxed tracking-wide"
                          dangerouslySetInnerHTML={{
                            __html: cleanHTMLEdu,
                          }}
                        />
                      ) : (
                        '<--Education Section Not Available-->'
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-left">
                <div className="text-center font-bold text-blueGray-700 text-xl">
                  Volunteering
                </div>
                <div className="flex flex-wrap justify-start">
                  <div className="w-full  px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {profileDetails?.volunteering ? (
                        <div
                          className="text-left text-gray-700 text-sm font-light leading-relaxed tracking-wide"
                          dangerouslySetInnerHTML={{
                            __html: cleanHTMLVol,
                          }}
                        />
                      ) : (
                        '<--Volunteering Section Not Available-->'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
