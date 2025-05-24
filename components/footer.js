import Container from "@/components/container";
import ThemeSwitch from "@/components/themeSwitch";
import Image from "next/image";
import { myLoader } from "@/utils/all";
import VercelLogo from "../public/img/vercel.svg";

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      <div className="mt-1 flex justify-center gap-1 text-center text-sm text-gray-500 dark:text-gray-600">
        <span>
          {" "}
          Made by{" "}
          {/*  // ** 🙏  Can I ask you a favor? 🙏 **
            // Please do not remove the below link.
           // It helps us to grow & continue our work. Thank you.
          // OR Purchase PRO version for commercial license.  */}
          <a
            href="https://web3templates.com/?ref=stablo-template"
            rel="noopener"
            target="_blank">
            Web3Templates
          </a>
        </span>
        <span>&middot;</span>
        <span>
          {" "}
          <a
            href="https://github.com/web3templates/stablo"
            rel="noopener"
            target="_blank">
            Github
          </a>
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="mt-5">
          <a
            href="https://vercel.com/?utm_source=web3templates&utm_campaign=oss"
            target="_blank"
            rel="noopener"
            className="relative block w-44">
            <Image
              src={VercelLogo}
              alt="Powered by Vercel"
              unoptimized={true}
              width="150"
              height="25"
            />
          </a>
        </div>
        <ThemeSwitch />
      </div>
      <Backlink />
    </Container>
  );
}

const Backlink = () => {
  return (
    <a
      href="https://web3templates.com/templates/stablo-minimal-blog-website-template"
      target="_blank"
      rel="noopener"
      >
      <svg 
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 7C13.1956 7 12.4089 6.68393 11.8197 6.12132C11.2304 5.55871 10.9167 4.79565 10.9167 4C10.9167 3.20435 11.2304 2.44129 11.8197 1.87868C12.4089 1.31607 13.1956 1 14 1C14.8044 1 15.5911 1.31607 16.1803 1.87868C16.7696 2.44129 17.0833 3.20435 17.0833 4C17.0833 4.79565 16.7696 5.55871 16.1803 6.12132C15.5911 6.68393 14.8044 7 14 7Z"
          fill="#362F78"
          stroke="#362F78"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 14 4"
            to="-20 14 4"
            dur="0.5s"
            repeatCount="indefinite"
            begin="0s"
            values="0 14 4; -20 14 4; 0 14 4"
            keyTimes="0; 0.5; 1"
          />
        </path>
      </svg>

    </a>
  );
};
