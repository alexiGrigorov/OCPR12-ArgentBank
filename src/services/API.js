const login = async ({ email, password }) => {
  const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();
  return data.body.token;
};

const getProfile = async (token) => {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(errorData.message || "Failed to fetch profile");
  }

  const data = await response.json();
  return data.body;
};

const updateProfile = async (token, profileData) => {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error(errorData.message || "Failed to update profile");
  }

  const data = await response.json();
  return data;
};

export default { login, getProfile, updateProfile };
