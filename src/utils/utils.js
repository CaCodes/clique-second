export const getErrorData = (err) => {
  let errData =
    err.code === "ERR_NETWORK"
      ? {
          error: true,
          data: { message: err.message },
          status: null,
        }
      : {
          error: true,
          data: err?.response?.data,
          status: err?.response?.status,
        };
  return errData;
};

export const errorHandler = (err) => {
  if (!err) return;
  let errMsg;
  if (err.message) errMsg = err.message;
  else if (err.error === "TypeError: Failed to fetch")
    errMsg = "Check your network and try again";
  else if (err.error) errMsg = err.error;
  else if (err.data?.error && typeof err.data.error === "string")
    errMsg = err.data?.error;
  else errMsg = "An error occured";

  return errMsg;
};

export const getFirstWord = (str) => {
  let arr = str.split(" ")
  return arr[0]
}

// COOKIES

export const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
 
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
 };

 export const getCookie = (name) => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
 
  return cookies ? cookies.split("=")[1] : null;
 };

 export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
 };

 export const shortenSentence = (str, val) => {
  val = val ? val : 30;
  let temp = str.slice(0, val);
  return temp.length < val ? temp : temp + "...";
};
