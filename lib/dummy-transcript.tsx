export type DeterminationType = 'false' | 'true' | 'partially true' | 'misleading' | 'needs context' | 'unverified';

export interface TextPart {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
}

export interface Source {
  url: string;
  title?: string;
  accessDate?: string;
  summary?: string;  // New field for source summary
}

export interface FactcheckStatement {
  id: number;
  claim: string;
  determination: DeterminationType;
  explanation: string;
  sources: Source[];
  attachedTextPartIds: number[];
  confidenceScore?: number;
  factChecker?: string;
  dateChecked?: string;
}

export interface TranscriptItem {
  id: string;
  textParts: TextPart[];
}

export interface VideoMetadata {
  title: string;
  description?: string;
  uploadDate?: string;
  channel?: string;
  url: string;
}

export interface Transcript {
  videoMetadata: VideoMetadata;
  transcript: TextPart[];
}

export interface Factcheck {
  factcheckStatements: FactcheckStatement[];
}

export const improvedTranscriptData: Transcript = {
  videoMetadata: {
    title: "Understanding DSPy: A New Framework for Language Models",
    description: "An in-depth look at DSPy and its applications in building language model systems.",
    uploadDate: "2023-09-15",
    channel: "AI Innovations",
    url: "https://www.youtube.com/watch?v=example123"
  },
  transcript: [
    {
      id: 1,
      text: "Hey there, in this video we're going to be talking about DSPy,",
      startTime: 0,
      endTime: 3
    },
    {
      id: 2,
      text: "which is a framework for building language model applications.",
      startTime: 3,
      endTime: 7
    },
    {
      id: 3,
      text: "DSPy is really interesting because it allows you to define these programs",
      startTime: 7,
      endTime: 11
    },
    {
      id: 4,
      text: "that use language models as their core primitive.",
      startTime: 11,
      endTime: 15
    },
    {
      id: 5,
      text: "So instead of thinking about prompts,",
      startTime: 15,
      endTime: 18
    },
    {
      id: 6,
      text: "you're thinking about these language model primitives",
      startTime: 18,
      endTime: 21
    },
    {
      id: 7,
      text: "that you can compose together to build more complex applications.",
      startTime: 21,
      endTime: 24
    },
    {
      id: 8,
      text: "We're going to walk through an example of how to use DSPy",
      startTime: 24,
      endTime: 27
    },
    {
      id: 9,
      text: "to build a question-answering system.",
      startTime: 27,
      endTime: 30
    },
    {
      id: 10,
      text: "First, let's set up our environment",
      startTime: 30,
      endTime: 32
    },
    {
      id: 11,
      text: "and install the necessary packages.",
      startTime: 32,
      endTime: 35
    },
    {
      id: 12,
      text: "Once we have everything installed,",
      startTime: 35,
      endTime: 38
    },
    {
      id: 13,
      text: "we can start by creating a new DSPy project.",
      startTime: 38,
      endTime: 41
    },
    {
      id: 14,
      text: "In this project, we'll define a simple question-answering system",
      startTime: 41,
      endTime: 45
    },
    {
      id: 15,
      text: "using DSPy's primitives.",
      startTime: 45,
      endTime: 48
    },
    {
      id: 16,
      text: "We'll start by defining a language model primitive",
      startTime: 48,
      endTime: 52
    },
    {
      id: 17,
      text: "that can answer questions based on a given context.",
      startTime: 52,
      endTime: 56
    },
    {
      id: 18,
      text: "Next, we'll create a function that takes a user's question",
      startTime: 56,
      endTime: 60
    },
    {
      id: 19,
      text: "and uses our language model primitive to generate an answer.",
      startTime: 60,
      endTime: 65
    },
    {
      id: 20,
      text: "We'll also add some error handling",
      startTime: 65,
      endTime: 68
    },
    {
      id: 21,
      text: "to make sure our system can handle unexpected inputs gracefully.",
      startTime: 68,
      endTime: 72
    },
    {
      id: 22,
      text: "Finally, we'll test our question-answering system",
      startTime: 72,
      endTime: 76
    },
    {
      id: 23,
      text: "with a few example questions to see how well it performs.",
      startTime: 76,
      endTime: 80
    },
    {
      id: 24,
      text: "And that's it! We've built a simple question-answering system using DSPy.",
      startTime: 80,
      endTime: 85
    },
    {
      id: 25,
      text: "Thank you for watching, and I hope you found this tutorial helpful.",
      startTime: 85,
      endTime: 89
    },
    {
      id: 26,
      text: "Don't forget to like and subscribe for more tutorials on building language model applications.",
      startTime: 89,
      endTime: 95
    }
  ]
};

