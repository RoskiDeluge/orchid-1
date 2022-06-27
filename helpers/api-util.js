import { NUMBER_URL, POEM_URL } from '../config/index';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getCurrentNumber() {
  const response = await fetch(`${NUMBER_URL}/prod/number?id=atomicCounter`);
  const data = await response.json();

  const number = Number(data.Items[0].counter_value.N);

  return number;
}

export async function getCurrentPoem() {
  const options = {
    method: 'POST',
    url: `${POEM_URL}/prod/poems`,
    headers: {},
  };

  const response = await fetch(`${POEM_URL}/prod/poems`, options);

  const data = await response.json();

  const poem = data.choices[0].text;

  const filterResponse = await openai.createCompletion({
    model: 'content-filter-alpha',
    prompt: '< endoftext|>' + poem + '\n--\nLabel:',
    temperature: 0,
    max_tokens: 1,
    top_p: 1,
    logprobs: 10,
  });

  const filterLabel = filterResponse.data.choices[0].text;
  const unsafe =
    'Potentially unsafe result generated. Will try again in 24hrs.';

  if (filterLabel == '0' || filterLabel == '1') {
    // res.status(200).json({
    //   text: '${content_to_classify}',
    // });
    return poem;
  } else {
    // res.status(200).json({ text: 'Try again, after modifying the prompt.' });
    return unsafe;
  }

  // return poem;
}
