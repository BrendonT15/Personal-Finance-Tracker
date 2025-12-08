import { FlipWord } from "../../../animations/FlipWord";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between text-white">
      <h1 className="text-4xl font-medium cursor-pointer">BAT </h1>

      <div className="flex items-center gap-5 font-thin">
        <FlipWord flipValue={20}>Features</FlipWord>
        <FlipWord flipValue={20}>For Couples</FlipWord>
        <FlipWord flipValue={20}>For Professionals</FlipWord>
        <FlipWord flipValue={20}>Pricing</FlipWord>
        <FlipWord flipValue={20}>Download</FlipWord>
      </div>

      <div className="flex items-center gap-2 font-light">
        <div className="rounded-2xl border px-3 py-1">
          <Link to="/signin">Sign In</Link>
        </div>
        <div className="rounded-2xl border px-3 py-1">
          <Link to="/create-account"> Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
