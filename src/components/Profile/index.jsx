import React from 'react';
import defaultImg from '../../assets/defaultProfile.jpg';

const index = ({ profileDetails, cleanHTMLAbout }) => {
  return (
    <>
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
            {profileDetails?.title || '<--Title Not Available-->'} 📍{' '}
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
    </>
  );
};

export default index;
