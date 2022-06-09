export async function getCurrentNumber() {
  const response = await fetch(
    'https://ql7z9m0bv2.execute-api.us-east-1.amazonaws.com/prod/number?id=atomicCounter'
  );
  const data = await response.json();

  console.log('Data from api-util: ', data);

  //   const cards = [];

  //   for (const key in data) {
  //     cards.push({
  //       id: key,
  //       ...data[key],
  //     });
  //   }
  //   return cards;
  return data;
}
