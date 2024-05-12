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

    if (!isValidLogin(login)) {
      return failure("Логин содержит запрещенные символы");
    }

    if (login.length > 10) {
      return failure("Логин не должен превышать 10 символов");
    }

    if (await register(login, password)) {
      success("Регистрация прошла успешно");
      navigate("/login");
    }

    if (!isok(login)){
      return 
    }

  };

  function isValidLogin(login) {
    const forbiddenCharacters = /[/:|() %$&!@#*?"'{}<>.]/;
    const cyrillicLetters = /[а-яА-Я]/;
  
    return !forbiddenCharacters.test(login) && !cyrillicLetters.test(login);
  }
  

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-neutral-800 p-8 rounded">
        <h1 className="text-3xl mb-4 text-center cursor-default">Регистрация</h1>
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
          <i class='text-3xl bx bx-envelope absolute left-2 top-1/2 transform -translate-y-1/2' ></i>
            <input 
              type="text" 
              name="email" 
              placeholder="Почта" 
              className="border border-neutral-700 rounded p-2 pl-10 bg-neutral-800 text-white "
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

          <div className="relative">    
          <i class='text-3xl bx bx-lock-alt absolute left-2 top-1/2 transform -translate-y-1/2'></i> 
            <input
             type="password"
             name="password2"
             placeholder="Повторите пароль"
             className="border border-neutral-700 rounded p-2 pl-10 bg-neutral-800 text-white"
            />
          </div>

          <button className="bg-neutral-700 text-white rounded p-2 hover:bg-neutral-600">
            Зарегистрироваться
          </button>

        </form>
      </div>
    </div>
  );
}
