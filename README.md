# Picture It - Full-Stack Project by Sasha Bausheva

## Links
- Link to deployed site: https://sashabausheva.github.io/art-reviews-client
- Link to the front-end repository: https://github.com/SashaBausheva/art-reviews-client
- Link to the deployed API: https://morning-reaches-38888.herokuapp.com

## Application Description
Picture It is a single-page application which allows users to search for images and add them to their collection along with comments/notes. Once signed up and authenticated, users can view their collection of images and create new image entries from search results. Users can search images using queries or choose to get a random image from the database. All images come from a third-party API belonging to [Unsplash](https://unsplash.com). The backend was built using Express.js and MongoDB. The front-end was built using React.js and Axios for http requests (the requests communicate with the back end and third-party API).

## Technologies Used
- Express.js
- Node.js
- Mongoose
- MongoDB
- Heroku
- Git & GitHub

## Setup and Installation:
1.  Fork and clone the respository locally
1.  Install dependencies with `npm install`.
1.  Ensure that you have nodemon installed by running `npm install -g nodemon`
1.  Ensure the server can run properly by running `npm run server`
1.  `git add` and `git commit` your changes.

#### Deploying to Heroku

Begin inside the root directory of your application.

1. Run `heroku create` in the command line in the root of the API to
create a new (blank) app on Heroku.
1. Commit to your local master branch
1. Push your latest code to Heroku (`git push heroku master`)
1. Setting up mLab on heroku:
  + Run heroku addons:create with mongolab:sandbox
`$ heroku addons:create mongolab:sandbox`
  + The first time you run the above command you may see a message like this:
  ```
  Creating mongolab:sandbox on ⬢ pacific-cliffs-91276... !
 ▸    Please verify your account to install this add-on plan (please enter a credit card) For more information, see
 ▸    https://devcenter.heroku.com/categories/billing Verify now at https://heroku.com/verify
 ```
 + You'll need to go to that URL, enter in your credit card information and then re-run the command again. This time you should see something like:
```
Creating mongolab:sandbox on ⬢ pacific-cliffs-91276... free
Welcome to mLab.  Your new subscription is being created and will be available
shortly. Please consult the mLab Add-on Admin UI to check on its progress.
Created mongolab-cubed-11237 as MONGODB_URI
Use heroku addons:docs mongolab to view documentation
```
  + Now you can log into your heroku dashboard, go to add-ons and click the mlab link. This will bring you to your mlab database.
  + If you already have an mLab account connected to your heroku account, you may see the second message and skip having to enter your credit card information.
  + Either way, if you see this output, it worked, and you can resume the following deployment steps.
1. in terminal, run: `git push heroku master`  (should build your site)
1. due to the first line of code in the `server.js` file, the default
deployment environment will be `production`
1. in terminal, run: `echo SECRET_KEY=$(openssl rand -base64 66 | tr -d '\n')`
this should generate a secret_key
1. in the terminal run:
`heroku config:set SECRET_KEY=<copy and paste secret_key generated from last command>`.
It should start with “SECRET_KEY= and a span of about 40 randomized characters”
1. you need to set your CLIENT_ORIGIN so that your deployed API will ONLY
accept requests from the correct domain. IF you're client is deployed on Github,
your ORIGIN will be:
      `https://<% github username %>.github.io`
1. Set your client ORIGIN by:
      `heroku config:set CLIENT_ORIGIN="https://<% github username %>.github.io"`
1. You should have three config variables set in heroku
(`heroku>settings>config vars`): MONGODB_URI, SECRET_KEY, CLIENT_ORIGIN
1. Once all three of these are set, run in terminal: `heroku restart`
1. Then in terminal, run: `heroku open`

A full list of Heroku commands can be accessed by running `heroku --help`

## Planning, Process, and Problem-solving Strategy
My initial idea for this project involved a different third-party API. Users were supposed to be able to search for their favorite DeviantArt artists by their usernames and add them to a personal collection with comments and ratings, after which they would be able to view samples or these artists' works sorted by the users' preferences (rating). However, halfway into the project, I realized the API provided by DeviantArt didn't meet my needs, so I had to reconsider my options and eventually decided to create Picture It which would allow users to create collections of images taken by professional photographers instead. Once this idea was finalized, I set up an Express.js/MongoDB back-end foundation with two resources, users and images, connected to each other via a one-to-many relationship. I also ensured that each user is able to view and edit only images they own by adding an "editable" parameter to images and filtering the images on the front end based on whether editable is true or false. The front end includes respective components for the main page, header with navigation, image search, edit/create forms, and pages allowing to view collections/individual image entries.

## API End Points

| Verb   | URI Pattern              | Controller#Action     |
|--------|--------------------------|-----------------------|
| POST   | `/sign-up`               | `users#sign-up`       |
| POST   | `/sign-in`               | `users#sign-in`       |
| DELETE | `/sign-out`              | `users#sign-out`      |
| PATCH  | `/change-password`       | `users#change-password`|
| GET    | `/images`                | `images#index`        |
| GET    | `/images/:id`            | `images#show`         |
| POST   | `/images`                | `images#create`       |
| DELETE | `/images/:id`            | `images#destroy`      |
| PATCH  | `/images/:id`            | `images#update`       |

2 additional GET requests utilizing external API urls.

All data returned from API actions is formatted as JSON.

## Unsolved Problems / Future Iterations
Though the UI is fully functional, it is currently still lacking in attractiveness. I am planning to further work on styling my components (such as, for example, implementing a React carousel) and ensuring that they are rendered smoothly. Users also can currently view only their own collections, so I'm considering implementing a feature allowing them to view other users' collections as well. Finally, I would like to implement categories/tags for images to allow for simpler navigation within collections.

## Wireframes and User Stories

#### Wireframes
- [Link to Wireframes](https://imgur.com/ZQozhjG)
- [Link to Entry Relationship Diagram](https://imgur.com/sXEiC8J)

#### User Stories
* As an unregistered user, I would like to sign up with my email and password.
* As a registered user, I would like to sign in with my email and password.
* As an authenticated user, I would like to be able to change password.
* As an authenticated user, I would like to be able to sign out.
* As an authenticated user, I would like to be able to search for images.
* As an authenticated user, I would like to add search results to my image collection.
* As an authenticated user, I would like to be able to edit edit/delete entries in my collection.

![Screenshot of Picture It](https://i.imgur.com/b8YycrS.png)
