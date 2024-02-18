// Assuming you're using Radix Icons, adjust the imports to match your icon library
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

import { Scale, X, MoveRight, MoveHorizontal } from "lucide-react";

const data = [
  {
    id: 1,
    icon: ChevronDownIcon,
    name: "L-And",
    latex: "\\land",
  },
  {
    id: 2,
    icon: ChevronUpIcon,
    name: "L-Or",
    latex: "\\lor",
  },
  {
    id: 3,
    icon: X,
    name: "Negation",
    latex: "\\lnot",
  },
  {
    id: 4,
    icon: MoveRight,
    name: "Implication",
    latex: "\\rightarrow",
  },
  {
    id: 5,
    icon: MoveHorizontal,
    name: "IFF",
    latex: "\\leftrightarrow",
  },
  {
    id: 6,
    icon: Scale,
    name: "DeMorgan's Law",
    latex: "\\lnot (A \\land B) = (\\lnot A) \\lor (\\lnot B)",
  },
  // Add more items as needed
];

export default data;
