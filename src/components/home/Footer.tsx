import { IconBrandX } from "@tabler/icons-react";
import { Github, Heart, Linkedin } from "lucide-react";
import { Caveat } from "next/font/google";


const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Footer = () => {
  return (
    <footer id="contact" className="w-full p-5 sm:px-24 mt-12 my-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1751140356/PR_Ninja_1_vmyh2o.png"
          width={50}
          height={50}
          alt="Logo"
        />
        <h1 className={`${caveat.className} text-3xl sm:text-5xl font-bold`}>PR Ninja</h1>
      </div>
      <div className="flex flex-col items-end custom:w-full">
        <div className="flex space-x-4">
          <a
            href="https://github.com/imSyntn/Link-Leaf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Github"
          >
            <Github size={30} className="text-gray-500 hover:text-white transition-all duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/imsyntn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Linkedin"
          >
            <Linkedin size={30} className="text-gray-500 hover:text-white text-[35px] transition-all duration-300" />
          </a>
          <a
            href="https://twitter.com/imSyntn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Twitter"
          >
            <IconBrandX size={30} stroke={2} className="text-gray-500 hover:text-white text-[35px] transition-all duration-300" />
          </a>
          <a
            href="https://github.com/sponsors/imSyntn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Be a sponsor."
          >
            <Heart size={30} className="text-gray-500 hover:text-red-400 text-[35px] transition-all duration-300" />
          </a>
        </div>
        <p className="text-gray-100 text-right text-lg mt-2">
          Website by{" "}
          <a
            href="https://twitter.com/imSyntn"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-clip-text text-transparent bg-gradient-to-t from-[#b3ffab] to-[#12fff7]"
          >
            {" "}
            @imSyntn{" "}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;