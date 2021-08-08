import { BaseProps, Responsive } from "core/types";
import { breakpoint, hasOwn } from "core/utils";
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

export const Picture = ({
  id,
  className,
  children,
  src,
  style,
  alt
}: IPictureProps) => {
  const _attr: any = {};
  if (id) _attr.id = id;
  if (className) _attr.className = className;
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
