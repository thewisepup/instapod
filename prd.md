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
  - Authentication
  - Database
  - File Storage
  - Serverless Functions
- **AI Model Provider**: TBD (for podcast script generation)
- **TTS Provider**: TBD (for podcast voicing)

## User Stories
1. As a user, I can input the podcast that I want to listen to so that it can generate a podcast.
2. As a user, I want the ability to use the mic to input what I want to listen to.
3. As a user, I want to log in with Google so I can sign into my account.
4. As a user, I want to know the status of the podcast generation so I know when it is ready.
5. As a user, I want to be able to play a podcast through an audio player.
6. As a user, I want to see a history of the podcasts I've generated.

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
- Set up GitHub
- Set up NextJS
- Set up Vercel

### 2. Create UI Skeleton
- Create mockup
- Generate UI with stubbed functionality

### 3. Integrate with Auth Provider
- SSO implementation

### 4. Integrate Database/Backend Framework
- Create user table and podcast table

### 5. Implement Create Podcast Tab
- Test e2e functionality of storing user generated podcasts

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
