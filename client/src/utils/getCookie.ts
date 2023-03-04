const getCookie = (name: string) => {
  const cookiesArray = document.cookie.split("; ");

  const cookies: any = {};

  cookiesArray.forEach((cookie) => {
    const cookieSplit = cookie.split("=");
    cookies[cookieSplit[0]] = cookieSplit[1];
  });

  return cookies[name] ? cookies[name] : null;
};

export const deleteCookie = (name: string) => {
  const cookiesArray = document.cookie.split("; ");
  const updatedCookies = cookiesArray.map((cookie) =>
    !cookie.includes(name)
      ? cookie
      : `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  );

  document.cookie = updatedCookies.join("; ");
};

export default getCookie;
