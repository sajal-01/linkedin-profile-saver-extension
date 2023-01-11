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
    volunteering: '',
  });
  const [url, setUrl] = useState('');
  const [htmlExp, setHtmlExp] = useState(null);
  const [htmlVol, setHtmlVol] = useState(null);

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
              });
              setHtmlExp(
                response === null || response === undefined
                  ? 'Not Available'
                  : response?.experience
              );
              setHtmlVol(
                response === null || response === undefined
                  ? 'Not Available'
                  : response?.volunteering
              );
            }
          );
        }
      );
  }, [url]);

  let cleanHTMLExp = sanitizeHtml(htmlExp, {
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

  let cleanHTMLVol = sanitizeHtml(htmlVol, {
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

  useEffect(() => {
    if (profileDetails) {
      setProfileDetails({
        ...profileDetails,
        experience: htmlExp === null ? 'Not Available' : cleanHTMLExp,
        volunteering: htmlVol === null ? 'Not Available' : cleanHTMLVol,
      });
    }
    // console.log(profileDetails);
  }, [htmlExp, htmlVol]);

  return (
    <>
      <section className="pt-5 bg-gray-100 ">
        <div className=" bg-opacity-20 backdrop-blur-lg  drop-shadow-lg w-96 rounded-xl ">
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
                  alt={profileDetails?.fullname}
                  src={profileDetails?.photo || defaultImg}
                  className="shadow-xl rounded-full h-auto align-middle border-none  max-w-150-px"
                />
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                  {profileDetails?.fullname || 'Name Not Available'}
                </h3>
                {/* JOB TITLE | LOCATION*/}
                <div className="mb-2 font-medium text-md text-blueGray-600 flex items-center justify-start ">
                  <span className="mr-2">
                    🏢
                    {profileDetails?.title || 'Title Not Available'} 📍{' '}
                    {profileDetails?.location || 'Location Not Available'}{' '}
                  </span>
                </div>

                <div className="mb-2 text-gray-600 text-left rounded-xl shadow-sm  shadow-black flex flex-row justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                  <span className="p-2 ">
                    {profileDetails?.about || 'About Section Not Available'}
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
                      {htmlExp ? (
                        <div
                          className="text-left text-gray-700 text-sm font-light leading-relaxed tracking-wide"
                          dangerouslySetInnerHTML={{ __html: cleanHTMLExp }}
                        />
                      ) : (
                        'Experience Section Not Available'
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
                      {htmlVol ? (
                        <div
                          className="text-left text-gray-700 text-sm font-light leading-relaxed tracking-wide"
                          dangerouslySetInnerHTML={{ __html: cleanHTMLVol }}
                        />
                      ) : (
                        'Volunteering Section Not Available'
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
