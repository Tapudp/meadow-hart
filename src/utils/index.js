import constants from '../constants';

const getRandomResponse = () => constants.responses[Math.floor(Math.random() * 4)];

const moveScroller = (elementId) => {
  const actorElement = document.getElementById(elementId);
  if (!actorElement) {
    return;
  }

  // actorElement.scroll({
  //   behavior: 'smooth',
  //   top: actorElement.scrollHeight, // Scroll to the bottom
  // });
  const lastChatMessage = actorElement.lastElementChild;
  if (lastChatMessage) {
    lastChatMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
};

const utils = {
  getRandomResponse,
  moveScroller,
};

export default utils;
