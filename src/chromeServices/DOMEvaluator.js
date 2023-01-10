const messagesFromReactAppListener = (msg, sender, sendResponse) => {
  var _a, _b, _c;
  console.log('[content.js]. Message received', msg);
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
    location:
      ((_c =
        document === null || document === void 0
          ? void 0
          : document.querySelector('.pv-top-card .text-body-small')) === null ||
      _c === void 0
        ? void 0
        : _c.textContent) || '',
    photo:
      document
        .querySelector('.pv-top-card .pv-top-card-profile-picture__image')
        .getAttribute('src') || '',
    about:
      document
        .querySelector('#about')
        .parentElement.querySelectorAll('span.visually-hidden ')[1]
        .textContent || '',
  };
  console.log('[content.js]. Message response', response);
  sendResponse(response);
};
/**
 * Fired when a message is sent from either an extension process or a content script.
 */
window.chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
export {};
