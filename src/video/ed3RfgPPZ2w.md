---
index: true
source: https://www.youtube.com/watch?v=ed3RfgPPZ2w
author: Allison Horst
---

# Video: Deploy Framework projects to Observable

<p class=author>by <a href="https://observablehq.com/@allisonhorst">Allison Horst</a></p>

<iframe width="560" height="315" src="https://www.youtube.com/embed/ed3RfgPPZ2w?si=yEJWXkl_ntku_8Vp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Hi everybody, Allison here again.
In the past few videos, we've seen how to build and customize Framework projects. In this one,  
I'll show you how you can manually deploy a project to Observable.
Here, we're looking at an open Framework project  
on the right is a markdown file where I've added code to create a dashboard.
On the left is my local preview server showing what my page will look like  
to viewers. Framework projects generate static sites that you can deploy anywhere.
But the easiest option, which also gives you access to our built in  
project support and platform features, is to deploy projects to Observable.
The first step is to check that you can successfully build the project by running  
npm run build or yarn build. The build command generates the dist directory, which is what  
you'd copy or point to if you're deploying to another static site server or hosting service.
With the project successfully built, run npm run deploy or yarn deploy to bring up  
a set of helpful prompts that guide you through deploying to Observable.
If you don't have an Observable account or aren't logged in,  
you'll first be prompted to create an account and/or sign in. With that done,  
you'll be asked which workspace you want to deploy your project to.
You can be a member of multiple workspaces. For example, you might  
be a member of your team's workspace, but also have your own personal workspace.
Select the workspace where you want to deploy here. I'll choose our demo team workspace.
If this is your first time deploying the project,  
choose, "Yes, continue" when asked if you want to create a new project.
Then, add a slug that determines the project URL. For example,  
I'll keep the default product Analytics slug, but I could choose something different.
Next, choose to make this a private project only visible to other members  
of the selected workspace or a public project that you can share with anyone.
You can always change this later through your project settings on Observable.
If you've made changes or if it's been a while since you last built the project,  
you may want to rebuild at this point. I'll choose not to since  
I just built it seconds ago, and haven't made any other changes.
Add a message that will become part of the  
project's deploy history. I'll just add that this is my initial deploy.
Once the command is completed, the link to my deployed project is printed,  
so I can take a quick look at the live dashboard.
If I go to my Observable account, I see my new project listed and can  
explore the built in analytics and deploy history, or manage the project settings.
Since this is a newly deployed project, there aren't any analytics but they'll eventually  
capture useful trends in page traffic and visitation as shown for an example project here.
If you make changes to a project, you can just rebuild and redeploy.
For example, back in my project,  
I'll quickly rearrange the dashboard content, then run npm run deploy.
Since I have made changes to the source files, I'm prompted to rebuild the project first.
Once that's done, I'll follow the prompts to deploy to the same workspace and project  
adding a new message that I have adjusted the dashboard layout.
When I refresh my project deploy history, I see both of my deploys  
recorded and the updated version of my dashboard is live at the project URL.
So now you can very quickly deploy your projects to Observable.
We keep adding features that make deploying to Observable the best  
option for sharing the data apps and dashboards you've built with Framework,  
like controlling access to projects, setting up continuous deployment and tracking project usage.
See our documentation to stay up to date with what's new and  
we'll see you back here soon with more videos.
