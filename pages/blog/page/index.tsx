import { useRouter } from "next/router";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/blog").then(() => {
      if (process.env.NODE_ENV === "development") {
        console.log("Redirect");
      }
    });
  }, [ router ]);

  return null;
};

export default Page;
