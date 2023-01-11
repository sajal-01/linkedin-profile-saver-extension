const messagesFromReactAppListener = (msg, sender, sendResponse) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  // console.log('[content.js]. Message received', msg);

  const response = {
    fullname:
      ((_a =
        document === null || document === void 0
          ? void 0
          : document.querySelector('.pv-top-card .text-heading-xlarge')) ===
        null || _a === void 0
        ? void 0
        : _a.textContent) || '',
    title:
      ((_b =
        document === null || document === void 0
          ? void 0
          : document.querySelector('.pv-top-card .text-body-medium ')) ===
        null || _b === void 0
        ? void 0
        : _b.textContent) || '',
    // location:
    //   document
    //     ?.querySelector(
    //       '.relative .pv-text-details__left-panel:nth-of-type(2) .text-body-small'
    //     )
    //     ?.textContent.trim() || '',
    location:
      ((_c =
        document === null || document === void 0
          ? void 0
          : document.querySelector(
              ' .relative .pv-text-details__left-panel:nth-of-type(2) .text-body-small'
            )) === null || _c === void 0
        ? void 0
        : _c.textContent.trim()) || '',

    about:
      ((_d =
        document === null || document === void 0
          ? void 0
          : document.querySelector('#about')) === null || _d === void 0
        ? void 0
        : _d.parentElement.querySelectorAll('span.visually-hidden ')[1]
            .innerHTML) || '',
    photo:
      ((_e =
        document === null || document === void 0
          ? void 0
          : document.querySelector(
              '.pv-top-card .pv-top-card-profile-picture__image'
            )) === null || _e === void 0
        ? void 0
        : _e.getAttribute('src')) || '',

    // photo:
    //   document
    //     ?.querySelector('.pv-top-card .pv-top-card-profile-picture__image')
    //     ?.getAttribute('src') || '',
    // about:
    //   document
    //     ?.querySelector('#about')
    //     ?.parentElement.querySelectorAll('span.visually-hidden ')[1]
    //     ?.textContent || '',

    // experience:
    //   document
    //     ?.querySelector('#experience')
    //     ?.parentElement.querySelector(' div.pvs-list__outer-container > ul')
    //     ?.innerHTML || '',

    experience:
      ((_f =
        document === null || document === void 0
          ? void 0
          : document.querySelector('#experience')) === null || _f === void 0
        ? void 0
        : _f.parentElement.querySelector(' div.pvs-list__outer-container > ul')
            .innerHTML) || '',

    volunteering:
      ((_g =
        document === null || document === void 0
          ? void 0
          : document.querySelector('#volunteering_experience')) === null ||
      _g === void 0
        ? void 0
        : _g.parentElement.querySelector(' div.pvs-list__outer-container > ul')
            .innerHTML) || '',

    education:
      ((_h =
        document === null || document === void 0
          ? void 0
          : document.querySelector('#education')) === null || _h === void 0
        ? void 0
        : _h.parentElement.querySelector(
            ' div.pvs-list__outer-container > ul > li > div'
          ).innerHTML) || '',
    skills:
      ((_i =
        document === null || document === void 0
          ? void 0
          : document.querySelector('#skills')) === null || _i === void 0
        ? void 0
        : _i.parentElement.querySelector(
            ' div.pvs-list__outer-container > ul > li:nth-child(1) > div'
          ).innerHTML) || '',

    // volunteering:
    //   document
    //     ?.querySelector('#volunteering_experience')
    //     ?.parentElement.querySelector('div.pvs-list__outer-container > ul')
    //     ?.innerHTML || '',
  };
  // console.log('[content.js]. Message response', response);
  sendResponse(response);
};
/**
 * Fired when a message is sent from either an extension process or a content script.
 */
window.chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
export default messagesFromReactAppListener;
