import constants from '../constants';
import utils from '../utils';

async function getResponse(query) {
  try {
    return new Promise((resolve, reject) => {
      // Simulate a response after a short delay
      setTimeout(() => {
        const randomResponse = utils.getRandomResponse();
        const botResponse = { text: randomResponse, isUser: false };

        resolve(botResponse);
      }, Math.random() * constants.SIMULATED_RESPONSE_DELAY);
    });
  } catch (error) {
    // Handle errors here
    console.error('An error occurred:', error);
    throw error;
  }
}

const ChatService = {
  getResponse,
};

export default ChatService;
