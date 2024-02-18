const apiKey = import.meta.env.VITE_API_KEY;

export async function loginFun({ tel, password }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/users/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tel, password })
    });
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data
      };
    } else {
      return { success: false, message: "Login failed" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: error.toString() };
  }
}
