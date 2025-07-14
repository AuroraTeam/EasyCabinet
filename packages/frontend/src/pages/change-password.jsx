import { failure, success } from "../services";
import { changePassword } from "../api";
import { useNavigate } from "@solidjs/router";

export default function ChangePassword() {
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    const resetToken = searchParams.get("resetToken");

    if (!resetToken) {
      return failure("Отсутствует токен сброса пароля");
    }

    const formData = new FormData(event.target);

    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (!password || !password2) {
      return failure("Заполните все поля");
    }

    if (password !== password2) {
      return failure("Пароли не совпадают");
    }

    if (await changePassword(resetToken, password)) {
      success("Пароль успешно изменен");
      navigate("/login");
    }
  };

  return (
    <div class="flex items-center justify-center h-full">
      <div class="bg-neutral-800 p-8 rounded-lg max-[350px]:w-full w-[350px]">
        <h1 class="text-3xl mb-4 text-center">Смена пароля</h1>
        <form class="flex flex-col gap-4" onSubmit={submit}>
          <input
            type="password"
            name="password"
            placeholder="Введите новый пароль"
            class="border border-neutral-700 rounded-lg p-2 bg-neutral-800 text-white"
          />
          <input
            type="password"
            name="password2"
            placeholder="Повторите пароль"
            class="border border-neutral-700 rounded-lg p-2 bg-neutral-800 text-white"
          />
          <button class="bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg p-2">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
