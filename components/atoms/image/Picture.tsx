import { FunctionComponent } from "react";
import { BaseProps, Responsive } from "core/types";
import { breakpoint, classnames, hasOwn } from "core/utils";
import { RESPONSIVE_SIZES } from "core/constants";

interface IPictureProps extends BaseProps {
  /**
   * Caption da imagem.
   */
  caption?: string;

  /**
   * URL da imagem ou objeto responsivo com imagens para cada breakpoint.
   */
  src: string|Responsive<string>;

  /**
   * Atributo alt da imagem.
   */
  alt?: string;
}

/**
 * components/atoms/Picture
 * ----------------------------------------------------------------------
 * Componente de imagem, suporta imagens responsivas, usado para padronizar
 * como carregamos imagens.
 *
 * Envelopa a imagem dentro de um figure e um picture.
 *
 * Suporta os atributos caption (figcaption) e alt.
 */
export const Picture: FunctionComponent<IPictureProps> = ({
  id,
  className,
  children,
  src,
  style,
  alt
}) => {
  const _attr: any = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames( className );
  if (style) _attr.style = style;

  if (typeof src === "string") {
    return (
      <figure {..._attr}>
        <picture>
          <img src={src} alt={alt}/>
        </picture>
        {children && <figcaption>{children}</figcaption>}
      </figure>
    );
  }

  const renderResponsive = (image: Responsive<string>, alt = "") => {
    return RESPONSIVE_SIZES.map((size, key) => {
      if (!hasOwn(image, size)) return null;

      if (size === "default") {
        return (
          <img src={image[size]} alt={alt} key={key}/>
        );
      }

      return (
        <source
          key={key}
          media={`(min-width:${breakpoint(size)}px)`}
          srcSet={image[size]}/>
      );
    });
  };

  return (
    <figure {..._attr}>
      <picture>
        {renderResponsive(src)}
      </picture>
      {children && <figcaption>{children}</figcaption>}
    </figure>
  );
};

Picture.defaultProps = {
  id: null,
  className: null,
  caption: null,
  style: null,
  alt: ""
};
