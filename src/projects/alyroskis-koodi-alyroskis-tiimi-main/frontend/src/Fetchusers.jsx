import axios from "axios";

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data =
      Array.isArray(response.data)
        ? response.data
        : response.data.users || response.data.data || [];

    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format");
    }

    const transformedUsers = data.map((user) => ({
      id: user.userID,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      userType: user.user_type,
    }));

    return transformedUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};
