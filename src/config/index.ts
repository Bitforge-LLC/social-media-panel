import { type IconType } from "@Bitforge-LLC/ui";
import Fa from "@Bitforge-LLC/ui/icons/fa";
import Fa6 from "@Bitforge-LLC/ui/icons/fa6";

type Link = {
  href: string;
  Icon?: IconType;
  name: string;
};

export const socials: Link[] = [
  {
    href: "https://x.com/TheeCryptoChad",
    Icon: Fa6.FaXTwitter,
    name: "X",
  },
  {
    href: "https://discord.com/users/267143910810320896",
    Icon: Fa.FaDiscord,
    name: "Discord",
  },
  {
    href: "http://t.me/TheeCryptoChad",
    Icon: Fa.FaTelegram,
    name: "Telegram",
  },
];

export const policies: Link[] = [
  {
    href: "/privacy",
    name: "Privacy",
  },
  {
    href: "/terms",
    name: "Terms",
  },
  {
    href: "/security",
    name: "Security",
  },
  {
    href: "/cookies",
    name: "Cookies",
  },
  {
    href: "/use",
    name: "Use",
  },
];
