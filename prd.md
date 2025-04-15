# AI Podcast Generator

## Summary
AI Podcast Generator is an app that lets you generate 20-minute podcasts during times when you can multitask, such as:
- Driving to work
- Doing laundry
- Doing dishes
- Going for a walk

Just say what kind of podcast you want to listen to and it'll generate that for you. You can ask about:
- Current events in the news
- New skills you want to learn
- Historical facts
- And much more

It's a way for you to easily habit stack learning something new everyday through a podcast.

## Tech Stack
- **Frontend Framework**: NextJS
- **Deployment**: Vercel
- **Backend Framework**: Supabase
  - Database
  - File Storage
  - Serverless Functions
- **Auth Provider Provider**: Clerk
- **AI Model Provider**: TBD (for podcast script generation)
- **TTS Provider**: TBD (for podcast voicing)

## User Stories
1. As a user, I can input the podcast that I want to listen to so that it can generate a podcast.
   - The user sees a clean, minimal interface with a prominent text input field. The input field has placeholder text suggesting example prompts like "Tell me about the latest developments in quantum computing" or "Explain the history of the Roman Empire in an engaging way". A "Generate Podcast" button is clearly visible below the input field.
2. As a user, I want the ability to use the mic to input what I want to listen to.
   - A microphone icon button is positioned next to the text input field. When clicked, it activates the device's microphone with a visual indicator (pulsing animation) showing recording is in progress. The app provides clear feedback when it's listening and when it's processing the speech. The transcribed text appears in the input field, and users can edit it before generating the podcast.
3. As a user, I want to log in with Google so I can sign into my account.
   - A "Sign in with Google" button is prominently displayed on the landing page. The authentication flow is seamless, with a loading indicator while the process completes. After successful login, the user's profile picture appears in the top right corner, and they have access to their podcast history.
4. As a user, I want to know the status of the podcast generation so I know when it is ready.
   - After submitting a podcast request, users see a progress indicator in their list of podcasts they can listen to
   - In the list of podcasts, they block that stores the podcast information should say "Generating" instead of the actual
   component. When it finishes processing, it should show.
5. As a user, I want to be able to play a podcast through an audio player.
   - The audio player features a modern, intuitive interface with:
     - Play/pause button
     - Progress bar with time indicators
     - Volume control
     - Playback speed options (0.5x to 2x)
     - Skip forward/backward buttons (15 seconds)
    - On the page with the list of podcasts a user can listen to, pressing on the component will start playing the podcast
    - The podcast player should be a global component. Any page or tab a user goes to should show the podcast player.
   The player remains fixed at the bottom of the screen while scrolling through other content.
6. As a user, I want to see a history of the podcasts I've generated.
   - Description: The history page displays podcasts in a grid/list view with:
     - Title
     - Generation date
     - Duration

## Podcast Model
```sql
Podcast {
  podcast_id (pk)
  user_id (fk)
  podcast_status (generating, deleted, created)
  title
  created_at
  last_updated
  user_prompt
  configs
}
```

## tRPC Methods

### generatePodcast(inputText)
This API calls the serverless function that generates the podcast. It first creates a new podcast with a generating status then calls the serverless function.

### getPodcastStatusByPodcastId(podcastId)
This will be used to get the status of a podcast. This method will be used when we need to poll on the status of podcast generation.

### getPodcastsByUserId(userId)
This will be used to get a list of podcasts a user can listen to.

### getPodcastByPodcastId(podcastId)
Retrieves a specific podcast by its ID.

## Generate Podcast Workflow

1. User calls exposed API called `generatePodcast(inputText)`
   - Generates a podcast entry and returns podcastID
   - Triggers a serverless function with podcastId, inputText params

2. Given text input, utilize AI model that can search the web to generate a 20-minute podcast script between two hosts
   - Create a PodcastScriptGenerator interface where we can use OpenAI, Claude, or Gemini models
   - Look up good prompts to use
   - Consider doing a pre-step to extract podcast title, goals, etc.
   - Consider adding DB call to update podcast title based on this
   - Need to figure out which AI model works best

3. Given the podcast script, pass it to `generatePodcastAudio(podcastScript)` for text-to-speech
   - Consider breaking it up into multiple steps
   - Create an interface that can utilize multiple TTS providers (elevenlabs, speechify, etc.)

4. Stitch audio clips together
5. Store image into blob storage/CDN
6. Update podcast status and podcast location

## UI Mock Up

### Header
- Logo top left
- Center AI Podcast
- Settings/user info top right

### Top of Page
- Create Podcast button
- Listen To Podcast button

### Create Podcast Tab
- Input box (default text: "Describe what you want in details with example")
- Mic icon to toggle mic mode
- Generate Podcast button
- On click generate: toast or modal pops up and moves to Listen To Podcast tab

## Milestones

### 1. Init Project
[X] Set up GitHub
[X] Set up NextJS
[X] Set up Vercel

### 2. Create UI Skeleton
[X] Create mockup
[X] Generate UI with stubbed functionality

### 3. Integrate with Auth Provider
[X] SSO implementation

### 4. Integrate Database/Backend Framework
- Create user table and podcast table

### 5. Implement Create Podcast Tab
- Test e2e functionality of storing user generated podcasts
- Create tRPC methods for podcast

### 6. Init Serverless Function
- Test that it can take in params
- Update podcast status
- Hard code location to be public Cloudfront URL

### 7. Implement Listen To Podcast Tab
- Test rendering of podcast entries
- Implement audio player component

### 8. Implement Serverless Function to Generate Podcast

#### 8.1 Generate Podcast Script
- Generate script and title
- Integrate with AI providers

#### 8.2 Text To Speech Implementation
- Integrate with TTS provider

#### 8.3 Create and Upload Podcast
- Update podcast status and location

## Future Requirements
- Stripe integration for payments
- Paid tiers
- Limit user to 1 generation per day
- Daily generated content
  - Long running "cron job" auto generated podcasts
  - Give app a big topic you want to learn, and everyday it'll generate you a podcast based on that
- Generate different podcast lengths
