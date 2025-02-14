import { createEffect, createSignal } from "solid-js";
import { axios, failure, setBearerToken } from "../services";
import { useNavigate } from "@solidjs/router";

const [isLoaded, setIsLoaded] = createSignal(false);
const [isAuthed, setIsAuthed] = createSignal(false);

export { isAuthed, isLoaded };

export async function register(email, login, password) {
  try {
    await axios.post("auth/register", {
      email,
      login,
      password,
    });
  } catch (error) {
    if (error.response?.data.message) {
      failure(error.response.data.message);
    } else {
      failure("Неизвестная ошибка");
    }
    return false;
  }
  return true;
}

export async function resetPassword(email) {
  try {
    await axios.post("auth/reset-password", { email });
  } catch (error) {
    if (error.response?.data.message) {
      failure(error.response.data.message);
    } else {
      failure("Неизвестная ошибка");
    }
    return false;
  }
  return true;
}

export async function changePassword(resetToken, password) {
  try {
    await axios.post("auth/change-password", { resetToken, password });
  } catch (error) {
    if (error.response?.data.message) {
      failure(error.response.data.message);
    } else {
      failure("Неизвестная ошибка");
    }
    return false;
  }
  return true;
}

export async function login(login, password) {
  try {
    const { data } = await axios.post(
      "auth/login",
      { login, password },
      { withCredentials: true },
    );
    setBearerToken(data.accessToken);
    setIsAuthed(true);
  } catch (error) {
    if (error.response?.data.message) {
      failure(error.response.data.message);
    } else {
      failure("Неизвестная ошибка");
    }
    return false;
  }
  return true;
}

export async function refresh() {
  try {
    const { data } = await axios.post("auth/refresh", null, {
      withCredentials: true,
    });
    setBearerToken(data.accessToken);
    setIsAuthed(true);
  } catch {
    // do nothing
  }
  setIsLoaded(true);
}

export async function logout() {
  try {
    await axios.post("auth/logout", null, { withCredentials: true });
  } catch {
    // do nothing
  }
  setIsAuthed(false);
  setBearerToken(null);
}

export function authMiddleware() {
  const navigate = useNavigate();

  createEffect(() => {
    if (!isLoaded()) {
      return;
    }

    if (!isAuthed()) {
      navigate("/login", { replace: true });
    }
  });
}
