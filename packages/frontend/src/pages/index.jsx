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
    <div className="h-full flex flex-col items-center justify-center font-extralight">
      <h1 className="text-4xl text-center">Добро пожаловать на Project Name</h1>

      <h2 className="mt-4 text-2xl text-center">Скачать лаунчер:</h2>
      <div className="mt-4 flex flex-wrap gap-4 items-center justify-center text-center">
        {links.map(({ link, title, icon }) => (
          <a
            className="bg-neutral-800 hover:bg-neutral-700 rounded-md px-4 py-2"
            href={link}
            download
          >
            {icon}
            {title}
          </a>
        ))}
      </div>
    </div>
  );
}
