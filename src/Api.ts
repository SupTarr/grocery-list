const Api = async (url = "", options = {}, error = "") => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Did not receive expected data");
  } catch (err) {
    error = (err as Error).message;
  } finally {
    return error;
  }
};

export default Api;
