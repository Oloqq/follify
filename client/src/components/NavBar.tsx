import { Link } from "wouter";

function NavBar() {
  return (
    <header className="flex justify-between p-8">
      <Link href="/">
        <div className="cursor-pointer">
          <div className="w-12 h-12 bg-green-500" />
        </div>
      </Link>
      <nav className="flex items-center gap-8">
        <a>Login</a>
        <div className="h-8 w-0.5 bg-stone-100" />
        <Link href="/about-us">
          <a>About us</a>
        </Link>
      </nav>
    </header>
  );
}

export default NavBar;
