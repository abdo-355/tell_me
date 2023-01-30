import { FC } from "react";

interface Props {
  styles?: string;
}

const ArrowLeft: FC<Props> = ({ styles }) => {
  return (
    <svg
      data-testid="backArrow"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-full h-full ${styles}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
};

export default ArrowLeft;
