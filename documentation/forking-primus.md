# Forking Primus

**Updated By: Charlie Miller**

**Updated On: 06/10/2025**

---

At this point, our hope is that you've had an opportunity to test drive Primus and feel comfortable using it as a basis for your own Army-centric web application. This document is all about making Primus your own and getting you one step closer to releasing your own app.  

## Forking the Repo
Primary development of Primus currently takes place in a [Gitlab instance owned by Cenith Innovations](https://gitlab.cenithinnovations.com/h2f/primus/). Most of the documentation regarding Gitlab has been written to that particular instance, which may vary from other Gitlab instances (e.g. web.git.mil). 

### 1. Forking within Gitlab
You can follow [Gitlab's own forking instructions](https://docs.gitlab.com/user/project/repository/forking_workflow/#create-a-fork) to fork Primus to your own new repository.

### 2. Update branches 
As a template project, Primus follows an unconventional branching strategy (you can read more about the reasoning [here](./decisions.md)). The default branch of Primus is "slim" - which would likely be confusing in a different context. For this reason, we recommend reintroducing a new "main" branch to serve as the default of your project. Depending on your needs, this "main" branch should be branched off of either "slim" or "full". 

> A quick refresher: "slim" is a branch that only includes the base essentials for a new STIG-compliant app. Whereas "full" is a branch that includes all of the additional opt-out modules that might also be of use (e.g. RBAC). 

In Gitlab, you should update your repository's default branch to your new "main" one. You can find [Gitlab's documentation here](https://docs.gitlab.com/user/project/repository/branches/default/#change-the-default-branch-name-for-a-project) on how to update the default branch. 

We also recommend removing any additional branches that might have been copied during the forking process. 

## Updating References to Primus
Now that you've got your own name and project, we recommend updating references to Primus (we promise we won't take offense). 

While this is not an exhaustive list of references, these are the most important ones:
* [`./package.json`](../package.json) - This is the manifest of your new application. The name to start is "primus-next", and should be updated to whatever you wish to name your new application.  
* [`./infra/init_db.sql`](../infra/init_db.sql) - This file is responsible for setting up your initial Postgres database. You should replace both references to 'primus' with your desired database name.
* [`./env.example`](../.env.example) - This is the example `.env` file, and more than likely, you'll copy this to your own local setup. For that reason, you don't want to inadvertently use the wrong database connection string. Replace "primus" in your "DATABASE_URL" connection string with the new database name you used above. 
* [`./src/app/layout.tsx`](../src/app/layout.tsx) - This file is the entrypoint of the frontend portion of the application. The metadata variable is responsible for rendering things like the title and description of your web app. You should update both the "title" and "description" property.  
* [`./infra/cenith.gitlab-ci.yml`](../infra/cenith.gitlab-ci.yml) - Depending on 
* [`./docker-compose.yml`](../docker-compose.yml) - This file is used for local development. The only existing reference to Primus should be the database name in the "DATABASE_URL" connection string. Replace "primus" with the name of the database you used in `./infra/init_db.sql`.
* [`.sdd.md`](../sdd.md) - This is the "Software Design Document" and is a required file by the cDSO/DSOP pipelines. If you intend to deliver your application through either of the processes (which is our formal recommendation), then you'll need to update many portions of this document.  

Whether you make the following changes should be dependent on your CI pipeline configurations:
* [`./infra/cdso.gitlab-ci.yml`](../infra/cenith.gitlab-ci.yml) - This file assumes that you've set up a remote repository for your project in Cenith's gitlab. In which case, you will want to update most any reference to Primus with your own application. Again, any reference in the context of a "DATABASE_URL" should be replaced with the new name of your database. 
* [`./infra/cdso.gitlab-ci.yml`](../infra/cdso.gitlab-ci.yml) - This file assumes that you've set up a remote repository for your project in cDSO. Here, you should only need to update the `DATABASE_URL` and `DB_DB` variables. 