enum AlertType {
  Info,
  Error,
}

type PropsType = {
  type: AlertType;
  message: string;
};

const fromAlertTypeToString = (type: AlertType): string => {
  switch (type) {
    case AlertType.Error:
      return "alert-error";
    default:
      return "alert-info";
  }
};

const renderSwitch = (type: AlertType): JSX.Element => {
  switch (type) {
    case AlertType.Error:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      );
  }
};

const Alert = ({ type, message }: PropsType) => {
  return (
    <div
      role="alert"
      className={`alert ${fromAlertTypeToString(
        type,
      )} m-5 flex w-[calc(100%-2.5rem)] gap-5 p-5`}
    >
      {renderSwitch(type)}
      <span>{message}</span>
    </div>
  );
};

export { Alert, AlertType };
