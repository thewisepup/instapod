#Summary
AI Podcast Generator is an app that lets you generate 20 minute podcasts during the time you have where you can multi task like driving to work, doing laundry, doing dishes, or on a walk. Just say what kind of podcast you want to listen to and it’ll generate that for you. You can ask about current events in the news, a new skill you want to learn, facts about history, and so much more. It’s a way for you to easily habit stack learning something new everyday through a podcast.

#Tech Stack
We will be using NextJS as our frontend framework. 
We will deploy the application using Vercel. 
We will be using Supabase as our backend framework. We will leverage their Authentication, Database, File Storage, and Serverless 
The AI model provider to generate podcast script is TBD
The TTS provider to voice the podcast is TBD

#User Stories
##As a user, I can input the podcast that I want to listen to so that it can generate a podcast.
##As a user, I want the ability to use the mic to input what i want to listen to
##As a user, I want to log in with google so i can sign into my account
##As a user, I want to know the status of the podcast generation so I know when it is ready
##As a user, I want to be able to play a podcast through an audio player
##As a user, I want to so a history of the podcasts I’ve generated


#Podcast model
Podcast_id (pk)
User_id (fk)
Podcast_status (generating, deleted, created)
title
Created_at
Last_updated
user_prompt
configs….

#tRPC methods
##generatePodcast(inputText)
This API calls the serverless function that generates the podcast.
It firsts creates a new podcast with a generating status then calls the serverless function

#getPodcastStatusByPodcastId(podcastId)
This will be used to get the status of a podcast. This method will be used
when we need to poll on the status of podcast generation

#getPodcastsByUserId(userId)
This will be used to get a list of podcasts a user can listen to

#getPodcastByPodcastId(podcastId)


#Generate Podcast Workflow

##User calls exposed api called generatePodcast(inputText)
Generates a podcast entry and returns podcastID

Triggers a serverless function with podcastId, inputText params

Given text input, utilize AI model that can search the web to generate a 20 minute podcast script between two hosts

Create an PodcastScriptGenerator interface where we can use OpenAI, Claude, or Gemini models, but keep interface. THis is important to test different models

Look up good prompts to use

Consider doing a pre-step to this by taking the user input to extract out things like podcast title, goals, etc

Consider adding DB call to update podcast title based off this

Need to figure out which AI model works best

#Given the podcast script, pass it to generatePodcastAudio(podcastScript) and have it generate text to speech

Consider using breaking it up into multiple steps

Create an interface that can utilize multiple TTS providers (elevenlabs, speechify, etc)

#Stitch audio clips together
#Store image into blob storage/CDN
#Update podcast status and podcast location

#UI Mock Up

##Header
Logo top left
Center AI Podcast
Settings/user info top right

#Top of page, 2 buttons
Create Podcast
Listen To Podcast

#Create Podcast Tab
Input box (default text says describe what you want in details w example)
Mic icon to toggle mic mode
Generate Podcast button
onClick generate, toast or modal pops up and it moves you to Listen To Podcast tab. We should see the recent input be generated


#Milestones
##Init project
Set up github
Set up nextjs
Set up vercel

##Create UI skeleton
Create mockup
Generate UI with stubbed functionality

##Integrate with auth provider
SSO

##Integrate database/backend framework
Create user table and podcast table

##Implement Create Podcast Tab
Test e2e functionality of storing user generated podcasts

##Init serverless function
Test that it can take in params, then update podcast status and hard code location to be public Cloudfront url

##Implement Listen To Podcast Tab
Test that given a bunch of podcast entries, we can render them all with audio player component and have it play stuff

##Implement Serverless function to generate podcast

###Implement functionality to generate podcast script
Generate script and title
Integrate with AI providers

### Implement functionality to do Text To Speech on podcast script
Integrate with TTS provider

###Implement functionality to create podcast and upload to blob storage
Update podcast status and location

#Future Requirements
##Stripe integration for payments
##Paid tiers
##Limit user to 1 generation per day
##Daily generated content
Long running “cron job” auto generated podcasts
Give app a big topic you want to learn, and everyday it’ll generate you a podcast based on that.
##Generate different podcast lengths
