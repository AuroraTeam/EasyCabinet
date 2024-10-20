import { useNavigate } from "@solidjs/router";
import { isAuthed, logout } from "../api";

export function Header() {
  const navigate = useNavigate();

  const doLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between py-3">
      <a href="/" className="flex items-center gap-4">
        <img src="/logo.png" className="w-10" alt="Logo" />
        <span className="hidden sm:inline text-xl font-extralight">
          Easy Cabinet
        </span>
      </a>
      {isAuthed() ? (
        <nav className="flex items-center gap-4 p-4">
          <a href="/profile">Профиль</a>
          <a href="#" onClick={doLogout}>
            Выход
          </a>
        </nav>
      ) : (
        <nav className="flex items-center gap-4 p-4">
          <a href="/login">Вход</a>
          <a href="/register">Регистрация</a>
        </nav>
      )}
    </header>
  );
}
