import { AxiosInstanceWithRefreshToken } from "../AxiosInstance";
import type { IFormatterStudyService } from "../IStudyService";

export class FormatterStudyService implements IFormatterStudyService {
  async exec(content: string): Promise<{ formattedContent: string }> {
    const { data } = await AxiosInstanceWithRefreshToken.post(
      "/study/formatter",
      { content }
    );
    return { formattedContent: data.formattedContent };
  }
}
