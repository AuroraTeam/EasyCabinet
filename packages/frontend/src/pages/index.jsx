import { For } from "solid-js";
import { FaBrandsWindows, FaBrandsLinux, FaBrandsApple } from "solid-icons/fa";

export default function Index() {
  const links = [
    {
      title: "Windows",
      icon: <FaBrandsWindows class="w-24 h-24 p-4" />,
      link: "#",
    },
    {
      title: "Linux",
      icon: <FaBrandsLinux class="w-24 h-24 p-4" />,
      link: "#",
    },
    {
      title: "MacOS",
      icon: <FaBrandsApple class="w-24 h-24 p-4" />,
      link: "#",
    },
  ];

  return (
    <div class="h-full flex flex-col items-center justify-center font-extralight">
      <h1 class="text-4xl text-center">Добро пожаловать на Project Name</h1>

      <h2 class="mt-4 text-2xl text-center">Скачать лаунчер:</h2>
      <div class="mt-4 flex flex-wrap gap-4 items-center justify-center text-center">
        <For each={links}>{({ link, title, icon }) => (
          <a
            
            class="bg-neutral-800 hover:bg-neutral-700 rounded-md px-4 py-2"
            href={link}
            download
          >
            {icon}
            {title}
          </a>
        )}</For>
      </div>
    </div>
  );
}
