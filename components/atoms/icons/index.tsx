import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

interface PlayIconProps extends IconProps {
  size?: number | string;
}

const Icons = {
  arrowRight: (props: IconProps) => (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.6923 18.6152L20 10.3075L11.6923 1.99985M18.8462 10.3075L2 10.3075"
        stroke="#F26727"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  CalenderIcon: (props: IconProps) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28 26.6666V7.99993C28 6.52926 26.804 5.33326 25.3333 5.33326H22.6667V2.6666H20V5.33326H12V2.6666H9.33333V5.33326H6.66667C5.196 5.33326 4 6.52926 4 7.99993V26.6666C4 28.1373 5.196 29.3333 6.66667 29.3333H25.3333C26.804 29.3333 28 28.1373 28 26.6666ZM12 23.9999H9.33333V21.3333H12V23.9999ZM12 18.6666H9.33333V15.9999H12V18.6666ZM17.3333 23.9999H14.6667V21.3333H17.3333V23.9999ZM17.3333 18.6666H14.6667V15.9999H17.3333V18.6666ZM22.6667 23.9999H20V21.3333H22.6667V23.9999ZM22.6667 18.6666H20V15.9999H22.6667V18.6666ZM25.3333 11.9999H6.66667V9.33326H25.3333V11.9999Z"
        fill="white"
        stroke="currentColor"
      />
    </svg>
  ),

  Close: (props: IconProps) => (
    <svg
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23 7.5L8 22.5M8 7.5L23 22.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  PlusIcon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M8 1.75V14.55M1.75 8.15H14.55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  BarIcon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M1.75 8H14.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  PlayIcon: ({ size = 132, ...props }: PlayIconProps) => (
    <svg
      height={size}
      width={size}
      viewBox="0 0 132 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M66 0C29.6054 0 0 29.6082 0 66C0 102.392 29.6054 132 66 132C102.395 132 132 102.392 132 66C132 29.6082 102.395 0 66 0ZM92.2378 68.3123L53.7379 93.0623C53.2945 93.3486 52.7779 93.5006 52.2501 93.5001C51.7989 93.5001 51.3423 93.3872 50.9342 93.1644C50.5 92.9283 50.1376 92.5793 49.8852 92.1544C49.6328 91.7294 49.4997 91.2443 49.5 90.75V41.25C49.5 40.243 50.0479 39.319 50.9342 38.8356C51.8043 38.3576 52.8946 38.387 53.7379 38.9377L92.2378 63.6877C93.0221 64.1925 93.5001 65.0654 93.5001 66C93.5001 66.9346 93.0221 67.8073 92.2378 68.3123Z"
        fill="white"
      />
    </svg>
  ),

  PauseIcon: (props: IconProps) => (
    <svg height="50" width="50" viewBox="0 0 512 512" fill="none" {...props}>
      <rect x="160" y="160" width="40" height="192" fill="white" />
      <rect x="312" y="160" width="40" height="192" fill="white" />
    </svg>
  ),

  UpIcon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path
        d="M16.666 13.2388L10 6.5721L3.333 13.2388"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  DownIcon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path
        d="M3.333 8.23877L10 14.9054L16.667 8.23877"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  Arrival: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.74976 1.00049C6.16397 1.00049 6.49976 1.33628 6.49976 1.75049V3.60049L8.22043 3.25636C9.87096 2.92625 11.5819 3.08333 13.1447 3.70846L13.3484 3.78992C14.9095 4.41438 16.6278 4.531 18.259 4.12319C19.0163 3.93388 19.7498 4.50662 19.7498 5.28718V12.6542C19.7498 13.2985 19.3113 13.8601 18.6862 14.0164L18.4718 14.07C16.7022 14.5124 14.8383 14.3859 13.1447 13.7085C11.5819 13.0833 9.87096 12.9263 8.22043 13.2564L6.49976 13.6005V21.7505C6.49976 22.1647 6.16397 22.5005 5.74976 22.5005C5.33555 22.5005 4.99976 22.1647 4.99976 21.7505V1.75049C4.99976 1.33628 5.33555 1.00049 5.74976 1.00049Z"
        fill="white"
      />
    </svg>
  ),

  Departure: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_797_9439)">
        <path
          d="M12 2.40381C17.523 2.40381 22 6.88081 22 12.4038C22 17.9268 17.523 22.4038 12 22.4038C6.477 22.4038 2 17.9268 2 12.4038C2 6.88081 6.477 2.40381 12 2.40381ZM12 6.40381C11.7348 6.40381 11.4804 6.50916 11.2929 6.6967C11.1054 6.88424 11 7.13859 11 7.40381V12.4038C11.0001 12.669 11.1054 12.9233 11.293 13.1108L14.293 16.1108C14.4816 16.293 14.7342 16.3938 14.9964 16.3915C15.2586 16.3892 15.5094 16.284 15.6948 16.0986C15.8802 15.9132 15.9854 15.6624 15.9877 15.4002C15.9899 15.138 15.8892 14.8854 15.707 14.6968L13 11.9898V7.40381C13 7.13859 12.8946 6.88424 12.7071 6.6967C12.5196 6.50916 12.2652 6.40381 12 6.40381Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_797_9439">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  CircleCheck: (props: IconProps) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.6">
        <path
          d="M14.2507 9.15385C13.7507 11.6539 11.8657 14.0079 9.22071 14.5339C7.9307 14.7908 6.59252 14.6341 5.39672 14.0862C4.20091 13.5384 3.20843 12.6272 2.56061 11.4824C1.91278 10.3377 1.64263 9.01774 1.78862 7.71053C1.93461 6.40331 2.4893 5.17548 3.37371 4.20185C5.18771 2.20385 8.25071 1.65385 10.7507 2.65385"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.75 8.15381L8.25 10.6538L14.25 4.15381"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  ),
  Quatation: (props: IconProps) => (
    <svg
      width="65"
      height="65"
      viewBox="0 0 48 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      {...props}
    >
      <path
        d="M19.2 0H0V19.2H9.6C9.6 24.5 5.3 28.8 0 28.8V38.4C10.6 38.4 19.2 29.8 19.2 19.2V0ZM48 0H28.8V19.2H38.4C38.4 24.5 34.1 28.8 28.8 28.8V38.4C39.4 38.4 48 29.8 48 19.2V0Z"
        fill="currentColor"
      />
    </svg>
  ),
  CircleCheckTheme: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 0C5.38327 0 0 5.38327 0 12C0 18.6167 5.38327 24 12 24C18.6167 24 24 18.6167 24 12C24 5.38327 18.6167 0 12 0ZM18.2452 7.97827L10.4913 17.209C10.4063 17.3103 10.3005 17.3922 10.181 17.449C10.0616 17.5059 9.9313 17.5364 9.79904 17.5385H9.78346C9.65408 17.5384 9.52615 17.5112 9.40798 17.4585C9.2898 17.4058 9.18402 17.3289 9.0975 17.2327L5.77442 13.5404C5.69003 13.4509 5.62438 13.3454 5.58133 13.2301C5.53828 13.1149 5.51871 12.9922 5.52375 12.8693C5.5288 12.7464 5.55836 12.6257 5.61071 12.5144C5.66306 12.403 5.73713 12.3033 5.82858 12.221C5.92003 12.1387 6.027 12.0755 6.14321 12.0352C6.25943 11.9948 6.38254 11.9781 6.50531 11.986C6.62808 11.9939 6.74803 12.0262 6.85811 12.0812C6.9682 12.1361 7.0662 12.2124 7.14635 12.3058L9.75923 15.2088L16.8317 6.79096C16.9904 6.60755 17.2148 6.49393 17.4566 6.47466C17.6983 6.4554 17.9379 6.53204 18.1236 6.68802C18.3093 6.844 18.4261 7.06678 18.4489 7.30822C18.4716 7.54966 18.3985 7.79035 18.2452 7.97827Z"
        fill="#F26727"
      />
    </svg>
  ),
  AttachFile: (props: IconProps) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.85348 4.73622L5.36142 8.92828C5.08649 9.18485 4.93203 9.53283 4.93203 9.89568C4.93203 10.2585 5.08649 10.6065 5.36142 10.8631C5.63635 11.1196 6.00924 11.2638 6.39805 11.2638C6.78686 11.2638 7.15975 11.1196 7.43468 10.8631L11.9267 6.67101C12.4766 6.15787 12.7855 5.46191 12.7855 4.73622C12.7855 4.01053 12.4766 3.31456 11.9267 2.80142C11.3769 2.28828 10.6311 2 9.85348 2C9.07586 2 8.33008 2.28828 7.78022 2.80142L3.28816 6.99348C2.46336 7.76319 2 8.80714 2 9.89568C2 10.9842 2.46336 12.0282 3.28816 12.7979C4.11295 13.5676 5.23161 14 6.39805 14C7.56448 14 8.68314 13.5676 9.50794 12.7979L14 8.60581"
        stroke="#121212"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Upload: (props: IconProps) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.6">
        <path
          d="M2 11.1763V12.588C2 12.9625 2.14874 13.3215 2.4135 13.5863C2.67825 13.8511 3.03734 13.9998 3.41176 13.9998H11.8823C12.2568 13.9998 12.6159 13.8511 12.8806 13.5863C13.1454 13.3215 13.2941 12.9625 13.2941 12.588V11.1763"
          stroke="#111111"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.11719 5.52941L7.6466 2L11.176 5.52941"
          stroke="#111111"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.64648 2V10.4706"
          stroke="#111111"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  ),
  Edit: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1_1254)">
        <path
          d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 5L19 8"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_1254">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  Info: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1148_10455)">
        <path
          d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12Z"
          stroke="black"
          strokeWidth="1.68"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 9H12.01"
          stroke="black"
          strokeWidth="1.68"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 12H12V16H13"
          stroke="black"
          strokeWidth="1.68"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1148_10455">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  Mail: (props: IconProps) => (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1165_42301)">
        <path
          d="M14.5938 0.375H1.40625C0.629281 0.375 0 1.00819 0 1.78125V10.2188C0 10.9964 0.633906 11.625 1.40625 11.625H14.5938C15.3642 11.625 16 10.9991 16 10.2188V1.78125C16 1.00956 15.3732 0.375 14.5938 0.375ZM14.3968 1.3125C14.1095 1.59828 9.16509 6.51666 8.99438 6.68647C8.72875 6.95209 8.37562 7.09834 8 7.09834C7.62437 7.09834 7.27125 6.95206 7.00475 6.68559C6.88994 6.57137 2.00009 1.70731 1.60319 1.3125H14.3968ZM0.9375 10.0279V1.97266L4.98869 6.0025L0.9375 10.0279ZM1.60378 10.6875L5.65338 6.66366L6.34272 7.34937C6.78541 7.79206 7.37397 8.03584 8 8.03584C8.62603 8.03584 9.21459 7.79206 9.65641 7.35025L10.3466 6.66366L14.3962 10.6875H1.60378ZM15.0625 10.0279L11.0113 6.0025L15.0625 1.97266V10.0279Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1165_42301">
          <rect width="16" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),

  Coupon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g stroke="currentColor" strokeWidth="1">
        <path
          strokeWidth="1.5"
          d="M10.51 3.665a2 2 0 0 1 2.98 0l.7.782a2 2 0 0 0 1.601.663l1.05-.058a2 2 0 0 1 2.107 2.108l-.058 1.049a2 2 0 0 0 .663 1.6l.782.7a2 2 0 0 1 0 2.981l-.782.7a2 2 0 0 0-.663 1.601l.058 1.05a2 2 0 0 1-2.108 2.107l-1.049-.058a2 2 0 0 0-1.6.663l-.7.782a2 2 0 0 1-2.981 0l-.7-.782a2 2 0 0 0-1.601-.663l-1.05.058a2 2 0 0 1-2.107-2.108l.058-1.049a2 2 0 0 0-.663-1.6l-.782-.7a2 2 0 0 1 0-2.981l.782-.7a2 2 0 0 0 .663-1.601l-.058-1.05A2 2 0 0 1 7.16 5.053l1.049.058a2 2 0 0 0 1.6-.663z"
        />
        <path
          strokeLinejoin="round"
          strokeWidth="2.25"
          d="M9.5 9.5h.01v.01H9.5zm5 5h.01v.01h-.01z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m15 9l-6 6"
        />
      </g>
    </svg>
  ),

  ProgramNameIcon: (props: IconProps) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1457_42471)">
        <path
          d="M12.8327 5.25033L6.99935 2.91699L1.16602 5.25033L6.99935 7.58366L12.8327 5.25033ZM12.8327 5.25033V8.75033"
          stroke="#111111"
          strokeWidth="1.17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 6.18359V9.33359C3.5 9.79772 3.86875 10.2428 4.52513 10.571C5.1815 10.8992 6.07174 11.0836 7 11.0836C7.92826 11.0836 8.8185 10.8992 9.47487 10.571C10.1313 10.2428 10.5 9.79772 10.5 9.33359V6.18359"
          stroke="#111111"
          strokeWidth="1.17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1457_42471">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),

  Share: (props: IconProps) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1450_4941)">
        <path
          d="M2.5 10C2.5 10.663 2.76339 11.2989 3.23223 11.7678C3.70107 12.2366 4.33696 12.5 5 12.5C5.66304 12.5 6.29893 12.2366 6.76777 11.7678C7.23661 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.23661 8.70107 6.76777 8.23223C6.29893 7.76339 5.66304 7.5 5 7.5C4.33696 7.5 3.70107 7.76339 3.23223 8.23223C2.76339 8.70107 2.5 9.33696 2.5 10Z"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 5C12.5 5.66304 12.7634 6.29893 13.2322 6.76777C13.7011 7.23661 14.337 7.5 15 7.5C15.663 7.5 16.2989 7.23661 16.7678 6.76777C17.2366 6.29893 17.5 5.66304 17.5 5C17.5 4.33696 17.2366 3.70107 16.7678 3.23223C16.2989 2.76339 15.663 2.5 15 2.5C14.337 2.5 13.7011 2.76339 13.2322 3.23223C12.7634 3.70107 12.5 4.33696 12.5 5Z"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 15C12.5 15.663 12.7634 16.2989 13.2322 16.7678C13.7011 17.2366 14.337 17.5 15 17.5C15.663 17.5 16.2989 17.2366 16.7678 16.7678C17.2366 16.2989 17.5 15.663 17.5 15C17.5 14.337 17.2366 13.7011 16.7678 13.2322C16.2989 12.7634 15.663 12.5 15 12.5C14.337 12.5 13.7011 12.7634 13.2322 13.2322C12.7634 13.7011 12.5 14.337 12.5 15Z"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.25 8.91634L12.75 6.08301"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.25 11.083L12.75 13.9163"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1450_4941">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),

  Target: (props: IconProps) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_2088_28617)">
        <path
          d="M12 16C12 17.0609 12.4214 18.0783 13.1716 18.8284C13.9217 19.5786 14.9391 20 16 20C17.0609 20 18.0783 19.5786 18.8284 18.8284C19.5786 18.0783 20 17.0609 20 16C20 14.9391 19.5786 13.9217 18.8284 13.1716C18.0783 12.4214 17.0609 12 16 12C14.9391 12 13.9217 12.4214 13.1716 13.1716C12.4214 13.9217 12 14.9391 12 16Z"
          stroke="#F3763A"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.33301 16.0002C5.33301 18.8291 6.45681 21.5422 8.4572 23.5426C10.4576 25.543 13.1707 26.6668 15.9997 26.6668C18.8287 26.6668 21.5418 25.543 23.5421 23.5426C25.5425 21.5422 26.6663 18.8291 26.6663 16.0002C26.6663 13.1712 25.5425 10.4581 23.5421 8.45769C21.5418 6.4573 18.8287 5.3335 15.9997 5.3335C13.1707 5.3335 10.4576 6.4573 8.4572 8.45769C6.45681 10.4581 5.33301 13.1712 5.33301 16.0002Z"
          stroke="#F3763A"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 2.6665V5.33317"
          stroke="#F3763A"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 26.6665V29.3332"
          stroke="#F3763A"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.667 16H29.3337"
          stroke="#F3763A"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.66699 16H5.33366"
          stroke="#F3763A"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2088_28617">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),

  Facilities: (props: IconProps) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_2101_57278)">
        <path
          d="M17.5 10.4166V6.65907C17.4995 6.3683 17.4222 6.08282 17.2758 5.83156C17.1295 5.58029 16.9193 5.37216 16.6667 5.22824L10.8333 1.88824C10.5795 1.74325 10.2923 1.66699 10 1.66699C9.7077 1.66699 9.42047 1.74325 9.16667 1.88824L3.33333 5.22741C2.8175 5.52324 2.5 6.06907 2.5 6.65907V13.3407C2.5 13.9316 2.8175 14.4766 3.33333 14.7716L9.16667 18.1116C9.42047 18.2566 9.7077 18.3328 10 18.3328C10.2923 18.3328 10.5795 18.2566 10.8333 18.1116"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 18.3333V10"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 9.9998L17.275 5.7998"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.72461 5.7998L9.99961 9.9998"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.333 15.833H18.333"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.833 13.333V18.333"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2101_57278">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
};

export default Icons;
