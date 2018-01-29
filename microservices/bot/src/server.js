require('babel/register');
const http = require('http');
var Slack = require('slack-client');
var fetchAction =  require('node-fetch');

try {
      const fs = require('fs');
      const token = process.env.SLACK_TOKEN;
      var slack = new Slack(token, true, true);

      var makeMention = function(userId) {
        return '<@' + userId + '>';
      };

      var isDirect = function(userId, messageText) {
        var userTag = makeMention(userId);
        return messageText &&
        messageText.length >= userTag.length &&
        messageText.substr(0, userTag.length) === userTag;
      };

      function get_gst(item_name, channel, user) {

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
      }
      slack.on('message', function(message) {
        var channel = slack.getChannelGroupOrDMByID(message.channel);
        var user = slack.getUserByID(message.user);

        if (message.type === 'message' && isDirect(slack.self.id, message.text)) {
          //Trimmed message
          var trMessage = message.text.substr(makeMention(slack.self.id).length+1).trim();
          get_gst(trMessage, channel, user);

        }
      });

      slack.login();
      http.createServer(function(req, res) {
      res.end('Hi there, Lets get started with GST');
      }).listen(8080);

} catch(error) {
    console.log('Retry');
    return;
}
