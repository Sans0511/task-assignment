import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const getAuthToken = () => {
  return Cookies.get("accessToken") || "";
};

const getHeaders = async () => {
  const token = getAuthToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return headers;
};

export const postData = async (endpoint: string, payload: object) => {
  try {
    const response = await axios.post(`${baseUrl}${endpoint}`, payload, {
      headers: await getHeaders(),
    });

    return response.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || `Error: ${err.response.status}`
    );
  }
};

export const getTaskData = async (
  searchKeyword: string,
  page: number,
  limit: number
) => {
  try {
    const headers = await getHeaders();
    const response = await axios.get(`${baseUrl}/tasks`, {
      headers: headers,
      params: {
        page: page,
        limit: limit,
        keyword: searchKeyword,
      },
    });
    return response.data;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 403) {
        throw new Error("Invalid or expired access token. Please login again.");
      }
      throw new Error(
        err.response.data?.message || `Error: ${err.response.status}`
      );
    }
  }
};

export const updateTaskData = async (payload: object, id: string) => {
  try {
    const response = await axios.put(`${baseUrl}/tasks/${id}`, payload, {
      headers: await getHeaders(),
    });

    return response.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || `Error: ${err.response.status}`
    );
  }
};

export const deleteTaskData = async (id: string) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/tasks/${id} `,

      {
        headers: await getHeaders(),
      }
    );

    return response.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || `Error: ${err.response.status}`
    );
  }
};
