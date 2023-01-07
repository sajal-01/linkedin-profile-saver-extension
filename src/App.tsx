import React from 'react';
import { DOMMessage, DOMMessageResponse } from './types';

function App() {
  const [profileDetails, setProfileDetails] = React.useState({
    fullname: '',
    title: '',
    location: '',
    photo: '',
    about: '',
  });
  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          /**
           * Sends a single message to the content script(s) in the specified tab,
           * with an optional callback to run when a response is sent back.
           *
           * The runtime.onMessage event is fired in each content script running
           * in the specified tab for the current extension.
           */
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: 'GET_DOM' } as DOMMessage,
            (response: DOMMessageResponse) => {
              setProfileDetails({
                fullname: response.fullname,
                title: response.title,
                location: response.location,
                photo: response.photo,
                about: response.about,
              });
            }
          );
        }
      );
  });

  return (
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
      </section>
    </section>
  );
}

export default App;
