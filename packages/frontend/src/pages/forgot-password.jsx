import { failure, success } from "../services";
import { resetPassword } from "../api";

export default function ForgotPassword() {
  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email");

    if (!email) {
      return failure("Заполните все поля");
    }

    if (await resetPassword(email)) {
      success("Запрос на сброс пароля отправлен. Проверьте почту");
    }
  };

  return (
    <div class="flex items-center justify-center h-full">
      <div class="bg-neutral-800 p-8 rounded-lg max-[350px]:w-full w-[350px]">
        <h1 class="text-3xl mb-4 text-center">Сброс пароля</h1>
        <form class="flex flex-col gap-4" onSubmit={submit}>
          <input
            type="email"
            name="email"
            placeholder="Почта"
            class="border border-neutral-700 rounded-lg p-2 bg-neutral-800 text-white"
          />
          <button class="bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg p-2">
            Сбросить пароль
          </button>
        </form>
      </div>
    </div>
  );
}
