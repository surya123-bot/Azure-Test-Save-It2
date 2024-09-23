import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  text?: string;
}

export default function Navbar({ text }: NavbarProps) {
  if (text === undefined) text = "";

  return (
    <header className="flex items-center justify-between p-4 dark:bg-gray-800 max-h-16 sticky z-10">
      <Link href={"/"} className="flex items-center justify-center gap-4">
        <Image
          src="/home.svg"
          alt="Home"
          className="dark:invert"
          width={30}
          height={30}
          priority
        />
        <span className="text-xl text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-300 hover:font-bold">
          {text}
        </span>{" "}
      </Link>
      <nav className=" flex space-x-4 text-xl">
        <Link
          href={text.startsWith("Saved") ? "/posts/text" : "/saved"}
          className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-300 hover:font-bold"
        >
          {text.startsWith("Saved") ? "Browse Posts" : "Saved Posts"}
        </Link>

        <a href="https://github.com/harshpatel5940/save-it">
          <Image
            src="/github.svg"
            alt="Github"
            className="dark:invert"
            width={30}
            height={30}
            priority
          />
        </a>
      </nav>
    </header>
  );
}
