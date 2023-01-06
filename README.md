# Asset-Rebalancing-Tool

The best Asset-Rebalancing Tool you will find. 



___

## Live [Demo Portfolio](https://portfolio-rebalancer.com/)

If you just wan't a playground to try our App out, you can visit the [Demo Portfolio](https://portfolio-rebalancer.com/).\
On this demo you will have access to all major functionalities, that won't require an up front registration.\
This Demo is sufficient enough to use it for an actual asset rebalancing.

However, we still recommend [creating your own account](https://portfolio-rebalancer.com/sign-up/), in order to get the most out of our app.\
If you wan't to try the App before creating an account, you will have the opportunity to convert all changes made during the demo browser session to into a new account.

### Advantages creating a personal account
Features | Demo Account | personal Account
----- |--------------| -----
Live stock & ETF prices | check        | check
Create your own custom assets  | check        | check
Determine your investment strategy | check        | check
Automatic rebalancing calculation | check        | check
All monitoring fetaures | check | check
save your assets  | x            | check
autmatically import your assets  | x            | check
Schedule your Investments  | x            | check
Set your own account preferences  | x            | check

<br>

However, if you're interested in playing around with the code base,
or even extending it with your own functionalities,\
feel free to check out the following documentation.\
We are expecting a basic understanding of the following vuejs principles 

## Manual Project Setup

If you're interested in setting up your own environment

<br>

Start of by installing the project dependencies
```sh
npm install
```
Compile and Hot-Reload for Development
```sh
npm run dev
```
Type-Check, Compile and Minify for production
```sh
npm run build
```
Use [ESLint](https://eslint.org/) to analyse the code and find problems
```sh
npm run lint
```


:white_check_mark:



## Manual deployment

```
docker compose -f docker-compose_prod.yaml build
docker compose -f docker-compose_prod.yaml -p webservicesjitcom up -d
```


