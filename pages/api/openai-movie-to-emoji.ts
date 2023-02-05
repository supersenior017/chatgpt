// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";
import { decode } from 'string-encode-decode'

const configuration = new Configuration({
    apiKey: decode(process.env.OPENAI_API_KEY),
    organization: 'yeshealer'
});
const openAi = new OpenAIApi(configuration);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: req.body,
        temperature: 0.8,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
    });

    res.status(200).json(response.data.choices[0].text)
}
