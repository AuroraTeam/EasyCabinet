import { Header } from "../components/Header";

export default function Main(props) {
  return (
    <>
      <Header />
      <main class="grid min-h-[calc(100vh-(56px+1.5rem))]">{props.children}</main>
    </>
  );
}
