import { Picture } from "components/atoms/image/Picture";
import { FunctionComponent } from "react";
import { BaseProps, ClassValue, Responsive } from "core/types";
import { classnames } from "core/utils";

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

/**
 * componentes/molecules/ImageCard
 * ----------------------------------------------------------------------
 * Componente para um card com imagem e conteúdo. Pode ser um card simples,
 * ou um perfil de autor, você decide.
 */
export const ImageCard: FunctionComponent<IImageCard> = ({
  id,
  className,
  children,
  style,
  image,
  imageClassName,
  infoClassName
}) => {
  const _attr: any = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames( className );
  if (style) _attr.style = style;

  const _divAttr: any = {};
  if (infoClassName) _divAttr.className = classnames(infoClassName);

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
