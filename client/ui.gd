extends Control

var val = 0
@onready var test_val = %"Test val"
@onready var http_request = %HTTPRequest
@onready var joke = %Joke

# Called when the node enters the scene tree for the first time.
func _ready():
	test_val.text = "0"
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass


func _on_button_pressed():
	val += 1
	print(test_val)
	test_val.text = str(val)
	http_request.request_completed.connect(_on_http_res)
	http_request.request("https://icanhazdadjoke.com/", ["Accept: application/json"])

func _on_http_res(res, code, head, body):
	var json = JSON.parse_string(body.get_string_from_utf8())
	print(json)
	joke.text = json.joke
	pass