export const factcheckData: Factcheck = {
  factcheckStatements: [
    {
      id: 1,
      claim: "DSPy is a framework for building language model applications.",
      determination: "true",
      explanation: "This claim is accurate. DSPy is indeed a framework designed for building applications that utilize language models.",
      sources: [
        {
          url: "https://github.com/stanfordnlp/dspy",
          title: "DSPy GitHub Repository",
          accessDate: "2023-09-20",
          summary: "Official GitHub repository for DSPy, describing it as a framework for solving AI tasks using large language models (LLMs) as the core computational module."
        },
        {
          url: "https://arxiv.org/abs/2310.03714",
          title: "DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines",
          accessDate: "2023-09-20",
          summary: "Academic paper introducing DSPy as a framework for programming with language models, emphasizing its ability to create self-improving AI systems."
        }
      ],
      attachedTextPartIds: [1],
      confidenceScore: 0.95,
      factChecker: "AI Ethics Board",
      dateChecked: "2023-09-21"
    },
    {
      id: 3,
      claim: "You need to set up your environment and install necessary packages to use DSPy.",
      determination: "true",
      explanation: "This claim is accurate. Setting up the environment and installing necessary packages is a prerequisite for using DSPy.",
      sources: [
        {
          url: "https://github.com/stanfordnlp/dspy",
          title: "DSPy GitHub Repository",
          accessDate: "2023-09-20",
          summary: "Official GitHub repository for DSPy, providing instructions on setting up the environment and installing necessary packages."
        }
      ],
      attachedTextPartIds: [5],
      confidenceScore: 0.90,
      factChecker: "AI Ethics Board",
      dateChecked: "2023-09-21"
    },
    {
      id: 5,
      claim: "You can create a function that uses a language model primitive to generate answers.",
      determination: "true",
      explanation: "This claim is accurate. Functions can be created to use language model primitives for generating answers.",
      sources: [
        {
          url: "https://github.com/stanfordnlp/dspy",
          title: "DSPy GitHub Repository",
          accessDate: "2023-09-20",
          summary: "Official GitHub repository for DSPy, providing examples of functions that use language model primitives to generate answers."
        }
      ],
      attachedTextPartIds: [9],
      confidenceScore: 0.94,
      factChecker: "AI Ethics Board",
      dateChecked: "2023-09-21"
    },
    {
      id: 6,
      claim: "Testing the question-answering system with example questions is necessary to evaluate its performance.",
      determination: "true",
      explanation: "This claim is accurate. Testing with example questions is a standard practice to evaluate the performance of a question-answering system.",
      sources: [
        {
          url: "https://github.com/stanfordnlp/dspy",
          title: "DSPy GitHub Repository",
          accessDate: "2023-09-20",
          summary: "Official GitHub repository for DSPy, recommending testing with example questions to evaluate system performance."
        }
      ],
      attachedTextPartIds: [11],
      confidenceScore: 0.91,
      factChecker: "AI Ethics Board",
      dateChecked: "2023-09-21"
    },
    {
      id: 7,
      claim: "Liking and subscribing helps you get more tutorials on building language model applications.",
      determination: "true",
      explanation: "This claim is accurate. Liking and subscribing to a channel typically results in receiving more content from that channel.",
      sources: [
        {
          url: "https://support.google.com/youtube/answer/4489286?hl=en",
          title: "YouTube Help - Subscribe to channels",
          accessDate: "2023-09-20",
          summary: "YouTube's official help page explaining the benefits of subscribing to channels, including receiving more content from those channels."
        }
      ],
      attachedTextPartIds: [14],
      confidenceScore: 0.89,
      factChecker: "AI Ethics Board",
      dateChecked: "2023-09-21"
    },
    {
      id: 8,
      claim: "DSPy allows you to define programs that use language models as their core primitive.",
      determination: "true",
      explanation: "This claim is accurate. DSPy enables the definition of programs that utilize language models as core primitives.",
      sources: [
        {
          url: "https://github.com/stanfordnlp/dspy",
          title: "DSPy GitHub Repository",
          accessDate: "2023-09-20",
          summary: "Official GitHub repository for DSPy, describing its capability to define programs using language models as core primitives."
        }
      ],
      attachedTextPartIds: [2],
      confidenceScore: 0.92,
      factChecker: "AI Ethics Board",
      dateChecked: "2023-09-21"
    }
  ]
};