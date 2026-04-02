import axios from "axios";
export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "API Error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};