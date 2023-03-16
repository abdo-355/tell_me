import { FC } from "react";
import { Disclosure } from "@headlessui/react";

interface Props {
  name: string;
  url: string;
}

const PanelItem: FC<Props> = ({ name, url }) => {
  return (
    <Disclosure.Button
      key={name}
      as="a"
      href={url}
      className="relative text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium z-30"
    >
      {name}
    </Disclosure.Button>
  );
};

export default PanelItem;
