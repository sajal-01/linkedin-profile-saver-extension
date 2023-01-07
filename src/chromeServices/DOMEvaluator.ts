import { DOMMessage, DOMMessageResponse } from '../types';

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log('[content.js]. Message received', msg);

  const response: DOMMessageResponse = {
    fullname:
      document?.querySelector('.pv-top-card .text-heading-xlarge')
        ?.textContent || '',
    title:
      document?.querySelector('.pv-top-card .text-body-medium ')?.textContent ||
      '',
    location:
      document?.querySelector('.pv-top-card .text-body-small')?.textContent ||
      '',
    photo:
      document!
        .querySelector('.pv-top-card .pv-top-card-profile-picture__image')!
        .getAttribute('src') || '',
    about:
      document!
        .querySelector('#about')!
        .parentElement!.querySelectorAll('span.visually-hidden ')[1]
        .textContent || '',
  };

  console.log('[content.js]. Message response', response);

  sendResponse(response);
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
