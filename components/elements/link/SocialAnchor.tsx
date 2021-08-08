import { Anchor, IAnchor } from "components/elements/link/Anchor";

export interface ISocialAnchor extends IAnchor {
  /**
   * Slug da rede social ou tipo de link (e-mail, blog, website).
   */
  network?: string;
}

/**
 * Lista de redes sociais válidas.
 */
const socialNetworks: string[] = [
  "behance",
  "bitbucket",
  "blogger",
  "facebook",
  "github",
  "gitlab",
  "gitter",
  "instagram",
  "itch-io",
  "kickstarter",
  "line",
  "linkedin",
  "mastodon",
  "pinterest",
  "rocketchat",
  "skype",
  "slack",
  "snapchat",
  "soundcloud",
  "spotify",
  "steam",
  "telegram",
  "tiktok",
  "tumblr",
  "twitch",
  "twitter",
  "vimeo",
  "vk",
  "weibo",
  "whatsapp",
  "wordpress",
  "youtube"
];

export const SocialAnchor = (props: ISocialAnchor) => {
  let _props: ISocialAnchor = { ...props };
  const isEmail = /^e?mail$/.test(_props.network.trim());

  if (isEmail) {
    if (!/^mailto:/.test(_props.href as string)) {
      _props.href = `mailto:${_props.href}`;
    }
  }

  const icon = (socialNetworks.includes(_props.network))
    ? `fab fa-fw fa-${_props.network}`
    : (`fas fa-fw fa-${isEmail ? "envelope" : "globe"}`);

  return (
    <Anchor {..._props}>
      <i className={icon} />
    </Anchor>
  );
};
