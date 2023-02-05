/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: 'x4a_tn$p%n$m2b_n3n4q$z3q$o#s4r#l%b3d3w2w2w2b5h3g2um2y4s4v4n$j3h%l%p%f3m3m#w%p3l$j%n3w4s4r4h_m$w$w#a4g%',
    MY_OVERVIEW: "Hello everyone! I'm Adan Cui, a Senior Software Engineer with over 5 years of experience. I was born and raised in Miami and graduated from the University of Helsinki in 2018. If you want to know more about me or have any questions, please don't hesitate to ask.",
    DEFAULT_CHAT_PROMPT: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, specific, and very friendly.\n\n",
    DEFAULT_GRAMMAR_CORRECTION_PROMPT: 'Correct this to standard English:\n\n',
    DEFAULT_ENGLISH_TO_OTHERS: 'Translate this into ',
    DEFAULT_MOVIE_TO_EMOJI: 'Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \n',
    DEFAULT_JAVASCRIPT_HELPER: 'You: How do I combine arrays?\n JavaScript Chatbot: You can use the concat() method.\n You: ',
    DEFAULT_AIRPORT_CODE: 'Extract the airport codes from this text:\n\nText: \"I want to fly from Los Angeles to Miami.\"\nAirport codes: LAX, MIA\n\nText: \"I want to fly from Orlando to Boston\"\nAirport codes:',
    DEFAULT_SQL_REQUEST: 'Create a SQL request to ',
    DEFAULT_MOOD_TO_COLOR: 'The CSS code for a color like '
  }
}

module.exports = nextConfig
