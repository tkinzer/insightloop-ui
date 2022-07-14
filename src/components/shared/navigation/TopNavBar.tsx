import Logo from '../Logo';
import TopOptionsMenu from '../options/TopOptionsMenu';

export default function TopNavBar() {
  return (
    <div className="top-nav-bar bg-black min-h-1 w-full">
      <Logo />
      <TopOptionsMenu />
    </div>
  );
}
