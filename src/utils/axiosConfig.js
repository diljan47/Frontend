const getToken = localStorage.getItem("token");
console.log("from config", getToken);
export const config = {
  headers: {
    authorization: `Bearer ${getToken ? getToken : null}`,
    Accept: "application/json",
  },
};
