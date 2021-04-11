import Head from "next/head";
import { ExampleGroup } from "components/elements/ExampleGroup";
import { Heading } from "components/atoms/typography/Heading";
import { DateTime } from "components/atoms/basic/DateTime";
import { Picture } from "components/atoms/image/Picture";
import { Responsive } from "core/types";
import { Button } from "components/atoms/elements/Button";
import { Label } from "components/atoms/form/Label";
import { Input } from "components/atoms/form/Input";
import { Select } from "components/atoms/form/Select";
import { TextArea } from "components/atoms/form/TextArea";
import { useState } from "react";
import { Anchor, SocialAnchor } from "components/atoms/elements/Anchor";

const examplePicture: Responsive<string> = {
  default: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=180&ixlib=rb-1.2.1&q=80&w=320",
  sm: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixlib=rb-1.2.1&q=80&w=640",
  md: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=540&ixlib=rb-1.2.1&q=80&w=960",
  lg: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixlib=rb-1.2.1&q=80&w=1280",
  xl: "https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920"
};

/**
 * pages/atoms
 * ----------------------------------------------------------------------
 */

/**
 * Interface de props da página.
 */
interface IPageProps {
}

const Page = ({
}: IPageProps) => {
  const [ input, setInput ] = useState("");
  const [ select, setSelect ] = useState("");
  const [ textarea, setTextArea ] = useState("");

  return (
    <>
      <Head>
        <title>NextJS Base : Átomos</title>
      </Head>

      <h2 className={"display-4 text-muted"}>Átomos</h2>

      <h3>Headings</h3>

      <p>Renderiza cabeçalhos de <kbd>h1</kbd> à <kbd>h6</kbd>:</p>

      <ExampleGroup>
        <Heading size={1}>Heading 1</Heading>
        <Heading size={2}>Heading 2</Heading>
        <Heading size={3}>Heading 3</Heading>
        <Heading size={4}>Heading 4</Heading>
        <Heading size={5}>Heading 5</Heading>
        <Heading size={6}>Heading 6</Heading>
      </ExampleGroup>

      <p>É possível, também, utilizar tags alternativas fornecendo a prop <var>type</var>, que aceita os valores <var>span</var>, <var>div</var> e <var>p</var>.</p>

      <p>Para que isso funcione, é necessário que o framework suporte as classes de <var>.h1</var> até <var>.h6</var>:</p>

      <ExampleGroup>
        <Heading type={"span"} size={1}>Heading 1 (span)</Heading>
        <Heading type={"span"} size={2}>Heading 2 (span)</Heading>
        <Heading type={"div"} size={3}>Heading 3 (div)</Heading>
        <Heading type={"div"} size={4}>Heading 4 (div)</Heading>
        <Heading type={"p"} size={5}>Heading 5 (p)</Heading>
        <Heading type={"p"} size={6}>Heading 6 (p)</Heading>
      </ExampleGroup>

      <hr/>

      <h3>DateTime</h3>

      <p>Componente simples para exibição de data formatada. Você pode fornecer à prop <kbd>format</kbd> os valores <kbd>iso, utc, long, short, short-time e time</kbd> para formatos:</p>

      <ExampleGroup>
        <p>Default: <DateTime date={"2020-03-30T14:59:00-03:00"}/></p>
        <p>ISO: <DateTime date={"2020-03-30T14:59:00-03:00"} format={"iso"}/></p>
        <p>UTC: <DateTime date={"2020-03-30T14:59:00-03:00"} format={"utc"}/></p>
        <p>Long: <DateTime date={"2020-03-30T14:59:00-03:00"} format={"long"}/></p>
        <p>Short: <DateTime date={"2020-03-30T14:59:00-03:00"} format={"short"}/></p>
        <p>Short Time: <DateTime date={"2020-03-30T14:59:00-03:00"} format={"short-time"}/></p>
        <p>Time: <DateTime date={"2020-03-30T14:59:00-03:00"} format={"time"}/></p>
      </ExampleGroup>

      <hr/>

      <h3>Picture</h3>

      <p>
        O componente <kbd>Picture</kbd> permite que sejam inseridas imagens responsivas usando <kbd>source</kbd> e <kbd>picture</kbd>. Caso forneça texto como filhos do componente, eles serão inseridos dentro de <kbd>figcaption</kbd>.
      </p>

      <ExampleGroup>
        <Picture src={examplePicture} alt={"Hello"}/>

        <Picture src={"https://images.unsplash.com/photo-1615371788993-9a98cdfe92a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=180&ixlib=rb-1.2.1&q=80&w=320"} alt={"Hello"}/>

        <Picture
          src={"//source.unsplash.com/random/1280x320"}
          alt={"Hello"}>
          Texto em um bloco <code>Picture</code> vira uma <code>figcaption</code>
        </Picture>
      </ExampleGroup>

      <hr/>

      <h3>Button</h3>

      <p>
        O componente <kbd>Button</kbd> é uma extensão do botão padrão, porém com o evento padrão <strong>sempre</strong> bloqueado, para controle manual do evento.
      </p>

      <ExampleGroup>
        <p>
          <Button>
            Hello! Eu sou um botão.
          </Button>
          &nbsp;
          <Button className={"btn btn-info"}>
            Hello! Eu sou um botão.
          </Button>
        </p>
        <p>
          <Button onClick={() => console.log("Hello!")}>
            Hello! Eu sou um botão.
          </Button>
          &nbsp;
          <Button className={"btn btn-info"}>
            Hello! Eu sou um botão.
          </Button>
        </p>
      </ExampleGroup>

      <hr/>

      <h3>Form</h3>

      <p>
        Alguns componentes de formulário, que são apenas montados por cima do básico, para adição posterior de features.
      </p>

      <ExampleGroup>
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
      </ExampleGroup>

      <hr/>

      <h3>Anchor</h3>

      <p>
        Para uso em navegação interna, temos um componente <kbd>Anchor</kbd>, que é um wrapper para links em torno de <kbd>next/link</kbd>, feito para evitar a necessidade de declarar manualmente uma tag <kbd>a</kbd> ao estilizar e aplicar outras props:
      </p>

      <ExampleGroup>
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
      </ExampleGroup>

      <p>
        Temos, também, o componente <kbd>SocialAnchor</kbd>, exclusivo para uso com <kbd>FontAwesome</kbd>:
      </p>

      <ExampleGroup>
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
      </ExampleGroup>
    </>
  );
};

Page.defaultProps = {
};

export default Page;
