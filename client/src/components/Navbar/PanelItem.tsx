import { FC } from "react";
import { Disclosure } from "@headlessui/react";

interface Props {
  name: string;
  href: string;
  current: boolean;
}

const PanelItem: FC<Props> = ({ name, href, current }) => {
  const styles = `${
    current
      ? "bg-gray-900 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
  } block px-3 py-2 rounded-md text-base font-medium`;

  return (
    <Disclosure.Button
      key={name}
      as="a"
      href={href}
      className={styles}
      aria-current={current ? "page" : undefined}
    >
      {name}
    </Disclosure.Button>
  );
};

export default PanelItem;
