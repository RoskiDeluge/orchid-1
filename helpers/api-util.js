export async function getCurrentNumber() {
  const response = await fetch(
    'https://ql7z9m0bv2.execute-api.us-east-1.amazonaws.com/prod/number?id=atomicCounter'
  );
  const data = await response.json();

  const number = Number(data.Items[0].counter_value.N);

  return number;
}
