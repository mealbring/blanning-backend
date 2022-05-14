<div style="text-align:center"><img src="./images/blanning.png" /></div>

![release](https://badgen.net/github/release/mealbring/blanning-backend)
![checks](https://badgen.net/github/checks/mealbring/blanning-backend)
![stars](https://badgen.net/github/stars/mealbring/blanning-backend)
![issues](https://badgen.net/github/issues/mealbring/blanning-backend)
![last-commit](https://badgen.net/github/last-commit/mealbring/blanning-backend)
![commits](https://badgen.net/github/commits/mealbring/blanning-backend)


# Why Blanning ?

Blanning is a meal planner application. It allows you to create and manage your meals for a period of time.

By adding ingredient to a recipe, you can create different meal and keep them organized.

* Once you have created a meal, you can add it to your meal plan for the week.
* Once you have validated the meal plan, you can see the list of the meals you have to cook for the week.
* Automaticaly, ingredients are added to your shopping list on the Bring application.

> Thus, never worried about what to buy for your next meal.


## 🌍 Roadmap

* Connect your account from the bring app
* CRUD on meal and ingredient
* CRUD on meal plan
* Connect the backend to the bring API to add item to your shopping list


## 🧰 Usage

_An application running with [Kuzzle](https://github.com/kuzzleio/kuzzle)_

Requirement: 
 - Node.js >= 12
 - NPM >= 6
 - Docker
 - Docker-Compose

First, install [Kourou](https://github.com/kuzzleio/kourou), the Kuzzle CLI: `npm install -g kourou`

Then you need to start the services used by Kuzzle, Elasticsearch and Redis. You can run those services in the background with the following command: `kourou app:start-services`

Finally you can start your application with `kourou app:run`.  

Under the hood this command simply run Node.js with Typescript as following: `node -r ts-node/register app.ts`


## 📚 Documentation

Documentation will be available soon. Checkout the wiki that come with this project.
