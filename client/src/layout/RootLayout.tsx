import {  Outlet, ScrollRestoration } from "react-router";
import SiteHeader from "@/components/SiteHeader";

export default function RootLayout() {
  return (
    <section className="bg-background min-h-svh flex flex-col">
      <SiteHeader />
      <main className=" my-4 px-4 ">
        <Outlet />
      </main>
      <ScrollRestoration />
    </section>
  )
}


