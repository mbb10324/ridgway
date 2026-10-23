# Decisions

**Updated By: Robert Scalzo**

**Updated On: 9/9/2024**

## Overview

The intent of this document is to create a running record and place for us to litigate decision making. To quote a wise man, R.Simon, "Ask 5 developers and you'll get 10 opinions."

✅=decisions made
❓=decisions pending

## Decision Points

### Monolith first ✅

- The term monolith here is used to describe a single container with all features, security, domain and non domain utilities, etc. The entire app and everything supporting it lives in one container (excluding services like DB and SSO).
- The monolith first approach conforms with cDSO opinions as well as provides the following benefits:
  - Monorepos tend to be easier from a developer experience and monorepos building monolith is a natural pattern.
  - Less overhead in managing services.
  - Allows for problem space, complexity, load/performance, etc. to drive the decision on splitting services when actually confronted with the problem.
  - Multiple containers makes using debuggers difficult.
  - The concept of a common container for the other containers to pull resources from creates pathing complexities.

### Avoiding packagization ✅

- Packagizing these tools and then importing them, while a tenant of clean code, is a massive undertaking and corresponding increase in complexity.
- For now, Primus will be primarily implemented via fork.

### Next vs other server tools ✅

- One of our strongest reasons for choosing Next was Next Auth and its stronger out of the box security posture than other Node server run times
- While Next's strong opinions on structure can be offputting, we felt that recent improvements to Next offer flexibility for other patterns within their decisions

### Slimmed down application ✅

- The application on main, the default branch, will be kept as slim as possible. IE: no superfluous libraries or datasets. This is to make replication as easy as possible and the first couple hours post replication will not be filled with "rm -rf demo-graphics"
- The robust visualizations and full user flow will be saved on a release branch, demo, for demo's to VIPs

### Prisma as ORM ✅

- We are going to try to use Prisma; it is a much better ORM than Knex. We may have some security blockers but we will see if cDSO has as "strong" of opinions as prior pipelines.

### Where does this app live ✅

- The goal for this app is for it to live in NIPR, with a non-fancy URL, in both a staging/test env and a production env.

### STIGs and CD ✅

- We see the value proposition of this application as a proof of concept and replicable pattern for future efforts.
- To codify and prove this proposition, we will get this into NIPR production with full STIG and cDSO sign offs.

### Demo quality vs fork ready app in prod ✅

- While we are maintaining a demo ready version, we are going to put the leanest version into production first.

### Should this go to production/ATO ✅

- We believe getting this through an ATO like process with fulcrum demonstrates both fulcrums value and Primus'. Our goal is to send this to NIPR live in production.

### vanilla HTML / CSS for frontend components ✅

- We are going to build with "vanilla" HTML and Tailwind CSS. The reason for this is that it allows maximum flexibility for follow on teams to choose their own component library if they want / need one.

### 1 Breakpoint (mobile and desktop) ✅

- We are supporting one primary breakpoint resulting in a desktop version and a mobile version. If a future application calls for a tablet view, they can follow our pattern as needed.

### "opt out" module pattern ✅

- The decision for how to include features for developers, where are referring to them as modules, was likely the most difficult decision we've made to date. We are calling them modules rather than packages so as to avoid confusion - an early goal of ours was to not make published packages a user would need to include in their package.json. Long term and with lots of modules, using a package manager is the best option, but it comes with some heavy maintainance overhead.

- This left us really two options: "Opt In" and "Opt Out". One of these is more overhead in the short term that would support multiple modules better and one is leaner. We are choosing the leaner approach as a temporary bridging solutions pre-packagization.

- We will be cognizant to make sure developers have any eazy opting out experience with comments and avoiding dependency injection whereever possible.
