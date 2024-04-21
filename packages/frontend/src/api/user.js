import { createEffect, createSignal } from "solid-js";
import { axios, failure, success } from "../services";
import { isAuthed, isLoaded } from "./auth";

const [profile, setProfile] = createSignal();
export { profile };

function getProfile() {
  axios
    .get("users")
    .then(({ data }) => setProfile(data))
    .catch(() => {});
}

createEffect(() => isLoaded() && isAuthed() && getProfile());

export async function editProfile(formData) {
  try {
    await axios.put("users", formData);
    success("Профиль успешно обновлен");
  } catch (error) {
    if (error.response?.data.message) {
      failure(error.response.data.message);
    } else {
      failure("Неизвестная ошибка");
    }
  }
}
