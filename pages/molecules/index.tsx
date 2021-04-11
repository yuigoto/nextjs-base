import Head from "next/head";
import { ExampleGroup } from "components/elements/ExampleGroup";
import { SocialBar } from "components/molecules/social/SocialBar";
import { ArticleHeader } from "components/molecules/content/ArticleHeader";
import { DateTime } from "components/atoms/basic/DateTime";
import { Heading } from "components/atoms/typography/Heading";
import { Responsive } from "core/types";
import { ImageCard } from "components/molecules/card/ImageCard";

/**
 * pages/molecules
 * ----------------------------------------------------------------------
 */

const examplePicture: Responsive<string> = {
  default: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=180&ixlib=rb-1.2.1&q=80&w=320",
  sm: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixlib=rb-1.2.1&q=80&w=640",
  md: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=540&ixlib=rb-1.2.1&q=80&w=960",
  lg: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixlib=rb-1.2.1&q=80&w=1280",
  xl: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920"
};

/**
 * Interface de props da página.
 */
interface IPageProps {
}

const Page = ({
}: IPageProps) => {
  return (
    <>
      <Head>
        <title>NextJS Base : Moléculas</title>
      </Head>

      <h2 className={"display-4 text-muted"}>Moléculas</h2>

      <h3>SocialBar</h3>

      <p>Componente para renderização de ícones de redes sociais mais facilmente. Depende de <strong>Font Awesome</strong>.</p>

      <ExampleGroup>
        <SocialBar socialData={{
          email: "mailto:mail@example.com",
          site: "//yuiti.com.br",
          facebook: "//facebook.com",
        }}/>
        <SocialBar socialData={{
          pinterest: "//pinterest.com",
          snapchat: "//snapchat.com",
          soundcloud: "//soundcloud.com",
        }}/>
        <SocialBar socialData={{
          spotify: "//spotify.com",
          telegram: "//telegram.com",
          tiktok: "//tiktok.com",
        }}/>
        <SocialBar socialData={{
          tumblr: "//tumblr.com",
          twitch: "//twitch.com",
          whatsapp: "//whatsapp.com",
        }}/>
        <SocialBar socialData={{
          twitter: "//twitter.com",
        }}/>
      </ExampleGroup>

      <hr/>

      <h3>ArticleHeader</h3>

      <ExampleGroup>
        <ArticleHeader>
          <Heading size={2}>Exemplo de <kbd>ArticleHeader</kbd> "puro"</Heading>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur distinctio in maxime modi numquam odit quas totam veniam. Adipisci aut quis rem sit. Aliquam consequatur corporis excepturi ipsam rerum?</p>

          <p>
            Fabio Goto
          </p>

          <p><DateTime date={"2021-03-04T01:57:00-03:00"}/></p>
        </ArticleHeader>

        <ArticleHeader image={examplePicture}>
          <Heading size={2}>Exemplo de <kbd>ArticleHeader</kbd> com imagem antes de tudo</Heading>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur distinctio in maxime modi numquam odit quas totam veniam. Adipisci aut quis rem sit. Aliquam consequatur corporis excepturi ipsam rerum?</p>

          <p>
            Fabio Goto
          </p>

          <p><DateTime date={"2021-03-04T01:57:00-03:00"}/></p>
        </ArticleHeader>

        <hr/>

        <ArticleHeader image={examplePicture} imageAfter={true}>
          <Heading size={2}>Exemplo de <kbd>ArticleHeader</kbd> com imagem depois de tudo</Heading>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur distinctio in maxime modi numquam odit quas totam veniam. Adipisci aut quis rem sit. Aliquam consequatur corporis excepturi ipsam rerum?</p>

          <p>
            Fabio Goto
          </p>

          <p><DateTime date={"2021-03-04T01:57:00-03:00"}/></p>
        </ArticleHeader>
      </ExampleGroup>

      <hr/>

      <h3>ImageCard</h3>

      <p>O componente <kbd>ImageCard</kbd> pode ser usado para cards com imagem ou perfis de autores em posts, ou outra coisa que sinta útil.</p>

      <ExampleGroup>
        <ImageCard image={"//source.unsplash.com/320x320"}>
          <Heading size={4}>
            Este é um image card simples, e sem formatação
          </Heading>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi at autem deleniti dicta, dolore et ex expedita, facilis ipsum iusto nemo perferendis placeat quaerat quisquam repellat sed unde voluptatem.</p>

          <p>
            <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolor eius praesentium.</small>
          </p>
        </ImageCard>
      </ExampleGroup>
    </>
  );
};

Page.defaultProps = {
};

export default Page;
