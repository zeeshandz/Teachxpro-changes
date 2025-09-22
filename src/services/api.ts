import Cookies from 'js-cookie';

interface FileResponse {
  file: {
    _id: string;
    fileUrl: string;
    rawUrl: string;
    fileName: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    user: string;
  };
  chatName: string;
  chatType: string;
  device: string;
  platform: string;
  conversations: any[];
  createdAt: string;
  updatedAt: string;
  user: string;
  _id: string;
}

interface QuizResponse {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}

interface YouTubeUploadResponse {
  _id: string;
  // Add other response properties as needed
}

// Placeholder interfaces - adjust when actual structure is known
interface FlashcardResponse { 
    flashCards: string; // Assuming a single string field based on '/n' requirement
  // other potential fields...
}
interface SummaryResponse { 
  summary: string; // Assuming a field named 'summary'
  // other potential fields...
}
interface NotesResponse { 
  notes: string; // Assuming a field named 'notes'
  // other potential fields...
}

class APIManager {
  private static BASE_URL = 'https://mpkzvmeaezzezslchdls.functions.supabase.co/answer-api';
  private static USER_ID = '1744547016138';

  private static getHeaders(isFormData: boolean = false): HeadersInit {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  static async uploadPDF(file: File): Promise<FileResponse> {
    try {
      console.log('Uploading PDF to:', `${this.BASE_URL}/lecture/pdf/upload`);
      const formData = new FormData();
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      
      formData.append('file', file);
      formData.append('chatName', fileName);
      formData.append('chatType', 'BOOK_CHAT');
      formData.append('device', 'Macintosh (macOS)');
      formData.append('platform', 'Desktop Browser');
      formData.append('user', this.USER_ID);

      const response = await fetch(`${this.BASE_URL}/lecture/pdf/upload`, {
        method: 'POST',
        body: formData,
        headers: this.getHeaders(true)
      });

      console.log('PDF Upload Response Status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('PDF Upload Error:', errorText);
        throw new Error(`Failed to upload PDF: ${errorText}`);
      }

      const data = await response.json();
      console.log('PDF Upload Response:', data);
      return data;
    } catch (error) {
      console.error('Error uploading PDF:', error);
      throw error;
    }
  }

  static async uploadYouTubeVideo(videoId: string): Promise<YouTubeUploadResponse> {
    try {
      console.log('Uploading YouTube video to:', `${this.BASE_URL}/lecture/youtube/upload`);
      console.log('Request body:', { video: videoId });
      
      const response = await fetch(`${this.BASE_URL}/lecture/youtube/upload`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          video: videoId
        })
      });

      console.log('YouTube Upload Response Status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('YouTube Upload Error:', errorText);
        throw new Error(`Failed to upload YouTube video: ${errorText}`);
      }

      const data = await response.json();
      console.log('YouTube Upload Response:', data);
      return data;
    } catch (error) {
      console.error('Error uploading YouTube video:', error);
      throw error;
    }
  }

  static async generateQuiz(fileId: string, regenerate: boolean = false): Promise<QuizResponse> {
    try {
      console.log('Generating quiz for:', `${this.BASE_URL}/lecture/quiz/${fileId}`);
      
      const response = await fetch(
        `${this.BASE_URL}/lecture/quiz/${fileId}?regenerate=${regenerate}&cb=${this.USER_ID}`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      console.log('Quiz Generation Response Status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Quiz Generation Error:', errorText);
        throw new Error(`Failed to generate quiz: ${errorText}`);
      }

      const data = await response.json();
      console.log('Quiz Generation Response:', data);
      return data;
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw error;
    }
  }

  static async generateFlashcards(fileId: string, regenerate: boolean = false): Promise<FlashcardResponse> {
    try {
      const url = `${this.BASE_URL}/lecture/flash-cards/${fileId}?regenerate=${regenerate}&cb=${this.USER_ID}`;
      console.log('Generating flashcards for:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      console.log('Flashcard Generation Response Status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Flashcard Generation Error:', errorText);
        throw new Error(`Failed to generate flashcards: ${errorText}`);
      }

      const data = await response.json();
      console.log('Flashcard Generation Response:', data);
      return data;
    } catch (error) {
      console.error('Error generating flashcards:', error);
      throw error;
    }
  }

  static async generateSummary(fileId: string, regenerate: boolean = false): Promise<SummaryResponse> {
    try {
      const url = `${this.BASE_URL}/lecture/summary/${fileId}?regenerate=${regenerate}&cb=${this.USER_ID}`;
      console.log('Generating summary for:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      console.log('Summary Generation Response Status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Summary Generation Error:', errorText);
        throw new Error(`Failed to generate summary: ${errorText}`);
      }

      const data = await response.json();
      console.log('Summary Generation Response:', data);
      return data;
    } catch (error) {
      console.error('Error generating summary:', error);
      throw error;
    }
  }

  static async generateNotes(fileId: string, regenerate: boolean = false): Promise<NotesResponse> {
    try {
      const url = `${this.BASE_URL}/lecture/notes/${fileId}?regenerate=${regenerate}&cb=${this.USER_ID}`;
      console.log('Generating notes for:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      console.log('Notes Generation Response Status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Notes Generation Error:', errorText);
        throw new Error(`Failed to generate notes: ${errorText}`);
      }

      const data = await response.json();
      console.log('Notes Generation Response:', data);
      return data;
    } catch (error) {
      console.error('Error generating notes:', error);
      throw error;
    }
  }
}

export default APIManager; 