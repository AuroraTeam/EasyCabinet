import { useNavigate } from "@solidjs/router";
import { failure } from "../services";
import { login } from "../api";

export default function Login() {
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const _login = formData.get("login");
    const password = formData.get("password");

    if (!_login || !password) {
      return failure("Заполните все поля");
    }

    if (await login(_login, password)) {
      navigate("/profile");
    }
  };

  return (
    <div class="flex items-center justify-center h-full">
      <div class="bg-neutral-800 p-8 rounded-lg max-[350px]:w-full w-[350px]">
        <h1 class="text-3xl mb-4 text-center">Вход</h1>
        <form class="flex flex-col gap-4" onSubmit={submit}>
          <input
            type="text"
            name="login"
            placeholder="Логин"
            class="border border-neutral-700 rounded-lg p-2 bg-neutral-800 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            class="border border-neutral-700 rounded-lg p-2 bg-neutral-800 text-white"
          />
          <button class="bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg p-2">
            Войти
          </button>
        </form>
        <div class="flex flex-col gap-2 mt-4 text-center text-sm">
          <span>
            Нет аккаунта?
            <a
              href="/register"
              class="text-blue-500 ml-1 hover:text-blue-600"
            >
              Зарегистрироваться
            </a>
          </span>
          <span>
            <a
              href="/forgot-password"
              class="text-blue-500 ml-1 hover:text-blue-600"
            >
              Забыли пароль?
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
