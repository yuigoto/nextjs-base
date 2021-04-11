import Link from "next/link";
import { FunctionComponent } from "react";
import { UrlObject } from "url";
import { classnames } from "core/utils";
import { BaseProps, HashMap } from "core/types";

interface IAnchor extends BaseProps {
  /**
   * Caminho do link.
   */
  href: string| UrlObject;

  /**
   * Alvo do link.
   */
  target?: string | null;

  /**
   * Decorador opcional, define o que será exibido na URL do browser.
   */
  as?: string|UrlObject;

  /**
   * Se forçamos `Link` a passar `href` direto para o filho.
   */
  passHref?: boolean;

  /**
   * Se prefetch é realizado no background.
   */
  prefetch?: boolean;

  /**
   * Sobrepõe o histórico atual ao invés de adicionar no stack.
   */
  replace?: boolean;

  /**
   * Scroll para o topo assim que navegar.
   */
  scroll?: boolean;

  /**
   * Atualizando o caminho não executa `getStaticProps`, `getServerSideProps`
   * ou `getInitialProps`.
   */
  shallow?: boolean;

  /**
   * Local para prepend, usado para websites com múltiplos idiomas.
   */
  locale?: string|false;
}

/**
 * components/atoms/elements/Anchor
 * ----------------------------------------------------------------------
 * Wrapper em torno de `next/link`, feito para que não seja necessário
 * declarar na mão tags `a`, podendo ser usado diretamente.
 *
 * Aceita todas as propriedades de `Link`.
 */
export const Anchor: FunctionComponent<IAnchor> = ({
  id,
  className,
  style,
  children,
  target,
  href,
  as,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  locale
}) => {
  const attr: HashMap<any> = {};
  if (id) attr.id = id;
  if (className) attr.className = classnames( className );
  if (style) attr.style = style;
  if (target) attr.target = target;

  const linkAttr: IAnchor = { href };
  if (as) linkAttr.as = as;
  if (passHref) linkAttr.passHref = passHref;
  if (prefetch) linkAttr.prefetch = prefetch;
  if (replace) linkAttr.replace = replace;
  if (scroll) linkAttr.scroll = scroll;
  if (shallow) linkAttr.shallow = shallow;
  if (locale) linkAttr.locale = locale;

  return (
    <Link {...linkAttr}>
      <a {...attr}>{children}</a>
    </Link>
  );
};

Anchor.defaultProps = {
  id: null,
  className: null,
  style: null,
  children: null,
  target: null,
  as: null,
  passHref: false,
  prefetch: false,
  replace: false,
  scroll: true,
  shallow: false,
  locale: false
};

// ----------------------------------------------------------------------

interface ISocialAnchor extends IAnchor {
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

/**
 * components/atoms/elements/SocialAnchor
 * ----------------------------------------------------------------------
 * Anchor específico para uso com `FontAwesome` em links de redes sociais.
 */
export const SocialAnchor: FunctionComponent<ISocialAnchor> = (props) => {
  let _props = { ...props };
  if (_props.network === "mail" || _props.network === "email") {
    if (!/^mailto:/.test((_props.href as string))) {
      _props.href = `mailto:${_props.href}`;
    }
  }

  const icon = (socialNetworks.includes(_props.network))
    ? `fab fa-fw fa-${_props.network}`
    : ((_props.network === "mail" || _props.network === "email")
      ? `fas fa-fw fa-envelope`
      : `fas fa-fw fa-globe`
    );

  return (
    <Anchor {..._props}>
      <i className={icon}/>
    </Anchor>
  );
};
