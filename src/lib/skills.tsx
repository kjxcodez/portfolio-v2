import {
  CssThreeIcon,
  GitMergeIcon,
  HtmlFiveIcon,
  JavaScriptIcon,
  PythonIcon,
  ReactIcon,
  TailwindcssIcon,
  TypescriptIcon,
  VisualStudioCodeIcon,
} from "@hugeicons/core-free-icons";
import { FaNodeJs } from "react-icons/fa";
import { RiNextjsFill, RiSupabaseFill } from "react-icons/ri";
import { SiPrisma, SiExpress  } from "react-icons/si";
import { DiMongodb, DiPostgresql } from "react-icons/di";
import { TbBrandReactNative } from "react-icons/tb";

export const SKILL_ICONS: Record<string, any> = {
  html5: HtmlFiveIcon,
  css3: CssThreeIcon,
  javascript: JavaScriptIcon,
  typescript: TypescriptIcon,
  react: ReactIcon,
  ri_nextjs: <RiNextjsFill size={24} />,
  tailwind: TailwindcssIcon,
  ri_nodejs: <FaNodeJs size={24} />,
  python: PythonIcon,
  ri_express: <SiExpress size={24}/>, // Placeholder icon for Express
  ri_mongodb: <DiMongodb size={24} />,
  ri_postgresql: <DiPostgresql size={24} />, // Placeholder icon for Postgres
  ri_prisma: <SiPrisma size={24} />,
  ri_supabase: <RiSupabaseFill size={24} />,
  git: GitMergeIcon,
  vscode: VisualStudioCodeIcon,
  ri_react_native: <TbBrandReactNative size={24} />
};
