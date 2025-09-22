import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateMockTest(userAnswers: Record<string, string>) {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const prompt = `Generate 10 technical interview questions for a ${userAnswers['experience']} level developer focusing on ${userAnswers['focus']} with ${userAnswers['style']} questions that can be completed in ${userAnswers['time']}. Format the response as a JSON array with each question having: id, question, options (array of 4 choices), and correctAnswer. Make questions challenging but appropriate for the level.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content:
            'You are an expert technical interviewer creating mock test questions. Always return valid JSON with the specified structure.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content generated');

    // const content = "```json\n[\n    {\n        \"id\": 1,\n        \"question\": \"Which programming language is commonly used for developing Android applications?\",\n        \"options\": [\"Swift\", \"Java\", \"Python\", \"C#\"],\n        \"correctAnswer\": \"Java\"\n    },\n    {\n        \"id\": 2,\n        \"question\": \"What is the primary markup language for building user interfaces in iOS development?\",\n        \"options\": [\"HTML\", \"XML\", \"JSON\", \"CSS\"],\n        \"correctAnswer\": \"XML\"\n    }\n]\n```"

    // Strip potential markdown formatting (` ```json ... ``` `)
    const cleanContent = content.replace(/^```json\n?|```$/g, '').trim();

    try {
      const parsedResponse = JSON.parse(cleanContent);
      console.log(parsedResponse);
      if (!Array.isArray(parsedResponse)) {
        throw new Error('Response format is invalid');
      }
      return parsedResponse;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', cleanContent);
      throw new Error('Invalid response format from AI');
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to generate mock test';
    console.error('Error generating mock test:', errorMessage);
    throw new Error(errorMessage);
  }
}

export async function generateResume(jobTitle: string) {
  try {
    if (!jobTitle) {
      throw new Error('Job title is required');
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a professional resume writer specializing in ATS-friendly resumes. 
          Generate detailed, professional resume content optimized for Applicant Tracking Systems.
          Focus on quantifiable achievements, relevant skills, and industry-specific keywords.`,
        },
        {
          role: 'user',
          content: `Generate a comprehensive, ATS-optimized resume for a ${jobTitle} position.
          Include:
          1. A compelling professional summary highlighting key achievements and value proposition
          2. Detailed work experience (3 positions) with measurable accomplishments
          3. Technical skills and soft skills relevant to the role
          4. Education and certifications
          5. Projects (if applicable)
          
          Format as JSON:
          {
            "contact": [{
              "fields": {
                "resumeTitle": "string",
                "fullName": "string",
                "email": "example@domain.com",
                "phone": "string",
                "location": "string",
                "website": "string (optional)"
              }
            }],
            "summary": [{
              "content": "string"
            }],
            "experience": [{
              "company": "string",
              "position": "string",
              "location": "string",
              "startDate": "YYYY-MM",
              "endDate": "YYYY-MM",
              "isPresent": boolean,
              "summary": "string with bullet points"
            }],
            "education": [{
              "institution": "string",
              "typeOfStudy": "string",
              "areaOfStudy": "string",
              "score": "string",
              "startDate": "YYYY-MM",
              "endDate": "YYYY-MM",
              "isPresent": boolean,
              "summary": "string"
            }],
            "skills": [{
              "id": "string",
              "name": "string"
            }],
            "projects": [{
              "name": "string",
              "description": "string",
              "startDate": "YYYY-MM",
              "endDate": "YYYY-MM",
              "isPresent": boolean,
              "keywords": ["string"],
              "summary": "string"
            }],
            "interests": [{
              "content": "string"
            }]
          }`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content generated');

    const resumeData = JSON.parse(content);

    // Validate the structure
    if (!resumeData.contact || !resumeData.summary || !resumeData.experience) {
      throw new Error('Invalid resume data structure');
    }

    return resumeData;
  } catch (error) {
    console.error('Error generating resume:', error);
    throw error;
  }
}

export { openai };

export async function generateSkills(jobTitle: string) {
  try {
    if (!jobTitle) {
      throw new Error('Job title is required');
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional resume writer. Generate a list of 10 relevant technical and soft skills for the given job title. Return ONLY a JSON array of strings without any markdown formatting or additional text.',
        },
        {
          role: 'user',
          content: `Generate exactly 10 relevant skills for a ${jobTitle} position. Include both technical and soft skills. Return ONLY a raw JSON array of strings without any markdown formatting, code blocks, or additional text.`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No skills were generated');
    }

    // Clean the response - remove any markdown formatting if present
    const cleanContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    let skills;
    try {
      skills = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', cleanContent);
      throw new Error('Invalid response format from AI');
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      throw new Error('Invalid skills format received');
    }

    if (skills.length > 10) {
      skills = skills.slice(0, 10);
    }

    return skills;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to generate skills';
    console.error('Error generating skills:', errorMessage);
    throw new Error(errorMessage);
  }
}

export async function generateSectionDescription(prompt: string) {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional resume writer. Generate concise, impactful descriptions for resume sections. Focus on achievements, skills, and quantifiable results where applicable. Use active voice and professional language. Do not use bullet points or dashes at the start of lines.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    // Remove bullet points and dashes from the start of each line
    const cleanContent = content
      .split('\n')
      .map((line) =>
        line
          .trim()
          .replace(/^[-•●]/, '')
          .trim()
      )
      .join('\n')
      .trim();

    return cleanContent;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to generate description';
    console.error('Error generating description:', errorMessage);
    throw new Error(errorMessage);
  }
}

export async function generateProfileSummary(title: string) {
  try {
    if (!title) {
      throw new Error('Job title is required');
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional resume writer specializing in creating compelling profile summaries. Create concise, impactful summaries that highlight key strengths and career objectives.',
        },
        {
          role: 'user',
          content: `Generate a professional profile summary for a ${title} position. Keep it concise (2-3 sentences), highlighting key skills and value proposition. Make it ATS-friendly with relevant keywords.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content generated');

    return content.trim();
  } catch (error) {
    console.error('Error generating profile summary:', error);
    throw error;
  }
}

const linkedinPostPrompt = `You are an AI assistant designed to produce a fresh, original, and concise LinkedIn post each time you are called upon. The post will announce the user's enrollment in a AI mastermind session by Codways, highlight the user's excitement about AI, and briefly mention how they plan to use AI in their current role—without reintroducing themselves by name (since it's already on their own LinkedIn).

The user strongly prefers no asterisks (*) in the final output and wants the text to be unique with every request. You must generate each post with new phrasing, wording, and structure, even if the user inputs are similar. Avoid using the same fixed template or repetitive expressions across different requests.

Instructions for Content
Opening Line (Varied)

Instead of a fixed phrase like "I'm dedicating 3 hours…," use synonyms or a different energetic statement each time. Make sure you use something like this to start with for sure. 
Maintain the idea that the user is investing a significant weekend effort in learning AI and that they want accountability from their network.

Program Mention
Clearly state they've joined Codways's 3 hours AI mastermind session.

Do not reintroduce them by name. Simply refer to their role and company in a natural, contextual way (e.g., "Being a [designation] at [company_name], I see huge potential...").
Why AI / How to Use AI

Integrate the user's provided excitement lines verbatim:
One line about why they're excited about AI.
One line about how they plan to use AI in their work or industry. If this is not provided, write this based on how their domain or designation can use AI. 

Weave these into the post in a manner that feels cohesive and natural.

Topics & Conclusion

Mention all the below program topics - **Do not miss any of the program topics in any case**
Mastering how to use LLMs to streamline development workflows.
🎨 Creating hyper-realistic AI images and videos for project mockups and UI design.
⚙️ Building Custom GPT's for a particular use-case.
🤖 Automating tasks with no-code tools like Make and Zapier—game-changers for productivity!


Make sure you add this line as it is without fail - do not change anything in the below 2 lines - it must be present in all the posts you generate:
"𝗪𝗮𝗻𝘁 𝘁𝗼 𝗷𝗼𝗶𝗻 𝗺𝗲 𝗮𝗻𝗱 𝗺𝗮𝗻𝘆 𝗼𝘁𝗵𝗲𝗿 𝗹𝗲𝗮𝗿𝗻𝗲𝗿𝘀 𝗼𝗻 𝘁𝗵𝗲 𝗻𝗲𝘅𝘁 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝘃𝗲 𝗔𝗜 𝗠𝗮𝘀𝘁𝗲𝗿𝗺𝗶𝗻𝗱? 𝗝𝗼𝗶𝗻 𝘁𝗵𝗲 𝘄𝗮𝗶𝘁𝗹𝗶𝘀𝘁 𝗵𝗲𝗿𝗲: https://www.teachxpro.com/upcoming-classes"


Wrap up by saying the user will share what they learn afterward and encourage accountability from the LinkedIn audience.

End with a brief call-to-action to join the waitlist for the next cohort, relevant hashtags (e.g., #GenerativeAI, #AILearning, #Codways, #ProfessionalDevelopment), and a mention of @Sanjeev Sharma.

Requirements for Uniqueness
Always vary your sentence structure, word choice, and phrasing to ensure each post is distinct.
Do not copy any prior output verbatim or reuse the same opening/closing lines.
No star/asterisk (*) usage. If you need emphasis, rely on alternative text styling or plain text.
Keep the post succinct and one liners. 

Output Format:
Points - make sure you arrange the text in concise points. No long paragraphs. Should be arranged neatly one line below another like Linkedin posts. 
Do not use bullet points or anything. 
Incorporate user's designation, company_name, and their two lines of excitement verbatim where appropriate.
Keep tone professional yet energetic, referencing the weekend effort and accountability.
Do not introduce the user by name (e.g., "I'm Jane Doe…"). Simply refer to them by role and company if needed.
End with hashtags, mention of Codeways's waitlist, and @Sanjeev Sharma.
Remember: Each time you generate a post, it must feel genuinely new and different from previous outputs, even if the user inputs are similar. 

Just return the post as output neatly formatted. Do not add asteriks or any other symbols.`;

export async function generateLinkedInPost(data: {
  fullName: string;
  jobRole: string;
  companyName: string;
  excitement: string;
}) {
  try {
    if (!data.fullName || !data.jobRole || !data.companyName) {
      throw new Error('All required fields must be provided');
    }

    const requestBody = {
      formFields: [
        {
          question: "Full Name",
          response: data.fullName,
          required: true
        },
        {
          question: "Job Role",
          response: data.jobRole,
          required: true
        },
        {
          question: "Company Name",
          response: data.companyName,
          required: true
        },
        {
          question: "What excites you the most about Mastermind?",
          response: data.excitement || "",
          required: false
        }
      ],
      postGeneratorPrompt: linkedinPostPrompt
    };

    // Use Supabase Edge Function to avoid CORS issues
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error('Supabase URL is not configured');
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/linkedin-post-generator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API request failed with status ${response.status}: ${errorData.error || 'Unknown error'}`);
    }

    const result = await response.json();
    
    if (!result.content || result.content.trim() === '') {
      throw new Error('No content received from API');
    }

    return {
      content: result.content,
      hashtags: result.hashtags || ['#GenerativeAI', '#AILearning', '#Codways', '#ProfessionalDevelopment']
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to generate LinkedIn post';
    console.error('Error generating LinkedIn post:', errorMessage);
    throw new Error(errorMessage);
  }
}
