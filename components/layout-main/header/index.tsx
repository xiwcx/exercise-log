import Link from "next/link";
import { Auth } from "./auth";

export function Header() {
  return (
    <header>
      <Link href="/">
        <a>
          <h1>Log</h1>
        </a>
      </Link>

      <ul>
        <li>
          <Link href="/exercise">
            <a>Exercises</a>
          </Link>
        </li>
      </ul>

      <Auth />
    </header>
  );
}
