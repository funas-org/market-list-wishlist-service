export const fetchProduct = async (route: string) => {
  const fetchResponse = await fetch(
    `${process.env.PRODUCT_SERVICE_BASE_URL}${route}`,
  );

  return await fetchResponse.json();
};
