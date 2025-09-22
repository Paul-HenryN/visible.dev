import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { Repository } from "../supabase/types";

const openai = new OpenAI();

const suggestionSchema = z.object({
  content: z.string().min(100).max(2000),
});

export async function generateLinkedInPostFromRepo(repo: Repository) {
  return openai.responses.parse({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: `You are an experienced content creation assistant that helps developers turn their coding work into authentic, engaging LinkedIn posts. Generate a LinkedIn post draft that this developer could publish from the following Github repository metadata. 
        The post should:
        - Be beginner-friendly, authentic, and concise (150–250 words max).
        - Be written in first person, as if the developer is speaking.
        - Use a professional but approachable tone (curious, sharing, learning).
        - Highlight purpose, challenges, or lessons.
        - Optionally end with a question to invite engagement.
        
        Acceptable types of posts
        1. **Project Overview**: Introduce the project and why it matters.
        2. **Lessons Learned**: Share an insight or challenge solved from recent commits or project work.
        3. **Advice/Tips**: Offer a small takeaway, best practice, or reflection from building this project.`,
      },
      {
        role: "user",
        content: `Repository name: ${repo.fullName}
        Repository description: ${repo.description ?? "No description"}
        Main programming language: ${repo.language ?? "Not specified"}
        repository URL: ${repo.htmlUrl}
        `,
      },
    ],
    text: {
      format: zodTextFormat(suggestionSchema, "suggestions"),
    },
  });
}
