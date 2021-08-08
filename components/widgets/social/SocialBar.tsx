import { BaseProps, ClassValue } from "core/types";
import { SocialLinkList } from "core/types/social";
import { classnames } from "core/utils";
import { SocialAnchor } from "components/elements/link/SocialAnchor";

interface ISocialBar extends BaseProps {
  /**
   * Contém todos os links de redes sociais, assim como endereço de e-mail.
   */
  socialData: SocialLinkList;

  /**
   * Classe para links.
   */
  linkClassName?: string & ClassValue;
}

/**
 * Redes sociais e tipos de links permitidos.
 */
const networks = [
  "email",
  "site",
  "behance",
  "bitbucket",
  "blogger",
  "facebook",
  "github",
  "gitlab",
  "gitter",
  "instagram",
  "itchIo",
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

export const SocialBar = ({
  id,
  className,
  style,
  linkClassName,
  socialData
}: ISocialBar) => {
  const _attr: any = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = style;

  const renderNetworks = () => {
    return networks.map((item, key) => {
      if (socialData[item]) {
        return (
          <SocialAnchor
            key={key}
            href={socialData[item]}
            className={linkClassName}
            network={item}
            target={"_blank"}/>
        );
      }

      return null;
    });
  };

  return (
    <div {..._attr}>
      {renderNetworks()}
    </div>
  );
};

SocialBar.defaultProps = {
  id: null,
  className: null,
  style: null,
  linkClassName: null,
  socialData: {}
};
