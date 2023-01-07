export type DOMMessage = {
  type: 'GET_DOM';
};

export type DOMMessageResponse = {
  fullname: string;
  title: string;
  location: string;
  photo: string;
  about: string;
};
