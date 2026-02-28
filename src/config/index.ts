import { type IconType } from "@Bitforge-LLC/ui";
import { FaDiscord, FaTelegram } from "@Bitforge-LLC/ui/icons/fa";
import { FaXTwitter } from "@Bitforge-LLC/ui/icons/fa6";

type Link = {
  href: string;
  Icon?: IconType;
  name: string;
};

export const socials: Link[] = [
  {
    href: "https://x.com/TheeCryptoChad",
    Icon: FaXTwitter,
    name: "X",
  },
  {
    href: "https://discord.com/users/267143910810320896",
    Icon: FaDiscord,
    name: "Discord",
  },
  {
    href: "http://t.me/TheeCryptoChad",
    Icon: FaTelegram,
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
