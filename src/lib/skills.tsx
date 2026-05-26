import {
  GitMergeIcon,
  JavaScriptIcon,
  PythonIcon,
  ReactIcon,
  TailwindcssIcon,
  TypescriptIcon,
  VisualStudioCodeIcon,
} from "@hugeicons/core-free-icons";
import { FaNodeJs, FaShopify } from "react-icons/fa";
import { RiNextjsFill, RiSupabaseFill } from "react-icons/ri";
import {
  SiPrisma,
  SiExpress,
  SiRedis,
  SiSentry,
  SiCloudflare,
  SiMeta,
  SiWhatsapp,
  SiRazorpay,
  SiGooglegemini,
  SiResend,
  SiChakraui,
  SiMui,
  SiShadcnui,
} from "react-icons/si";
import { DiMongodb, DiPostgresql } from "react-icons/di";
import {
  Terminal,
  Webhook,
  Globe,
  Shield,
  CreditCard,
  RefreshCw,
  Lock,
  FlaskConical,
} from "lucide-react";

export const SKILL_ICONS: Record<string, any> = {
  // Languages
  javascript: JavaScriptIcon,
  typescript: TypescriptIcon,
  python: PythonIcon,
  // Frontend
  react: ReactIcon,
  ri_nextjs: <RiNextjsFill size={22} />,
  tailwind: TailwindcssIcon,
  ri_shadcn: <SiShadcnui size={20} />,
  ri_mui: <SiMui size={22} />,
  ri_chakra: <SiChakraui size={22} />,
  // Backend
  ri_nodejs: <FaNodeJs size={22} />,
  ri_express: <SiExpress size={22} />,
  ri_api: <Globe size={22} />,
  ri_webhook: <Webhook size={22} />,
  ri_redis: <SiRedis size={22} />,
  ri_auth: <Lock size={22} />,
  // Databases
  ri_postgresql: <DiPostgresql size={22} />,
  ri_mongodb: <DiMongodb size={22} />,
  ri_prisma: <SiPrisma size={22} />,
  ri_supabase: <RiSupabaseFill size={22} />,
  // Integrations
  ri_meta: <SiMeta size={22} />,
  ri_whatsapp: <SiWhatsapp size={22} />,
  ri_shopify: <FaShopify size={22} />,
  ri_razorpay: <SiRazorpay size={22} />,
  ri_gemini: <SiGooglegemini size={22} />,
  ri_resend: <SiResend size={22} />,
  // Tools
  git: GitMergeIcon,
  ri_playwright: <FlaskConical size={22} />,
  vscode: VisualStudioCodeIcon,
  ri_sentry: <SiSentry size={22} />,
  ri_cloudflare: <SiCloudflare size={22} />,
  // Other
  ri_cli: <Terminal size={22} />,
  ri_billing: <CreditCard size={22} />,
  ri_idempotent: <RefreshCw size={22} />,
};

export const SKILL_CATEGORY_LABELS: Record<string, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  integrations: 'Integrations',
  tools: 'Tools',
  other: 'Other',
};
