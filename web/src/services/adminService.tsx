import axios from "axios";

interface UpdateDataUser {
  message: string;
}
const API_URL = "http://localhost:8080/admin";

export const updateDataUser = async (
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  account_balance: number,
  isActive: boolean
): Promise<UpdateDataUser> => {
  try {
    const response = await axios.patch<UpdateDataUser>(
      `${API_URL}/updateuser`,
      {
        _id,
        first_name,
        last_name,
        email,
        phone,
        account_balance,
        isActive,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
