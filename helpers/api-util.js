import { NUMBER_URL, POEM_URL } from '../config/index';

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

  return poem;
}
