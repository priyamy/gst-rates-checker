# A slack based gst-rates-checker bot on Hasura

A quickstart of a slack-based **gst-rates-checker** which provides the **GST(Goods & Services Tax)** on the specific goods/service which is given as input by user.

## Preview of the gst-rates-checker bot
 ![preview.gif](https://filestore.hasura.io/v1/file/9ea38761-f796-4259-b650-97ee8c838ba5)

## Pre-requisites
- [X] **NodeJS v8.9.3 LTS** :    
   - Download [here](https://nodejs.org/en/download/)
   - [X] Includes **npm v5.5.1**
- [ ] *(Only for Windows)* **Git Bash** : A Linux Command Line Interface(CLI), that enables users of Windows OS to execute git commands.
   - Download [here](https://git-scm.com/download/win)
   - Find the Installation Guide [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [X] **Hasura CLI**
   - Find the Installation Guide [here](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)
- [X] **Text Editor** : Use a text editor of your choice. Some of the editors are listed below :
   - Vim
   - Sublime
   - Eclipse


## Step-by-Step Guide for getting the bot running

### Step 1 : Create a new slack bot integration
1. Go to https://<your-slack-workspace>.slack.com/services/new/bot and choose appropriate username for bot and click on **'+ Add bot integration’**.
2. Add the required details and **note down the API token**

 ![create-bot.png](https://filestore.hasura.io/v1/file/f9a87322-e6d1-41fd-a9d7-20459ee031e7)


### Step 2 : Getting this project on your machine
Type the following commands on the CLI *(Git Bash for windows)*
```
$ hasura quickstart priyamy/gst-rates-checker
$ cd gst-rates-checker
# Add Slack API key to hasura secrets. 
$ hasura secrets update SLACK_BOT_TOKEN.key  <Your Bot API KEY>
```

### Step 3 : Deploy the project on Hasura
```
$ git add . && git commit -m "First commit"
$ git push hasura master
```

After the `git push` completes:

```sh
$ hasura microservice list
```

You will get an output like so:
```
USER MS NAME     STATUS      INTERNAL-URL              EXTERNAL-URL
bot              Running     bot.abscess10-user:80     http://bot.abscess10.hasura-app.io/

HASURA MS NAME     STATUS      INTERNAL-URL                            EXTERNAL-URL
gateway            Running
le-agent           Running
session-redis      Running     session-redis.abscess10-hasura:6379
postgres           Running     postgres.abscess10-hasura:5432
auth               Running     auth.abscess10-hasura:80                http://auth.abscess10.hasura-app.io/
notify             Running     notify.abscess10-hasura:80              http://notify.abscess10.hasura-app.io/
platform-sync      Running
filestore          Running     filestore.abscess10-hasura:80           http://filestore.abscess10.hasura-app.io/
data               Running     data.abscess10-hasura:80                http://data.abscess10.hasura-app.io/
sshd               Running


```
Find the EXTERNAL-URL for the service named bot(in this case -> https://bot.abscess10.hasura-app.io).


### Step 4 : Adding bot to your Slack Channels/DM
Just type @bot-name to invite the bot to the channel or DM,
Then type
```sh
#   @bot-name <goods-name>
@bot-name coffee

#   @bot-name <services-name>
@bot-name air transport
```
 ![11.png](https://filestore.hasura.io/v1/file/a54ff24f-7ac2-4131-9445-81d8b5c6aafd)
## API used

### Data API of Hasura
Create two tables namely gst_tax and gst_rate_checker. The GST rates were taken from Economic Times (4).

**Column**|**Type**
---|---
id|integer
tax|text *primary key*

**Column**|**Type**
---|---
name|text *primary key*
gst|text *foreign key*

### Generated API code through API explorer of Hasura
```
var url = "https://data.abscess10.hasura-app.io/v1/query";

              var requestOptions = {
                  "method": "POST",
                  "headers": {
                      "Content-Type": "application/json"
                  }
              };

              var body = {
                  "type": "select",
                  "args": {
                      "table": "gst_rate_checker",
                      "columns": [
                          "gst"
                      ],
                      "where": {"name": item_name}
                  }
              };

              requestOptions.body = JSON.stringify(body);

              fetchAction(url, requestOptions)
              .then(function(response) {
                return response.json();
              })
              .then(function(result) {
                channel.send(`GST on ${item_name} is ${result[0].gst}`);
                console.log(result[0].gst);
              })
              .catch(function(error) {
                console.log('Request Failed:' + error);
              });
      
```
NOTE:  *Here, **item-name** is given by user*



## Support

If you happen to get stuck anywhere, feel free to an issue [here](https://github.com/priyamy/gst-rates-checker)

## Credits
1. [Hasura](https://hasura.io/)
2. Economic Times, "[Confused about revised GST rates? Here's a quick guide](https://economictimes.indiatimes.com/news/economy/policy/a-quick-guide-to-india-gst-rates-in-2017/articleshow/58743715.cms)" 

## References
1. Quickstart [dvk/slack-horoscope-bot](https://hasura.io/hub/project/dvk/slack-horoscope-bot)
2. Quickstart [jaison/fb-bot](https://hasura.io/hub/project/jaison/fb-bot)
3. [Hasura Data API docs](https://docs.hasura.io/0.15/manual/data/index.html)
4. Economic Times, "[Confused about revised GST rates? Here's a quick guide](https://economictimes.indiatimes.com/news/economy/policy/a-quick-guide-to-india-gst-rates-in-2017/articleshow/58743715.cms)" 

