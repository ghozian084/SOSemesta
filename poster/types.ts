export interface PosterMetadata {
  competitionName: string;
  field: string;
  deadline: string;
  deadlineISO: string; // ISO 8601 format for Calendar
  eventDate: string;
  eventDateISO: string; // ISO 8601 format for Calendar
  fee: string;
  type: string; // Individu/Kelompok
  status: string; // Daring/Luring
  location: string;
  broadcastMessage: string;
  link: string;
}

export interface AnalysisResult {
  metadata: PosterMetadata;
  imagePreview: string;
}