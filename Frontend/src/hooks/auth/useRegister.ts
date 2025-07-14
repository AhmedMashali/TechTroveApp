import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface RegisterPayload {
  username: string;
  password: string;
}

interface RegisterResponse {
  token: string;
  user: {
    _id: string;
    username: string;
  };
}

const registerUser = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const response = await axios.post("/auth/register", data);

  if (!response.data.success) {
    throw new Error(response.data.message || "Registration failed");
  }

  return response.data.data;
};

const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
  });
};

export default useRegister;
