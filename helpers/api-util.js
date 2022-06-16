export async function getCurrentNumber() {
  const response = await fetch(
    'https://ql7z9m0bv2.execute-api.us-east-1.amazonaws.com/prod/number?id=atomicCounter'
  );
  const data = await response.json();

  const number = Number(data.Items[0].counter_value.N);

  return number;
}

export async function getCurrentPoem() {
  const options = {
    method: 'POST',
    url: 'https://ha84dgc803.execute-api.us-east-1.amazonaws.com/prod/poems',
    headers: {},
  };

  const response = await fetch(
    'https://ha84dgc803.execute-api.us-east-1.amazonaws.com/prod/poems',
    options
  );

  const data = await response.json();

  const poem = data.choices[0].text;

  return poem;
}
