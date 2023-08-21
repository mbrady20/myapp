import { type AppType } from "next/app";
import { api } from "npm/utils/api";
import "npm/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <ClerkProvider><Component {...pageProps} /></ClerkProvider>;
};

export default api.withTRPC(MyApp);
