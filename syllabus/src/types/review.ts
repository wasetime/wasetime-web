export interface Review {
  benefit: number;
  comment_en: string;
  comment_ja: string;
  comment_ko: string;
  "comment_zh-CN": string;
  "comment_zh-TW": string;
  created_at: string;
  difficulty: number;
  instructor: string;
  instructor_jp: string;
  mod: boolean;
  satisfaction: number;
  src_lang: string;
  title: string;
  title_jp: string;
  updated_at: string;
  year: number;
}

export interface Scales {
  satisfaction: number;
  difficulty: number;
  benefit: number;
}

export default Review;
