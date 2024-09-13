import axios, { AxiosResponse } from "axios";
interface LoginResponse {
  _id: string;
  first_name: string;
  account_type: string;
  account_number: string;
  user_role: string;
  account_balance: number;
  token: string;
}

interface RegisterResponse {
  message: string;
}

interface SearchUser {
  _id: string;
  first_name: string;
  last_name: string;
  account_number: string;
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
//curl -v -X POST http://localhost:8080/api/login -H "Content-Type: application/json" -d '{"email": "nave@gmail.com", "password": "123456789"}'

export const register = async (
  first_name: string,
  lastname: string,
  email: string,
  address: string,
  phone: string,
  date_of_birth: string | Date,
  password: string,
  type: string
): Promise<AxiosResponse<RegisterResponse>> => {
  try {
    const response = await axios.post<RegisterResponse>(`${API_URL}/register`, {
      first_name,
      lastname,
      email,
      address,
      phone,
      date_of_birth,
      password,
      type,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      // Maneja el error 409 (Usuario ya existe)
      return error.response; // Devuelve la respuesta con el status 409
    } else {
      console.error("Unexpected error:", error);
      throw error; // Re-lanza otros errores
    }
  }
};

/* ----------------------------- TRANFERENCIAS ------------------------- */

const API_TRANSFER = "http://localhost:8080/transfer";

export const searchUser = async (
  account_number: string
): Promise<AxiosResponse<SearchUser>> => {
  try {
    console.log(account_number);
    console.log("hola estoy en el try de searchUser");

    const response = await axios.post<SearchUser>(`${API_TRANSFER}/search`, {
      searchQuery: account_number,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      // Maneja el error 409 (Usuario no existe)
      return error.response; // Devuelve la respuesta con el status 409
    } else {
      console.error("Unexpected error:", error);
      throw error; // Re-lanza otros errores
    }
  }
};

//curl -v -X POST http://localhost:8080/transfer/search -H "Content-Type: application/json" -d '{"account_number": "VG7275757443655928672589"}'
