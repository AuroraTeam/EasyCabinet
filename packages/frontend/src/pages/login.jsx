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
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-neutral-800 p-8 rounded">
        <h1 className="text-3xl mb-4 text-center">Вход</h1>
        <form className="flex flex-col gap-4" onSubmit={submit}>
        <div class="relative">
          <i class='text-3xl bx bx-user absolute left-2 top-1/2 transform -translate-y-1/2'></i>
            <input
              type="text"
              name="login"
              placeholder="Логин"
              className="border border-neutral-700 rounded p-2 pl-10 bg-neutral-800 text-white"
            />
          </div>
          
          <div className="relative">
           <i class='text-3xl bx bx-lock-alt absolute left-2 top-1/2 transform -translate-y-1/2'></i>
            <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="border border-neutral-700 rounded p-2 pl-10 bg-neutral-800 text-white"
           />
         </div>
         
          <button className="bg-neutral-700 text-white rounded p-2 hover:bg-neutral-600">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
