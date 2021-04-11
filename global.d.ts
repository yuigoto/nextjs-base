/**
 * global.d
 * ----------------------------------------------------------------------
 * Para declaração de módulos e definições de tipos globais, para evitar
 * erros de compilação ao importar arquivos de forma não-convencional.
 *
 * Não é necessário editar isso muito.
 */

// CUSTOM COMPONENT
// ----------------------------------------------------------------------
declare module "*.json";

declare module "*.md" {
  export const meta: any;
  export const body: any;
  export const html: any;
  export const attributes: any;
  export const react: any;
}

// IMAGE IMPORTS
// ----------------------------------------------------------------------
declare module "*.bmp";
declare module "*.gif";
declare module "*.ico";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
declare module "*.tif";
declare module "*.webp";

// FILE IMPORTS
// ----------------------------------------------------------------------
declare module "*.7zip";
declare module "*.doc";
declare module "*.docx";
declare module "*.exe";
declare module "*.msi";
declare module "*.pdf";
declare module "*.ppt";
declare module "*.pptx";
declare module "*.rar";
declare module "*.tar.gz";
declare module "*.xls";
declare module "*.xlsx";
declare module "*.zip";

// FONT FILES
// ----------------------------------------------------------------------
declare module ".eot";
declare module ".otf";
declare module ".ttf";
declare module ".woff";
declare module ".woff2";

// MEDIA FILES
// ----------------------------------------------------------------------
declare module "*.avi";
declare module "*.flac";
declare module "*.m4a";
declare module "*.mp3";
declare module "*.mp4";
declare module "*.mpeg";
declare module "*.mpg";
declare module "*.ogg";
declare module "*.wav";
declare module "*.webm";
declare module "*.wma";
declare module "*.wmv";
