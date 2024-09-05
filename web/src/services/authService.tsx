import axios from "axios";
interface LoginResponse {
  _id: string;
  first_name: string;
  account_type: string;
  account_number: string;
  user_role: string;
  account_balance: number;
  token: string;
}

const API_URL = "http://localhost:8080/api"; //endpoint?

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//curl -v -X POST http://localhost:8080/api/login -H "Content-Type: application/json" -d '{"email": "kurt@gmail.com", "password": "12345678"}'
