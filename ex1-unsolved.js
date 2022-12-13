/* ---------------------------------------------------------- */
//you can only change the code in this block below

//you can also include new libraries if you need (very optional)
var blessed = require('blessed')
  , contrib = require('blessed-contrib')
  , screen = blessed.screen()
  , log = contrib.log(
      { fg: "green"
      , label: 'Server Log'      
      , height: "100%"
      , tags: true      
      , border: {type: "line", fg: "cyan"} })
      //you can use 16 basic terminal colors, read: https://jeffkreeftmeijer.com/vim-16-color/


// you can change the appearance, text and formatting of the messages as you want, make them better, but you cannot make new messages because they won't be called. 
var router_text = "{black-fg}router number: {/black-fg}";
var network_text = "{red-fg}network is offline{/red-fg}";
var is_down_text = "\n{red-fg}network is down.{/red-fg}";
var needs_reboot_text = "{yellow-fg}reboot required{/yellow-fg}";
var ping_text = "{black-fg}current ping latency is -> {/black-fg}";
var ping_close_text = "{black-fg} ms{/black-fg}";
var no_ping_text = "{red-fg}no ping detected{/red-fg}";
var waiting_message = "{black-fg}code is still running{/black-fg}";

//if you want to add any code, this is function where your work should go into
function your_function_to_display_errors(message, level) {	
  // if you want to add code, add to this function
  log.log(message); //this displays a message in the log, make this better
  // if you want to add code, add to this function
}



/* ---------------------------------------------------------- */
//you cannot change any of the code below, really not. 

screen.append(log)

class LogMessage {
  constructor(text, importance) {
    this.text = text;
    this.importance = importance;	
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var max_routers = 4;
var max_ping = 2000;

var messages = [
		new LogMessage(router_text + 2 + is_down_text , 1),
		new LogMessage(router_text + 2 + is_down_text , 1),
		new LogMessage(waiting_message, 0),
		new LogMessage(router_text + getRandomInt(max_routers) + is_down_text , 1),
		new LogMessage(ping_text + getRandomInt(max_ping) + ping_close_text , 0),
		new LogMessage(router_text + getRandomInt(max_routers) + is_down_text , 1),
		new LogMessage(waiting_message, 0),
		new LogMessage(ping_text + getRandomInt(max_ping) + ping_close_text , 0),
		new LogMessage(router_text + getRandomInt(max_routers) + is_down_text , 1),
		new LogMessage(network_text + getRandomInt(max_routers) + is_down_text + needs_reboot_text , 2),
		new LogMessage(router_text + getRandomInt(max_routers) + is_down_text , 1),
		new LogMessage(waiting_message, 0),
		new LogMessage(waiting_message, 0),
		new LogMessage(no_ping_text, 1),
		new LogMessage(router_text + getRandomInt(max_routers) + is_down_text , 1),
		new LogMessage(no_ping_text, 1),
		new LogMessage(router_text + 1 + is_down_text , 1),
		new LogMessage(router_text + 1 + is_down_text , 1),
		new LogMessage(no_ping_text, 1),
		new LogMessage(waiting_message, 0),
		new LogMessage(waiting_message, 0),
		new LogMessage(waiting_message, 0),
		new LogMessage(waiting_message, 0),
		new LogMessage(no_ping_text, 1),
		new LogMessage(router_text + 1 + is_down_text , 1),
		new LogMessage(no_ping_text, 1),
		new LogMessage(no_ping_text, 1),
		new LogMessage(waiting_message, 0),
		new LogMessage(no_ping_text, 1)
]

var i = 0;

function process_messages() {
  if (i > messages.length - 1 ) {
    clearInterval(this);
  } 
  else {
    your_function_to_display_errors(messages[i].text, messages[i].importance); //here we call your function to display a message
    i++; //advances to next message
    setTimeout(process_messages,getRandomInt(500));
  }
}

process_messages();

screen.render()

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
