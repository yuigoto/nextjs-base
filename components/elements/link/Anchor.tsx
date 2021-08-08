import Link from "next/link";
import { BaseProps, HashMap } from "core/types";
import { UrlObject } from "url";
import { classnames } from "core/utils";

export interface IAnchor extends BaseProps {
  /**
   * Caminho ou URL.
   */
  href: string|UrlObject;

  /**
   * Alvo da âncora.
   */
  target?: string|null;

  /**
   * Decorador opcional, define o que será exibido na URL do navegador.
   */
  as?: string|UrlObject;

  /**
   * Se forçamos `Link` a passar o valor de `href` direto ao filho.
   */
  passHref?: boolean;

  /**
   * Se executa, ou não, prefetch no background.
   */
  prefetch?: boolean;

  /**
   * Se sobrepões o estado atual no histórico, ao invés de adicionar ao stack.
   */
  replace?: boolean;

  /**
   * Define scroll para o topo após clique.
   */
  scroll?: boolean;

  /**
   * Evita que `getStaticProps`, `getServerSideProps` e `getInitialProps`
   * sejam, executados, ao fazer navegação superficial.
   */
  shallow?: boolean;

  /**
   * Localização, usado como prefixo em sites multi-lingues.
   */
  locale?: string|false;
}

export const Anchor = ({
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
}: IAnchor) => {
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
      <a {...attr}>
        {children}
      </a>
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
