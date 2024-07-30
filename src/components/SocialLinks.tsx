import { MediaLinks } from "@/lib/constants";
import Link from "next/link";
import { GitHubSVG, TwitterSVG } from "./ui/svg";

const SocialLinks = ({ withImage = true, withText = false }) => {
  return (
    <>
      <Link target="_blank" href={MediaLinks.github} className="flex gap-1">
        {withImage && <GitHubSVG />}
        {withText && <p>Github</p>}
      </Link>
      <Link
        target="_blank"
        href={MediaLinks.twitter}
        className="flex gap-1 cursor-pointer"
      >
        {withImage && <TwitterSVG />}
        {withText && <p>Twitter</p>}
      </Link>
    </>
  );
};

export default SocialLinks;
