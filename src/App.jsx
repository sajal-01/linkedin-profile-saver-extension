import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
function App() {
  const [profileDetails, setProfileDetails] = useState({
    fullname: '',
    title: '',
    location: '',
    photo: '',
    about: '',
  });
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');

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
              setHtml(
                response === null || response === undefined
                  ? 'Not Available'
                  : response?.experience
              );
            }
          );
        }
      );
  }, [url]);

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === 'remove') {
        return <></>;
      }
    },
  };
  let htmlDoc = `${html}`;

  return (
    <>
      {profileDetails ? (
        <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
          <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">
                {profileDetails?.fullname}'s profile
              </span>
              <span className="text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </span>
            </div>
            <div className="mt-6 w-fit mx-auto">
              <img
                src={profileDetails?.photo}
                className="rounded-full w-28 "
                alt="profilepicture"
              />
            </div>

            <div className="mt-8 ">
              <h2 className="text-white font-bold text-2xl tracking-wide">
                {profileDetails?.fullname}
              </h2>
            </div>
            <p className="text-blue-200 font-semibold mt-2.5">
              {profileDetails?.title}
            </p>
            <p className="text-emerald-400 font-semibold mt-2.5">
              {profileDetails?.location}
            </p>

            <div className="h-1 w-full bg-black mt-8 rounded-full">
              <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
            </div>
            <div className="mt-3 text-white text-sm">
              <span className="text-gray-400 font-semibold">
                {profileDetails?.about}
              </span>
            </div>
            <div className="mt-3 text-white text-sm">
              Experience Section
              <span className="text-gray-400 font-semibold">
                {ReactHtmlParser(htmlDoc, options)}
              </span>
            </div>
          </section>
        </section>
      ) : (
        <div className="flex items-center justify-center h-screen text-xl font-bold">
          Loading...
        </div>
      )}
    </>
  );
}

export default App;
