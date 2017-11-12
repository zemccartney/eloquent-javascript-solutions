// PROCESS FOR ADDING QUESTIONS

1. Add content to structure below
2. Minify ( http://www.httputility.net/json-minifier.aspx )(not sure this is necessary, but doing so to be paranoid, not
give proto.io anything weird to potentially fuck up without response)
3. Paste into the question_array variable


// QUESTION FLOWS JSON
// LEVEL 1 = FLOW
// LEVEL 2 = QUESTIONS
{
	"1": {
		"1": {
			"question": "What is this, PF Chang\'s?",
			"answer1": "Yes",
			"answer2": "No",
			"tooltip": "this is the tooltip",
			"help_text": "this is the help_text"
		},
		"2": {
      "question": "Flow one, question two now?",
			"answer1": "In the house",
			"answer2": "Nowhere",
			"tooltip": "this is the tooltip",
			"help_text": "this is the help_text"
    },
		"3": {}
	},
	"2": {
    "1": {
			"question": "Where are my shoes?",
			"answer1": "This is the cheese machine",
			"answer2": "I will build a wall",
			"tooltip": "this is the tooltip",
			"help_text": "this is the help_text"
		}
  },
	"3": {}
}

// KEEP IN MIND: WHEN SETTING A TEXT VARIABLE
// YOU HAVE TO ACCESS A PROPERTY THAT STORES A STRING
// IF YOU ACCESS AN OBJECT (As in, you access a property that returns
// an object, the call will fail silently; nothing will display in the prototype)

// ALSO, APPARENTLY YOU HAVE TO ESCAPE CHARACTERS? NO IDEA WHY YOU
// HAVE TO ESCAPE THE SINGLE QUOTE, BUT YOU DO I THINK?
JSON.parse('{question_array}')[{flow_number}][{question_number}]["question"]
JSON.parse('{question_array}')[{flow_number}][{question_number}]["answer1"]
JSON.parse('{question_array}')[{flow_number}][{question_number}]["answer2"]





/*




{
	"1": ["What is this, PF Chang\'s?"]
}


// Access pattern
JSON.parse('{array_of_questions}')[{flow_number}]


// PATTERNS
var questionFlows = {
	"1": {
		"1": {
			question: "What is this, PF Chang's?",
			answer1: "Yes",
			answer2: "No",
			tooltip: "this is the tooltip",
			help_text: "this is the help_text"
		},
		"2": {},
		"3": {}
	},
	"2": {},
	"3": {}
};

var accessor = JSON.stringify(questionFlows);
var parsed = JSON.parse(accessor);
console.log(parsed[1][1]["question"]);

JSON.parse('{question_array}')[{flow_number}][{question_number}]["question"];

// DOESN'T WORK
JSON.parse('{question_array}')[{flow_number}][{question_number}]["question"]


// but this does
JSON.parse('{array_of_questions}')[{flow_number}]

different questions structure
{
  "1": ["What is this, PF Chang\'s?", ["Yes","No"]];
}


*/
