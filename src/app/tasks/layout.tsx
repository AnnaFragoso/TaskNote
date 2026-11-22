"use client";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme"; 
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AppTRPCProvider } from "../../trpc/provider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({ children }: LayoutProps<"/tasks">) {
  return ( 
    <html lang="en" className={roboto.variable}>
       <body>
         <AppRouterCacheProvider>
           <AppTRPCProvider>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
           </AppTRPCProvider>
          
         </AppRouterCacheProvider>
      </body>
    </html>
  );
}
