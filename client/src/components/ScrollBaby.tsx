import data from "../assets/data.js"; // Adjust the import path to your JSON file
import { Separator } from "@/components/ui/separator";
import Box from "./Box";

// const ICON_COMPONENTS = {
//   ChevronD: ChevronDownIcon,
//   ChevronU: ChevronUpIcon,
//   Ruler: RulerSquareIcon,
//   // Add more mappings as needed
// };

export function ScrollBaby() {
  return (
    <div className="w-[50vw] rounded-md border p-4">
      <h4 className="mb-4 text-sm font-medium leading-none">LEGEND</h4>
      <div className="w-full flex flex-row flex-wrap">
        {data.map((item: any) => {
          return (
            <div key={item.id} className="w-1/2">
              {/* Render the icon component directly if it exists */}
              <div className="icon-container">
                {/* Render the icon component directly */}
                <item.icon />
              </div>{" "}
              <Box name={item.name} latex={item.latex} />
              <Separator className="my-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// export function ScrollBaby() {
//   return (
//     <ScrollArea className="h-72 w-full rounded-md border">
//       <div className="p-4">
//         <h4 className="mb-4 text-sm font-medium leading-none">LEGEND</h4>
//         {data.map((item) => (
//           <React.Fragment key={item.id}>
//             <Box name={item.name} description={item.description} />
//             <Separator className="my-2" />
//           </React.Fragment>
//         ))}
//       </div>
//     </ScrollArea>
//   );
// }
