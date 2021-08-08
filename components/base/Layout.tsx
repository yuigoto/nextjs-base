import { BaseProps, HashMap } from "core/types";
import { classnames } from "core/utils";
import { Footer } from "components/base/Footer";
import { Header } from "components/base/Header";
import { Navigation } from "components/base/Navigation"
import { LayoutContainer } from "components/base/containers";

export const Layout = ({
  id,
  className,
  children,
  style
}: BaseProps) => {
  let _attr: HashMap<any> = {};
  if (id) _attr.id = id;
  if (className) _attr.className = classnames(className);
  if (style) _attr.style = style;

  return (
    <LayoutContainer {..._attr}>
      <Header />

      <Navigation />

      <div id={"main"}>
        {children}
      </div>

      <Footer />
    </LayoutContainer>
  );
};
