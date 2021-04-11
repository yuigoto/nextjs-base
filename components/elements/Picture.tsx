import { FunctionComponent, CSSProperties, ReactNode } from "react";
import { RESPONSIVE_SIZES } from "core/constants";
import { IBaseProps } from "core/interfaces";
import { HashMap, Responsive } from "core/types";
import { breakpoint, classnames } from "core/utils";

interface IPicture extends IBaseProps {
  image: Responsive<string>;
  imageStyle?: CSSProperties|null|undefined;
  alt?: string;
}

/**
 * components/elements/Picture
 * ----------------------------------------------------------------------
 * Componente de imagens responsivo, alternativo ao padrão oferecido pelo 
 * NextJS.
 * 
 * @param props
 * 
 * @since 0.2.0
 */
export const Picture: FunctionComponent<IPicture> = ({
  id,
  className,
  image,
  imageStyle,
  style,
  alt
}) => {
  let _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = style;
  
  const renderPicture = (): ReactNode[] => {
    let pics: ReactNode[] = [];
    
    for (let n of RESPONSIVE_SIZES) {
      if (n === "default") {
        pics.push(
          <img
            key={n}
            src={image[n]}
            style={imageStyle}
            alt={alt ? alt : ""}/>
        );
      } else if (image[n]) {
        pics.push(
          <source
            key={n}
            media={`(min-width: ${breakpoint(n)}px)`}
            srcSet={image[n]}/>
        );
      }
    }
    
    return pics;
  };
  
  return (
    <picture {..._attr}>
      {renderPicture()}
    </picture>
  );
};

Picture.defaultProps = {
  alt: null
};
