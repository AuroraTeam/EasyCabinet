import { FaBrandsWindows, FaBrandsLinux, FaBrandsApple } from "solid-icons/fa";

export default function Index() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center text-green-100">
        Добро пожаловать на Project Name
      </h1>

      <h2 className="mt-4 text-2xl text-center text-green-100">
        Скачать лаунчер:
      </h2>
      <div className="mt-4 flex flex-wrap gap-4 items-center justify-center text-center">
        <a
          className="bg-neutral-700 hover:shadow-xl hover:shadow-neutral-900 hover:bg-neutral-600 hover:text-green-100 rounded-md px-4 py-2"
          download
          href="#"
        >
          <FaBrandsWindows class="w-32 h-32 p-4" />
          Windows
        </a>
        <a
          className="bg-neutral-700 hover:shadow-xl hover:shadow-neutral-900 hover:bg-neutral-600 hover:text-green-100 rounded-md px-4 py-2"
          download
          href="#"
        >
          <FaBrandsLinux class="w-32 h-32 p-4" />
          Linux
        </a>
        <a
          className="bg-neutral-700 hover:shadow-xl hover:shadow-neutral-900 hover:bg-neutral-600 hover:text-green-100 rounded-md px-4 py-2"
          download
          href="#"
        >
          <FaBrandsApple class="w-32 h-32 p-4" />
          Macos
        </a>
      </div>
    </div>
  );
}
