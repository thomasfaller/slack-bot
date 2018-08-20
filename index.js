const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-420425693207-418758213744-wsGrH3g7qyLPI5oAHZYNbQ09',
  name: 'RandomQuoteBot'
});

const greetings = [
  'One quote a day, keeps the doctor away...',
  'You can quote me on this...',
  'Maybe not so random...',
  'And other Ipsum stuff...',
  'lorem etc today ?...'
]

const getRandomGreetings = () => {
  const index = Math.floor((Math.random() * greetings.length) + 1);
  return greetings[index];
}

bot.on('start', () => {
  const params = {
    icon_emoji: ':ying_yang:'
  };

  bot.postMessage(
    'general',
    'Hi, I\'m the new Bot in Town!',
    params
  )
  bot.postMessage(
    'general',
    getRandomGreetings(),
    params
  )
});

bot.on('message', message => {
  axios.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
    .then(response => {
      const quoteBody = response.data[0].content;
      const quoteAuthor = response.data[0].title;
      const params = {
        icon_emoji: ':ying_yang:'
      };

      bot.postMessage(
        'general',
        `Quote of the day: ${quoteBody}, ${quoteAuthor}`,
        params
      )
    })
})
