type SVGProps = {
  color: string;
  strokeWidth?: number;
};

export const IconArrowLeft = ({ color }: SVGProps) => {
  return (
    <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 3L4 14.5L16 26"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconArrowRight = ({ color }: SVGProps) => {
  return (
    <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 26L16 14.5L4 3"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconCheck = ({ color }: SVGProps) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M39.163 6.63195C40.279 7.74115 40.279 9.54249 39.163 10.6517L16.3084 33.3681C15.1925 34.4773 13.3802 34.4773 12.2643 33.3681L0.83696 22.0099C-0.278987 20.9007 -0.278987 19.0994 0.83696 17.9902C1.95291 16.881 3.7652 16.881 4.88115 17.9902L14.2908 27.3341L35.1278 6.63195C36.2437 5.52275 38.056 5.52275 39.172 6.63195H39.163Z"
        fill={color}
      />
    </svg>
  );
};

export const IconExit = ({ color }: SVGProps) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="4.24264"
        y1="4"
        x2="36"
        y2="35.7574"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="36"
        y1="4.24264"
        x2="4.24264"
        y2="36"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const IconTrash1 = ({ color }: SVGProps) => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 13H38"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 21V33"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 21V33"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13L11.8571 36.1429C11.8571 37.1658 12.2485 38.1469 12.945 38.8703C13.6416 39.5936 14.5863 40 15.5714 40H30.4286C31.4137 40 32.3584 39.5936 33.055 38.8703C33.7515 38.1469 34.1429 37.1658 34.1429 36.1429L36 13"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 13V7.75C17 7.28587 17.2107 6.84075 17.5858 6.51256C17.9609 6.18437 18.4696 6 19 6H27C27.5304 6 28.0391 6.18437 28.4142 6.51256C28.7893 6.84075 29 7.28587 29 7.75V13"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconTrash2 = ({ color }: SVGProps) => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 13H38"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13L11.8571 36.1429C11.8571 37.1658 12.2485 38.1469 12.945 38.8703C13.6416 39.5936 14.5863 40 15.5714 40H30.4286C31.4137 40 32.3584 39.5936 33.055 38.8703C33.7515 38.1469 34.1429 37.1658 34.1429 36.1429L36 13"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 13V7.75C17 7.28587 17.2107 6.84075 17.5858 6.51256C17.9609 6.18437 18.4696 6 19 6H27C27.5304 6 28.0391 6.18437 28.4142 6.51256C28.7893 6.84075 29 7.28587 29 7.75V13"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 23L27 31M27 23L19 31"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconReset = ({ color }: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="200px"
      width="200px"
    >
      <path
        fill="none"
        stroke={color}
        stroke-width="2"
        d="M20,8 C18.5974037,5.04031171 15.536972,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 L12,21 C16.9705627,21 21,16.9705627 21,12 M21,3 L21,9 L15,9"
      />
    </svg>
  );
};
