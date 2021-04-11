import React, { Component, ErrorInfo } from "react";
import { Head } from "next/document";
import Link from "next/link";
import { IBaseProps } from "core/interfaces";
import { HashMap } from "core/types";

interface IErrorBoundary extends IBaseProps {}

interface IErrorBoundaryState extends HashMap<any> {
  error: boolean;
  errorMessage?: string;
  errorDetails?: any;
  log?: boolean;
}

/**
 * components/elements/ErrorBoundary
 * ----------------------------------------------------------------------
 * Componente de error boundary, envelopa erros de qualquer componente filho.
 * 
 * @param props
 * 
 * @since 0.2.0
 */
export class ErrorBoundary extends Component<IErrorBoundary, IErrorBoundaryState> {
  state: Readonly<IErrorBoundaryState> = {
    error: false,
    log: false
  };
  
  // MÉTODOS ESTÁTICOS
  // ----------------------------------------------------------------------
  
  /**
   * Puxa o estado derivado do erro e o retorna.
   * 
   * @param error 
   */
  static getDerivedStateFromError (error: Error) {
    return {
      error: true,
      errorMessage: error.message,
      errorDetails: error.stack
    };
  }
  
  // LIFECYCLE
  // ----------------------------------------------------------------------
  
  constructor (props) {
    super(props);
  }
  
  componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }
  
  /**
   * Toggle de exibição do log de erros.
   */
  toggleLog = () => {
    this.setState({
      log: !this.state.log
    });
  };
  
  render () {
    if (this.state.error) {
      return (
        <>
          <Head>
            <title>NextJS Boilerplate</title>
            <link rel={"favicon"} href={"/favicon.ico"}/>
          </Head>
          
          <h2>Ops! Um erro inesperado ocorreu!</h2>

          <p className={"breadcrumb"}>
            <Link href={"/"}>
              &lt;&lt; Voltar
            </Link>
          </p>
          
          <p>Para maiores detalhes, clique em exibir log abaixo.</p>
          
          <p>
            <button className={"btn"} onClick={this.toggleLog}>
              Exibir Log
            </button>
          </p>
          
          {(() => {
            if (this.state.log) {
              return (
                <code><pre>{this.state.errorDetails.toJSON()}</pre></code>
              );
            }
          })()}
        </>
      );
    }
    
    return this.props.children;
  }
}
