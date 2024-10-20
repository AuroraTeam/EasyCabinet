import { Header } from "../components/Header";

export default function Main({ children }) {
  return (
    <>
      <Header />
      <main className="h-[calc(100vh-(56px+1.5rem))]">{children}</main>
    </>
  );
}
