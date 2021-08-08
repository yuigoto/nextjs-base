import { BaseProps, ClassValue, Responsive } from "core/types";
import { classnames } from "core/utils";
import { Picture } from "components/elements/media/Picture";

interface IImageCard extends BaseProps {
  /**
   * Imagem para o card.
   */
  image: string|Responsive<string>;

  /**
   * Classe para o wrapper de imagem.
   */
  imageClassName?: string & ClassValue;

  /**
   * Classe para o wrapper de conteúdo.
   */
  infoClassName?: string & ClassValue;
}

export const ImageCard = ({
  id,
  className,
  children,
  style,
  image,
  imageClassName,
  infoClassName
}: IImageCard) => {
  const _attr: any = {};
  if (id) _attr.id = id;
  if (className) _attr.className = className;
  if (style) _attr.style = style;

  const _divAttr: any = {};
  if (infoClassName) _divAttr.className = infoClassName;

  return (
    <div {..._attr}>
      <Picture className={imageClassName} src={image}/>

      <div {..._divAttr}>
        {children}
      </div>
    </div>
  );
};

ImageCard.defaultProps = {
  id: null,
  className: null,
  children: null,
  style: null,
  imageClassName: null,
  infoClassName: null
};
