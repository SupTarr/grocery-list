enum Size {
  ExSmall,
  Small,
  Medium,
  Large,
}

type PropsType = {
  size?: Size;
};

const sizeToString = (size: Size): string => {
  switch (size) {
    case Size.Small:
      return "loading-sm";
      break;
    case Size.Medium:
      return "loading-md";
      break;
    case Size.Large:
      return "loading-lg";
      break;
    default:
      return "loading-xs";
      break;
  }
};

const Loading = ({ size = Size.ExSmall }: PropsType) => {
  return (
    <span className={`loading loading-spinner ${sizeToString(size)} `}></span>
  );
};

export { Loading, Size };
