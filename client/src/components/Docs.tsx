import {NavBar} from "@/components/NavBar";
// import { Card}  from "@/components/ui/card";
import { ScrollBaby } from "@/components/ScrollBaby";
// import { CardContent } from "@/components/ui/card";
import data from "../assets/data.js";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
const LogicCards = () => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}> {/* Adjust styling as needed */}
        {data.map((item) => {
          const IconComponent = item.icon; // Dynamically determine the icon component
          return (
            // <Card
            //   key={item.id}
            //   title={item.name}
            //   content={<p>{item.latex}</p>} // Assuming you want to display the LaTeX as plain text
            //   icon={<IconComponent size={24} />} // Adjust the size as needed
            // />
            <Card key={item.id}>
                <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <h2>{item.latex}</h2>
                </CardContent>
                <CardFooter>
                    {<IconComponent size={24} />} 
                </CardFooter>
                </Card>

          );
        })}
      </div>
    );
  };
  
const Docs = () => {
    
  return (
    <main className="flex h-screen flex-col items-center justify-between px-16">
        <NavBar />
        <div className="flex w-full h-full items-start justify-center py-10">
          <div className="flex flex-col">
            <div className="flex justify-center items-center">
              <h1 className="text-5xl font-bold z-2 py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
                Discover
              </h1>
            </div>
            <h2 className="text-xl font-bold z-2 py-2 bg-clip-text bg-secondary flex justify-center items-center">See the commands we offer</h2>
            <ScrollBaby />
          </div>
          {/* <LogicCards /> */}
        </div>

    </main>
  )
}

export default Docs