import { Picture } from "components/atoms/image/Picture";
import { FunctionComponent } from "react";
import { BaseProps, ClassValue, HashMap, Responsive } from "core/types";
import { classnames } from "core/utils";

interface IArticleHeader extends BaseProps {
  /**
   * Imagem para exibição no header.
   */
  image?: string|Responsive<string>;

  /**
   * Força a imagem para o final do header.
   */
  imageAfter?: boolean;

  /**
   * Classe para a imagem.
   */
  imageClassName?: string & ClassValue;
}

/**
 * components/molecules/content/ArticleHeader
 * ----------------------------------------------------------------------
 * Componente para exibição de um header com conteúdo e imagem, típico de
 * artigos e blogs.
 */
export const ArticleHeader: FunctionComponent<IArticleHeader> = ({
  id,
  className,
  style,
  children,
  image,
  imageAfter,
  imageClassName
}) => {
  const _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = style;

  return (
    <header {..._attr}>
      {!imageAfter && image && <Picture src={image} alt={""} className={imageClassName}/>}

      {children}

      {imageAfter && image  && <Picture src={image} alt={""} className={imageClassName}/>}
    </header>
  );
};

ArticleHeader.defaultProps = {
  image: null,
  imageAfter: false,
  imageClassName: null
};
