const getToken = localStorage.getItem("token");

export const config = {
  headers: {
    authorization: `Bearer ${getToken ? getToken : null}`,
    Accept: "application/json",
  },
};
