import { BaseProps, ClassValue, HashMap, Responsive } from "core/types";
import { Picture } from "components/elements/media/Picture";

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

export const ArticleHeader = ({
  id,
  className,
  style,
  children,
  image,
  imageAfter,
  imageClassName
}: IArticleHeader) => {
  const _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = className;
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
