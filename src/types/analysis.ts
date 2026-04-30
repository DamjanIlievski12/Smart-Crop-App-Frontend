export type RecommendationType = 'irrigation' | 'fertilizer' | 'disease';
export type Priority = 'High' | 'Medium' | 'Low';

export interface Recommendation {
  title: string;
  description: string;
  priority: Priority;
  type: RecommendationType;
}