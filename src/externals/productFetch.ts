import { AuthTokenInterceptor } from 'src/interceptors/auth-token.interceptor';
export const fetchProduct = async (route: string) => {
  const store = AuthTokenInterceptor.storage.getStore();
  const authToken = store?.token;

  if (!authToken) throw new Error('Token not found');

  const fetchResponse = await fetch(
    `${process.env.PRODUCT_SERVICE_BASE_URL}${route}`,
    {
      headers: {
        Authorization: authToken,
      },
    },
  );

  return await fetchResponse.json();
};
