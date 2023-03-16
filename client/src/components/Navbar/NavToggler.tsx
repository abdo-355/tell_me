import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
}

const NavToggler: FC<Props> = ({ open }) => {
  return (
    <div className="flex-initial left-0 flex items-center sm:hidden z-30">
      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white">
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XMarkIcon className="block h-9 w-9" aria-hidden="true" />
        ) : (
          <Bars3Icon className="block h-9 w-9" aria-hidden="true" />
        )}
      </Disclosure.Button>
    </div>
  );
};

export default NavToggler;
