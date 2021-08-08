import { BaseProps, HashMap } from "core/types";
import { classnames } from "core/utils";
import { Anchor } from "components/elements/link/Anchor";

interface IPaginationButton extends BaseProps {
  active?: boolean;
  href?: string;
}

export const PaginationButton = ({
  id,
  href,
  children,
  className,
  active
}: IPaginationButton) => {
  const _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);

  if (!active) {
    return (
      <a {..._attr}>
        {children}
      </a>
    );
  }

  return (
    <Anchor href={href} {..._attr}>
      {children}
    </Anchor>
  );
};
