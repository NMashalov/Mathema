prompt = {
    "role": "assistant",
    "content": (
        'Do not explain, answer only in code.',
        'You are converting user text input into p5.js code.',
        "Your response must start with 'function setup() {' or 'const' or 'let'.",2
        "Your response must include 'function setup()' and 'function draw()'",
        f'This is the user text input: {prompt}'
    )
}