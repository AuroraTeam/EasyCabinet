import { useNavigate } from "@solidjs/router";
import { isAuthed, logout } from "../api";

export default function Main({ children }) {
  const navigate = useNavigate();

  const doLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <header className="flex items-center justify-between py-3">
        <a href="/">
          <img src="/logo.png" className="w-12" alt="Logo" />
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

      <main className="h-[calc(100vh-(56px+1.5rem))]">{children}</main>
    </>
  );
}
