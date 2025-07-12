import { useNavigate } from "@solidjs/router";
import { failure, success } from "../services";
import { register } from "../api";

export default function Register() {
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const login = formData.get("login");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (!login || !email || !password || !password2) {
      return failure("Заполните все поля");
    }

    if (password !== password2) {
      return failure("Пароли не совпадают");
    }

    if (await register(email, login, password)) {
      success("Регистрация прошла успешно");
      navigate("/login");
    }
  };

  return (
    <div class="flex items-center justify-center h-full">
      <div class="bg-neutral-800 p-8 rounded-lg max-[350px]:w-full w-[350px]">
        <h1 class="text-3xl mb-4 text-center">Регистрация</h1>
        <form class="flex flex-col gap-4" onSubmit={submit}>
          <input
            type="text"
            name="login"
            placeholder="Логин"
            class="border border-neutral-700 rounded-lg p-2 bg-neutral-800 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Почта"
            class="border border-neutral-700 rounded-lg p-2 bg-neutral-800 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            class="border border-neutral-700 rounded-lg p-2 bg-neutral-800 text-white"
          />
          <input
            type="password"
            name="password2"
            placeholder="Повторите пароль"
            class="border border-neutral-700 rounded-lg p-2 bg-neutral-800 text-white"
          />
          <button class="bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg p-2">
            Зарегистрироваться
          </button>
        </form>
        <div class="mt-4 text-center text-sm">
          Уже есть аккаунт?
          <a href="/login" class="text-blue-500 ml-1 hover:text-blue-600">
            Войти
          </a>
        </div>
      </div>
    </div>
  );
}
