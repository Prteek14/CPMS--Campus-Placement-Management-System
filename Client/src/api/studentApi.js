export const updateProfile = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // 🔥 get token

    const res = await fetch("https://cpms-campus-placement-management-system.onrender.com/api/auth/update-profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // 🔐 send token
      },
      body: formData,
    });

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
