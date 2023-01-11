import React from 'react';

const index = ({ profileDetails, cleanHTMLSkills }) => {
  return (
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
  );
};

export default index;
