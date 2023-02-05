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
    const response = await openAi.createImage({
        prompt: req.body,
        n: 1,
        size: '1024x1024'
    });

    res.status(200).json(response.data.data[0].url)
}
