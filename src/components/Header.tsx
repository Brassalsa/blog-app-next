import Logo from "./Logo";
import Menu from "./Menu";
import Container from "./ui/container";
import { FloatingNav } from "./ui/floating-nav-bar";

function Header() {
  return (
    <>
      <FloatingNav className="z-50">
        <Container className="p-3 bg-background  shadow-md shadow-secondary-foreground/15 mb-10 z-50">
          <nav className="flex gap-2 items-center">
            <Logo />
            <Menu />
          </nav>
        </Container>
      </FloatingNav>
    </>
  );
}

export default Header;
