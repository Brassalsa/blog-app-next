import Logo from "./Logo";
import Menu from "./Menu";
import Container from "./ui/container";

function Header() {
  return (
    <Container className="p-3 sticky top-0 z-10 bg-inherit shadow-md shadow-secondary-foreground/15 mb-10">
      <nav className="flex gap-2 items-center">
        <Logo />
        <Menu />
      </nav>
    </Container>
  );
}

export default Header;
