import Image from "next/image";

export const Logo = ({ ...rest }) => (
  <Image
    src="/assets/logo.svg"
    alt="logo"
    style={{ objectFit: "contain" }}
    width={186}
    height={132}
    {...rest}
  />
);

export const LongLogo = ({ ...rest }) => (
  <Image
    src="/assets/logo-long.svg"
    alt="logo"
    style={{ objectFit: "contain" }}
    width={237}
    height={22}
    {...rest}
  />
);
