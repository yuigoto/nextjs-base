/**
 * pages/blog/page
 * ----------------------------------------------------------------------
 */

import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Interface de props da página.
 */
interface IPageProps {}

const Page = ({}: IPageProps) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/blog").then(() => {
      if (process.env.NODE_ENV === "development") {
        console.log("Redirect");
      }
    });
  }, []);

  return null;
};

export default Page;
