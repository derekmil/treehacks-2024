import {NavBar} from "@/components/navbar";
import { Card}  from "@/components/ui/card";
import { ScrollBaby } from "@/components/ScrollBaby";
import { CardContent } from "./components/ui/card";

const Docs = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-between px-16">
        <NavBar />
        <div className="flex w-full h-full items-start justify-between py-10">
          <div className="flex flex-col">
            <div className="">
              <h1 className="text-5xl font-bold z-2 py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
                Discover
              </h1>
            </div>
            <h2 className="text-xl font-bold z-2 py-2 bg-clip-text bg-secondary">See the commands we offer</h2>
            <ScrollBaby />
          </div>

        </div>

    </main>
  )
}

export default Docs