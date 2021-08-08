import Head from "next/head";
import { Collapsible } from "components/elements/containers/Collapsible";
import { Heading } from "components/elements/typography/Heading";
import { renderDate } from "core/utils/datetime";
import { Responsive } from "core/types";
import { Picture } from "components/elements/media/Picture";
import { Button } from "components/elements/ui/Button";
import { Label } from "components/elements/form/Label";
import { Input } from "components/elements/form/Input";
import { Select } from "components/elements/form/Select";
import { TextArea } from "components/elements/form/TextArea";
import { useState } from "react";
import { Anchor } from "components/elements/link/Anchor";
import { SocialAnchor } from "components/elements/link/SocialAnchor";
import { SocialBar } from "components/widgets/social/SocialBar";
import { ArticleHeader } from "components/elements/article/ArticleHeader";
import { ImageCard } from "components/elements/card/ImageCard";

const examplePicture: Responsive<string> = {
  default: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=180&ixlib=rb-1.2.1&q=80&w=320",
  sm: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixlib=rb-1.2.1&q=80&w=640",
  md: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=540&ixlib=rb-1.2.1&q=80&w=960",
  lg: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixlib=rb-1.2.1&q=80&w=1280",
  xl: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920"
};

const Page = () => {
  const [ input, setInput ] = useState("");
  const [ select, setSelect ] = useState("");
  const [ textarea, setTextArea ] = useState("");

  return (
    <>
      <Head>
        <title>NextJS Base : Elementos</title>
      </Head>

      <h2 className={"display-4 text-muted"}>
        Elementos
      </h2>

      <h3>Headings</h3>

      <p>Renderiza cabeçalhos de <kbd>h1</kbd> a <kbd>h6</kbd>:</p>

      <Collapsible>
        <Heading size={1}>Heading 1</Heading>
        <Heading size={2}>Heading 2</Heading>
        <Heading size={3}>Heading 3</Heading>
        <Heading size={4}>Heading 4</Heading>
        <Heading size={5}>Heading 5</Heading>
        <Heading size={6}>Heading 6</Heading>
      </Collapsible>

      <p>É possível, também, utilizar tags alternativas fornecendo a prop <kbd>type</kbd>, que aceita os valores <kbd>span</kbd>, <kbd>div</kbd> e <kbd>p</kbd>.</p>

      <p>Para que isso funcione, é necessário que o framework suporte as classes de <kbd>.h1</kbd> até <kbd>.h6</kbd>:</p>

      <Collapsible>
        <Heading type={"span"} size={1}>Heading 1 (span)</Heading>
        <Heading type={"span"} size={2}>Heading 2 (span)</Heading>
        <Heading type={"div"} size={3}>Heading 3 (div)</Heading>
        <Heading type={"div"} size={4}>Heading 4 (div)</Heading>
        <Heading type={"p"} size={5}>Heading 5 (p)</Heading>
        <Heading type={"p"} size={6}>Heading 6 (p)</Heading>
      </Collapsible>

      <hr/>

      <h3>DateTime</h3>

      <p>A versão anterior tinha um componente simples para exibição de datas, este foi trocado por uma função <kbd>renderDate()</kbd>:</p>

      <p>
        {renderDate("2018-09-10T04:56:13-03:00", "utc")}
      </p>

      <p>
        {renderDate("2018-09-10T04:56:13-03:00", "short")}
      </p>

      <hr/>

      <h3>Picture</h3>

      <p>
        O componente <kbd>Picture</kbd> permite que sejam inseridas imagens responsivas usando <kbd>source</kbd> e <kbd>picture</kbd>. Caso forneça texto como filhos do componente, eles serão inseridos dentro de <kbd>figcaption</kbd>.
      </p>

      <Collapsible>
        <Picture src={examplePicture} alt={"Hello"} />

        <Picture src={"https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=180&ixlib=rb-1.2.1&q=80&w=320"} alt={"Hello"}/>

        <Picture
          src={"//source.unsplash.com/random/1280x320"}
          alt={"Hello"}>
          Texto em um bloco <code>Picture</code> vira uma <code>figcaption</code>
        </Picture>
      </Collapsible>

      <hr/>

      <h3>Button</h3>

      <p>
        O componente <kbd>Button</kbd> é uma extensão do botão padrão, porém com o evento padrão <strong>sempre</strong> bloqueado, para controle manual do evento.
      </p>

      <Collapsible>
        <Button className={"btn btn-outline-info"}>
          Hello! Eu sou um botão.
        </Button>
        &nbsp;
        <Button className={"btn btn-info"}>
          Hello! Eu sou um botão.
        </Button>
        <Button className={"btn btn-outline-info"} onClick={() => console.log("Hello!")}>
          Hello! Eu sou um botão.
        </Button>
        &nbsp;
        <Button className={"btn btn-info"}>
          Hello! Eu sou um botão.
        </Button>
      </Collapsible>

      <hr/>

      <h3>Form</h3>

      <p>Wrappers para alguns campos de formulário:</p>

      <Collapsible>
        <Label>
          Este é um label
        </Label>

        <table>
          <tbody>
          <tr>
            <td>
              <Input value={input} onChange={(e) => setInput(e.target.value)}/>
            </td>
            <td>
              {input}
            </td>
          </tr>
          <tr>
            <td>
              <Select value={select} onChange={(e) => setSelect(e.target.value)}>
                <option disabled>SELECIONE</option>
                <option value="1">Um</option>
                <option value="2">Dois</option>
                <option value="3">Três</option>
                <option value="4">Quatro</option>
              </Select>
            </td>
            <td>
              {select}
            </td>
          </tr>
          <tr>
            <td>
              <TextArea value={textarea} onChange={(e) => setTextArea(e.target.value)} />
            </td>
            <td>
              {textarea}
            </td>
          </tr>
          </tbody>
        </table>
      </Collapsible>

      <hr/>

      <h3>Anchor</h3>

      <p>Para uso em navegação interna, temos um componente <kbd>Anchor</kbd>, que é um wrapper para links em torno de <kbd>next/link</kbd>, feito para evitar a necessidade de declarar manualmente uma tag <kbd>a</kbd> ao estilizar e aplicar outras props:</p>

      <Collapsible>
        <p>Links internos:</p>

        <p>
          <Anchor href={"/"}>
            Home
          </Anchor>
          &nbsp;
          <Anchor href={"/atoms"}>
            Atoms
          </Anchor>
          &nbsp;
          <Anchor href={"/molecules"}>
            Molecules
          </Anchor>
        </p>

        <p>Links externos:</p>

        <p>
          <Anchor href={"//google.com"} target={"_blank"}>
            Google
          </Anchor>
          &nbsp;
          <Anchor href={"//example.com"} target={"_blank"}>
            Example
          </Anchor>
        </p>
      </Collapsible>

      <p>
        Temos, também, o componente <kbd>SocialAnchor</kbd>, exclusivo para uso com <kbd>FontAwesome</kbd>:
      </p>

      <Collapsible>
        <div className="d-flex align-items-center justify-center lead">
          <SocialAnchor href={"//facebook.com"} target={"_blank"} network={"facebook"}/>
          &nbsp;
          <SocialAnchor href={"//github.com"} target={"_blank"} network={"github"}/>
          &nbsp;
          <SocialAnchor href={"//instagram.com"} target={"_blank"} network={"instagram"}/>
          &nbsp;
          <SocialAnchor href={"//linkedin.com"} target={"_blank"} network={"linkedin"}/>
        </div>
        <div className="d-flex align-items-center justify-center lead">
          <SocialAnchor href={"//pinterest.com"} target={"_blank"} network={"pinterest"}/>
          &nbsp;
          <SocialAnchor href={"//spotify.com"} target={"_blank"} network={"spotify"}/>
          &nbsp;
          <SocialAnchor href={"//twitter.com"} target={"_blank"} network={"twitter"}/>
          &nbsp;
          <SocialAnchor href={"//wordpress.com"} target={"_blank"} network={"wordpress"}/>
        </div>
      </Collapsible>

      <hr/>

      <h3>SocialBar</h3>

      <p>Componente para renderização de ícones de redes sociais mais facilmente. Depende de <strong>Font Awesome</strong>.</p>

      <Collapsible>
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
      </Collapsible>

      <hr/>

      <h3>ArticleHeader</h3>

      <Collapsible>
        <ArticleHeader>
          <Heading size={2}>Exemplo de <kbd>ArticleHeader</kbd> "puro"</Heading>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur distinctio in maxime modi numquam odit quas totam veniam. Adipisci aut quis rem sit. Aliquam consequatur corporis excepturi ipsam rerum?</p>

          <p>
            Fabio Goto
          </p>

          <p>{renderDate("2021-03-04T01:57:00-03:00")}</p>
        </ArticleHeader>

        <ArticleHeader image={examplePicture}>
          <Heading size={2}>Exemplo de <kbd>ArticleHeader</kbd> com imagem antes de tudo</Heading>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur distinctio in maxime modi numquam odit quas totam veniam. Adipisci aut quis rem sit. Aliquam consequatur corporis excepturi ipsam rerum?</p>

          <p>
            Fabio Goto
          </p>

          <p>{renderDate("2021-03-04T01:57:00-03:00")}</p>
        </ArticleHeader>

        <hr/>

        <ArticleHeader image={examplePicture} imageAfter={true}>
          <Heading size={2}>Exemplo de <kbd>ArticleHeader</kbd> com imagem depois de tudo</Heading>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur distinctio in maxime modi numquam odit quas totam veniam. Adipisci aut quis rem sit. Aliquam consequatur corporis excepturi ipsam rerum?</p>

          <p>
            Fabio Goto
          </p>

          <p>{renderDate("2021-03-04T01:57:00-03:00")}</p>
        </ArticleHeader>
      </Collapsible>

      <hr/>

      <h3>ImageCard</h3>

      <p>O componente <kbd>ImageCard</kbd> pode ser usado para cards com imagem ou perfis de autores em posts, ou outra coisa que sinta útil.</p>

      <Collapsible>
        <ImageCard image={"//source.unsplash.com/320x320"}>
          <Heading size={4}>
            Este é um image card simples, e sem formatação
          </Heading>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi at autem deleniti dicta, dolore et ex expedita, facilis ipsum iusto nemo perferendis placeat quaerat quisquam repellat sed unde voluptatem.</p>

          <p>
            <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolor eius praesentium.</small>
          </p>
        </ImageCard>
      </Collapsible>
    </>
  );
};

export default Page;
